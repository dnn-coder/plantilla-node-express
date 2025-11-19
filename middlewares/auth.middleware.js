//Models
const { User } = require("../models/users.model");

//Utils
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

//Libraries
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

//config env
dotenv.config({ path: 'config.env', quiet: true})

const protectSesion = catchAsync( async (req, res, next) => {
    
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return next(new AppError('token no valido', 403))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findOne({where: { id: decoded.id, status: 'active' }})

    if(!user){
       return next(new AppError('tu sesion no es valida en este momento', 403))
    }  
    
    req.sessionUser = user

    next()
})

const protectUserAccount = (req, res, next) => {
    const { sessionUser, user } = req;
    // alternativa para extraer el id
    // const { id } = req.params 

    if( sessionUser.id !== user.id) {
       return next( new AppError ('el usuario en sesion no puede realizar esta petición', 403))
    }

    next()
}

module.exports = { protectSesion, protectUserAccount }