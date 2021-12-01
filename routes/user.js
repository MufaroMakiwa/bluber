const express = require("express");
const router = express.Router();
const validator = require("./middleware");
const controller = require('./user-controller');
const { constructUserResponse } = require('./utils');
  

/**
 * Get the current session user details if one exists
 * 
 * @name GET /user/session
 * @returns {User | null} - The current session user if one exists
 */
router.get('/session', async (req, res) => {
  if (req.session.userId) {
    const user = await controller.findOne(req.session.userId);
    res.status(200).send({
      user: await constructUserResponse(user),
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
 * @param {string} name - name of user 
 * @param {string} email - email of user
 * @param {string} imageUrl - imageUrl of the user
 * @return {User} - the created user
 * @throws {403} - if user is already logged in
 * @throws {400} - if username is already taken and when password or username
 *                 is not in correct format
 */
router.post(
  '/', 
  [
    validator.isActiveUserSessionExists
  ],
  async (req, res) => {
    try {
      const existingUser = await controller.findOneByEmail(req.body.email);

      if (existingUser) {
        req.session.userId = existingUser._id;

        res.status(201).json({
          message: 'You have successfully logged in', 
          user: await constructUserResponse(existingUser)
        }).end();
        return;
      }
      
      const user = await controller.addOne(req.body.name, req.body.email, req.body.imageUrl);
      req.session.userId = user._id;
      console.log(req.session.userId);

      res.status(201).json({
        message: 'Your account was created successfully.', 
        user: await constructUserResponse(user)
      }).end();

    } catch (error) {
      res.status(503).json({ error }).end();
    }
});

module.exports = router;