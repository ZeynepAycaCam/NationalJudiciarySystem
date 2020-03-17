var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var user = {
        id: 0,
        name: "taylan",
        mail: "taylan@example.com",
        age: 21,
        address: {
            street: "üniversiteler mah.",
            state: "çankaya",
            city: "ankara",
            zipcode: "06000"
        },
        phone: "05xxxxxxxxx"
    };
    res.status(200).send(user).end();
});

module.exports = router;
