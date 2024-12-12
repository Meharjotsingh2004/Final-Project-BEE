import express from 'express'
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import { brainTreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productFiltersController, productPhotoController, realtedProductController, searchProductController, updateProductController } from '../controller/productController.js';
import formidable from 'express-formidable';
const router = express();


//routes
router.post('/create-product',requireSignIn, isAdmin,formidable(),createProductController)

//Update Product
router.put('/update-product/:pid',requireSignIn, isAdmin,formidable(),updateProductController)


//getAll-products
router.get('/get-product', getProductController)


//single Product 
router.get('/get-product/:slug' , getSingleProductController)


//get Photo Of Product
router.get('/product-photo/:pid',productPhotoController )

//delete Product
router.delete('/delete-product/:id', deleteProductController)

//filter Product
router.post('/product-fliters' , productFiltersController)

// //product count
// router.get("/product-count", productCountController);

// //product per page
// router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);


//category wise product
router.get('/product-category/:slug' , productCategoryController);


//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);



export default router; 