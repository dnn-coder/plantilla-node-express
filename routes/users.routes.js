const express = require("express");

//Constrollers
const { 
    getAllUsers, 
    createUser, 
    getUserById, 
    updateUser, 
    deleteUser,
    login
} = require("../controllers/users.controller");

//Middlewares
const { createUserValidator } = require("../middlewares/validators.middleware");
const { userExist } = require("../middlewares/user.middleware");

const usersRouter = express.Router()

usersRouter.get("/", getAllUsers)
 
usersRouter.post( "/", createUserValidator, createUser )

usersRouter.post( "/:login", login )

usersRouter.get( "/:id", userExist, getUserById)

usersRouter.patch( "/:id", userExist, updateUser)

usersRouter.delete( "/:id", userExist, deleteUser)

module.exports = { usersRouter }

