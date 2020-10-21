const chai = require('chai');
var request = require("supertest");
const expect = chai.expect
const mongoose = require('mongoose');
const dbHandler = require('../db-handler');
const app = require('../../app');

const url = '/auth/'
const registerUser = () => {
    const urlreg = url +  'register';
    return request(app).post(urlreg).send({
        email: 'test@test.com',
        password: 'test',
        name: 'test',
        role: 'Manager'
    })
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

    it('should register a user succesfully',async  () => {
            return await registerUser()
            .expect(302)
            .expect('Location', '/auth/login')
    })

    it('should login a user succesfully', async () => {
        await registerUser();
        const urllogin = url +  'login';
        return await request(app).post(urllogin).send({
            email: 'test@test.com',
            password: 'test',
        })
        .expect(302)
        .expect('Location', '/')

    })
})