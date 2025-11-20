const dotenv = require('dotenv');
const { AppError } = require('../utils/appError.util');

dotenv.config({ path: './config.env', quiet: true})

const sendErrorDev = (err, req, res ) => {
	const statusCode = err.statusCode || 500;

	res.status(statusCode).json({
		status: 'fail',
		message: err.message,
		error: err,
		stack: err.stack,
	});
}

const sendErrorProd = (err, req, res) => {
	const statusCode = err.statusCode || 500;

	res.status(statusCode).json({
		status: 'fail',
		message: err.message || 'algo salio mal!',
	});

}

const handleUniqueEmailError = () => {
	return new AppError('El correo ingresado ya esta siendo usado por alguien mas', 400)
}

const handleExpiredError = () => {
	return new AppError('Tu sesion ha expirado, inicia nuevamente', 401)
}

const handleJWTError = () => {
	return new AppError('La sesion ha sido corrompida, inicia nuevamente', 401)
}

const globalErrorHandler = (err, req, res, next) => {
	if(process.env.NODE_ENV === 'development') {
		sendErrorDev(err, req, res)
	} else if (process.env.NODE_ENV === 'production') {

		let error = { ...err }

		error.message = err.message

		if(err.name === 'SequelizeUniqueConstraintError') {
			error = handleUniqueEmailError()
		} 

		if(err.name === 'TokenExpiredError') {
			error = handleExpiredError()
		} 

		if(err.name === 'JsonWebTokenError') {
			error = handleJWTError()
		} 

		sendErrorProd(error, req, res)
	}

};

module.exports = { globalErrorHandler };