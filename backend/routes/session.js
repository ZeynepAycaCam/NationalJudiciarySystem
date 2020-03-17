var express = require('express');
var router = express.Router();

var { auth, passport } = require('../api/session/auth');

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(req.user);
    res.status(200).send({ health: true }).end();
});

/* GET home page. */
router.post('/login/:type', function (req, res, next) {
    console.log("[Session][Login] params.type: ", req.params.type);
    console.log("[Session][Login] username: ", req.body.username);
    console.log("[Session][Login] password: ", req.body.password);
    console.log("----------");
    
    auth(req, res, next).then((user) => {
        res.status(200).send(user).end();
    }).catch((err) => {
        res.status(400).send(err).end();
    });
});

module.exports = router;
