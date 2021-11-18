const express = require("express");
const router = express.Router();
const validator = require("./middleware");
const userModel = require("../models/user");
const commentModel = require("../models/comment");
const markModel = require("../models/mark");
const ratingModel = require("../models/rating");
const savedModel = require("../models/saved");
const replyModel = require("../models/reply");


router.post(
  '/',
  [
    validator.isUserLoggedIn,
    validator.isMarkIdInBodyExists,
    validator.isMarkRatingAllowed,
    (req, res, next) => validator.checkMarkRatingStatus(req, res, next, false)
  ],
  (req, res) => {
    
  }
);

router.patch(
  '/',
  [
    validator.isUserLoggedIn,
    validator.isMarkIdInBodyExists,
    validator.isMarkRatingAllowed,
    (req, res, next) => validator.checkMarkRatingStatus(req, res, next, true)
  ],
  (req, res) => {

  }
);

router.delete(
  '/',
  [
    validator.isUserLoggedIn,
    validator.isMarkIdInBodyExists,
    validator.isMarkRatingAllowed,
    (req, res, next) => validator.checkMarkRatingStatus(req, res, next, true)
  ],
  (req, res) => {

  }
);

module.exports = router;