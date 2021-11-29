const Rating = require("../models/rating");
const { v4: uuidv4 } = require("uuid");

async function findOne(userId, markId){
    try{
    const rating = await Rating.find({ratingId: markId, userId: userId});
    return rating;
    } catch(err){
    return false;
    }
  }
  
async function addOne(userId, markId, ratingContent, targetUserId){
    const date = new Date();
    const ratingId = uuidv4();
    
    const rating = new Rating({ratingId: ratingId, userId: userId, markId: markId, date_added: date, dateModified: date, rating: ratingContent,targetUserId: targetUserId});
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

async function updateOne(userId, markId, ratingContent){
    try{
        const rating = await Rating.find({ratingId: markId, userId: userId});
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
      const rating = await Rating.remove({ratingId: markId, userId: userId});
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
    deleteOne
  });