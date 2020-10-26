const chai = require('chai');
const request = require("supertest");
const mongoose = require('mongoose');
const dbHandler = require('../../db-handler');
const app = require('../../../app');
const { assert, expect } = require('chai');

const url = '/auth/'


describe("Auth Pages", () => {
    //http://localhost:3000

    /**
     * Connect to a new in-memory database before running any tests.
     */
    before(async () => {
        process.env.NODE_ENV = 'test';
        await dbHandler.connect();
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

    it('should return register page', async () => {
        const urlreg = url + 'register'
        const res = await request(app)
            .get(urlreg)
            .send()
            .expect(200)
            .expect('Content-Type', "text/html; charset=utf-8");
    });

    it('should return login page', async () => {
        const urlreg = url + 'login'
        const res = await request(app)
            .get(urlreg)
            .send()
            .expect(200)
            .expect('Content-Type', "text/html; charset=utf-8");
    });

})