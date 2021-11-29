const Reply = require("../models/reply");
const { v4: uuidv4 } = require("uuid");

async function findOne(replyId){
    try{
    const reply = await Reply.find({replyId: replyId});
    return reply;
    } catch(err){
    return false;
    }
  }
  
async function addOne(userId, commentId ,content, targetUserId){
    const date = new Date();
    const replyId = uuidv4();
    
    const reply = new Reply({replyId: replyId, userId: userId, dateAdded: date, dateModified: date, commentId: commentId, content: content, targetUserId: targetUserId});
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

async function updateOne(replyId, content){
    try{
        const reply = await Reply.find({replyId: replyId});
        reply.content = content;
        reply.dateModified = new Date();
        reply.save();
        return reply;
    } catch(err){
        return false;
    }
}

async function deleteOne(replyId){
    try{
      const reply = await Reply.remove({replyId: replyId});
      return reply;
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
    updateOne,
    deleteOne
  });