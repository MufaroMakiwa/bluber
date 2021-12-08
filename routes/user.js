const express = require("express");
const router = express.Router();
const validator = require("./middleware");
const controller = require('./user-controller');
const { constructUserResponse, updateNotificationStatuses } = require('./utils');
  

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

      res.status(201).json({
        message: 'Your account was created successfully.', 
        user: await constructUserResponse(user)
      }).end();

    } catch (error) {
      res.status(403).json({ error }).end();
    }
});

/**
 * Update viewed demo status
 * 
 * @name PATCH /user/
 * @param {String} name - The name of the user to be updated
 * @returns {User} - the updated user
 * @throws {403} - If the user is not signed in
 */
 router.patch(
  '/',
  [
    validator.isUserLoggedIn
  ],
  async (req, res) => {
    try {
      const user = await controller.updateOne(req.session.userId, req.body);
      res.status(201).json({
        message: 'Your account was updated successfully.', 
        user: await constructUserResponse(user)
      }).end();
    } catch (error) {
      res.status(403).json({ error }).end();
    }
  }
);


/**
 * Update notification statuses
 * 
 * @name PATCH /user/notifications
 * @param {String} status - The updated status for the notifications
 * @param {String[]} ratingIds - The ids for rating notifications to update
 * @param {String[]} replyIds - The ids for reply notifications to update
 * @param {String[]} commentIds - The ids for comment notifications to update
 * @returns {String} - A success message
 * @throws {403} - If the user is not signed in
 */
router.patch(
  '/notifications',
  [
    validator.isUserLoggedIn
  ],
  async (req, res) => {
    await updateNotificationStatuses(req.body);
    res.status(200).json({ 
      message: "Notifications updated"
    }).end();
  }
);

module.exports = router;