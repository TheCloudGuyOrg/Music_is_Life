//Import Modules
const request = require('supertest');
const assert = require('assert');
const app = require('../app.js');

//Test: GET /route/photos
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