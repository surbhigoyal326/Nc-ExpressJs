var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");


router.post('/login', function(req,res,next){
  console.log(req);
  let cred = req.body.username === 'admin';

  
   if(cred) {
     if(req.body.password === 'admin'){
         // generate token
         let token = jwt.sign({username:'admin'},'secret', {expiresIn : '60s'});

         return res.status(200).json(token);

     } else {
       return res.status(501).json({message:' Invalid Credentials'});
     }
   }
   else {
     return res.status(501).json({message:'User name is not registered.'})
   }
 
})

router.get('/username', verifyToken, function(req,res,next){
 return res.status(200).json(decodedToken.username);
})

var decodedToken='';
function verifyToken(req,res,next){
  //console.log('HI'+req)
 let token = JSON.parse(req.headers.token);

 jwt.verify(token,'secret', function(err, tokendata){
   if(err){
     return res.status(400).json({message:' Unauthorized request'});
   }
   if(tokendata){
     decodedToken = tokendata;
     next();
   }
 })
}

module.exports = router;
