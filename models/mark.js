const { v4: uuidv4 } = require("uuid");
const Tag = require("./tags");
let data = [];


// TODO - need to add image
/**
 * @typedef Mark
 * @prop {string} markId - The id for the mark
 * @prop {string} userId - Id of the user who created the mark
 * @prop {Date} dateAdded - The date the mark was added
 * @prop {Date} dateModified - The date the mark was last modified
 * @prop {Tag[]} tags - An array of tags associated with the mark
 * @prop {string} caption - The caption associated with the mark
 * @prop {Integer} start - The start node for the mark
 * @prop {Integer} end - The end node for the mark
 */