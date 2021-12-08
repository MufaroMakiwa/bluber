const userController = require("./user-controller");
const commentController = require("./comment-controller");
const markController = require("./mark-controller");
const ratingController = require("./rating-controller");
const savedController = require("./saved-controller");
const replyController = require("./reply-controller");


// checks if the markId in params is valid
const isMarkIdInParamsExists = async (req, res, next) => {
  if (!req.params.markId) {
    res.status(400).json({
      error: {
        markId: 'You have not provided the markId.'
      },
    }).end();
    return;
  }

  const mark = await markController.findOne(req.params.markId);
  if (!mark) {
    res.status(400).json({
      error: {
        markId: `A mark with id ${req.params.markId} does not exist`
      },
    }).end();
    return;
  }
  next();
}


// checks if the markid in the body is valid
const isMarkIdInBodyExists = async (req, res, next) => {
  if (!req.body.markId) {
    res.status(400).json({
      error: {
        markId: 'You have not provided the markId.'
      },
    }).end();
    return;
  }

  const mark = await markController.findOne(req.body.markId);
  if (!mark) {
    res.status(400).json({
      error: {
        markId: `A mark with id ${req.body.markId} does not exist`
      },
    }).end();
    return;
  }
  next();
}


// checks if the user is logged in
const isUserLoggedIn = (req, res, next) => {
  if (req.session.userId === undefined) {
    res.status(403).json({
      error: {
        auth: 'You must be logged in inorder to do this operation.'
      }
    }).end();
    return;
  }
  next();
}

// checks if there an active user session
const isActiveUserSessionExists = (req, res, next) => {
  if (req.session.userId !== undefined) {
    res.status(403).json({
      error: {
        auth: 'There is already an active session.'
      }
    }).end();
    return;
  }
  next();
}


// checks if the user is allowed to rate or update a rating
const checkMarkRatingStatus = async (req, res, next, expected) => {
  const rating = await ratingController.findOne(req.session.userId, req.params.markId);
  const isRating = (rating !== null);

  // if expected is true, the user is expected to be rating, false otherwise
  if (!expected && isRating) {
    res.status(403).json({
      error: {
        rating: "You are already rating this mark"
      }
    }).end();
    return;
  }

  if (expected && !isRating) {
    res.status(403).json({
      error: {
        rating: "You have not rated this mark"
      }
    }).end();
    return;
  }
  next();
}


// checks if the user is allowed to rate (user who made the marking cannot rate)
const isMarkRatingBodyAllowed = async (req, res, next) => {
  const mark = await markController.findOne(req.body.markId);
  if (mark.userId === req.session.userId) {
    res.status(400).json({
      error: {
        rating: 'You cannot rate your own mark.'
      },
    }).end();
    return;
  }
  next();
}

// checks if the user is allowed to rate (user who made the marking cannot rate)
const isMarkRatingParamsAllowed = async (req, res, next) => {
  const mark = await markController.findOne(req.params.markId);
  if (mark.userId === req.session.userId) {
    res.status(400).json({
      error: {
        rating: 'You cannot rate your own mark.'
      },
    }).end();
    return;
  }
  next();
}


// checks if the current user is the one who made the mark
const isValidMarkModifier = async (req, res, next) => {
  const mark = await markController.findOne(req.params.markId);
  if (req.session.userId !== mark.userId) {
    res.status(403).json({
      error: "You cannot edit this mark because you are not its creator."
    }).end();
    return;
  }
  next()
}


// checks if the comment id in the params is valid
const isCommentIdInParamsExists = async (req, res, next) => {
  if (!req.params.commentId) {
    res.status(400).json({
      error: {
        commentId: 'You have not provided the commentId.'
      },
    }).end();
    return;
  }
  const comment = await commentController.findOne(req.params.commentId);
  if (!comment) {
    res.status(400).json({
      error: {
        commentId: `A comment with id ${req.params.commentId} does not exist`
      },
    }).end();
    return;
  }
  next();
}


// checks if the comment id in the body is valid
const isCommentIdInBodyExists = async (req, res, next) => {
  if (!req.body.commentId) {
    res.status(400).json({
      error: {
        commentId: 'You have not provided the commentId.'
      },
    }).end();
    return;
  }
  const comment = await commentController.findOne(req.body.commentId);
  if (!comment) {
    res.status(400).json({
      error: {
        commentId: `A comment with id ${req.body.commentId} does not exist`
      },
    }).end();
    return;
  }
  next();
}


// checks if the current user is the author of the comment 
const isValidCommentModifier = async (req, res, next) => {
  const comment = await commentController.findOne(req.params.commentId);
  if (req.session.userId !== comment.userId) {
    res.status(403).json({
      error: "You cannot modify this comment because you are not its creator."
    }).end();
    return;
  }
  next();
}


// checks if the current user is the author of the reply 
const isValidReplyModifier = async (req, res, next) => {
  const reply = await replyController.findOne(req.params.replyId);
  if (req.session.userId !== reply.userId) {
    res.status(403).json({
      error: "You cannot modify this reply because you are not its creator."
    }).end();
    return;
  }
  next();
}

// check if the reply or comment content is valid
const isValidResponseContent = (req, res, next) => {
  const content = req.body.content;
  if (!content || content.trim().length === 0) {
    res.status(400).json({
      error: {
        response: "The response is invalid"
      },
    }).end();
    return;
  }
  next()
}


// check if the reply id in the params in valid
const isReplyIdInParamsExists = async (req, res, next) => {
  if (!req.params.replyId) {
    res.status(400).json({
      error: {
        replyId: 'You have not provided the replyId.'
      },
    }).end();
    return;
  }
  const reply = await replyController.findOne(req.params.replyId);
  if (!reply) {
    res.status(400).json({
      error: {
        replyId: `A reply with id ${req.params.replyId} does not exist`
      },
    }).end();
    return;
  }
  next();
}


// checks if the saved id in params in valid
const isSavedIdInParamsExists = async (req, res, next) => {
  if (!req.params.savedId) {
    res.status(400).json({
      error: {
        savedId: 'You have not provided the savedId.'
      },
    }).end();
    return;
  }
  const saved = await savedController.findOne(req.params.savedId);
  if (!saved) {
    res.status(400).json({
      error: {
        savedId: `A saved object with id ${req.params.savedId} does not exist`
      },
    }).end();
    return;
  }
  next();
}

// checks if the user trying to modify a saved object is the creator
const isValidSavedModifier = async (req, res, next) => {
  const saved = await savedController.findOne(req.params.savedId);
  if (saved.userId !== req.session.userId) {
    res.status(403).json({
      error: "You cannot edit modify saved object because you are not its creator."
    }).end();
    return;
  }
  next();
}

// check if the name of a saved object is valid
const isSavedNameValid = (req, res, next) => {
  const name = req.body.name;
  if (!name || name.trim().length === 0) {
    res.status(400).json({
      error: {
        name: "The saved name is invalid"
      },
    }).end();
    return;
  }
  next()
}


// check if the name of a saved object is valid
const isValidMarkCaption = (req, res, next) => {
  const caption = req.body.caption;
  if (!caption || caption.trim().length === 0) {
    res.status(400).json({
      error: {
        caption: "The caption is invalid"
      },
    }).end();
    return;
  }
  next()
}

// check if the name of a saved object is valid
const isValidMarkTags = (req, res, next) => {
  const tags = req.body.tags;
  if (!tags || tags.length === 0) {
    res.status(400).json({
      error: {
        response: "You have not provided any tags"
      },
    }).end();
    return;
  }
  next()
}


// checks if the target user id is valid (rating, comment, reply)
const isTargetUserIdExists = async (req, res, next) => {
  const user = await userController.findOne(req.body.targetUserId);
  if (!user) {
    res.status(400).json({
      error: {
        userId: `A user with id ${req.body.targetUserId} does not exist`
      },
    }).end();
    return;
  }
  next();
}

// checks if the format of username is valid
const isValidUsername = (req, res, next) => {
  let username = req.body.username.trim();
  if (username.length < 4) {
    res.status(403).json({
      error: "Username must be at least 4 characters long"
    }).end();
    return;
  }
  next();
}

// checks if the target user id is valid (rating, comment, reply)
const isUsernameAvailable = async (req, res, next) => {
  let username = req.body.username.trim();
  const user = await userController.findOneByName(username);
  if (user !== undefined) {
    res.status(403).json({
      error: "Username not available. Try a different one"
    }).end();
    return;
  }
  next();
}




module.exports = Object.freeze({
  isMarkIdInParamsExists,
  isMarkIdInBodyExists,
  isUserLoggedIn,
  checkMarkRatingStatus,
  isMarkRatingBodyAllowed,
  isMarkRatingParamsAllowed,
  isValidMarkModifier,
  isCommentIdInParamsExists,
  isCommentIdInBodyExists,
  isValidCommentModifier,
  isValidReplyModifier,
  isReplyIdInParamsExists,
  isSavedIdInParamsExists,
  isValidSavedModifier,
  isTargetUserIdExists,
  isValidUsername,
  isUsernameAvailable,
  isValidResponseContent,
  isActiveUserSessionExists,
  isSavedNameValid,
  isValidMarkCaption,
  isValidMarkTags
});