const { v4: uuidv4 } = require("uuid");
let data = [];


/**
 * @typedef Saved
 * @prop {string} savedId - The id for the saved object
 * @prop {string} userId - Id of the user who saved the object
 * @prop {Date} dateAdded - The date the mark was added
 * @prop {Integer} start - The start node for the mark
 * @prop {Integer} end - The end node for the mark
 * @prop {string} name - The name associated with the saved object
 */