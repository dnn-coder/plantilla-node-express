const { app } = require("./app");
const { db } = require("./utils/database.util");

//Models
const { Post } = require("./models/posts.model");
const { User } = require("./models/users.model");

db.authenticate()
    .then(() => console.log("Database authenticated"))
    .catch(err =>  console.log(err))

//Relations
User.hasMany(Post);
Post.belongsTo(User);

db.sync()
    .then(() => console.log("Database synced"))
    .catch(err => console.log(err))

app.listen(4000, () => {
    console.log("Express app running on port 4000");
})