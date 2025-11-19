const express = require("express");
const { getAllComments, 
        createComment, 
        getCommentById, 
        updateComment, 
        deleteComment 
} = require("../controllers/comment.controller");

//Middlewares
const { commentExist } = require("../middlewares/comment.middleware");

const { protectSesion } = require("../middlewares/auth.middleware")

const commentRouter = express.Router()

commentRouter.use(protectSesion)

commentRouter.route('/').get(getAllComments).post(createComment)

commentRouter.get("/:id", commentExist, getCommentById)

commentRouter.patch("/:id", updateComment)

commentRouter.delete("/:id", deleteComment)

module.exports = { commentRouter }