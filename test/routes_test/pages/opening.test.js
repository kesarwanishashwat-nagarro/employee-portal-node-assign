const chai = require('chai');
const request = require("supertest");
const mongoose = require('mongoose');
const dbHandler = require('../../db-handler');
const app = require('../../../app');
const authUser = request.agent(app);
const unAuthUser = request.agent(app);
const opening = require('../../../shared/db-models/openingModel');

const url = '/opening/'

const authApiUrl = '/api/auth/';
const openingApiUrl = '/api/opening/';

const registerUser = (user, userDetails) => {
    const urlreg = authApiUrl + 'register';
    return user.post(urlreg).send(userDetails)
}

const loginUser = (credentials) => {
    const urllogin = authApiUrl + 'login';
    return authUser.post(urllogin).send(credentials)
}

const addOpeningAuth = (projectName) => {
    const addOpeningUrl = openingApiUrl + 'add';
    return authUser
        .post(addOpeningUrl)
        .send({
            projectName: projectName,
            clientName: 'testClient',
            technologies: 'angular',
            role: 'testrole',
            isOpen: true
        })
}

describe("Opening Pages", () => {
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

        await registerUser(authUser, {
            email: 'test@test.com',
            password: 'test',
            confirmpass: 'test',
            name: 'test',
            role: 'Manager'
        }).expect(200)

        await loginUser({
            email: 'test@test.com',
            password: 'test'
        }).expect(200)

        await registerUser(unAuthUser, {
            email: 'test1@test.com',
            password: 'test1',
            confirmpass: 'test1',
            name: 'test1',
            role: 'Manager'
        }).expect(200)
    });

    /**
     * Clear all test data after every test.
     */
    afterEach(async () => await dbHandler.clearDatabase());

    /**
     * Remove and close the db and server.
     */
    after(async () => await dbHandler.closeDatabase());

    it('should redirect to login if unauthenticated user tries view opening', async () => {
        await addOpeningAuth('testProject').expect(200);
        const allOpenings = await opening.find().exec();
        const openingId = allOpenings && allOpenings.length && allOpenings[0]._id;
        const urlViewOpening = url + 'view/' + openingId;
        await unAuthUser
            .get(urlViewOpening)
            .send()
            .expect(302)
            .expect('Location', '/auth/login')
    });

    it('should return view opening page with authenticated user', async () => {
        await addOpeningAuth('testProject').expect(200);
        const allOpenings = await opening.find().exec();
        const openingId = allOpenings && allOpenings.length && allOpenings[0]._id;
        const urlViewOpening = url + 'view/' + openingId;
        await authUser
            .get(urlViewOpening)
            .send()
            .expect(200)
            .expect('Content-Type', "text/html; charset=utf-8");
    });


    it('should redirect to login if unauthenticated user tries edit opening', async () => {
        await addOpeningAuth('testProject').expect(200);
        const allOpenings = await opening.find().exec();
        const openingId = allOpenings && allOpenings.length && allOpenings[0]._id;
        const urlViewOpening = url + 'update/' + openingId;
        await unAuthUser
            .get(urlViewOpening)
            .send()
            .expect(302)
            .expect('Location', '/auth/login')
    });

    it('should return edit opening page with authenticated user', async () => {
        await addOpeningAuth('testProject').expect(200);
        const allOpenings = await opening.find().exec();
        const openingId = allOpenings && allOpenings.length && allOpenings[0]._id;
        const urlViewOpening = url + 'update/' + openingId;
        await authUser
            .get(urlViewOpening)
            .send()
            .expect(200)
            .expect('Content-Type', "text/html; charset=utf-8");
    });


    it('should redirect to login if unauthenticated user tries add opening', async () => {
        await addOpeningAuth('testProject').expect(200);
        const allOpenings = await opening.find().exec();
        const openingId = allOpenings && allOpenings.length && allOpenings[0]._id;
        const urlViewOpening = url + 'add/' + openingId;
        await unAuthUser
            .get(urlViewOpening)
            .send()
            .expect(302)
            .expect('Location', '/auth/login')
    });

    it('should return add opening page with authenticated user', async () => {
        await addOpeningAuth('testProject').expect(200);
        const allOpenings = await opening.find().exec();
        const openingId = allOpenings && allOpenings.length && allOpenings[0]._id;
        const urlViewOpening = url + 'add/' + openingId;
        await authUser
            .get(urlViewOpening)
            .send()
            .expect(200)
            .expect('Content-Type', "text/html; charset=utf-8");
    });
})