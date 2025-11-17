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


const postsRouter = express.Router()

postsRouter.get("/", getAllPosts)

postsRouter.post("/", createPost)

postsRouter.get("/:id", postExist, getPostById)

postsRouter.patch("/:id", postExist, updatePost)

postsRouter.delete("/:id", postExist, deletePost)

module.exports = { postsRouter }