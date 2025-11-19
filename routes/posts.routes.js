const express = require("express");
const { getAllPosts, 
        createPost, 
        getPostById, 
        updatePost, 
        deletePost, 
        getPostByStatus
} = require("../controllers/posts.controller");

//Middlewares
const { postExist } = require("../middlewares/post.middleware");
const { protectSesion } = require("../middlewares/auth.middleware");


const postsRouter = express.Router()

postsRouter.use(protectSesion)

postsRouter.route('/').get(getAllPosts).post(createPost)

postsRouter
    .use('/:id', postExist)
    .route('/:id')
    .get(getPostById)
    .patch(updatePost)
    .delete(deletePost)


module.exports = { postsRouter }