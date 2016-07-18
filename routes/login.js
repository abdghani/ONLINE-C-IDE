var express = require('express');
var router = express.Router()
var passport = require('passport');
var user = require('../models/user.js')

	//google login
	router.get('/google',passport.authenticate('google',{scope:['profile','email']}));
	router.get('/google/callback',
			passport.authenticate('google',{
				successRedirect:'/',
				})
	)
	//facebook login
	var passport_facebook = require('passport-facebook').Strategy;
	router.get('/facebook',passport.authenticate('facebook'));
	router.get('/facebook/return',passport.authenticate('facebook',{failureRedirect:'/login',failureFlash:true}),function(req,res){
		    res.redirect('/#/login');
		  })

	//check if a user is logged in or not
	router.get('/logincheck',function(req,res){
		res.send(req.isAuthenticated()?req.user:'0');
	})

	//logout
	router.post('/logout',function(req,res){
		req.logout();
		res.send(200)
	})

	//demo
	router.get('/demo',function(req,res){
	user.findOne({user_id:'106259537876974704849'},function(err,data){
			req.logIn(data,function(err){
				res.redirect('/#/todo');
			})
		})
	})

module.exports = router;