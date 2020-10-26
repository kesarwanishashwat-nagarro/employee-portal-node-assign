const chai = require('chai');
const request = require("supertest");
const mongoose = require('mongoose');
const dbHandler = require('../../db-handler');
const app = require('../../../app');
const { assert } = require('chai');

const url = '/api/auth/'
const registerUser = (userDetails) => {
    const urlreg = url + 'register';
    console.log(urlreg);
    return request(app).post(urlreg).send(userDetails)
}

describe("auth api", () => {
    //http://localhost:3000

    /**
     * Connect to a new in-memory database before running any tests.
     */
    before(async () => {
        process.env.NODE_ENV = 'test';
        await dbHandler.connect();
        console.log('before all');
    });

    beforeEach(async () => {
        const collections = await mongoose.connection.db.collections();

        for (let col of collections) {
            await col.deleteMany({});
        }
    });

    /**
     * Clear all test data after every test.
     */
    afterEach(async () => await dbHandler.clearDatabase());

    /**
     * Remove and close the db and server.
     */
    after(async () => await dbHandler.closeDatabase());

    it('should fail registering a user as passwords do not match', async () => {
        await registerUser({
            email: 'test@test.com',
            password: 'test',
            confirmpass: '',
            name: 'test',
            role: 'Manager'
        })
            .expect(400);
    })

    it('should fail registering a user as invalid email', async () => {
        await registerUser({
            email: 'test@',
            password: 'test',
            confirmpass: 'test',
            name: 'test',
            role: 'Manager'
        })
            .expect(400);
    })

    it('should register a user succesfully', async () => {
        await registerUser({
            email: 'test@test.com',
            password: 'test',
            confirmpass: 'test',
            name: 'test',
            role: 'Manager'
        })
            .expect(200);
    })

    it('should login a user succesfully', async () => {
        await registerUser({
            email: 'test@test.com',
            password: 'test',
            confirmpass: 'test',
            name: 'test',
            role: 'Manager'
        });
        const urllogin = url + 'login';
        const response = await request(app).post(urllogin).send({
            email: 'test@test.com',
            password: 'test',
        })
            .expect(200);
        assert.isDefined(response.body.data.token)

    })
})