const express = require("express");
const router = express.Router();
// const validator = require("./middleware");
const markController = require("./mark-controller.js");
const { constructMarkResponse, sortResponsesByKey, deleteMark }  = require("./utils");


// get the start and end as objects
router.get(
  '/',
  [
    // validator.isUserLoggedIn
  ],
  async (req, res) => {
    const start = {
      lat: parseFloat(req.query.startLat), 
      lng: parseFloat(req.query.startLng)
    };

    const end = {
      lat: parseFloat(req.query.endLat),
      lng: parseFloat(req.query.endLng)
    }
    let response = await markController.getMarksInSpannedArea(start, end);
    response.marksInSpannedArea = await Promise.all(response.marksInSpannedArea.map(async (mark) => await constructMarkResponse(mark, req.session.userId)))
    response.marksInSpannedArea = sortResponsesByKey(response.marksInSpannedArea)
    res.status(200).json(response).end();
  }
);


router.post(
  '/',
  [
    // validator.isUserLoggedIn
  ],
  async (req, res) => {
    const { tags, caption, start, end, path } = req.body;
    
    const st = {
      lat: start[0],
      lng: start[1]
    };

    const en = {
      lat: end[0],
      lng: end[1]
    }
    const mark = await markController.addOne(req.session.userId, tags, caption, st, en, path);
    res.status(201).json({
      mark: await constructMarkResponse(mark, req.session.userId)
    }).end();
  }
);


router.delete(
  '/:markId?',
  [
    // validator.isUserLoggedIn,
    // validator.isMarkIdInParamsExists,
    // validator.isValidMarkModifier
  ],
  async (req, res) => {
    await deleteMark(req.params.markId);
    res.status(200).json({
      message: "Mark deleted successfully"
    }).end();
  }
);


module.exports = router;