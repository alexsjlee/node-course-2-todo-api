const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Todo } = require('../models/todo');

// Testing lifecycle method 'beforeEach' lets us run some code before each test
beforeEach((done) => {
    // Just emptying the database before each test call because we are checking the todo.length to be 1
    Todo.remove({}).then(() => done());
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
                Todo.find().then((todos) => {
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
                    expect(todos.length).toBe(0);
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });
});