const express = require("express");
const router = express.Router();
const validator = require("./middleware");
const savedController = require("./saved-controller");


/**
 * Create a saved plan
 * 
 * @name POST /saved
 * 
 * @param {string} name - the name of the saved plan
 * @param {Object} start - the start of the plan
 * @param {Object} end - the end of the plan
 * @return {Saved} - the created saved plan
 * @throws {403} - if user is not logged logged in
 * @throws {400} - if saved name is invalid or already exists
 */
router.post(
  '/',
  [
    validator.isUserLoggedIn,
    validator.isSavedNameValid,
  ],
  async (req, res) => {
    const { start, end, name } = req.body;
    const saved = await savedController.addOne(req.session.userId, start, end, name);
    res.status(201).json(saved).end();
  }
);


/**
 * Delete a saved plan
 * 
 * @name DELETE /saved/:savedId?
 * 
 * @param {string} savedId - the Id of saved plan 
 * @throws {403} - if user is not logged logged in or not the owner of the saved plan
 * @throws {400} - if saved plan with given id does not exist
 */
router.delete(
  '/:savedId?',
  [
    validator.isUserLoggedIn,
    validator.isSavedIdInParamsExists,
    validator.isValidSavedModifier
  ],
  async (req, res) => {
    await savedController.deleteOne(req.params.savedId);
    res.status(200).json({
      message: "Saved place deleted successfully"
    }).end();
  }
);



module.exports = router;