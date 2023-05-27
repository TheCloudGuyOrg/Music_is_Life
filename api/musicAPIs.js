'use strict';

// --------------
// Module Imports
// --------------

// Import ENV Modules
const dotenv = require('dotenv');
dotenv.config({ path: './../config/.env' });

// Import AWS Helper Functions
const {
    getS3ObjectAttributes,
    getS3ObjectSignedUrl,
    deleteS3Object
} = require('../helpers/s3HelperFunctions.js');

const { multiPartUpload } = require('../helpers/s3MultiPartUpload');

// Import DynamoDB Modules
const {
    DynamoDBClient, 
    ScanCommand,
    QueryCommand,
    PutItemCommand,
    DeleteItemCommand
} = require('@aws-sdk/client-dynamodb');


// --------
// Varables
// --------

// Import ENV Varables
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;


// -----------
// AWS Clients
// -----------

// Defining DynamoDB Client
const ddbClient = new DynamoDBClient({ 
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    },
    region: 'us-east-1',
});


// -----------
// API QUERIES
// -----------

// Defining List All Music Files API - GET /api
const listMusic = async (request, response) => {
    const listDDBObjects = new ScanCommand({
        'TableName': 'Music-Is-Life-Artist-Track',
        'ConsistentRead': false,
    });
    
    try {
        const DDBdata = await ddbClient.send(listDDBObjects);
        const s3Data = [];

        if(DDBdata.Items.length <= 0) {
            response.status(404).send({
                message: 'The Artist/Track selected does not exist'
            });
        }
        else {
            for (let i=0; i < DDBdata.Items.length; i++) {
                const s3_uri = DDBdata.Items[i].s3_uri.S;
                const bucketName = s3_uri.split('/')[2];
                const objectKey = s3_uri.split('/')[3];
                const s3Attributes = await getS3ObjectAttributes(bucketName, objectKey);
                s3Data.push(objectKey, s3Attributes);
            };
    
            response.status(200).send({
                status: 'Success',
                message: 'Artist/Track infomation retrieved from Database',
                DDBdata: DDBdata,
                S3data: s3Data
            });
        }
    }
    catch (error) {
        response.status(500).send({
            error: error.message
        });
    }
};

// Defining Get Music by Name API - GET /api/:name
const getMusic = async (request, response) => {
    const name = request.params.name;
    
    const getDDBObject = new QueryCommand({
        'TableName': 'Music-Is-Life-Artist-Track',
        'Select': 'ALL_ATTRIBUTES',
        'ExpressionAttributeValues': {
            ':v1': {
                'S': name
            }
        },
        'KeyConditionExpression': 'Artist = :v1',
        'ConsistentRead': false,
    });

    try {
        const DDBdata = await ddbClient.send(getDDBObject);
        const s3Data = [];

        if(DDBdata.Items[0] === undefined) {
            response.status(404).send({
                message: 'The Artist/Track selected does not exist'
            });
        } else {
            const s3_uri = DDBdata.Items[0].s3_uri.S;
            const bucketName = s3_uri.split('/')[2];
            const objectKey = s3_uri.split('/')[3];
            const s3Attributes = await getS3ObjectAttributes(bucketName, objectKey);
            s3Data.push(objectKey, s3Attributes);
            
            response.status(200).send({
                status: 'Success',
                message: 'The Artist/Track information was retrived',
                DDBdata: DDBdata,
                S3data: s3Data
            });
        }
    }
    catch (error) {
        response.status(500).send({
            error: error.message
        });
    }
};

// Defining Get PreSigned URL API - GET /api/url/:name
const getMusicUrl = async (request, response) => {
    const name = request.params.name;
    
    const getDDBObject = new QueryCommand({
        'TableName': 'Music-Is-Life-Artist-Track',
        'Select': 'ALL_ATTRIBUTES',
        'ExpressionAttributeValues': {
            ':v1': {
                'S': name
            }
        },
        'KeyConditionExpression': 'Artist = :v1',
        'ConsistentRead': false,
    });

    try {
        const DDBdata = await ddbClient.send(getDDBObject);

        if(DDBdata.Items[0] === undefined) {
            response.status(404).send({
                message: 'The Artist/Track selected does not exist'
            });
        } else {
            const s3_uri = DDBdata.Items[0].s3_uri.S;
            const bucketName = s3_uri.split('/')[2];
            const objectKey = s3_uri.split('/')[3];
            const url = await getS3ObjectSignedUrl(bucketName, objectKey);
            
            
            response.status(200).send({
                status: 'Success',
                message: 'The URL was retrived',
                DDBdata: DDBdata,
                S3PreSignedURL: url
            });
        }
    }
    catch (error) {
        response.status(500).send({
            error: error.message
        });
    }
};

// Defining Post Music API - POST /api
const postMusic = async (request, response) => {
    const artist = request.body.artist;
    const track = request.body.track;
    const year = request.body.year;
    const fileName = request.body.name;
    const filePath = request.body.path + fileName; 

    const s3_uri = await multiPartUpload(fileName, filePath);

    const bucketName = s3_uri.split('/')[2];
    const objectKey = s3_uri.split('/')[3];
    const s3Attributes = await getS3ObjectAttributes(bucketName, objectKey);
    
    const etag = s3Attributes.ETag;
    const objectSize = String(s3Attributes.ObjectSize);
    const storageClass = s3Attributes.StorageClass;

    const putObject = new PutItemCommand({
        'TableName': 'Music-Is-Life-Artist-Track',
        'Item': {
            'Artist': {
                'S': artist
            },
            'Track': {
                'S': track
            },
            'Year': {
                'N': year
            },
            's3_uri': {
                'S': s3_uri
            },
            'fileName': {
                'S': fileName
            },
            'ObjectSize': {
                'N': objectSize
            },
            'StorageClass': {
                'S': storageClass
            },
            'ETag': {
                'S': etag
            }
        }
    });
 
    try {
        const DDBdata = await ddbClient.send(putObject);

        if(DDBdata === undefined) {
            response.status(404).send({
                message: 'Could not complete the Artist/Track upload'
            });
        } else {
            response.status(200).send({
                status: 'Success',
                message: 'The Artist/Track has been uploaded',
                data: DDBdata
            });
        }
    } 
    catch (error) {
        response.status(500).send({
            error: error.message
        });
    }
};

// Defining Delete Music API - DELETE /api
const deleteMusic = async (request, response) => {
    const artist = request.body.artist;
    const track = request.body.track;
    
    const getDDBObject = new QueryCommand({
        'TableName': 'Music-Is-Life-Artist-Track',
        'Select': 'ALL_ATTRIBUTES',
        'ExpressionAttributeValues': {
            ':v1': {
                'S': artist
            }
        },
        'KeyConditionExpression': 'Artist = :v1',
        'ConsistentRead': false,
    });

    const deleteDDBObject = new DeleteItemCommand({
        'TableName': 'Music-Is-Life-Artist-Track',
        'Key': {
            'Artist': {
                'S': artist
            },
            'Track': {
                'S': track
            }
        }
    });

    try {
        const getDDBdata = await ddbClient.send(getDDBObject);

        if(getDDBdata.Items[0] === undefined) {
            response.status(404).send({
                message: 'The Artist/Track selected does not exist'
            });
        } else {
            const s3_uri = getDDBdata.Items[0].s3_uri.S;
            const bucketName = s3_uri.split('/')[2];
            const objectKey = s3_uri.split('/')[3];
            
            const S3Data = await deleteS3Object(bucketName, objectKey);

            const DDBdata = await ddbClient.send(deleteDDBObject);

            response.status(200).send({
                status: 'Success',
                message: 'The file was deleted',
                DDBdata: DDBdata,
                S3data: S3Data
            });
        }
    }
    catch (error) {
        response.status(500).send({
            error: error.message
        });
    }
};


// ------------
// Export API's
// ------------

//Export Queries
module.exports = {
    listMusic,
    getMusic,
    getMusicUrl,
    postMusic,
    deleteMusic
};