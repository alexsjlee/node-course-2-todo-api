const { ObjectID } = require('mongodb');
const{ mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// Valid ID
// var id = "5963c046924d38e120d78ef4";
var id = "59631335bbb87e932b8eb0a5";

// Wrong ID
// var id = "6963c046924d38e120d78ef44";

if(!ObjectID.isValid(id)) {
    console.log('ID not valid');
};

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// // Same as .find() but only returns the first doc that satisfies the query
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// // Same as .findOne but can only search by ID number
// // Don't have to make object like the previous methods, can just pass in the id string directly
// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('ID not found');
//     }
//     console.log('Todo By ID', todo);
// }).catch((e) => {
//     console.log(e)
// });

User.findById(id).then((user) => {
    if(!user) {
        return console.log('User not found');
    }
    console.log('User By ID', user);
}).catch((e) => {
    console.log(e)
});