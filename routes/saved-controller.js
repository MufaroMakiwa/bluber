const Saved = require("../models/saved");
const { v4: uuidv4 } = require("uuid");

async function findOne(savedId){
    try{
    const saved = await Saved.find({savedId: savedId});
    return saved;
    } catch(err){
    return false;
    }
  }
  
async function addOne(userId, start, end, name){
    const date = new Date();
    const savedId = uuidv4();
    
    const saved = new Saved({savedId: savedId, userId: userId, start: start, dateAdded: date, dateModified: date, end: end, name: name});
    try {
        await saved.save();
        return saved;
    } catch(err) {
        return false;
    }
  }

async function findAllByUserId(userId){
    try{
      const saved = await Saved.find({userId: userId});
      return saved;
    } catch(err){
      return false;
    }
  }

async function updateOne(savedId, body){
    try{
        const saved = await Saved.find({savedId: savedId});
        body.name && (saved.name = body.name);
        body.start && (saved.start = body.start);
        body.end && (saved.end = body.end);
        saved.dateModified = new Date();
        return saved;
    } catch(err){
        return false;
    }
}

async function deleteOne(savedId){
    try{
      const saved = await Saved.remove({savedId: savedId});
      return saved;
    } catch(err){
      return false;
    }
  }

module.exports = Object.freeze({
    findOne,
    addOne,
    findAllByUserId,
    updateOne,
    deleteOne
  });