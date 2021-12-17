var express = require('express');
var router = express.Router();

var fs = require('fs');
const { off } = require('process');


router.get('/getEmployees', function (req, res) {
    fs.readFile('./data/employeeData.json', 'utf8', function (err, data) {
        if (!err) {
            res.end(data);
        } else {
            res.end("Error: " + err)
        }
    });
})

// router.get('/checkEmail/:emailId', function (req, res) {
//   fs.readFile('./data/employeeData.json', 'utf8', function (err, data) {
//     if (!err) {
//     if(data.includes(req.params.emailId))
//         res.end("true");
//     } else {
//         res.end("Error: " + err)
//     }
// });
// })


module.exports = router;