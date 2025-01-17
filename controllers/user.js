const {User,cardDetails} = require("../models/user");
const path = require('path');
const cookieParser = require("cookie-parser");
const express = require('express');
const session = require('express-session');
const bodyParser = require("body-parser");
const { route } = require("../routers/staticrouter");
// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));

async function handleUserSignUp(req,res){
    const {name,email,number,password} = req.body;

    await User.create({
        name, 
        email,
        number,
        password
    })
    console.log("user created")
    const filePath = path.join(__dirname, '..', 'HTML', 'login.html'); 

    
    return res.sendFile(filePath);
}

async function handleCardData(req,res){
    const {company,code,offer,brief,expiry,description,redeemProcess,TandC} = req.body;
    const buyerName = null;
    const buyDate = null;
    const orderId = null;
    const buyerEmail = null;
    const buyerContact = null;
    const sellerEmail = req.session.email;
    await cardDetails.create({
        company,
        code,
        offer,
        brief,
        expiry,
        description,
        redeemProcess,
        TandC,
        sellerEmail,
        buyerName,
        buyDate,
        orderId,
        buyerEmail,
        buyerContact
    })
    console.log("card-details uploaded");
    const filePath = path.join(__dirname, '..', 'HTML', 'dashboard_cards.html'); 

    
    return res.sendFile(filePath);

}
async function fetchProfileDetails(req, res) {
    try {
        // Find user based on email
        const Email=req.session.email;
        const user = await User.findOne({ email: Email });

        // Check if user exists
        
        if (!user) {
            // User not found, return an appropriate response
            return { error: 'User not found' };
        }
        // User found, destructure properties and return
        const { name, email, number } = user;
        return { name, email, number };
    } catch (error) {
        console.error('Error fetching profile details:', error);
        return { error: 'Internal Server Error' };
    }
}
async function fetchCardDetails(req,res){
    try{
        
        const cardData=await cardDetails.find({},{code:0});
        
        if(!cardData){
            console.error('Error inside if statement function');
        }
        
       
        // console.log(cardData)
        
        return cardData;
    }
    catch{
        console.error('Error inside function');
        // res.setHeader('Content-Type', 'application/json');
        return {error:'Internal server Error'};
    }
}
async function fetchProfileCardDetails(req,res){
    try{
    const details = await cardDetails.find({sellerEmail:req.session.email},{code:0})
    return details;
    }
    catch(e){
        console.error('error in fetching card details   ',e);
    }
}
module.exports = {
    handleUserSignUp,
    fetchProfileDetails,
    fetchCardDetails,
    handleCardData,
    fetchProfileCardDetails
}