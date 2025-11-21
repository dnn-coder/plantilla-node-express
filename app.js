//librerias
const express = require("express")
const rateLimit = require("express-rate-limit")
const helmet = require('helmet')
const compression = require("compression")
const morgan = require("morgan")

//Routers
const { viewsRouter } = require("./routes/views.routes")
const { usersRouter } = require("./routes/users.routes")
const { postsRouter } = require("./routes/posts.routes")
const { commentRouter } = require("./routes/comments.routes")

//manejador global de errores
const { globalErrorHandler } = require("./controllers/error.controller")

//Utils
const { AppError } = require("./utils/appError.util")

const app = express()

app.use(express.json())


//limitar solicitudes desde el servidor al cliente
const limiter = rateLimit({
	max: 5,
	windowMs: 60 * 1000, //1min
	message: 'has excedido el numero de solicitudes permitidas'
})

app.use(limiter)

//add security headers
app.use(helmet())

//compress responses
app.use(compression())

//Mostar estados de las peticiones que se hacen en el servidor desdee la consola
if ( process.env.NODE_ENV === 'development') app.use(morgan('dev'))
else app.use(morgan('combined'))

//Routers
app.use('/', viewsRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/posts', postsRouter)
app.use('/api/v1/comments', commentRouter)

// Handle incoming unknown routes to the server
app.use((req, res, next) => {
	next(
		new AppError(
			`${req.method} ${req.originalUrl} not found in this server`,
			404
		)
	);
});

app.use( globalErrorHandler);


module.exports = { app }

