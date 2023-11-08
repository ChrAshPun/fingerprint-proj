/* 
 From ChatGPT: routers play a crucial role in directing incoming 
 HTTP requests to the appropriate handlers, controllers, or views 
 based on the URL and HTTP method
*/

var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
    // Send plain text as a response
    res.send('API is working properly <3'); 
});
module.exports = router;