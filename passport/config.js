var passport = require('passport');
var passport_google = require('passport-google-oauth').OAuth2Strategy;
var passport_facebook = require('passport-facebook').Strategy;
var auth = require('../bin/auth.js');
var mongoose = require('mongoose')
var user = require('../models/user.js')



module.exports = {
	newpassportgoogle : new passport_google({
		clientID:auth.google.id,
		clientSecret:auth.google.secret,
		callbackURL:auth.google.callback,
		profileFields:['id','displayname','emails','picture','profileUrl']
	},function(accessToken,refreshToken,profile,callback){
		
		user.findOne({'user_id':profile.id},function(err,data){
			    	if(data){
			    		user.update(
			    			{user_id:profile.id},
			    			{$set:
			    				{
			    					profile_pic:profile.photos[0].value,
			    					last_seen:new Date(),
			    					profile_link:profile._json.link,
			    					acc_type:profile.provider
			    				}
			    			},
			    			function(err,data){
			    			console.log("-checkpoint 1")
			    			user.findOne({'user_id':profile.id},function(err,data){
			    				
			    				return callback(null,data)
			    			})
			    		})
			    	}
			    	
			    	else{

			    		var newUser = new user({
			    			user_id:profile.id,
			    			name:profile.displayName,
			    			profile_pic:profile.photos[0].value,
			    			last_seen:new Date(),
			    			profile_link:profile._json.link,
			    			acc_type:profile.provider
			    			
			    		});
			    		newUser.save(function(err,data){
			    				return callback(null,data)
			    		})
			    	
			    	}
			    })



	}),
	newpassportfacebook : new passport_facebook({
			    clientID:auth.facebook.id,
			    clientSecret:auth.facebook.secret,
			    callbackURL:auth.facebook.callback,
			    profileFields:['id','displayName','emails','bio','picture','profileUrl']
			  },
			  function(accessToken,refreshToken,profile,callback){
			  
			    user.findOne({'user_id':profile.id},function(err,data){
			    	if(data){
			    		user.update(
			    			{user_id:profile.id},
			    			{$set:
			    				{
			    					profile_pic:profile.photos[0].value,
			    					last_seen:new Date(),
			    					profile_link:profile._json.link,
			    					acc_type:profile.provider
			    				}
			    			},
			    			function(err,data){
			    			user.findOne({'user_id':profile.id},function(err,data){
			    				return callback(null,data)
			    			})
			    		})
			    	}
			    	
			    	else{

			    		var newUser = new user({
			    			user_id:profile.id,
			    			name:profile.displayName,
			    			profile_pic:profile.photos[0].value,
			    			last_seen:new Date(),
			    			profile_link:profile._json.link,
			    			acc_type:profile.provider
			    		});
			    		newUser.save(function(err,data){
			    				return callback(null,data)
			    		})
			    	
			    	}
			    })
			  }
			),
	serialize:function(user,done){
		done(null,user);
	},

	deserialize:function(user,done){
		done(null,user);
	}
}