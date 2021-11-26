const express = require("express");
const router = express.Router();
const validator = require("./middleware");
const markController = require("./mark-controller.js");
const markModel = require("../models/mark");


const userId = "gangoffour";

// get the start and end as objects
router.get(
  '/',
  [
    // validator.isUserLoggedIn
  ],
  (req, res) => {
    const start = {
      lat: parseFloat(req.query.startLat), 
      lng: parseFloat(req.query.startLng)
    };

    const end = {
      lat: parseFloat(req.query.endLat),
      lng: parseFloat(req.query.endLng)
    }

    const response = markController.getMarksInSpannedArea(start, end);
    res.status(200).json(response).end();
  }
);


router.get(
  '/path',
  [
    // validator.isUserLoggedIn
  ],
  async(req, res) => {
    // console.log(req)
    const start = {
      lat: parseFloat(req.query.startLat), 
      lng: parseFloat(req.query.startLng)
    };
    console.log('in marks start', start)
    const end = {
      lat: parseFloat(req.query.endLat),
      lng: parseFloat(req.query.endLng)
    }
    try {
      const path = await markController.getPath(start, end);
      console.log(path, 'apth');
      res.status(200).json(path).end();
    } catch (err) {
      console.log(err, 'error in makrs')
    }
  }
);


router.post(
  '/',
  [
    // validator.isUserLoggedIn
  ],
  async (req, res) => {
    const { tags, caption, start, end, path } = req.body;
    // console.log(start,end)
    const st = {
      lat: start[0],
      lng: start[1]
    };

    const en = {
      lat: end[0],
      lng: end[1]
    }
    const mark = await markModel.addOne(userId, tags, caption, st, en, path);
    res.status(201).json(mark).end();
  }
);


router.patch(
  '/:markId?',
  [
    validator.isUserLoggedIn,
    validator.isMarkIdInParamsExists,
    validator.isValidMarkModifier
  ],
  async (req, res) => {
    const mark = await markModel.updateOne(req.params.markId, req.body);
    res.status(200).json(mark).end();
  }
);


router.delete(
  '/:markId?',
  [
    validator.isUserLoggedIn,
    validator.isMarkIdInParamsExists,
    validator.isValidMarkModifier
  ],
  async (req, res) => {
    await markModel.deleteOne(req.params.markId);
    res.status(200).json({
      message: "Mark deleted successfully"
    }).end();
  }
);


module.exports = router;