const { v4: uuidv4 } = require("uuid");
let data = [];


/**
 * @typedef Saved
 * @prop {string} savedId - The id for the saved object
 * @prop {string} userId - Id of the user who saved the object
 * @prop {Date} dateAdded - The date the saved object was added
 * @prop {Date} dateModified - The date the saved object was modified
 * @prop {Object} start - The start (lat, lng) for the mark
 * @prop {Object} end - The end (lat, lng) for the mark
 * @prop {string} name - The name associated with the saved object
 */

class Saved {
  /**
   * 
   * @param {string} userId - The id of user saving a marking
   * @param {Object} start - The start (lat, lng) of the marking
   * @param {Object} end - The end (lat, lng) of the marking (undefined if not exists)
   * @param {string} name - The name of the saved place
   * @returns {Saved} - The newly created saved object
   */
  static addOne(userId, start, end, name) {
    const date = new Date();
    const savedId = uuidv4();
    const saved = { savedId, userId, dateAdded: date, dateModified: date, start, end, name };
    data.push(saved);
    return saved;
  }

  /**
   * Find saved object with given id
   * 
   * @param {string} savedId - The id of a saved object
   * @returns {Saved | undefined} - The saved object if it exists
   */
  static findOne(savedId) {
    return data.filter(saved => saved.savedId === savedId)[0];
  }

  /**
   * Get users saved markings
   * 
   * @param {string} userId - The id user
   * @returns {Saved[]} - An array of the users saved objects
   */
  static findAllByUserId(userId) {
    return data.filter(saved => saved.userId === userId);
  }

  /**
   * Updates a saved mark
   * 
   * @param {string} savedId - The id of the saved object
   * @param {Object} body - An object with the updates
   * @returns {Saved} - The updated saved object
   */
  static updateOne(savedId, body) {
    const saved = Saved.findOne(savedId);
    body.name && (saved.name = body.name);
    body.start && (saved.start = body.start);
    body.end && (saved.end = body.end);
    saved.dateModified = new Date();
    return saved;
  }

  /**
   * Delete a saved marking 
   * 
   * @param {string} savedId - The id of the saved object
   */
  static deleteOne(savedId) {
    data = data.filter(saved => saved.savedId !== savedId);
  }
}

module.exports = Saved;