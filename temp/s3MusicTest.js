//Import Modules
const request = require('supertest');
const assert = require('assert');
const app = require('../app.js');

// //Test: GET /musicrepo/:name 
// describe('GET /musicrepo/:name', () => {

//     it('Validate Returning PreSigned URL', async () => { 
//         // Setup
//         const file = 'Test.m4a';
//         const path = './test/';
//         const setupUrl = '/musicrepo/upload';
//         const excerciseUrl = `/musicrepo/${file}`;
//         const expected = 'https://music-is-life-s3bucket-mkqpsuorwz66.s3.us-east-1.amazonaws.com/Test.m4a';
//         const regex = /https:\/\/music-is-life-s3bucket-mkqpsuorwz66\.s3\.us-east-1\.amazonaws\.com\/Test\.m4a/i;

//         await request(app)
//             .post(setupUrl)
//             .set('Content-Type', 'application/x-www-form-urlencoded')
//             .send({
//                 'name': file,
//                 'path': path
//             });    

//         // Exercise
//         const response = await request(app)
//             .get(excerciseUrl);

//         const result = response._body.data;

//         // Verify
//         assert.match(result, regex, expected);

//         //Teardown
//         const teardownUrl = `/musicrepo/${file}`;
 
//         await request(app)
//             .delete(teardownUrl);
//     }).timeout(5000);
// });

//Test: Post /musicrepo/upload
describe('POST /musicrepo/upload', () => {
    it('status_code: 200', async () => { 
        // Setup
        const excerciseUrl = '/musicrepo/upload';
        const file = 'Test.m4a';
        const path = './test/';
        const expected = 200;

        // Exercise
        const response = await request(app)
            .post(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': file,
                'path': path
            });    

        const result = response.status;

        // Verify
        assert.equal(result, expected);

        //Teardown
        const teardownUrl = `/musicrepo/${file}`;
        
        await request(app)
            .delete(teardownUrl);
    }).timeout(5000);

    it('Status: OK', async () => {  
        // Setup
        const excerciseUrl = '/musicrepo/upload';
        const file = 'Test.m4a';
        const path = './test/';
        const expected = 'OK';

        // Exercise
        const response = await request(app)
            .post(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': file,
                'path': path
            });    

        const result = response.res.statusMessage;

        // Verify
        assert.equal(result, expected);

        //Teardown
        const teardownUrl = `/musicrepo/${file}`;
 
        await request(app)
            .delete(teardownUrl);
    }).timeout(5000);  
});

//Test: DELETE /musicrepo/:name
describe('DELETE /musicrepo/:name', () => {
    it('status_code: 200', async () => { 
        // Setup
        const file = 'Test.m4a';
        const path = './test/';
        const setupUrl = '/musicrepo/upload';
        const excerciseUrl = `/musicrepo/${file}`;

        await request(app)
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': file,
                'path': path
            });    

        const expected = 200;

        // Exercise
        const response = await request(app)
            .delete(excerciseUrl);

        const result = response.status;

        // Verify
        assert.equal(result, expected);
    }).timeout(5000);

    it('Status: Success', async () => {  
        // Setup
        const file = 'Test.m4a';
        const path = './test/';
        const setupUrl = '/musicrepo/upload';
        const excerciseUrl = `/musicrepo/${file}`;

        await request(app)
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': file,
                'path': path
            });    

        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .delete(excerciseUrl);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);
    }).timeout(5000);
});