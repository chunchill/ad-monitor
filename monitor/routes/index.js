var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../config');
var mongoprocessor = require('../mongoprocessor');
var mysqlprocessor = require('../mysqlprocessor');
Date.prototype.format = function (format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}

/* GET home page. */
router.get('/', function (req, res, next) {
    var get_client_ip = function (req) {
        return req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
    };
    var logRecord = {};
    console.log('=============================get one shot======================');
    logRecord.original_url = req.originalUrl;
    console.log('originalUrl:' + logRecord.original_url);
    logRecord.desc = req.query.src; //让广告投放处的网站传观来参数
    console.log('srcDescription:' + logRecord.desc);
    logRecord.user_agent = req.headers['user-agent'];
    console.log('agent:' + logRecord.agent);
    logRecord.referer = req.headers['referer'];//来源
    console.log('referer:' + logRecord.referer);
    logRecord.client_ip = get_client_ip(req);
    console.log('client ip:' + logRecord.client_ip);
    logRecord.visit_time = req._startTime;
    var visitedTime = logRecord.visit_time.format('yyyy-MM-dd hh:mm:ss');
    console.log('visitTime:' + visitedTime);
    console.log('=============================already get one shot===============');

    if (config.use_mongo) {
        mongoprocessor.save(logRecord);
    }

    if (config.use_mysql) {
        mysqlprocessor.save(logRecord);
    }



});

module.exports = router;
