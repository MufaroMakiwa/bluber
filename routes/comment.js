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
    validator.isTargetUserIdExists
  ],
  (req, res) => {

  }
);

router.patch(
  '/:commentId?',
  [
    validator.isUserLoggedIn,
    validator.isCommentIdInParamsExists,
    validator.isValidCommentModifier
  ],
  (req, res) => {

  }
);

router.delete(
  '/:commentId?',
  [
    validator.isUserLoggedIn,
    validator.isCommentIdInParamsExists,
    validator.isValidCommentModifier
  ],
  (req, res) => {

  }
);


module.exports = router;