const { Post } = require("../models/posts.model");
const { User } = require("../models/users.model");
const { Comment } = require("../models/comments.model");

//Utils
const { catchAsync } = require("../utils/catchAsync.util");

const getAllComments = catchAsync( async (req, res, next) => {

    const comments = await Comment.findAll({
        attributes: ['comment'],
        include: [{ attributes: ['name', 'lastName'], model: User }, { attributes: ['title', 'content'], model: Post, 
        include: [{ attributes: ['name', 'lastName'], model: User}]
        }]
    })

    res.status(200).json({
        message: "comments list",
        comments
    })
})

const createComment = catchAsync( async (req, res, next ) => {

    const { comment, postId } = req.body

    const { sessionUser } = req

    const newComment = await Comment.create({
        userId: sessionUser.id, 
        comment, 
        postId, 
    })

    res.status(200).json({
        message: "comment created succesfully",
        newComment
    })
})

const getCommentById = catchAsync( async (req, res, next) => {

   const { comment } = req

    res.status(200).json({
        status: 'success',
        comment
    })
})

const updateComment = catchAsync( async (req, res, next ) => {

    const { comment } = req;

    const { newComment } = req.body ;

    await comment.update({ comment: newComment })

    res.status(200).json({
        message: 'comment updated succesfully',
        comment
    })
})

const deleteComment = catchAsync( async (req, res, next ) => {

    const comment = req

    await comment.update({ status: 'deleted'})

    res.status(200).json({
        message: 'user deleted',
    })
})

module.exports = { 
    getAllComments, 
    createComment,  
    getCommentById, 
    updateComment, 
    deleteComment 
}