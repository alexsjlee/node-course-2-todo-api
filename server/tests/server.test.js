const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { Todo } = require('../models/todo');

const todos = [
    {
        _id: new ObjectID(),
        text: 'First test todo'
    },
    {
        _id: new ObjectID(),
        text: 'Second test todo'
    }
];

// Testing lifecycle method 'beforeEach' lets us run some code before each test
beforeEach((done) => {
    // Just emptying the database before each test call because we are checking the todo.length to be 1
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        // Placeholder text for test todo object
        var text = 'Test todo text';

        // Calling the app through request(supertest)
        request(app)
            // Telling it what method it will be through and the route
            .post('/todos')
            // Sending over the dummy text we declared earlier on this page
            .send({ text })
            // Expecting a status of 200
            .expect(200)
            // Custom expect that checks the response's body.text to make sure something is there and also checks with the toBe to make sure that its type is text
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            // Custom end that has error handling
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                
                // Calls all of the todos
                Todo.find({text}).then((todos) => {
                    // Expecting a length of 1
                    expect(todos.length).toBe(1);
                    // Expecting that one todo[0].text is there and that its type is text
                    expect(todos[0].text).toBe(text);
                    // Finally passing in done()
                    done();
                // Catching any errors that might be thrown in this custom end
                }).catch((e) => {
                    done(e);
                });
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send()
            .expect(400)
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
        
        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    if('should return 404 for non-object IDs', (done) => {
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    });
});