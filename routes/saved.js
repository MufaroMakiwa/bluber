const express = require("express");
const router = express.Router();
// const validator = require("./middleware");
const savedController = require("./saved-controller");



router.post(
  '/',
  [
    // validator.isUserLoggedIn,
    // validator.isSavedNameAlreadyExists,
  ],
  async (req, res) => {
    const { start, end, name } = req.body;
    const saved = await savedController.addOne(req.session.userId, start, end, name);
    res.status(201).json(saved).end();
  }
);

router.delete(
  '/:savedId?',
  [
    // validator.isUserLoggedIn,
    // validator.isSavedIdInParamsExists,
    // validator.isValidSavedModifier
  ],
  async (req, res) => {
    await savedController.deleteOne(req.params.savedId);
    res.status(200).json({
      message: "Saved place deleted successfully"
    }).end();
  }
);



module.exports = router;