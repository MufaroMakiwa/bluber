const express = require("express");
const router = express.Router();
const validator = require("./middleware");
const markController = require("./mark-controller.js");
const { constructMarkResponse, sortResponsesByKey, deleteMark }  = require("./utils");


/**
 * Get marks in a given area
 * 
 * @name GET /mark
 * @param {string} startLat - the lat for the start point
 * @param {string} startLng - the lng for the start point
 * @param {string} endLat - the lat for the end point
 * @param {string} endLng - the lng for the end point
 * @returns {Mark[]} - An array of marks in an area
 * 
 */
router.get(
  '/',
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


/**
 * Create a mark
 * 
 * @name POST /mark
 * 
 * @param {string} caption - the caption for the mark
 * @param {array} tags - a list of tags associated with the mark
 * @param {Object} start - the start of the mark
 * @param {Object} end - the end of the mark
 * @return {Mark} - the created mark
 * @throws {403} - if user is not logged logged in
 * @throws {400} - if caption or tags are invalid
 */
router.post(
  '/',
  [
    validator.isUserLoggedIn,
    validator.isValidMarkCaption,
    validator.isValidMarkTags
  ],
  async (req, res) => {
    const { tags, caption, start, end, path, imageUrl } = req.body;
    
    const st = {
      lat: start[1],
      lng: start[0]
    };

    const en = {
      lat: end[1],
      lng: end[0]
    }
    const mark = await markController.addOne(req.session.userId, tags, caption, st, en, path, imageUrl);
    res.status(201).json({
      mark: await constructMarkResponse(mark, req.session.userId)
    }).end();
  }
);


/**
 * Delete a mark
 * 
 * @name DELETE /mark/:markId?
 * 
 * @param {string} markId - the Id of mark to delete 
 * @throws {403} - if user is not logged logged in or not the owner of the mark
 * @throws {400} - if mark with given id does not exist
 */
router.delete(
  '/:markId?',
  [
    validator.isUserLoggedIn,
    validator.isMarkIdInParamsExists,
    validator.isValidMarkModifier
  ],
  async (req, res) => {
    await deleteMark(req.params.markId);
    res.status(200).json({
      message: "Mark deleted successfully"
    }).end();
  }
);


module.exports = router;