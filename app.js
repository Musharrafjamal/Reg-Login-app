const express = require('express');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const md5 = require('md5');
require('dotenv').config();

const app = express();

const connectdb = mongoose.connect('mongodb+srv://musharrafjamal08:musharraf08@crud1.gbhx1yg.mongodb.net/?retryWrites=true&w=majority')

const schema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model('Authuser', schema);

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
    res.render('home')
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/register', (req, res) => {
    res.render('register')
})
app.post('/register', async (req, res) =>{
    const user = await new User({
        email: req.body.username,
        password: md5(req.body.password)
    })
    user.save()
    res.render('secrets')
})

app.post('/login', async (req, res)=>{
    const username = req.body.username;
    const password = md5(req.body.password);

    const foundUser = await User.findOne({email: username}).exec();
    
    if(foundUser){
        if(foundUser.password=== password){
            res.render('secrets');
        }
    }else{
        res.send(`There is error to find the account with email ${username} `)
    }
});



app.listen(3000, function() {
    console.log("Server started on port 3000.");
  });
  
