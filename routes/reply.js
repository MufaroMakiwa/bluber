const express = require("express");
const router = express.Router();
// const validator = require("./middleware");
const replyController = require("./reply-controller");
const { constructReplyResponse }  = require("./utils");



router.post(
  '/',
  [
    // validator.isUserLoggedIn,
    // validator.isCommentIdInBodyExists,
    // validator.isTargetUserIdExists
  ],
  async (req, res) => {
    const { commentId, content, targetUserId } = req.body;
    const reply = await replyController.addOne(req.session.userId, commentId, content, targetUserId);
    res.status(201).json({
      reply: await constructReplyResponse(reply)
    }).end();
  }
);


router.delete(
  '/:replyId?',
  [
    // validator.isUserLoggedIn,
    // validator.isReplyIdInParamsExists,
    // validator.isCommentIdInBodyExists,
    // validator.isValidCommentModifier
  ],
  async (req, res) => {
    await replyController.deleteOne(req.params.replyId);
    res.status(200).json({
      message: "Reply deleted sucessfully"
    }).end();
  }
);


module.exports = router;