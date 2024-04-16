const dotenv = require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY)
const {Cashfree} = require("cashfree-pg")



// Stripe Integration

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


// CashFree Integration

const createOrder = async(req,res) =>{
    try{

        Cashfree.XClientId = process.env.CASHFREE_APP_ID
        Cashfree.XClientSecret = process.env.CASH_FREE_SECRET_KEY
        Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;


        let request = {
            "order_amount": req.body.amount,
            "order_currency": "INR",
            "order_id": "order_534474",
            "customer_details": {
                "customer_id": "walterwNrcMi",
                "customer_phone": "8474090589"
            },
            "order_meta": {
                "return_url": "https://www.cashfree.com/devstudio/preview/pg/mobile/hybrid?order_id={order_id}"
            }
        };
        
        Cashfree.PGCreateOrder("2023-08-01", request).then((response) => {

            let data = {
                payment_session_id:response.data.payment_session_id,
                order_id:response.data.order_id
            }
            res.status(200).json(data);

        }).catch((error) => {
            console.error('Error:', error.response.data.message);
        });

    }catch(error){

        res.status(500).json({msg:error})  
    }
}


module.exports={
    createPaymentIntent,
    createOrder
}