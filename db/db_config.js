const mongoose = require('mongoose');
require('dotenv').config();

const db = {};
db.mongoose = mongoose;
db.url = `mongodb+srv://gangoffour:${process.env.PASSWORD}@cluster0.rnya0.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority` //connection to atlas
module.exports = db;