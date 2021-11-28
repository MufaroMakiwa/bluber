const express = require("express");
const router = express.Router();
const validator = require("./middleware");
const commentController = require("./comment-controller");


const userId1 = "gangoffour1";
const userId2 = "gangoffour2";


router.post(
  '/',
  [
    validator.isUserLoggedIn,
    validator.isMarkIdInBodyExists,
    validator.isTargetUserIdExists
  ],
  async (req, res) => {
    const { markId, content } = req.body;
    const comment = await commentController.addOne(userId1, markId, content, userId2);
    res.status(201).json(comment).end();
  }
);

router.patch(
  '/:commentId?',
  [
    validator.isUserLoggedIn,
    validator.isCommentIdInParamsExists,
    validator.isValidCommentModifier
  ],
  async (req, res) => {
    const comment = await commentController.updateOne(req.params.commentId, req.body.content);
    res.status(200).json(comment).end();
  }
);

router.delete(
  '/:commentId?',
  [
    validator.isUserLoggedIn,
    validator.isCommentIdInParamsExists,
    validator.isValidCommentModifier
  ],
  async (req, res) => {
    await commentController.deleteOne(req.params.commentId);
    res.status(200).json({
      message: "Comment deleted sucessfully"
    }).end();
  }
);


module.exports = router;