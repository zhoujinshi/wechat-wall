var express = require('express');
var router = express.Router();

var config = require('../config');
var http = require('http');
var wechat = require('wechat-enterprise');

router.post('/', wechat(config, wechat.text(function (message, req, res, next) {
    // TODO
    config.reply.forEach(function (e) {
        try {
            var req = http.request(e, function () {});
            req.on('error', function (e) {
                console.log(e);
            });
            req.write(JSON.stringify(message));
            req.end();
        } catch (e) {
            // TODO
            console.log(e);
        }
    });
    res.status(200).send('ok');
}).event(function (message, req, res, next) {
    if (message.EventKey == 'shake') {
        res.reply([{
            title: '摇一摇',
            description: '参看大屏幕参加，切勿转发此链接给同事',
            picurl: '/img/shake.png',
            url: '/shake-wechat.html?userid=' + message.FromUserName
        }]);
    }
}).image(function (message, req, res, next) {
    console.log(message);
    // TODO
    config.reply.forEach(function (e) {
        try {
            var req = http.request(e, function () {});
            req.on('error', function (e) {
                console.log(e);
            });
            req.write(JSON.stringify(message));
            req.end();
        } catch (e) {
            // TODO
            console.log(e);
        }
    });
    res.status(200).send('ok');
})));

module.exports = router;