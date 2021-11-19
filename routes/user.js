const express = require("express");
const router = express.Router();
const validator = require("./middleware");
const userModel = require("../models/user");
const commentModel = require("../models/comment");
const markModel = require("../models/mark");
const ratingModel = require("../models/rating");
const savedModel = require("../models/saved");
const replyModel = require("../models/reply");

  
  /**
   * Sign in user.
   * 
   * @name POST /user/session
   * 
   * @return {Freets[]} - an array of freets created by author
   * @throws {403} - if user is already signed in
   * @throws {400} - if username or password is wrong or not in the 
   *                 correct format
   *
   */
  router.post(
    '/session', 
    [ 
      validator.isValidUsername, 
    ], 
    (req, res) => {
      const username = req.body.username;
      const user = userModel.filter(user => user.username === username)[0];
      if (user) {
        req.session.userId = user.userId;
        res.status(201).json({
          message: 'You have logged in successfully.',
          user: user
        }).end();
      } else {
        res.status(400).json({
          message: 'You have entered an incorrect username.'
        }).end();
      }
  });
  
  
  /**
   * Sign out a user
   * 
   * @name DELETE /user/session
   * 
   * @return {User} - an array of freets created by author
   * @throws {403} - if user is not logged in
   *
   */
  router.delete('/session', [ validator.isUserLoggedIn ], (req, res) => {
    req.session.userId = undefined;
    res.status(200).send("You have been logged out successfully.");
  });
  
  
  /**
   * Create a user account.
   * 
   * @name POST /user
   * 
   * @param {string} username - username of user 
   * @return {User} - the created user
   * @throws {403} - if user is already logged in
   * @throws {400} - if username is already taken and when password or username
   *                 is not in correct format
   */
  router.post(
    '/', 
    [
      validator.isValidUsername, 
      validator.isUsernameAvailable
    ], 
    (req, res) => {
      const user = userModel.addOne(req.body.username, "Gangoffour@mit.edu");
      req.session.userId = user.userId;
      res.status(201).json({
        message: 'Your account was created successfully.', 
        user: user
      }).end();
  });

module.exports = router;