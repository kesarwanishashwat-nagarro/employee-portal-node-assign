const chai = require('chai');
const request = require("supertest");
const mongoose = require('mongoose');
const dbHandler = require('../../db-handler');
const app = require('../../../app');
const { assert, expect } = require('chai');
const authUser = request.agent(app);
const unAuthUser = request.agent(app);
const opening = require('../../../shared/db-models/openingModel');
const { addOpening } = require('../../../controllers/opening-controller');

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
            isOpen: true,

        })
}

describe("opening api", () => {

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

    it('should fail creation of an opening with unauthorised user', async () => {
        const addOpeningUrl = openingApiUrl + 'add';
        await unAuthUser
            .post(addOpeningUrl)
            .send({
                projectName: 'testProject',
                clientName: 'testClient',
                technologies: 'angular',
                role: 'testrole',
                isOpen: true,

            })
            .expect(401);
        const allOpenings = await opening.find().exec();
        expect(allOpenings.length).to.be.equal(0);
    });

    it('should fail creation of an opening due to no project name with authorised user', async () => {
        await addOpeningAuth()
            .expect(400);
        const allOpenings = await opening.find().exec();
        expect(allOpenings.length).to.be.equal(0);
    });

    it('should create an opening with authorised manager', async () => {
        await addOpeningAuth('testProject')
            .expect(200);
        const allOpenings = await opening.find().exec();
        expect(allOpenings.length).to.be.greaterThan(0);
    });

    it('should update an opening with authorised user', async () => {
        await addOpeningAuth('testProject')
            .expect(200);

        const allOpenings = await opening.find().exec();
        const openingId = allOpenings && allOpenings.length && allOpenings[0]._id;
        const updateOpeningUrl = openingApiUrl + 'update/' + openingId;
        await authUser
            .put(updateOpeningUrl)
            .send({
                projectName: 'testProject2',
                clientName: 'testClient',
                technologies: 'angular',
                role: 'testrole',
                isOpen: true,

            })
            .expect(200);
        const openingEntity = await opening.findById({ _id: openingId }).exec();
        expect(openingEntity.projectName).to.be.equal('testProject2');
    });

    it('should not allow apply for an opening with Unauthorised user', async () => {
        await addOpeningAuth('testProject')
            .expect(200);

        const allOpenings = await opening.find().exec();
        const openingId = allOpenings && allOpenings.length && allOpenings[0]._id;
        const updateOpeningUrl = openingApiUrl + 'apply/' + openingId;
        await unAuthUser
            .get(updateOpeningUrl)
            .send()
            .expect(401);
        const openingEntity = await opening.findById({ _id: openingId }).exec();
        expect(openingEntity.applications.length).to.be.equal(0);
    });

    it('should apply for an opening with authorised user', async () => {
        await addOpeningAuth('testProject')
            .expect(200);

        const allOpenings = await opening.find().exec();
        const openingId = allOpenings && allOpenings.length && allOpenings[0]._id;
        const updateOpeningUrl = openingApiUrl + 'apply/' + openingId;
        await authUser
            .get(updateOpeningUrl)
            .send()
            .expect(200);
        const openingEntity = await opening.findById({ _id: openingId }).exec();
        expect(openingEntity.applications.length).to.be.greaterThan(0);
    });
})