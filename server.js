const { app } = require("./app");
const { db } = require("./utils/database.util");

//Models
const { Post } = require("./models/posts.model");
const { User } = require("./models/users.model");
const { Comment } = require("./models/comments.model");

db.authenticate()
    .then(() => console.log("Database authenticated"))
    .catch(err =>  console.log(err))

//Relations

User.hasMany(Post, {foreignKey: 'userId'});
Post.belongsTo(User);

// 1 USER <--> M COMMENTS
User.hasMany(Comment, {foreignKey: 'userId'});
Comment.belongsTo(User);

// 1 POST <--> M COMMENTS
Post.hasMany(Comment, {foreignKey: 'postId'});
Comment.belongsTo(Post);


db.sync()
    .then(() => console.log("Database synced"))
    .catch(err => console.log(err))


const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log("Express app running on port 4000");
})