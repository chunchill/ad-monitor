var log4js = require('log4js');
log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: 'event.log', category: 'cheese' }
  ]
});

module.exports = log4js;