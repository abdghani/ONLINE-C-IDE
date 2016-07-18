var express = require('express');
var router = express.Router();
var fs = require('fs')
var exec = require('exec');

//code execution logics
router.post("/",function(req,res){
	var str
	if(req.body.data !==undefined){
		fs.writeFile('codes/data.txt',req.body.data,function(err){
			if(err){
				res.send(err)
			}
		})
		 str = './codes/data < codes/data.txt'
	}
	else{
		 str = './codes/data'
	}

	if(req.body.content!== undefined){
	fs.writeFile('codes/data.c', req.body.content,  function(err) {
	   if (err) {
	       res.send(err)
	   }
	   	exec('gcc -o codes/data codes/data.c',function(err,out,code){
	   	if(err){
	   		res.send({err:err})
	   	}
	   	else{
	   		exec(str,function(err,out,code){
				if(err){
					res.send(err)
				}
				var output = {
					out_data:out
				}
				console.log(output)
				res.json(output)
			})
		}
	   })
	})
  }
	
})





module.exports = router