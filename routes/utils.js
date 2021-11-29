const commentController = require("./comment-controller");
const markController = require("./mark-controller.js");
const replyController = require("./reply-controller");


async function constructMarkResponse(mark){
    let comments = await commentController.findAllByMarkId(mark._id);
    // console.log("these re my",comments)
    comments = await Promise.all(comments.map(async(comment)=>await constructCommentResponse(comment)));

    // console.log("these re my after",comments)
    mark.comments = comments;
    // console.log(mark)
    return mark;
}

async function constructCommentResponse(comment){
    let replies =  await replyController.findAllByCommentId(comment._id)
    comment.replies = replies
    // console.log("there are my replies", comment.replies,replies)
    return comment
}

function constructUserResponse(user){

}


module.exports = Object.freeze({
    constructMarkResponse,
    constructCommentResponse,
    constructUserResponse,
  });