//Libraries
const express = require("express");

//Constrollers
const { 
    getAllUsers, 
    createUser, 
    getUserById, 
    updateUser, 
    deleteUser,
    login, getUserSession
} = require("../controllers/users.controller");

//Middlewares
const { createUserValidator } = require("../middlewares/validators.middleware");
const { userExist } = require("../middlewares/user.middleware");
const { protectSesion, protectUserAccount } = require("../middlewares/auth.middleware");

const usersRouter = express.Router()

usersRouter.post( "/", createUserValidator, createUser )

usersRouter.post( "/:login", login )

usersRouter.use(protectSesion)

usersRouter.get("/", getAllUsers)

usersRouter.get("/:profile", getUserSession)

usersRouter
.use("/:id", userExist )
.route("/:id")
.get(getUserById)
.patch(protectUserAccount, updateUser)
.delete(protectUserAccount, deleteUser);


// usersRouter.use( "/:id", userExist)

// usersRouter.get( "/:id", getUserById)

// usersRouter.patch( "/:id", updateUser)

// usersRouter.delete( "/:id", deleteUser)

module.exports = { usersRouter }

