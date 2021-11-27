const Reply = require("../models/reply");
const { v4: uuidv4 } = require("uuid");

async function findOne(replyId){
    try{
    const reply = await Reply.find({reply_id: replyId});
    return reply;
    } catch(err){
    return false;
    }
  }
  
async function addOne(userId, markId, content, targetUserId){
    const date = new Date();
    const replyId = uuidv4();
    
    const reply = new Reply({reply_id: replyId, user_id: userId, mark_id: markId, date_added: date, date_modified: date, comment_id: commentId, content: content, target_user_id: targetUserId});
    try {
        await reply.save();
        return reply;
    } catch(err) {
        return false;
    }
  }

async function findAllByUserId(userId){
    try{
      const reply = await Reply.find({user_id: userId});
      return reply;
    } catch(err){
      return false;
    }
  }

async function findAllByCommentId(commentId){
    try{
        const reply = await Reply.find({comment_id: commentId});
        return reply;
    } catch(err){
        return false;
    }
}

async function findAllByTargetUserId(targetUserId){
    try{
        const reply = await Reply.find({target_user_id: targetUserId});
        return reply;
    } catch(err){
        return false;
    }
}

async function updateOne(replyId, content){
    try{
        const reply = await Reply.find({reply_id: replyId});
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
      const reply = await Reply.remove({reply_id: replyId});
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