const { ObjectID } = require('mongodb');
const{ mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// .remove() works like .find(), removes all that match it's query
// But you can't pass .remove() empty. The true equivalent to .find() is .remove({})
// Todo.remove({}).then((res) => {
//     console.log(res);
// });

// .findOneAndRemove() works like .findOneAndUpdate(), it'll remove the selected item and also return the removed item
Todo.findOneAndRemove({_id: "5963fb281842d3a7f52bc465"}).then((doc) => {
    console.log(todo);
});

// .findByIdAndRemove() works just like .findOneAndRemove() except you'll target by ID
// Todo.findByIdAndRemove("5963fb281842d3a7f52bc465").then((todo) => {
//     console.log(todo);
// });