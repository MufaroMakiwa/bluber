const express = require("express");
const router = express.Router();
const validator = require("./middleware");
const replyController = require("./reply-controller");


const userId1 = "gangoffour1";
// const userId2 = "gangoffour2";


router.post(
  '/',
  [
    // validator.isUserLoggedIn,
    // validator.isCommentIdInBodyExists,
    // validator.isTargetUserIdExists
  ],
  async (req, res) => {
    let userId = userId1;
    const { commentId, content,userId2 } = req.body;
    const reply = await replyController.addOne(userId, commentId, content,userId2);
    res.status(201).json(reply).end();
  }
);

router.patch(
  '/:replyId?',
  [
    validator.isUserLoggedIn,
    validator.isReplyIdInParamsExists,
    validator.isValidReplyModifier
  ],
  async (req, res) => {
    const reply = await replyController.updateOne(req.params.replyId, req.body.content);
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
  async (req, res) => {
    await replyController.deleteOne(req.params.replyId);
    res.status(200).json({
      message: "Reply deleted sucessfully"
    }).end();
  }
);


module.exports = router;