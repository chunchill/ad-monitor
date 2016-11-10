var mongoose = require('mongoose');
var Monitorlog = require('./model/monitorlog');
var config = require('./config');
var logger = require('./log');
logger = logger.getLogger('cheese');
mongoose.connect(config.mongoDB);

var db = mongoose.connection;
db.on('error', function(err){
    logger.error(err);
});
db.once('open', function() {
  logger.info('mongoose opened at : ' + new Date());
});

var save = function (item) {
    var log = new Monitorlog(item);
    log.save(function (err) {
        if (err) {
             logger.error(error);
            throw err
        };
    })
}

module.exports = {
    save: save
}

