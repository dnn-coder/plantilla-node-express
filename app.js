//licrerias
const express = require("express")
const rateLimit = require("express-rate-limit")

//Routers
const { usersRouter } = require("./routes/users.routes")
const { postsRouter } = require("./routes/posts.routes")
const { commentRouter } = require("./routes/comments.routes")

//manejador global de errores
const { globalErrorHandler } = require("./controllers/error.controller")

//Utils
const { AppError } = require("./utils/appError.util")



const app = express()

app.use(express.json())

const limiter = rateLimit({
	max: 5,
	windowMs: 60 * 1000, //1min
	message: 'has excedido el numero de solicitudes permitidas'
})

app.use(limiter)

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

