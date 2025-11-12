const { Post } = require("../models/posts.model");
const { catchAsync } = require("../utils/catchAsync.util");


const getAllPosts = catchAsync( async (req, res, next) => {

    const posts = await Post.findAll();
    res.status(200).json({
        message: "post list",
        posts   
    })
})

const createPost = catchAsync( async (req, res, next) => {

    const {title, content, userId} = req.body

    const newPost = await Post.create({
        title,
        content,
        userId
    })

    res.status(200).json({
        message: "Post created succesfully",
        newPost
    })
})

const getPostById = catchAsync( async (req, res, next) => {

        const { id } = req.params
        const post = await Post.findOne({ where: { id }})

        if (!post) {
            return res.status(404).json({
                message: 'This post doesnt exist'
            })
        }

        res.status(200).json({
            message: 'post by id',
            post
        }) 
})

const updatePost = catchAsync( async (req, res, next) => {
    const { id } = req.params
    const { title, content } = req.body

    const post = await Post.findOne({ where: { id }})

    if (!post) {
        return res.status(404).json({
            message: 'this post doesnt exist'
        })
    }

    await post.update({
        title, content
    })

    res.status(200).json({
        message: 'post updated',
        post
    })
})

const deletePost = catchAsync( async (req, res, next) => {
    const { id } = req.params;
    const post = await Post.findOne({ where: { id }})

    if( !post ) {
        return res.status(404).json({
            message: 'this post doesnt exist'
        })
    }

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