
const commentController = require("./comment-controller");
const markController = require("./mark-controller.js");
const replyController = require("./reply-controller");


async function constructMarkResponse(mark){
    let comments = await commentController.findAllByMarkId(mark._id);
    comments = await Promise.all(comments.map(async(comment)=>await constructCommentResponse(comment)));
    comments =  sortResponsesByKey(comments);
    mark.comments = comments;
    return mark;
}

async function constructCommentResponse(comment){
    let replies =  await replyController.findAllByCommentId(comment._id)
    replies = sortResponsesByKey(replies);
    return {...comment._doc, replies:replies}
}


function constructUserResponse(user){


}

function sortResponsesByKey(responses,key="dateAdded"){
    let sorted = responses.sort((mark1,mark2)=>(mark2[key] - mark1[key]));
    return sorted
}


async function deleteMark(markId){
    
    let comments = await commentController.findAllByMarkId(markId)
    await Promise.all(comments.forEach(async(comment)=> await replyController.deleteMany(comment._id)))
    await commentController.deleteMany(markId);
    await markController.deleteOne(markId)
}

async function deleteComment(commentId){
    await commentController.deleteOne(commentId);
    await replyController.deleteMany(commentId)
}




module.exports = Object.freeze({
    constructMarkResponse,
    constructCommentResponse,
    constructUserResponse,
    sortResponsesByKey,
    deleteMark,
    deleteComment
});