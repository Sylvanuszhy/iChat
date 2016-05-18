/**
 * Created by Sylvanus on 5/11/16.
 */

var mongoose = require('mongoose');
var connect = require('connect');
var SessionStore = require("session-mongoose")(connect);
var Users = require('./users');
mongoose.connect('mongodb://localhost:27017/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function(callback) {
    console.log('Connection Succeeded.');
});

var sessionStore = new SessionStore({
    interval: 120000,
    connection: db
});

var User = mongoose.model('Users', Users.userSchema);

module.exports.sessionStore = sessionStore;
module.exports.User = User;
