import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import usermodel from "../models/usermodel.js";
import JWT from "jsonwebtoken";
import orderModel from "../models/orderModel.js";

export async function registerController(req, res) {
  try {

    const { name, email, password, phone, address,answer } = req.body;

    if (!name || !email || !password || !phone || !address||!answer) {
      return res.send({ message: "Details Not Filled Properly" });
    }
    //existing User
    const existinguser = await usermodel.findOne({email})
    if(existinguser){
        return res.status(200).send({
            success: false,
            message : "Already Registered User Please Login "
        })
    }

    //register User
    const hashedPassword = await hashPassword(password);
    //save 
    const user = await new usermodel({name , email ,  password :hashedPassword,phone, address , answer}).save()
    

    res.status(201).send({
        success : true,
        message : "User Registered Successfully",
        user
    })
     


  } catch (error) {

    console.log(error);
    return res.status(500).json({
      message: error + "Error in registeration",

    });
  }
}


export async function loginController(req , res) {
   
  
    try {
        const {email , password} = req.body

        if(!email || !password){
            return res.send({
                message : "Please Provide Email and Password"
            })
        }
        const existingUser = await usermodel.findOne({email});
        if(!existingUser){
            res.send({
                message: "User Does Not Exist"
            })
        }
        const match  = await comparePassword(password, existingUser.password);

        if(!match){
            return res.status(200).send({
                message : "Invalid Passsword"
            })
        }
        const token = await JWT.sign({_id : existingUser._id} , process.env.JWT_SECRET ,{
            expiresIn: '7d'
        });
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
              _id: existingUser._id,
              name: existingUser.name,
              email: existingUser.email,
              phone: existingUser.phone,
              adddress: existingUser.address,
              role :existingUser.role
            },
            token,
          });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success : false ,
            message : "Error in Login",
            error
        })
    }
    
}

export async function testController(req,res) {

   res.send("Protected Route")
}

export const forgotPasswordController=async(req,res)=>{
try {
    const {email, answer , newPassword} = req.body

    if (!email) {
        res.status(400).send({ message: "Emai is required" });
      }
      if (!answer) {
        res.status(400).send({ message: "answer is required" });
      }
      if (!newPassword) {
        res.status(400).send({ message: "New Password is required" });
      }

      //check
      const user = await usermodel.findOne({ email, answer });
      //validation
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Wrong Email Or Answer",
        });
      }
      const hashed = await hashPassword(newPassword);
      await usermodel.findByIdAndUpdate(user._id, { password: hashed });
      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      }); 
} catch (error) {
    console.log(error)
    res.status(500).send({
        success : false,
        message:"Something went wrong in forgotPasswordController"
        ,error
    })
}
};


export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await usermodel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await usermodel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};



//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};


//orders all for once
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};


//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};