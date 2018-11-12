var express = require('express');
var path = require('path');

var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');

var path = require('path');
var config = require('./config');

var app = express();

// all environments
app.set('port', process.env.PORT || config.port);
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true,
    saveUninitialized: true,
    secret: 'uwotm8' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

app.use('/send', require('./routes/send'));
app.use('/department', require('./routes/department'));
app.use('/user', require('./routes/user'));
app.use('/wechat', require('./routes/wechat'));

// TODO
/*
    AccessToken 续租
 */
if (true){
    var schedule = require("node-schedule");
    var wechat = require('wechat-enterprise');
    var api = new wechat.API(config.corpid, config.secret, config.agentid);
    var rule = new schedule.RecurrenceRule();
    rule.minute = 40;
    var j = schedule.scheduleJob(rule, function(){
        api.getAccessToken(function(err, token){err || console.log("token renew")});
    });
}

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});