const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        
    },
    number:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{ timestamps : true});

const cardSchema = new mongoose.Schema({
    company:{
        type:String,
    },
        code:{
            type:String,
        },
        offer:{
            type:String,
        },
        brief:{
            type:String,
        },
        expiry:{
            type:String,
        },
        description:{
            type:String,
        },
        redeemProcess:{
            type:String,
        },
        TandC:{
            type:String,
        },
        sellerEmail:{
            type:String,
        },
        buyerName:{
            type:String,
        },
        buyDate:{
            type:String,
        },
        orderId:{
            type:String,
        },
        buyerEmail:{
            type:String,
        },
        buyerContact:{
            type:Number,
        }


})
const User = mongoose.model("User",userSchema);
const cardDetails = mongoose.model("cardDetails",cardSchema);
module.exports ={ 
    User,
    cardDetails,
}