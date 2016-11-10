// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('MonitorLog', new Schema({ 
    original_url: String, 
    user_agent: String, 
    referer: String,
    visit_time: Date,
    client_ip : String,
    desc: String
}));