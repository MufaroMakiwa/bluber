const { v4: uuidv4 } = require("uuid");
let data = [];


/**
 * @typedef Comment
 * @prop {string} commentId - The id for the comment
 * @prop {string} userId - Id of the user making the comment
 * @prop {Date} dateAdded - The date the comment was added
 * @prop {Date} dateModified - The date the comment was modified
 * @prop {string} markId - The id of the mark the comment is for
 * @prop {string} content - The content of the comment
 * @prop {string} markerId - The id of the user who made the mark
 */