var express = require('express');
var router = express.Router();

var fs = require('fs');


router.get('/getProducts', function (req, res) {
    fs.readFile('./data/products.json', 'utf8', function (err, data) {
        if (!err) {
            console.log("Success" + data);
            res.end(data);
        } else {
            res.end("Error: " + err)
        }
    });
})


module.exports = router;