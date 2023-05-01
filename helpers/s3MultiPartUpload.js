'use strict';

// Import Varables
const dotenv = require('dotenv');
dotenv.config({ path: './../config/.env' });
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const bucket = 'music-is-life-bucket-s3bucket-1p1cgsnuuvm73'

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
const multiPartUpload = async (request, response) => {
    const fileName = request.body.name
    const filePath = request.body.path + fileName 
    const fileKey = fileName
    const fileStream = fs.readFileSync(filePath)
    const fileSize = fs.statSync(filePath).size
    const chunkSize = 1024 * 1024 * 5 // 5 MB
    const numParts = Math.ceil(fileSize / chunkSize)
    const promise = []
    let Parts = []
    let slicedData = []
    let CompletedParts = []

    //Initialize Upload
    const initiate = new CreateMultipartUploadCommand({
        Key: fileKey,
        Bucket: bucket,
    })  

    const init = await client.send(initiate);
    const MPUploadId = init.UploadId

    //Abort Upload 
    const abort = new AbortMultipartUploadCommand({
        Key: fileKey,
        Bucket: bucket,
        UploadId: MPUploadId,
    })

    //Upload Parts to S3
    const upload = async (body, MPUploadId, partNumber) => {
        const partParams = {
            Key: fileKey,
            Bucket: bucket,
            Body: body,
            UploadId: MPUploadId,
            PartNumber: partNumber,
        }
        
        return new Promise(async (resolve, reject) => {
            try {
                let part = await client.send(new UploadPartCommand(partParams))
                resolve({ 
                    PartNumber: partNumber, 
                    ETag: part.ETag
                })
            }
            catch (error) {
                console.log(error)
                client.send(abort)
            }
        })
    }

    for (let index = 1; index <= numParts; index++) {
        let start = (index -1) * chunkSize
        let end = index * chunkSize

        promise.push(upload(
            (index < numParts) ? fileStream.slice(start, end) : fileStream.slice(start), 
            MPUploadId, 
            index
        ))
      
        slicedData.push({ PartNumber: index, 
            buffer: Buffer.from(fileStream.slice(start, end + 1)) 
        });   
    }

    Parts = await Promise.allSettled(promise);

    //Complete Multipart Upload
    CompletedParts = Parts.map(m => m.value);

    const complete = new CompleteMultipartUploadCommand({
        Key: fileKey,
        Bucket: bucket,
        UploadId: MPUploadId,
        MultipartUpload: {Parts: CompletedParts},
    })

    try{
        const finish = await client.send(complete)
            response.status(200).send({
                status: 'Success',
                Message: 'Music file Uploaded',
                data: finish
            })
    }
    catch (error) {
        console.log(error)
        client.send(abort)
    }
}

module.exports = { multiPartUpload };