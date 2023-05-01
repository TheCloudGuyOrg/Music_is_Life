//Import Modules
const request = require('supertest');
const assert = require('assert');
const app = require('../app.js');

//Test: Post /route/musicrepo/upload
describe('POST /route/photos/:id', () => {
	it('status_code: 201', async () => { 
		// Setup
		const excerciseUrl = '/musicrepo/upload'
        const file = 'Test.m4a'
        const path = './Music-Files/'
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

    /*
	it('Status: Success', async () => {  
		// Setup
		const excerciseUrl = '/route/photos/?name=Photo_Test&url=file://Photo_Test&citation=Daisy Rue Cox';
		const expected = 'Success';

		// Exercise
		const response = await request(app)
			.post(excerciseUrl);

		const result = response._body.status;
		const photoId = response._body.data.id;

		// Verify
		assert.equal(result, expected);

		//Teardown
		const teardownUrl = `/route/photos/${photoId}`;
 
		await request(app)
			.delete(teardownUrl);
	});  
  
	it('Validate: Database Retrieval', async () => { 
		// Setup
		const excerciseUrl = '/route/photos/?name=Photo_Test&url=file://Photo_Test&citation=Daisy Rue Cox';
		const expected = 'Photo_Test';

		// Exercise
		const response = await request(app)
			.post(excerciseUrl);

		const result = response._body.data.name;
		const photoId = response._body.data.id;

		// Verify
		assert.equal(result, expected);

		//Teardown
		const teardownUrl = `/route/photos/${photoId}`;
 
		await request(app)
			.delete(teardownUrl);
	});
    */
});

/*
//Test: GET /musicrepo/
describe('GET /route/photos', () => {
	it('status_code: 200', async () => {
		// Setup
		const excerciseUrl = '/route/photos';
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
		const excerciseUrl = '/route/photos';
		const expected = 'Success';

		// Exercise
		const response = await request(app)
			.get(excerciseUrl);

		const result = response._body.status;

		// Verify
		assert.equal(result, expected);
	});

	it('Validate: Database Retrieval', async () => {
		// Setup
		const setupUrl = '/route/photos/?name=Photo_Test&url=file://Photo_Test&citation=Daisy Rue Cox';
   
		const idResponse = await request(app)
			.post(setupUrl);

		const photoId = idResponse._body.data.id;

		const excerciseUrl = `/route/photos/${photoId}`;
		const expected = 'Photo_Test';

		// Exercise
		const response = await request(app)
			.get(excerciseUrl);

		const result = response._body.data[0].name;

		// Verify
		assert.equal(result, expected);

		//Teardown
		const teardownUrl = `/route/photos/${photoId}`;
 
		await request(app)
			.delete(teardownUrl);
	});
});

//Test: GET /musicrepo/:id PreSigned URL
describe('GET /route/photos/:id', () => {
	it('status_code: 200', async () => {
		// Setup
		const excerciseUrl = '/route/photos/1';
		const expected = 200;

		// Exercise
		const response = await request(app)
			.get(excerciseUrl);

		const result = response.status;

		// Verify
		assert.equal(result, expected);
	});

	it('Status: Sucess', async () => {  
		// Setup
		const excerciseUrl = '/route/photos/1';
		const expected = 'Success';

		// Exercise
		const response = await request(app)
			.get(excerciseUrl);

		const result = response._body.status;

		// Verify
		assert.equal(result, expected);
	});

	it('Validate: Database Retrieval', async () => {
		// Setup
		const setupUrl = '/route/photos/?name=Photo_Test&url=file://Photo_Test&citation=Daisy Rue Cox';
   
		const idResponse = await request(app)
			.post(setupUrl);

		const photoId = idResponse._body.data.id;

		const excerciseUrl = `/route/photos/${photoId}`;
		const expected = 'Photo_Test';

		// Exercise
		const response = await request(app)
			.get(excerciseUrl);

		const result = response._body.data[0].name;

		// Verify
		assert.equal(result, expected);

		//Teardown
		const teardownUrl = `/route/photos/${photoId}`;
 
		await request(app)
			.delete(teardownUrl);
	});
});



//Test: DELETE /musicrepo/:name
describe('DELETE /route/photos/:id', () => {
	it('status_code: 200', async () => { 
		// Setup
		const setupUrl = '/route/photos/?name=Photo_Test&url=file://Photo_Test&citation=Daisy Rue Cox';
    
		const idResponse = await request(app)
			.post(setupUrl);

		const photoId = idResponse._body.data.id;

		const excerciseUrl = `/route/photos/${photoId}?name=Photo_Test_2&url=file://Photo_Test_2&citation=Daisy Rue Cox`;
		const expected = 200;

		// Exercise
		const response = await request(app)
			.delete(excerciseUrl);

		const result = response.status;

		// Verify
		assert.equal(result, expected);
	});

	it('Status: Success', async () => {  
		// Setup
		const setupUrl = '/route/photos/?name=Photo_Test&url=file://Photo_Test&citation=Daisy Rue Cox';
    
		const idResponse = await request(app)
			.post(setupUrl);

		const photoId = idResponse._body.data.id;

		const excerciseUrl = `/route/photos/${photoId}?name=Photo_Test_2&url=file://Photo_Test_2&citation=Daisy Rue Cox`;
		const expected = 'Success';

		// Exercise
		const response = await request(app)
			.delete(excerciseUrl);

		const result = response._body.status;

		// Verify
		assert.equal(result, expected);
	});

	it('Validate: Database Retrieval', async () => {
        
		// Setup
		const setupUrl = '/route/photos/?name=Photo_Test&url=file://Photo_Test&citation=Daisy Rue Cox';
    
		const idResponse = await request(app)
			.post(setupUrl);

		const photoId = idResponse._body.data.id;

		const excerciseUrl = `/route/photos/${photoId}?name=Photo_Test_2&url=file://Photo_Test_2&citation=Daisy Rue Cox`;
		const expected = '1';

		// Exercise
		const response = await request(app)
			.delete(excerciseUrl);

		const result = response._body.data;

		// Verify
		assert.equal(result, expected);
	});
});
*/