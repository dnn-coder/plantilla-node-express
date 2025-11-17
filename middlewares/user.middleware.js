//Models
const { User } = require("../models/users.model");
//Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");


const userExist = catchAsync(async(req, res, next) => {
    const { id } = req.params

    const user = await User.findOne({ where: { id }})

    if (!user) {
        return next(new AppError('this user doesnt exist in this database', 404))
    }

    req.user = user
    next()

})

module.exports = { userExist }