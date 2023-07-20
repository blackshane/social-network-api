const connect = require('mongoose');

//  mongodb connection URL
connect('mongodb://127.0.0.1:27017/social-network');


module.exports = connection