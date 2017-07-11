var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(
    // 'mongodb://root:hello123@ds034807.mlab.com:34807/node-todo-api' ||
    process.env.MONGODB_URI);

module.exports = {
    mongoose
}