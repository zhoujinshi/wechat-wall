var express = require('express');
var router = express.Router();

var config = require('../config');
var wechat = require('wechat-enterprise');
var api = new wechat.API(config.corpid, config.secret, config.agentid);

// middleware specific to this router
router.use(function timeLog(req, res, next) {
    next();
});

router.get('/', function (req, res) {
    api.getDepartments(function (error, data) {
        error ? res.status(500).send(error) : res.send(data.department);
    });
});

router.get('/:departid', function (req, res) {
    api.getDepartmentUsers(req.params.departid, 1, 0, function (error, data) {
        error ? res.status(500).send(error) : res.send(data.userlist);
    });
});

module.exports = router;
