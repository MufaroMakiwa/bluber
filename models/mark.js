const { v4: uuidv4 } = require("uuid");
let data = [];


// TODO - need to add image
/**
 * @typedef Mark
 * @prop {string} markId - The id for the mark
 * @prop {string} userId - Id of the user who created the mark
 * @prop {Date} dateAdded - The date the mark was added
 * @prop {Date} dateModified - The date the mark was last modified
 * @prop {string[]} tags - An array of tags associated with the mark
 * @prop {string} caption - The caption associated with the mark
 * @prop {Object} start - The start (lat, lng) for the mark
 * @prop {Object} end - The end (lat, lng) for the mark
 */

class Mark {
  /**
   * Add a new mark
   * 
   * @param {string} userId - The id of user adding a mark
   * @param {string[]} tags - The tags associated with the mark
   * @param {string} caption - The caption for the mark
   * @param {Object} start - the start (lat, lng) for the mark
   * @param {Object} end - The end (lat, lng) for the mark
   */
  static addOne(userId, tags, caption, start, end) {
    const date = new Date();
    const markId = uuidv4();
    const mark = { markId, userId, dateAdded: date, dateModified: date, tags, caption, start, end };
    data.push(mark);
  }

  /**
   * Get a mark with a given id
   * 
   * @param {string} markId - The id of a mark
   * @returns {Mark | undefined} - A mark with given id if the mark exists
   */
  static findOne(markId){
    return data.filter(mark => mark.markId === markId)[0];
  }

  /**
   * Get all marks made by the user
   * 
   * @param {string} userId - The id of the user
   * @returns {Mark[]} - An array of marks
   */
  static findAllByUserId(userId) {
    return data.filter(mark => mark.userId === userId);
  }

  /**
   * Update a mark
   * 
   * @param {string} markId - The id of mark to update
   * @param {Object} body - The body object with the updates
   * @returns {Mark} - The updated mark object
   */
  static updateOne(markId, body) {
    const mark = Mark.findOne(markId);
    body.caption && (mark.caption = body.caption);
    body.tags && (mark.tags = body.tags);
    body.start && (mark.start = body.start);
    body.end && (mark.end = body.end);
    mark.dateModified = new Date();
    return mark;
  }

  /**
   * Delete mark with given id
   * 
   * @param {string} markId - The id of mark to be deleted
   */
  static deleteOne(markId) {
    data = data.filter(mark => mark.markId !== markId);
  }
}

module.exports = Mark;