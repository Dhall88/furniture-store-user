const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const User = require("./models/User")
const router = express.Router();

app.use('/', router);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});



mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost:27017/user')

app.get('/', function(req,res){
	res.json({message:'You did it!'})
})

app.get('/users', function(req,res){
	console.log('get users');
	Product.find({}).then(eachOne => {
		res.json(eachOne)
	})
})

app.post('/users', function(req,res){
	User.create({
		user: req.body.user,
		password: req.body.password,
		cart: req.body.cart
	}).then(product => {
		res.json(product)
	})
})

app.listen(3001);
console.log('starting app')