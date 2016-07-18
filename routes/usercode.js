var express = require('express');
var router = express.Router()
var codedb = require('../models/code.js');
	
//save user code
router.post('/',function (req,res) {
	var newcode = new codedb(req.body);
	newcode.save(function(err,data){
		console.log(err)
		console.log(data)
		res.send(data)
	})
})

//query for user code
router.get('/',function(req,res){
	codedb
	.find({userid:req.query.userid})
	.sort({'created_at':-1})
	.populate('userid')
	.exec(function(err,data){
		res.send(data)
	})
})

//delete user code
router.delete('/',function(req,res){
	codedb
	.remove({_id:req.query.codeid})
	.exec(function(err,data){
		if(err){
			res.send(err)
		}
		else{
			res.send(data)
		}
	})
})

module.exports = router;