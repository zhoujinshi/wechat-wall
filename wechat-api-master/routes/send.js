var express = require('express');
var router = express.Router();

var config = require('../config');
var wechat = require('wechat-enterprise');
var api = new wechat.API(config.corpid, config.secret, config.agentid);

router.post('/', function (req, res) {
    var body = req.body || {};

    body.type || res.status(500).send({error: 'miss [type] field'});

    var _errorHandle = function (error) {
        res.status(500).send(error);
    };

    var _successHandle = function (data) {
        res.send({ok: data});
    };

    body.type == 'text' && _sendText(body, _errorHandle, _successHandle);
});

var _sendText = function (arg, errorHandle, successHandle) {
    if (!arg.touser || !arg.text) {
        errorHandle({error: 'miss [touser] or [text] field'});
        return;
    }

    api.send({
        "touser": arg.touser
    }, {
        "msgtype": "text",
        "text": {
            "content": arg.text
        },
        "safe": "0"
    }, function (err, data, res) {
        err ? errorHandle(err) : successHandle(data);
    });
}

module.exports = router;