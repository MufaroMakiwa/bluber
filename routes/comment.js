const express = require("express");
const router = express.Router();
// const validator = require("./middleware");
const commentController = require("./comment-controller");
const { deleteComment, constructCommentResponse }  = require("./utils");


router.post(
  '/',
  [
    // validator.isUserLoggedIn,
    // validator.isMarkIdInBodyExists,
    // validator.isTargetUserIdExists
  ],
  async (req, res) => {
    const { markId, content, targetUserId } = req.body;
    const comment = await commentController.addOne(req.session.userId, markId, content, targetUserId);
    res.status(201).json({
      comment: await constructCommentResponse(comment)
    }).end();
  }
);

router.delete(
  '/:commentId?',
  [
    // validator.isUserLoggedIn,
    // validator.isCommentIdInParamsExists,
    // validator.isValidCommentModifier
  ],
  async (req, res) => {
    await deleteComment(req.params.commentId);
    res.status(200).json({
      message: "Comment deleted sucessfully"
    }).end();
  }
);


module.exports = router;