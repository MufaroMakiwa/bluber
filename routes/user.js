const express = require("express");
const router = express.Router();
const validator = require("./middleware");
const controller = require('./user-controller');
const { constructUserResponse } = require('./utils');
  
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
    async (req, res) => {
      try {
        const username = req.body.username;
        const user = await controller.findOneByName(username);
        console.log("user route", user)
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
      } catch (error) {
        res.status(503).json({ error: "Could not join this session" }).end();
      }
  });
  
  /**
   * Get the current session user details if one exists
   * 
   * @name GET /user/session
   * @returns {User | undefined} - The current session user if one exists
   */
  router.get('/session', async (req, res) => {
    if (req.session.userId) {
      const user = await controller.findOne(req.session.userId);
      res.status(200).send({
        user: constructUserResponse(user),
      });
    } else {
      res.status(200).send({user: null});
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
  router.delete('/session', [ validator.isUserLoggedIn ], async (req, res) => {
    req.session.userId = undefined;
    res.status(200).json("You have been logged out successfully.").end();
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
    async (req, res) => {
      try {
        const existingUser = await controller.findOneByEmail(req.body.email);

        if (existingUser) {
          req.session.userId = existingUser._id;

          res.status(201).json({
            message: 'You have successfully logged in', 
            user: constructUserResponse(existingUser)
          }).end();
          return;
        }
        
        // TODO the body will need to be updated when adding passwords etc
        const user = await controller.addOne(req.body.name, req.body.email, req.body.imageUrl);
        req.session.userId = user._id;
        console.log(req.session.userId);

        res.status(201).json({
          message: 'Your account was created successfully.', 
          user: constructUserResponse(user)
        }).end();
      } catch (error) {
        res.status(503).json({ error }).end();
      }
  });

module.exports = router;