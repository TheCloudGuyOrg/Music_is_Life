'use strict';

//Import S3 Modules
const {
    S3Client, 
    ListObjectsCommand,
    GetObjectCommand,
    PutObjectCommand,
    DeleteObjectCommand,
} = require('@aws-sdk/client-s3');

const client = new S3Client({ region: 'us-east-1'});


//List S3 Music Objects
const listS3Music = async (request,response) => {

}

//Get S3 Music Object
const getS3Music = async (request,response) => {
    
}

//Put S3 Music 
const putS3Music = async (request,response) => {
    
}

//Delete S3 Music
const deleteS3Music = async (request,response) => {
    
}


//Export Queries
module.exports = {
	listS3Music,
	getS3Music,
	putS3Music,
	deleteS3Music
  };