'use strict';

// Import Varables
const dotenv = require('dotenv');
dotenv.config({ path: './../config/.env' });
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const BUCKET = process.env.BUCKET;

// Import S3 Modules
const {
    S3Client, 
    GetObjectAttributesCommand
} = require('@aws-sdk/client-s3');

// Defining S3 Client
const s3client = new S3Client({ 
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    },
    region: 'us-east-1',
});

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

//Export Queries
module.exports = {
    getS3ObjectProperties
};