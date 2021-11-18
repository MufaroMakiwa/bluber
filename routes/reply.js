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
    validator.isCommentIdInBodyExists,
    validator.isTargetUserIdExists
  ],
  (req, res) => {

  }
);

router.patch(
  '/:replyId?',
  [
    validator.isUserLoggedIn,
    validator.isReplyIdInParamsExists,
    validator.isValidCommentModifier
  ],
  (req, res) => {

  }
);

router.delete(
  '/:replyId?',
  [
    validator.isUserLoggedIn,
    validator.isReplyIdInParamsExists,
    validator.isCommentIdInBodyExists,
    validator.isValidCommentModifier
  ],
  (req, res) => {

  }
);


module.exports = router;