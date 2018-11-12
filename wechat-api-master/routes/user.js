var express = require('express');
var router = express.Router();

var config = require('../config');
var wechat = require('wechat-enterprise');
var api = new wechat.API(config.corpid, config.secret, config.agentid);

// middleware specific to this router
router.use(function timeLog(req, res, next) {
    next();
});

router.get('/:id', function (req, res) {
    api.getUser(req.params.id, function (error, data) {
        error ? res.status(500).send(error) : res.send(data);
    });
});

module.exports = router;
