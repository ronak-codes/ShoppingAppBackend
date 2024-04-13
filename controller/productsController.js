const Products= require("../models/productsModel")

const createProduct = async (req,res) =>{
    try{
        const newProduct = new Products(req.body);
        await newProduct.save();
        res.status(200).json({msg:"Product created Successfully"});
    }catch(error){
        res.status(500).json({msg:"" + error});
    }
}

const getAllProducts = async(req,res) =>{
    try{
        
        const allProducts = await Products.find({}).sort({createdAt:-1});
        res.status(200).json(allProducts);

    }catch(error){
        res.status(500).json({msg:"Failed to get all the products"});
    }
}

const getProductById  = async(req,res) =>{
    try{
        const product = await Products.findById(req.params.id);
        res.status(200).json(product);
        
    }catch(error){
        res.status(500).json("Failed to get a product");
    }
}


const searchForProducts = async (req,res) =>{
    try{
        const response = await Products.aggregate(
            [
                {
                  $search: {
                    index: "products",
                    text: {
                      query: req.params.key,
                      path: {
                        wildcard: "*"
                      }
                    }
                  }
                }
              ]
        )

        res.status(200).json(response);

    }catch(error){
        res.status(500).json({msg:"Could not find Anything"});
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    searchForProducts
}