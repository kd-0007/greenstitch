const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userschema = new mongoose.Schema({
    name:{
        type:'string',
        required: [true , "please enter a name"],
        unique: [true , "this user already exists"]
    },
    password:{
        type:'string',
        required: true,
        select:false,
    }
})
userschema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password , 10);
    }
    next();
})

userschema.methods.comparePassword = async function(password){
    return  await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userschema);
module.exports = User;