const Reply = require("../models/reply");

async function findOne(replyId){
    try{
    const reply = await Reply.findOne({replyId: replyId});
    return reply;
    } catch(err){
    return false;
    }
  }
  
async function addOne(userId, commentId ,content, targetUserId, notificationStatus){
    const date = new Date();
    
    const reply = new Reply({userId: userId, dateAdded: date, commentId: commentId, content: content, targetUserId: targetUserId, notificationStatus: notificationStatus});
    try {
        await reply.save();
        return reply;
    } catch(err) {
        return false;
    }
  }

async function findAllByUserId(userId){
    try{
      const reply = await Reply.find({userId: userId});
      return reply;
    } catch(err){
      return false;
    }
  }

async function findAllByCommentId(commentId){
    try{
        const reply = await Reply.find({commentId: commentId});
        return reply;
    } catch(err){
        return false;
    }
}

async function findAllByTargetUserId(targetUserId){
    try{
        const reply = await Reply.find({targetUserId: targetUserId});
        return reply;
    } catch(err){
        return false;
    }
}

async function deleteOne(replyId){
    try{
      const reply = await Reply.deleteOne({_id: replyId});
      return reply;
    } catch(err){
      return false;
    }
}
/** 
 * 
 * @param {commentId} 
 * Deletes all replies that belong to a specific comemnt with {commentId}
*/
async function deleteMany(commentId){
  try{
    return await Reply.deleteMany({commentId: commentId});
  } catch(err){
    return false;
  }
}


module.exports = Object.freeze({
    findOne,
    addOne,
    findAllByUserId,
    findAllByCommentId,
    findAllByTargetUserId,
    deleteOne,
    deleteMany
  });