'use strict';

// --------------
// Module Imports
// --------------

// Import ENV Modules
const dotenv = require('dotenv');
dotenv.config({ path: './../config/.env' });

//Import Mocha Test Modules
const request = require('supertest');
const assert = require('assert');

//Import Express App
const app = require('../app.js');


// --------
// Varables
// --------

// Import ENV Varables
const BUCKET = process.env.BUCKET;


// --------------
// GET /api Tests
// --------------

//Test: GET /api
describe('GET /api', () => {
    it('status_code: 200', async () => {
        // Setup
        const excerciseUrl = '/api';
        const expected = 200;

        // Exercise
        const response = await request(app)
            .get(excerciseUrl);

        const result = response.status;

        // Verify
        assert.equal(result, expected);
    });

    it('Status: Success', async () => {    
        // Setup
        const excerciseUrl = '/api';
        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .get(excerciseUrl);

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);
    });

    it('DB status_code: 200', async () => {
        // Setup
        const excerciseUrl = '/api';
        const expected = 200;

        // Exercise
        const response = await request(app)
            .get(excerciseUrl);

        const result = response._body.DDBdata.$metadata.httpStatusCode;

        // Verify
        assert.equal(result, expected);
    });

    it('S3 status_code: 200', async () => {
        // Setup
        const excerciseUrl = '/api';
        const expected = 200;

        // Exercise
        const response = await request(app)
            .get(excerciseUrl);

        const result = response._body.S3data[1].$metadata.httpStatusCode;

        // Verify
        assert.equal(result, expected);
    });
});


// ---------------------------
// GET /api Tests by File Name
// ---------------------------

describe('GET /api/:name', () => {
    it('status_code: 200', async () => {
        // Setup
        const setupUrl = '/api'; 
        const name = 'Test';
        const year = 1900;
        const file = 'Test.m4a';
        const path = './test/';

        await request(app)
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name,
                'year': year,
                'name': file,
                'path': path,
            });  
	
        const excerciseUrl = `/api/${name}`;
        const expected = '200';

        // Exercise
        const response = await request(app)
            .get(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': name
            });

        const result = response.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const S3teardownUrl = `/musicrepo/${file}`; //Fix Path
        const DDBteardownUrl = `/db/${name}`; //Fix Path
 
        await request(app)
            .delete(DDBteardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': name,
                'track': name
            });

        await request(app)
            .delete(S3teardownUrl);

    }).timeout(5000);

    it('Status: Success', async () => {
        // Setup
        const setupUrl = '/api'; 
        const name = 'Test';
        const year = 1900;
        const file = 'Test.m4a';
        const path = './test/';

        await request(app)
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name,
                'year': year,
                'name': file,
                'path': path,
            });  
	
        const excerciseUrl = `/api/${name}`;
        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .get(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': name
            });

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const S3teardownUrl = `/musicrepo/${file}`; //Fix Path
        const DDBteardownUrl = `/db/${name}`; //Fix Path
 
        await request(app)
            .delete(DDBteardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': name,
                'track': name
            });

        await request(app)
            .delete(S3teardownUrl);

    }).timeout(5000);

    it('DB status_code: 200', async () => {
        // Setup
        const setupUrl = '/api'; 
        const name = 'Test';
        const year = 1900;
        const file = 'Test.m4a';
        const path = './test/';

        await request(app)
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name,
                'year': year,
                'name': file,
                'path': path,
            });  
	
        const excerciseUrl = `/api/${name}`;
        const expected = '200';

        // Exercise
        const response = await request(app)
            .get(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': name
            });

        const result = response._body.DDBdata.$metadata.httpStatusCode;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const S3teardownUrl = `/musicrepo/${file}`; //Fix Path
        const DDBteardownUrl = `/db/${name}`; //Fix Path
 
        await request(app)
            .delete(DDBteardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': name,
                'track': name
            });

        await request(app)
            .delete(S3teardownUrl);

    }).timeout(5000);

    it('S3 status_code: 200', async () => {
        // Setup
        const setupUrl = '/api'; 
        const name = 'Test';
        const year = 1900;
        const file = 'Test.m4a';
        const path = './test/';

        await request(app)
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name,
                'year': year,
                'name': file,
                'path': path,
            }); 
	
        const excerciseUrl = `/api/${name}`;
        const expected = '200';

        // Exercise
        const response = await request(app)
            .get(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': name
            });

        const result = response._body.S3data[1].$metadata.httpStatusCode;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const S3teardownUrl = `/musicrepo/${file}`; //Fix Path
        const DDBteardownUrl = `/db/${name}`; //Fix Path
 
        await request(app)
            .delete(DDBteardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': name,
                'track': name
            });

        await request(app)
            .delete(S3teardownUrl);

    }).timeout(5000);
});


// --------------------------
// GET S3 Presigned URL Tests
// --------------------------

describe('GET /api/url/:name', () => {
    it('status_code: 200', async () => {
        // Setup
        const setupUrl = '/api'; 
        const name = 'Test';
        const year = 1900;
        const file = 'Test.m4a';
        const path = './test/';

        await request(app)
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name,
                'year': year,
                'name': file,
                'path': path,
            }); 
	
        const excerciseUrl = `/api/url/${name}`;
        const expected = '200';

        // Exercise
        const response = await request(app)
            .get(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': name
            });

        const result = response.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const S3teardownUrl = `/musicrepo/${file}`; //Fix Path
        const DDBteardownUrl = `/db/${name}`; //Fix Path
 
        await request(app)
            .delete(DDBteardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': name,
                'track': name
            });

        await request(app)
            .delete(S3teardownUrl);

    }).timeout(5000);

    it('Status: Success', async () => {
        // Setup
        const setupUrl = '/api'; 
        const name = 'Test';
        const year = 1900;
        const file = 'Test.m4a';
        const path = './test/';

        await request(app)
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name,
                'year': year,
                'name': file,
                'path': path,
            }); 
	
        const excerciseUrl = `/api/url/${name}`;
        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .get(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': name
            });

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const S3teardownUrl = `/musicrepo/${file}`; //Fix Path
        const DDBteardownUrl = `/db/${name}`; //Fix Path
 
        await request(app)
            .delete(DDBteardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': name,
                'track': name
            });

        await request(app)
            .delete(S3teardownUrl);

    }).timeout(5000);

    it('Validate Returning PreSigned URL', async () => {
        // Setup
        const setupUrl = '/api'; 
        const name = 'Test';
        const year = 1900;
        const file = 'Test.m4a';
        const path = './test/';
        const bucket = BUCKET;

        await request(app)
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name,
                'year': year,
                'name': file,
                'path': path,
            }); 
	
        const excerciseUrl = `/api/url/${name}`;
        const expected = `${bucket}.s3.us-east-1.amazonaws.com/${file}`;
    
        // Exercise
        const response = await request(app)
            .get(excerciseUrl);

        const s3Url = response._body.S3PreSignedURL;
        const result = s3Url.split('/')[2] + '/' + file;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const S3teardownUrl = `/musicrepo/${file}`; //Fix Path
        const DDBteardownUrl = `/db/${name}`; //Fix Path
         
        await request(app)
            .delete(DDBteardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': name,
                'track': name
            });
        
        await request(app)
            .delete(S3teardownUrl);
    }).timeout(5000);
});


// ---------------
// POST /api Tests
// ---------------

describe('POST /api', () => {
    it('status_code: 200', async () => {
        // Setup
        const name = 'Test';
        const year = 1900;
        const file = 'Test.m4a';
        const path = './test/';

        const excerciseUrl = '/api';
        const expected = 200;

        // Exercise
        const response = await request(app)
            .post(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name,
                'year': year,
                'name': file,
                'path': path,
            }); 


        const result = response.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const S3teardownUrl = `/musicrepo/${file}`; //Fix Path
        const DDBteardownUrl = `/db/${name}`; //Fix Path
          
        await request(app)
            .delete(DDBteardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': name,
                'track': name
            });
         
        await request(app)
            .delete(S3teardownUrl);       
    }).timeout(5000);

    it('Status: Success', async () => {    
        // Setup
        const name = 'Test';
        const year = 1900;
        const file = 'Test.m4a';
        const path = './test/';

        const excerciseUrl = '/api';
        const expected = 'Success';

        // Exercise
        const response = await request(app)
            .post(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name,
                'year': year,
                'name': file,
                'path': path,
            }); 

        const result = response._body.status;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const S3teardownUrl = `/musicrepo/${file}`; //Fix Path
        const DDBteardownUrl = `/db/${name}`; //Fix Path
          
        await request(app)
            .delete(DDBteardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': name,
                'track': name
            });
         
        await request(app)
            .delete(S3teardownUrl);       
    }).timeout(5000);    

    it('Validate: Database Retrieval', async () => {
        // Setup
        const setupUrl = '/api'; 
        const name = 'Test';
        const year = 1900;
        const file = 'Test.m4a';
        const path = './test/';

        await request(app)
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name,
                'year': year,
                'name': file,
                'path': path,
            }); 
	
        const excerciseUrl = `/api/${name}`;
        const expected = 'Test';

        // Exercise
        const response = await request(app)
            .get(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': name
            });

        const result = response._body.DDBdata.Items[0].Artist.S;

        // Verify
        assert.equal(result, expected);

        // Teardown
        const S3teardownUrl = `/musicrepo/${file}`; //Fix Path
        const DDBteardownUrl = `/db/${name}`; //Fix Path
 
        await request(app)
            .delete(DDBteardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': name,
                'track': name
            });

        await request(app)
            .delete(S3teardownUrl);

    }).timeout(5000);

    it('Validate: Storage Retrieval', async () => {
        // Setup
        const setupUrl = '/api'; 
        const name = 'Test';
        const year = 1900;
        const file = 'Test.m4a';
        const path = './test/';

        await request(app)
            .post(setupUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'artist': name,
                'track': name,
                'year': year,
                'name': file,
                'path': path,
            }); 
	
        const excerciseUrl = `/api/${name}`;
        const expected = 'Test.m4a';

        // Exercise
        const response = await request(app)
            .get(excerciseUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': name
            });

        const result = response._body.S3data[0];

        // Verify
        assert.equal(result, expected);

        // Teardown
        const S3teardownUrl = `/musicrepo/${file}`; //Fix Path
        const DDBteardownUrl = `/db/${name}`; //Fix Path
 
        await request(app)
            .delete(DDBteardownUrl)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                'name': name,
                'track': name
            });

        await request(app)
            .delete(S3teardownUrl);

    }).timeout(5000);
});


// ------------------------------
// DELETE /api Tests by File Name
// ------------------------------

describe('DELETE /api/:name', () => {
    // it('status_code: 200', async () => {
    //     // Setup
    //     const name = '';
    //     const excerciseUrl = `/api/${name}`;
    //     const expected = 200;

    //     // Exercise
    //     const response = await request(app)
    //         .delete(excerciseUrl);

    //     const result = response.status;

    //     // Verify
    //     assert.equal(result, expected);
    // });

    // it('Status: Success', async () => {    
    //     // Setup
    //     const name = '';
    //     const excerciseUrl = `/api/${name}`;
    //     const expected = 'Success';

    //     // Exercise
    //     const response = await request(app)
    //         .delete(excerciseUrl);

    //     const result = response._body.status;

    //     // Verify
    //     assert.equal(result, expected);
    // });

    // it('Validate DB Removal', async () => {    
    //     // Setup
    //     const name = '';
    //     const excerciseUrl = `/api/${name}`;
    //     const expected = 'Success';

    //     // Exercise
    //     const response = await request(app)
    //         .delete(excerciseUrl);

    //     const result = response._body.status;

    //     // Verify
    //     assert.equal(result, expected);
    //});

    // it('Validate S3 Removal', async () => {    
    //     // Setup
    //     const name = '';
    //     const excerciseUrl = `/api/${name}`;
    //     const expected = 'Success';

    //     // Exercise
    //     const response = await request(app)
    //         .delete(excerciseUrl);

    //     const result = response._body.status;

    //     // Verify
    //     assert.equal(result, expected);
    // });
});
