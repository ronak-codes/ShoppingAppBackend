const dotenv = require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY)

const createPaymentIntent = async (req,res) =>{
    try{

         const paymentIntent = await stripe.paymentIntents.create({
            amount:req.body.amount,
            currency:'INR',
            automatic_payment_methods:{
                enabled:true
            },
            description:"Shopping Goods",
            shipping: {
                name: 'John Doe',
                address: {
                  line1: '510 Townsend St',
                  postal_code: '98140',
                  city: 'San Francisco',
                  state: 'CA',
                  country: 'US',
                },
              },
        })

        res.status(200).json({paymentIntent:paymentIntent.client_secret});
    }catch(error){
        res.status(500).json({msg:error})
    }
}


module.exports={
    createPaymentIntent
}