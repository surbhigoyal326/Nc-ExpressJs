var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
var isJwtExpired = require("jwt-check-expiration");

router.post('/login', function (req, res, next) {
  console.log(req);
  let cred = req.body.username === 'admin';


  if (cred) {
    if (req.body.password === 'admin') {
      // generate token
      let token = jwt.sign({ username: 'admin' }, 'secret', { expiresIn: '60s' });
      
      let refreshToken = jwt.sign({ username: 'admin' }, 'refresh_secret', { expiresIn: '1h' })

      return res.status(200).json({token: token,refreshToken: refreshToken});

    } else {
      return res.status(501).json({ message: ' Invalid Credentials' });
    }
  }
  else {
    return res.status(501).json({ message: 'User name is not registered.' })
  }

})

router.get('/username', verifyToken, function (req, res, next) {
  return res.status(200).json({username:decodedToken.username, newAccessToken: newAccessToken});
})

var decodedToken = '';
var newAccessToken;
function verifyToken(req, res, next) {
  let requestToken = JSON.parse(req.headers.token);

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  jwt.verify(requestToken, 'refresh_secret', function (err, tokendata) {
    if (err) {
      return res.status(400).json({ message: ' Unauthorized request, user has to sign in again' });
    }
     newAccessToken = jwt.sign({username:"admin"}, "secret" , {expiresIn: '60s'});
    if (tokendata) {
      decodedToken = tokendata;
      next();
    }
  })
}

module.exports = router;
