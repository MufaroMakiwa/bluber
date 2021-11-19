const express = require("express");
const router = express.Router();
const validator = require("./middleware");
const replyModel = require("../models/reply");


const userId1 = "gangoffour1";
const userId2 = "gangoffour2";


router.post(
  '/',
  [
    validator.isUserLoggedIn,
    validator.isCommentIdInBodyExists,
    validator.isTargetUserIdExists
  ],
  (req, res) => {
    const { commentId, content } = req.body;
    const reply = replyModel.addOne(userId2, commentId, content, userId1);
    res.status(201).json(reply).end();
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
    const reply = replyModel.updateOne(req.params.replyId, req.body.content);
    res.status(200).json(reply).end();
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
    replyModel.deleteOne(req.params.replyId);
    res.status(200).json({
      message: "Reply deleted sucessfully"
    }).end();
  }
);


module.exports = router;