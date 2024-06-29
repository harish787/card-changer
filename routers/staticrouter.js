const express = require("express")
const bodyParser = require('body-parser');
const session = require('express-session');
const { User,cardDetails } = require("../models/user");
const path = require('path');
const { restrictToLoggedinUserOnly } = require("../middleware/auth");
const router = express.Router();
router.use(express.static(__dirname))
const passport = require('passport');
require("../service/passport");

// Set up session middleware
router.use(session({
    secret: 'nothing', // Change this to a secure random string
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Change this to true if we're using HTTPS
        maxAge: 24 * 60 * 60 * 1000
    }
}));

router.use(passport.initialize());
router.use(passport.session());

router.use(bodyParser.urlencoded({ extended: true }));




router.get("/", async (req, res) => {
    if (req.user && req.user.provider === 'google') {
        const userEmail = req.user.email;
        const userExist =await User.findOne({ email: userEmail });
        if (!userExist) {
            const name = req.user.displayName;
            const email = userEmail;
            const number = 0;
            const password = '/0';
            await User.create({
                name,
                email,
                number,
            password
            })
        }


    }
    const filePath = path.join(__dirname, '..', 'HTML', 'dashboard_cards.html');

    res.sendFile(filePath);
})
// router.get("/api",restrictToLoggedinUserOnly,(req,res)=>{
//     const filePath = path.join(__dirname, '..', 'HTML', 'payment.html'); 

//     res.sendFile(filePath);
// })
router.get("/chatbot", restrictToLoggedinUserOnly, (req, res) => {
    const filePath = path.join(__dirname, '..', 'HTML', 'chatbot.html');

    res.sendFile(filePath);
})
router.get("/signup", (req, res) => {
    const filePath = path.join(__dirname, '..', 'HTML', 'registration.html');

    res.sendFile(filePath);
})
router.get("/category", (req, res) => {
    const filePath = path.join(__dirname, '..', 'HTML', 'category.html');

    res.sendFile(filePath);
})
router.get("/login", (req, res) => {
    const filePath = path.join(__dirname, '..', 'HTML', 'login.html');

    res.sendFile(filePath);
})
router.get("/login/auth/google", passport.authenticate('google', {
    scope: ['email', 'profile']
}))
router.get("/login/auth/google/callback",
    function (req, res, next) {
        passport.authenticate('google', function (err, user, info) {
            if (err) { return next(err); }
            if (!user) { return res.redirect('/login/auth/google'); }
            req.logIn(user, function (err) {
                if (err) { return next(err); }
                req.session.isLoggedIn = true;
                req.session.userId = user._id;
                req.session.email = user.email; // Set session variable to true indicating user is logged in
                return res.redirect('/');
            });
        })
        (req, res, next);
    }
);

router.get("/profile", restrictToLoggedinUserOnly, (req, res) => {
    const filePath = path.join(__dirname, '..', 'HTML', 'profile.html');

    res.sendFile(filePath);
})
router.get("/sell", restrictToLoggedinUserOnly, (req, res) => {
    const filePath = path.join(__dirname, '..', 'HTML', 'sell_coupan.html');

    res.sendFile(filePath);
})
router.get("/purchase", restrictToLoggedinUserOnly, (req, res) => {
    const filePath = path.join(__dirname, '..', 'HTML', 'purchase_coupan.html');

    res.sendFile(filePath);
})
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) {
        const filePath = path.join(__dirname, '..', 'HTML', 'login.html');
        console.log("User not found. Sending login page.");
        return res.sendFile(filePath);
    }
    req.session.isLoggedIn = true;
    req.session.userId = user._id;
    req.session.email = user.email;
    return res.redirect("/");
});
// const {order_id,email,contact} = require("../controllers/paymentController");
router.get("/success",async(req,res)=>{
    try{
            
          
           console.log('error2');
            await cardDetails.updateOne({company:'Ujjain Engineering College (UEC) Ujjain'},{$set:{buyDate:Date,
            buyerEmail:req.session.email}})
            console.log('error3');
        
    }
    catch{
        console.log('error');
    }
})

module.exports = router;