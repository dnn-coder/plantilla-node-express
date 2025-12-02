const { Comment } = require("../models/comments.model");
const { Post } = require("../models/posts.model");
const { User } = require("../models/users.model");

//Libraries
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config({path: './config.env', quiet: true})

//Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");
const { Email } = require("../utils/email.util");

const getAllUsers = catchAsync( async (req, res, next) => {

    

    const users = await User.findAll({ 
        attributes:  ['id', 'name','lastName', 'email', 'password'],
        include: [
            { attributes: ['title', 'content'], model: Post, include: { 
            attributes: ['comment'] , model: Comment, include: { 
            attributes: ['name', 'lastName'], model: User
        }}}, 
        ]
    })

    res.status(200).json({
        message: "users list",
        users
    })
})

const createUser = catchAsync( async (req, res, next ) => {

    const { name, lastName, age, email, password } = req.body

    const salt = await bcrypt.genSalt(12)
    const hasPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({
        name, 
        lastName, 
        age, 
        email,
        password: hasPassword
    })

    newUser.password = undefined

    //enviar correo de bienvenida

    await new Email(email).sendWelcomeEmail(name)

    res.status(200).json({
        message: "user created succesfully",
        newUser
    })
})

const getUserById = catchAsync( async (req, res, next) => {

    const { user } = req

    res.status(200).json({
        message: 'success',
        user
    })
})

const getUserSession = catchAsync( async( req, res, next ) => {
    const { sessionUser  } = req   

    res.status(200).json({
        message: 'success',
        sessionUser
    })
})

const updateUser = catchAsync( async (req, res, next ) => {

    const { user } = req

    const { name, lastName, age, email, password,  status} = req.body;

 
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

    const user = req

    await user.update({ status: 'deleted'})

    res.status(200).json({
        message: 'user deleted',
    })
})

const login = catchAsync( async( req, res, next ) => {

    const { password, email } = req.body

    const user = await User.findOne({ where: { email, status: 'active' }})

    if(!user){
        return next(new AppError('credentials invalid', 400))
    }

    const isValidPassword = await bcrypt.compare( password, user.password)

    if( !isValidPassword ) {
        return next( new AppError('credentials invalid', 400))
    }

    //  desde node generamos nuestra firma seguna con el comando 
    // require('crypto').randomBytes(64).toString('hex')

    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, { 
        expiresIn: '30d'
    })

    res.status(200).json({
        status: 'success',
        token
    })

})

module.exports = { 
    getAllUsers, 
    createUser,  
    getUserById, 
    updateUser, 
    deleteUser,
    login, 
    getUserSession
}