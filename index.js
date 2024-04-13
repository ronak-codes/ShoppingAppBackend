const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const cors = require("cors")
const Connection = require('./Database/Connection')
const productRouter = require("./routes/productsRoute")
const paymentRouter = require("./routes/paymentsRoute")

const PORT = process.env.PORT
const USERNAME = process.env.MONGODB_USERNAME;
const PASSWORD = process.env.MONGODB_PASSWORD;


Connection(USERNAME,PASSWORD);

app.use(cors())
app.use(express.json());
app.use("/products",productRouter)
app.use("/payments",paymentRouter)

app.get("/",(req,res)=>{
    res.send("Hello World!!");
})

app.listen(PORT,()=>console.log(`Server started at port ${PORT}`));