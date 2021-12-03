const Rating = require("../models/rating");

async function findOne(userId, markId){
    try{
      const rating = await Rating.findOne({markId: markId, userId: userId});
      return rating;
    } catch(err){
      return false;
    }
  }
  
async function addOne(userId, markId, ratingContent, targetUserId){
    const date = new Date();
    
    const rating = new Rating({userId: userId, markId: markId, dateAdded: date, rating: ratingContent, targetUserId: targetUserId, notificationStatus: "NEW"});
    try {
        await rating.save();
        return rating;
    } catch(err) {
        return false;
    }
  }

async function findAllByUserId(userId){
    try{
      const rating = await Rating.find({userId: userId});
      return rating;
    } catch(err){
      return false;
    }
  }

async function findAllByMarkId(markId){
    try{
        const rating = await Rating.find({markId: markId});
        return rating;
    } catch(err){
        return false;
    }
}

async function findAllByTargetUserId(targetUserId){
    try{
        const rating = await Rating.find({targetUserId: targetUserId});
        return rating;
    } catch(err){
        return false;
    }
}

// TODO
async function updateOne(userId, markId, ratingContent){
    try{
        const rating = await Rating.find({markId: markId, userId: userId});
        rating.rating = ratingContent;
        rating.dateModified = new Date();
        rating.save();
        return rating;
    } catch(err){
        return false;
    }
}

async function deleteOne(userId, markId){
    try{
      const rating = await Rating.deleteOne({markId: markId, userId: userId});
      return rating;
    } catch(err){
      return false;
    }
}

/**
 * 
 * @param {*} markId 
 */
async function deleteMany(markId){
  try{
    const rating = await Rating.deleteMany({markId: markId});
    return rating;
  } catch(err){
    return false;
  }
}

module.exports = Object.freeze({
    findOne,
    addOne,
    findAllByUserId,
    findAllByMarkId,
    findAllByTargetUserId,
    updateOne,
    deleteOne,
    deleteMany,
  });