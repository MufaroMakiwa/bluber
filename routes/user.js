const express = require("express");
const router = express.Router();
const validator = require("./middleware");
const userModel = require("../models/user");
const commentModel = require("../models/comment");
const markModel = require("../models/mark");
const ratingModel = require("../models/rating");
const savedModel = require("../models/saved");
const replyModel = require("../models/reply");




module.exports = router;