const express = require("express");

//Constrollers
const { 
    getAllUsers, 
    createUser, 
    getUserById, 
    updateUser, 
    deleteUser 
} = require("../controllers/users.controller");

//Middlewares
const { createUserValidator } = require("../middlewares/validators.middleware");

const usersRouter = express.Router()

usersRouter.get("/", getAllUsers)
 
usersRouter.post( "/", createUserValidator, createUser )

usersRouter.get( "/:id", getUserById)

usersRouter.patch( "/:id", updateUser)

usersRouter.delete( "/:id", deleteUser)

module.exports = { usersRouter }

