const userModel = require("../models/user");
const commentModel = require("../models/comment");
const markModel = require("../models/mark");
const ratingModel = require("../models/rating");
const savedModel = require("../models/saved");
const replyModel = require("../models/reply");


// checks if the markId in params is valid
const isMarkIdInParamsExists = (req, res, next) => {
  next();
}

// checks if the markid in the body is valid
const isMarkIdInBodyExists = (req, res, next) => {
  next();
}

// checks if the user is logged in
const isUserLoggedIn = (req, res, next) => {
  next();
}

// checks if the user is allowed to rate or update a rating
const checkMarkRatingStatus = (req, res, next, expected) => {
  next();
}

// checks if the user is allowed to rate (user who made the marking cannot rate)
const isMarkRatingAllowed = (req, res, next) => {
  next();
}

// checks if the current user is the one who made the freet
const isValidMarkModifier = (req, res, next) => {
  next()
}

// checks if the comment id in the params is valid
const isCommentIdInParamsExists = (req, res, next) => {
  next();
}

// checks if the comment id in the body is valid
const isCommentIdInBodyExists = (req, res, next) => {
  next();
}

// checks if the current user is the author of the comment 
const isValidCommentModifier = (req, res, next) => {
  next();
}

// check if the reply id in the params in valid
const isReplyIdInParamsExists = (req, res, next) => {
  next();
}

// checks if the saved id in params in valid
const isSavedIdInParamsExists = (req, res, next) => {
  next();
}

// checks if the user trying to modify a saved object is the creator
const isValidSavedModifier = (req, res, next) => {
  next();
}

// checks if the name given to a saved object already exists (case insensitive)
const isSavedNameAlreadyExists = (req, res, next) => {
  // need to allow renaming same object with same name but different case as in Fritter
  next();
}

module.exports = Object.freeze({
  isMarkIdInParamsExists,
  isMarkIdInBodyExists,
  isUserLoggedIn,
  checkMarkRatingStatus,
  isMarkRatingAllowed,
  isValidMarkModifier,
  isCommentIdInParamsExists,
  isCommentIdInBodyExists,
  isValidCommentModifier,
  isReplyIdInParamsExists,
  isSavedIdInParamsExists,
  isValidSavedModifier,
  isSavedNameAlreadyExists
});