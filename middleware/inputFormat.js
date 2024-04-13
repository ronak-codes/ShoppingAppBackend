const Joi = require("joi")

const createProduct = Joi.object({
    title:Joi.string().required(),
    supplier:Joi.string().required(),
    price:Joi.string().required(),
    imageUrl:Joi.string().required(),
    description:Joi.string().required(),
    product_location:Joi.string().required()
})


module.exports ={
    createProduct
}