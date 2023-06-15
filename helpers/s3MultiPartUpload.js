'use strict';

// Import Varables
const dotenv = require('dotenv');
dotenv.config({ path: './../config/.env' });
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const BUCKET = process.env.BUCKET;

// Import File Systen
const fs = require('fs');

// Import S3 Modules
const {
    S3Client, 
    CreateMultipartUploadCommand,
    UploadPartCommand,
    AbortMultipartUploadCommand,
    CompleteMultipartUploadCommand,
} = require('@aws-sdk/client-s3');

// Defining S3 Client
const client = new S3Client({ 
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    },
    region: 'us-east-1',
});

// Multi-Part File Upload Logic 
const multiPartUpload = async (fileName, filePath) => { 
    const fileKey = fileName;
    const fileStream = fs.readFileSync(filePath);
    const fileSize = fs.statSync(filePath).size;
    const chunkSize = 1024 * 1024 * 25; // 25 MB
    const numParts = Math.ceil(fileSize / chunkSize);
    const promise = [];
    let Parts = [];
    let slicedData = [];
    let CompletedParts = [];

    //Initialize Upload
    const initiate = new CreateMultipartUploadCommand({
        Key: fileKey,
        Bucket: BUCKET,
    });  

    const init = await client.send(initiate);
    const MPUploadId = init.UploadId;

    //Abort Upload 
    const abort = new AbortMultipartUploadCommand({
        Key: fileKey,
        Bucket: BUCKET,
        UploadId: MPUploadId,
    });

    //Upload Parts to S3
    const upload = async (body, MPUploadId, partNumber) => {
        const partParams = {
            Key: fileKey,
            Bucket: BUCKET,
            Body: body,
            UploadId: MPUploadId,
            PartNumber: partNumber,
        };
        
        return new Promise(async (resolve) => {
            try {
                let part = await client.send(new UploadPartCommand(partParams));
                resolve({ 
                    PartNumber: partNumber, 
                    ETag: part.ETag
                });
            }
            catch (error) {
                console.log(error);
                client.send(abort);
            }
        });
    };

    for (let index = 1; index <= numParts; index++) {
        let start = (index -1) * chunkSize;
        let end = index * chunkSize;

        promise.push(upload(
            (index < numParts) ? fileStream.slice(start, end) : fileStream.slice(start), 
            MPUploadId, 
            index
        ));
      
        slicedData.push({ PartNumber: index, 
            buffer: Buffer.from(fileStream.slice(start, end + 1)) 
        });   
    }

    Parts = await Promise.allSettled(promise);

    //Complete Multipart Upload
    CompletedParts = Parts.map(m => m.value);

    const complete = new CompleteMultipartUploadCommand({
        Key: fileKey,
        Bucket: BUCKET,
        UploadId: MPUploadId,
        MultipartUpload: {Parts: CompletedParts},
    });

    try{
        const finish = await client.send(complete);
        const s3_uri = `s3://${finish.Bucket}/${finish.Key}`;
        return s3_uri;

    }
    catch (error) {
        console.log(error);
        client.send(abort);
    }
};

module.exports = { multiPartUpload };