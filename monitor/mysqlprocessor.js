var mysql = require('mysql'),
    config = require('./config'),
    pool = mysql.createPool(config.mysqlDB),
    logger = require('./log'),
    logger = logger.getLogger('cheese'),
    save = function (item) {
        pool.getConnection(function (err, connection) {
            if (err) logger.error(err);
            // Use the connection
            var log = item;
            var query = connection.query('INSERT INTO log SET ?', log, function (err, result) {
                if (err) logger.error(err);
                connection.release();
                // Don't use the connection here, it has been returned to the pool.
            });
        });

    };
pool.on('connection', function (connection) {
    logger.info("a connection is up at " + new Date());
});
module.exports = {
    save: save
}