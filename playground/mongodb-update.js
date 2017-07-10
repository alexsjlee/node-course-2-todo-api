const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server')

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID("5962e8051a4dde28a7848da5")
    // },{
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((res) => {
    //     console.log(res);
    // });

   db.collection('Users').findOneAndUpdate({
       _id: new ObjectID("5962dfda9fcbf811ba37322b")
   }, {
       $set: {
        name: 'Alex'
       },
       $inc: {
        age: 1
       }
   }, {
       returnOriginal: false
   }).then((res) => {
        console.log(res);
   });

    // db.close();
});