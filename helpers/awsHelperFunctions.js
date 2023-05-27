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
    GetObjectCommand,
    GetObjectAttributesCommand,
    DeleteObjectCommand
} = require('@aws-sdk/client-s3');

const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');


// --------
// Varables
// --------

// Import ENV Varables
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const BUCKET = process.env.BUCKET;


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

// Get S3 Object Attributes
const getS3ObjectAttributes = async (bucket, key) => {

    const getS3Attributes = await new GetObjectAttributesCommand({
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
        if(!bucket || !key) {
            return 'The bucket or key does not exist';
        }
        else {
            const s3AttributeData = await s3client.send(getS3Attributes);
            return s3AttributeData;
        }

    }
    catch (error) {
        return error;
    }
};

//Get S3 Music Signed URL 
const getS3ObjectSignedUrl = async (bucket, key) => {
    const getObject = await new GetObjectCommand({
        Bucket: bucket, 
        Key: key,
    });

    try {
        if (!getObject) {
            return 'The request is invalid';
        }
        else {
            const url = await getSignedUrl(
                s3client, 
                getObject, { 
                    expiresIn: 60 * 60 * 6 //seconds * minutes * hours
                });
            return url;
        }

    } 
    catch (error) {
        return error;
    }
}; 

//Delete S3 Music
const deleteS3Music = async (name) => {
    const deleteObject = new DeleteObjectCommand({
        Bucket: BUCKET, 
        Key: name,
    });

    try {
        if (!deleteObject) {
            return 'The request is invalid';
        }
        else {
            const data = await s3client.send(deleteObject);
            return data;
        }
    } 
    catch (error) {
        return error;
    }
}; 


// ------------
// Export API's
// ------------

//Export Queries
module.exports = {
    getS3ObjectAttributes,
    getS3ObjectSignedUrl,
    deleteS3Music
};