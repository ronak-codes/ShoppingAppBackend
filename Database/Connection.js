const mongoose = require("mongoose");


const Connection = async (USERNAME,PASSWORD) =>{
    try{
        USERNAME=encodeURIComponent(USERNAME);
        PASSWORD=encodeURIComponent(PASSWORD);
        const URI=`mongodb+srv://${USERNAME}:${PASSWORD}@mycluster.kcjlale.mongodb.net/ShoppingApp?retryWrites=true&w=majority&appName=myCluster`
        await mongoose.connect(URI);
        console.log("Connected with the database");
    }catch(error){
        console.log("Error While Connecting to Database",error);
    }

}

module.exports= Connection