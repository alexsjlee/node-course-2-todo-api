var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://root:hello123@ds034807.mlab.com:34807/node-todo-api' || 'mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose
}