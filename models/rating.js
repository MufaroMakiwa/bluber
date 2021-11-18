const { v4: uuidv4 } = require("uuid");
let data = [];


/**
 * @typedef Rating
 * @prop {string} ratingId - The id for the rating
 * @prop {string} userId - Id of the user making the rating
 * @prop {Date} dateAdded - The date the mark was added
 * @prop {string} markId - The id of the mark the rating is for
 # @prop {Integer} rating - The rating for the mark on a scale of 1 - 5
 */