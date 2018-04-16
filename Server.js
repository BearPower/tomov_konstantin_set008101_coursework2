var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var UserT = require('./public/register');
//connect to the database
mongoose.connect('mongodb://users:kojihugy@ds241699.mlab.com:41699/users');

//Validation
var Validation=0;
var User;

//Schema for new user
var userSchema = new mongoose.Schema({
	UserName:String,
	FirstName:String,
	LastName:String,
	Email:String,
	Password:String,
});

//Schema for new post
var postSchema = new mongoose.Schema({
	Publisher:String,
	Post:String,
});


//model for the new user
var UserR = mongoose.model('UserR', userSchema);

//model for the nue post
var Post = mongoose.model('Post',postSchema);

//run express.
var app = express();

//middlewate for parsing the data.
var urlencoderParser = bodyParser.urlencoded({ extended: false});

//set up the template engene.
app.set('view engine', 'ejs');

//static file listener.
app.use('/public',express.static('public'));

//render the main page
app.get('/Home',function(req,res){
			UserR.find({},function(err , usersdata){
			if(err) throw err;
			for(var i=0;i<usersdata.length;i++){
				usersdata[i].FirstName = "";
				usersdata[i].LastName = "";
				usersdata[i].Email = "";
				usersdata[i].Password = "";
			}
			res.render('Index',{users: usersdata});
			});
});

//render the register page
app.get('/Register',function(req,res){
	res.render('Register');
});


//get new user
app.post('/getNewUser',urlencoderParser,function(req,res){
		UserR.find({UserName: req.body.UserName},function(err , usersdata){
			if(err) throw err;
			if(usersdata==""){
				UserR(req.body).save(function(err,savedUser){
				if(err) throw err;
				});
				res.send('<script>alert(" Congratulations. You have successfully registered.");window.location.href = "/Home";</script>')
				console.log("New User");
			}
			else{
				console.log("User exists");	
				res.send('<script>alert(" Sorry. User name is taken.");window.location.href = "/Register";</script>')
			}
		});
	});
	
	//log in
app.post('/LogIn',urlencoderParser,function(req,res){
		UserR.find({UserName: req.body.UserName, Password: req.body.Password},function(err , usersdata){
			if(err) throw err;
			if(usersdata==""||Validation==1){
			res.send('<script>alert(" Wrong user name or password.");window.location.href = "/home";</script>')
			}
			else{
				Validation=1;
				User = req.body.UserName;
				res.send('<script>window.location.href = "/LogedIn";</script>')
			}
		});
		
});

//displayin the user blog
app.post('/Read',urlencoderParser,function(req,res){
	Post.find({Publisher: req.body.UserBlog},function(err , userposts){
		if(err) throw err;
		
		res.render('Read',{Posts: userposts,User: req.body.UserBlog});
		console.log(userposts);
		
	});
});


//loged in and validation
app.get('/LogedIn',urlencoderParser,function(req,res){
	Post.find({Publisher: User},function(err , userposts){
		if(err) throw err;
			
		if(Validation==1){
			Validation=0;
			res.render('LogedIn',{Username: User,post: userposts});
		}else{
			res.send('<script>alert("Ups, somthing went wrong");window.location.href = "/home";</script>')
		}
	});
});

//getiing a new post
app.post('/Post',urlencoderParser,function(req,res){
	if(req.body.validation==1){
		Validation = 1;
		res.send('<script>alert("The post has been added.");window.location.href = "/LogedIn";</script>')

		var userpost = "";
		var lines = req.body.Post.split('\n');
		for (var i = 0;i < lines.length; i++){
			userpost = userpost + lines[i];
			userpost = userpost + "\n";
		}
		Post({Publisher: User, Post: userpost}).save(function(err,savedPost){
		});
	}else{
		res.send('<script>alert("Ups, somthing went wrong");window.location.href = "/home";</script>')
	}
});


//midwate to log the url posts
app.use('',function(req,res,next){
	console.log(req.url);
	next();
});

//listen to port
var listener = app.listen(8080, () =>{
	console.log('Server is runing on port '+ listener.address().port +'!!!');
})