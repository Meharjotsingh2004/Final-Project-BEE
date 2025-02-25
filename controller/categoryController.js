import slugify from 'slugify'
import categoryModel from '../models/categoryModel.js'


export const createCategoryController=async(req,res)=>{
    try {
        const {name} = req.body
        if(!name){
            return res.status(500).send({message:"Name is Required"})
        }

        const existingCategory = await categoryModel.findOne({name})

        if(existingCategory){
            return res.status(200).send({
                success: true,
                message: "Category Already exist(in createCategoryController)"
    
            })
        }
            const category = await new categoryModel({name , slug:slugify(name)}).save()
            res.status(201).send({
                success : true ,
                message : "New Category Created ",
                category
            })
    } catch (error) {
        console.log(error)
        res.status(500).send()({
            success: false ,
            error,
            message : "Error in createCategoryController "
        })
    }

}


//updateCategoryController

export const updateCategoryController=async (req , res)=>{
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(
          id,
          { name, slug: slugify(name) },
          { new: true }
        );
        res.status(200).send({
          success: true,
          message: "Category Updated Successfully(updateCategoryController)",
          category
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error while updating category(updateCategoryController)",
        });
      }
}


//show all categoryController
export const categoryController=async(req , res)=>{ 
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
          success: true,
          message: "All Categories List",
          category,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error while getting all categories",
        });
      }
}

//single category showing
export const singleCategoryController=async(req, res)=>{
    try {
        
        const category = await categoryModel.findOne({ slug: req.params.slug });
        res.status(200).send({
          success: true,
          message: "Get SIngle Category SUccessfully",
          category,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error While getting Single Category",
        });
      }
}



//delete  deleteCategoryController

export const deleteCategoryController=async(req,res)=>{
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
          success: true,
          message: "Categry Deleted Successfully(in deleteCategoryController)",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "error while deleting category(deleteCategoryController)",
          error,
        });
      }
}