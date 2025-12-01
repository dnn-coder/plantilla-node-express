//libreries
const path = require('path')
//utils
const { catchAsync } = require('../utils/catchAsync.util')
//Models
const { Post } = require('../models/posts.model')


const renderIndex = catchAsync(async(req, res, next) => {

    const posts = await Post.findAll()
    // const indexPath = path.join(__dirname, '..', 'public', 'index.pug')
    // res.status(200).render(indexPath)
    res.status(200).render('index', { 
        title: 'Render with pug', 
        posts
    })
})

module.exports = { renderIndex }