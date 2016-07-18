
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var codesSchema = new Schema({
	userid:{type:String,required:true,ref:'User'},
	name:{type:String,required:true},
	content:{type:String,required:true},
	created_at:{type:Date,default:Date.now()},
})

module.exports = mongoose.model('codes',codesSchema)