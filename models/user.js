var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({

	user_id:{type:String,required:true,index:{unique:true}},
	name:{type:String,required:true},
	profile_pic:{type:String,required:true},
	created_at:{type:Date,default:Date.now()},
	last_seen:{type:Date,default:null},
	profile_link:{type:String,defualt:null},
	acc_type:{type:String,defualt:null}
})

module.exports = mongoose.model('User',UserSchema)
