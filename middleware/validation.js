const {createProduct} = require("./inputFormat")

const validateCreateProduct = async(req,res,next) =>{
    const {error,value} = createProduct.validate(req.body);
    if(error){
        res.status(400).json(error);
    }
    next();
}


module.exports ={
    validateCreateProduct
}