const mongoose = require('mongoose');
require('dotenv').config();

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB_URI; //connection to atlas
module.exports = db;