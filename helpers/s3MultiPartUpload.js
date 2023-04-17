'use strict';

// Import Varables
const dotenv = require('dotenv');
dotenv.config();
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const bucket = 'music-is-life-bucket-s3bucket-1p1cgsnuuvm73'

// Import File Systen
const fs = require('fs');

// Import S3 Modules
const {
    S3Client, 
} = require('@aws-sdk/client-s3');

const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

// Defining S3 Client
const client = new S3Client({ 
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    },
    region: 'us-east-1',
});

const multiPartUpload = async (file, path) => {
    const fileName = file
    const filePath = path
    const fileKey = fileName
    const fileStream = fs.createReadStream(filePath)

    const postObject = new PutObjectCommand({
        Body: fileStream,
        Key: fileKey,
        Bucket: bucket,
        Metadata: {
            "Content-Type": "audio/mpeg"
        }
    })
    
    try {
        const data = await client.send(postObject);
            response.status(201).send({
            status: 'Success',
            message: 'Music file uploaded',
            data: data
        }) 
    }
    catch (error) {
        response.status(500).send({
            error: error.message
        });
    }
}

module.exports = multiPartUpload;