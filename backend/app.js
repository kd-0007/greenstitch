const express = require('express');
const connectToDatabase = require("./db");
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const error = require("./middlewares/Error");
const {signUp , login , authToken , logout} = require("./controllers/controllers");

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());


const port = process.env.PORT || 5000;
connectToDatabase();

app.post('/signup' , signUp);
app.post('/login' , login);
app.get('/authtoken' , authToken);
app.get('/logout' , logout);

app.use(error);

app.use(express.static(path.join(__dirname, '../greenstitch-frontend/build')));
app.get('*' , express.static(path.join(__dirname, '../greenstitch-frontend/build/index.html')));

app.listen(port  ,()=>{
    console.log("listening on port" , port);
});