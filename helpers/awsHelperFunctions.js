'use strict';

// --------------
// Module Imports
// --------------

// Import ENV Modules
const dotenv = require('dotenv');
dotenv.config({ path: './../config/.env' });

// Import S3 Modules
const {
    S3Client, 
    GetObjectAttributesCommand
} = require('@aws-sdk/client-s3');


// --------
// Varables
// --------

// Import ENV Varables
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;


// ----------
// S3 Helpers
// ----------

// Defining S3 Client
const s3client = new S3Client({ 
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    },
    region: 'us-east-1',
});

// Get S3 Object Properties
const getS3ObjectProperties = async (bucket, key) => {
    const getS3Object = new GetObjectAttributesCommand({
        Bucket: bucket,
        Key: key,
        ObjectAttributes: [ 
            'ETag',
            'Checksum',
            'StorageClass',
            'ObjectSize'
        ]
    });

    try {
        const s3ObjectData = await s3client.send(getS3Object);
        return s3ObjectData;
    }
    catch (error) {
        console.log(error);
    }
};


// ------------
// Export API's
// ------------

//Export Queries
module.exports = {
    getS3ObjectProperties
};