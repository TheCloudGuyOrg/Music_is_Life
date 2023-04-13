'use strict';

// Import Varables
const dotenv = require('dotenv');
dotenv.config();
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const bucket = 'music-is-life-bucket-s3bucket-1p1cgsnuuvm73'

// Import S3 Modules
const {
    S3Client, 
    ListObjectsCommand,
    GetObjectCommand,
    PutObjectCommand,
    DeleteObjectCommand,
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

//List S3 Music Objects
const listS3Music = async (request,response) => {
    const listObjects = new ListObjectsCommand({
        Bucket: bucket, 
    });

    try {
        const data = await client.send(listObjects);
        response.status(200).send({
            status: 'Success',
            message: 'Music information retrieved',
            data: data.Contents
        })
    } 
    catch (error) {
        response.status(500).send({
            error: error.message
        });
    }
};

//Get S3 Music Signed URL 
const GetS3ObjectSignedUrl = async (request,response) => {
    const name = request.params.name
    const getObject = new GetObjectCommand({
        Bucket: bucket, 
        Key: name,
    });

    try {
        const url = await getSignedUrl(
            client, 
            getObject, { 
                expiresIn: 60 * 60 * 6 //seconds * minutes * hours
            })
        response.status(200).send({
            status: 'Success',
            message: 'Music information retrieved',
            data: url
        })
    } 
    catch (error) {
        response.status(500).send({
            error: error.message
        });
    }
}; 

/*
//Put S3 Music 
const putS3Music = async (request,response) => {
    try {
        const data = await client.send(postObject);
    } 
    catch (error) {
        response.status(500).send({
            error: error.message
        });
    }
}; 

//Delete S3 Music
const deleteS3Music = async (request,response) => {
    try {
        const data = await client.send(deleteObject);
    } 
    catch (error) {
        response.status(500).send({
            error: error.message
        });
    }
}; 
*/

//Export Queries
module.exports = {
	listS3Music,
	GetS3ObjectSignedUrl,
	//putS3Music,
	//deleteS3Music
  };
  