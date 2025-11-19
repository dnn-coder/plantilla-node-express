//Utils
const { catchAsync } = require("../utils/catchAsync.util");
//Models
const { Post } = require("../models/posts.model");
const { User } = require("../models/users.model");
const { Comment } = require("../models/comments.model");

const getAllPosts = catchAsync( async (req, res, next) => {

    const posts = await Post.findAll({
        attributes: ['title', 'content'],
        include: [{ model: User, attributes: ['name', 'lastName']}, {model: Comment, attributes: ['comment'] ,
        include: [{ model: User, attributes: ['name', 'lastName'] }]
        }]
    });

    res.status(200).json({
        message: "post list",
        posts   
    })
})

const createPost = catchAsync( async (req, res, next) => {

    const { title, content } = req.body
    const { sessionUser } = req 

    const newPost = await Post.create({
        title,
        content,
        userId: sessionUser.id
    })

    res.status(200).json({
        message: "Post created succesfully",
        newPost
    })
})

const getPostById = catchAsync( async (req, res, next) => {

        const {post} = req

        res.status(200).json({
            message: 'post by id',
            post
        }) 
})


const updatePost = catchAsync( async (req, res, next) => {

    const { post } = req;
    const { title, content } = req.body

    await post.update({
        title, content
    })

    res.status(200).json({
        message: 'post updated',
        post
    })
})

const deletePost = catchAsync( async (req, res, next) => {
    const { post } = req

    await post.update({ status: 'deleted'})

    res.status(200).json({
        message: 'post deleted',
        post
    })
})

module.exports = { 
    getAllPosts, 
    createPost, 
    getPostById, 
    updatePost, 
    deletePost
}