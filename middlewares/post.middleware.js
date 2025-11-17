//Models
const { Post } = require("../models/posts.model");

//Middlewares
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const postExist = catchAsync(async(req, res, next) => {

    const { id } = req.params

    const post = await Post.findOne({ where: { id }})

    if(!post) {
        return next(new AppError('this post doesnt exist', 404))
    }

    req.post = post

    next()
})

module.exports  = { postExist }