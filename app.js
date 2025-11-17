const express = require("express")
const { usersRouter } = require("./routes/users.routes")
const { postsRouter } = require("./routes/posts.routes")
const { globalErrorHandler } = require("./controllers/error.controller")
const { AppError } = require("./utils/appError.util")
const { commentRouter } = require("./routes/comments.routes")

const app = express()

app.use(express.json())

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

