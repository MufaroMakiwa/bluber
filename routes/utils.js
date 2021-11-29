const commentController = require("./comment-controller");
const markController = require("./mark-controller.js");
const replyController = require("./reply-controller");


async function constructMarkResponse(mark){
    let comments = await commentController.findAllByMarkId(mark._id);

    comments = await Promise.all(comments.map(async(comment)=>await constructCommentResponse(comment)));

    mark.comments = comments;

    return mark;
}

async function constructCommentResponse(comment){
    let replies =  await replyController.findAllByCommentId(comment._id)
    return {...comment._doc, replies:replies}
}

function constructUserResponse(user){

}


module.exports = Object.freeze({
    constructMarkResponse,
    constructCommentResponse,
    constructUserResponse,
  });