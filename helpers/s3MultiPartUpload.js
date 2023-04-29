'use strict';

// Import Varables
const dotenv = require('dotenv');
dotenv.config({ path: './../config/.env' });
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
const bucket = 'music-is-life-bucket-s3bucket-1p1cgsnuuvm73'

const file = 'High_Contrast_2007_Essential_Mix.mp3'
const path = '/Users/dercox/Documents/Code/Music_is_Life/Music-Files/'

// Import File Systen
const fs = require('fs');
const { IncomingForm } = require('formidable');

// Import S3 Modules
const {
    S3Client, 
    CreateMultipartUploadCommand,
    UploadPartCommand,
    AbortMultipartUploadCommand,
    CompleteMultipartUploadCommand,
} = require('@aws-sdk/client-s3');

const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

// Defining S3 Client
const client = new S3Client({ 
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    },
    region: 'us-east-1',
});

// File Uploads
// NEED API PATH

const multiPartUpload = async (request, response) => {
    const fileName = request.body.name
    const filePath = request.body.path + fileName 
    const fileSize = fs.statSync(filePath).size
    const fileKey = fileName
    const fileStream = fs.createReadStream(filePath)
    const chunkSize = 1024 * 1024 * 5 // 5 MB
    const numParts = Math.ceil(fileSize / chunkSize)
    const promise = []
    const slicedData = []
    let Parts = []
    let MPUploadId = null
    let FailedUploads = []
    let CompletedParts = []

    const initiate = new CreateMultipartUploadCommand({
        Key: fileKey,
        Bucket: bucket,
    })  
    
    try {
        const init = await client.send(initiate);
        MPUploadId = init.UploadId
        console.log(`Initialized Upload with UploadId: ${MPUploadId}`)
    }
    catch (error) {
        await client.send(abort)
        console.log(error)
    }
/*
        for (let index = 1; index <= numParts; index++) {
            let start = (index - 1) * chunkSize
            let end = index * chunkSize;
            let body = (index < numParts) ? fileStream.slice(start, end) : fileStream.slice(start)

            promise.push(upload(
                fileKey,
                bucket,
                body, 
                MPUploadId, 
                index
            ))

            slicedData.push({ 
                PartNumber: index, 
                buffer: Buffer.from(file.slice(start, end + 1)) 
            })

            Parts = await Promise.allSettled(promise);

            FailedUploads = Parts.filter(f => f.status == "rejected");

            try {
                if(!FailedUploads.length){
                    for (let i = 0; i < FailedUploads.length; i++) {
                        let [data] = slicedData.filter(f => f.PartNumber == FailedUploads[i].value.PartNumber)
                        let s = await uploadPart(data.buffer, MPUploadId, data.PartNumber, key);
                        RetryPromise.push(s);
                    }
                }
        
                CompletedParts = Parts.map(m => m.value);
                CompletedParts.push(...RetryPromise)
                    
                } catch (error) {
                    await client.send(abort)
                    console.log(error)
                }
        }
    }
    */

}

//S3 Functions


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
        }
    })
}

const complete = async (MPUploadId, CompletedParts) => {

    const partParams = {
        Key: fileKey,
        Bucket: bucket,
        UploadId: MPUploadId,
        MultipartUpload: { Parts: CompletedParts},
    }

    try {
        await client.send(new CompleteMultipartUploadCommand(partParams))
    }
    catch (error) {
        console.log(` Status 400: ${error}`)
    }
}

const abort = async (fileKey) => {
    const abortParams = {
        Key: fileKey,
        Bucket: bucket,
    }

    try {
        await client.send(new AbortMultipartUploadCommand(abortParams))
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = { multiPartUpload };