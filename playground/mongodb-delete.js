const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server')

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat dinner'}).then((res) => {
    //     console.log(res);
    // }, (err) => {
    //     console.log('Unable to delete items', err);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat dinner'}).then((res) => {
    //     console.log(res);
    // }, (err) => {
    //     console.log('Unable to delete todo', err);
    // });

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((res) => {
    //     console.log(res);
    // }, (err) => {
    //     console.log('Unable to delete todo', err);
    // });

    // db.collection('Users').deleteMany({name: 'Alex'}).then((res) => {
    //     console.log(res);
    // }, (err) => {
    //     console.log('Unable to delete users', err);
    // });

    // db.collection('Users').deleteOne({_id: 123}).then((res) => {
    //     console.log(res);
    // }, (err) => {
    //     console.log('Unable to delete user', err);
    // });

    // db.close();
});