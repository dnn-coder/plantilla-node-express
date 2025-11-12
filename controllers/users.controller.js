const { Post } = require("../models/posts.model");
const { User } = require("../models/users.model");

//Utils
const { catchAsync } = require("../utils/catchAsync.util");

const getAllUsers = catchAsync( async (req, res, next) => {

    const users = await User.findAll({ 
        include: Post
    })

    res.status(200).json({
        message: "users list",
        users
    })
})

const createUser = catchAsync( async (req, res, next ) => {

    const { name, lastName, age, email, password } = req.body

    const newUser = await User.create({
        name, 
        lastName, 
        age, 
        email,
        password
    })

    res.status(200).json({
        message: "user created succesfully",
        newUser
    })
})

const getUserById = catchAsync( async (req, res, next) => {

    const { id } = req.params

    const user = await User.findOne({ where: { id }})

    if (!user) {
        return res.status(404).json({
            message: 'user doesnt exist in this database'
        })
    }

    res.status(200).json({
        message: `user by id number ${id}`,
        user
    })
})

const updateUser = catchAsync( async (req, res, next ) => {
  
    const {id} = req.params

    const { name, lastName, age, email, password,  status} = req.body;

    const user = await User.findOne({ where: { id }})

    if (!user) {
        return res.status(404).json({
            message: 'user doesnt exist in this database'
        })
    }

    await user.update({
        name, 
        lastName, 
        age, 
        email,
        password,
        status
    })

    res.status(200).json({
        message: 'user updated succesfully',
        user
    })
})

const deleteUser = catchAsync( async (req, res, next ) => {
    try {
    const { id } = req.params;

    const user = await User.findOne({where: { id }})

    if (!user) {
        return res.status(404).json({
            message: 'user doesnt exist in this database'
        })
    }

    await user.update({ status: 'deleted'})

    res.status(200).json({
        message: 'user deleted',
    })
    } catch (err) {
        console.log(err);        
    }
})

module.exports = { 
    getAllUsers, 
    createUser,  
    getUserById, 
    updateUser, 
    deleteUser 
}