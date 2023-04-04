const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const connectToDatabase = ()=>{
    
    mongoose.connect(process.env.DB).then(()=>{
        console.log("connecting to database")
    }).catch((e)=>{
        console.log("error connecting to database" , e.message);
    });
}

module.exports = connectToDatabase;