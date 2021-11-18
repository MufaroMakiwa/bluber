const { v4: uuidv4 } = require("uuid");
let data = [];


/**
 * @typedef Reply
 * @prop {string} replyId - The id for the reply
 * @prop {string} userId - Id of the user making the reply
 * @prop {Date} dateAdded - The date the reply was added
 * @prop {Date} dateModified - The date the reply was modified
 * @prop {string} commentId - The id of the comment the reply is for
 * @prop {string} content - The content of the reply
 * @prop {string} commenterId - The id of the user who made the comment
 */