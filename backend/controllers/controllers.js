const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.signUp =catchAsyncErrors(async (req , res , next)=>{
    const {name , password , cpassword} = req.body;
    if(password!==cpassword) return(next(new ErrorHandler("your confirm password is incorrect" , 400)));
    let user = await User.create({name:name, password:password});
    const token = jwt.sign({id:user._id} , process.env.JWTSECRET , {
        expiresIn : '7d'
    })

    res.status(201).cookie("greenstitch" , token , {
        expires: new Date(Date.now() + 1000*60*60*24*7),
        httpOnly: true
    }).json({
        user: user,
        success:true
    })
})


exports.login = catchAsyncErrors(async (req , res , next) => {
    const {name , password} = req.body;
    let user = await User.findOne({name: name}).select('+password');
    if(!user) return next(new ErrorHandler("Invalid credentials " , 404));
    const result = await user.comparePassword(password);
    if(!result) return next(new ErrorHandler("Invalid credentials" , 404));

    const token = jwt.sign({id:user._id} , process.env.JWTSECRET , {
        expiresIn : '7d'
    })
    user = user.toObject();
    delete user.password;

    res.status(200).cookie("greenstitch" , token , {
        expires: new Date(Date.now() + 1000*60*60*24*7),
        httpOnly: true
    }).json({
        user: user,
        success:true,
    })
});

exports.authToken = catchAsyncErrors( async (req , res , next) => {
    const {greenstitch} = req.cookies;
    if(!greenstitch) return ;
    const result =  jwt.verify(greenstitch , process.env.JWTSECRET);
    if(!result) return next(new ErrorHandler("Please login again" , 400));
    const user = await User.findById({_id:result.id});
    res.status(200).json({
        user: user,
        success:true
    })
})


exports.logout=catchAsyncErrors(async (req , res , next) => {
    res.cookie("greenstitch" , null , {
        expires: new Date(Date.now() ),
        httpOnly: true
    })

    res.status(200).json({})
})