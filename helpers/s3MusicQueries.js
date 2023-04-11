'use strict';

// Import S3 Modules
const {
    S3Client, 
    ListObjectsCommand,
    GetObjectCommand,
    PutObjectCommand,
    DeleteObjectCommand,
} = require('@aws-sdk/client-s3');

// Defining S3 Client
const client = new S3Client({ 
    credentials: '',
    customerUserAgent: '',
    defaultSigningName: '',
    defaultsMode: '',
    disableHostPrefix: '',
    disableMultiregionAccessPoints: '',
    endpoint: '',
    endpointProvider: '',
    eventStreamMarshaller: '',
    eventStreamSerdeProvider: '',
    forcePathStype: '',
    logger: '',
    maxAttempts: '',
    region: 'us-east-1',
    requestHandler: '',
    retryMode: '',
    retryStrategy: '',
    signer: '',
    signingExcapePath: '',
    systemClockOffset: '',
    tls: '',
    useArnRegion: '',
    useAccelerateEndpoint: '',
    useDualstackEndpoint: '',
    useFipsEndpoint:'',
    useGobalEndpoint: '',
});

// Defining S3 Commands
const listObjects = new ListObjectsCommand({
    Bucket: "STRING_VALUE", // required
    Delimiter: "STRING_VALUE",
    EncodingType: "url",
    Marker: "STRING_VALUE",
    MaxKeys: Number("int"),
    Prefix: "STRING_VALUE",
    RequestPayer: "requester",
    ExpectedBucketOwner: "STRING_VALUE",
});

const getObject = new GetObjectCommand({
    Bucket: "STRING_VALUE", // required
    IfMatch: "STRING_VALUE",
    IfModifiedSince: new Date("TIMESTAMP"),
    IfNoneMatch: "STRING_VALUE",
    IfUnmodifiedSince: new Date("TIMESTAMP"),
    Key: "STRING_VALUE", // required
    Range: "STRING_VALUE",
    ResponseCacheControl: "STRING_VALUE",
    ResponseContentDisposition: "STRING_VALUE",
    ResponseContentEncoding: "STRING_VALUE",
    ResponseContentLanguage: "STRING_VALUE",
    ResponseContentType: "STRING_VALUE",
    ResponseExpires: new Date("TIMESTAMP"),
    VersionId: "STRING_VALUE",
    SSECustomerAlgorithm: "STRING_VALUE",
    SSECustomerKey: "STRING_VALUE",
    SSECustomerKeyMD5: "STRING_VALUE",
    RequestPayer: "requester",
    PartNumber: Number("int"),
    ExpectedBucketOwner: "STRING_VALUE",
    ChecksumMode: "ENABLED",
});

const postObject = new PutObjectCommand({
    ACL: "private" || "public-read" || "public-read-write" || "authenticated-read" || "aws-exec-read" || "bucket-owner-read" || "bucket-owner-full-control",
    Body: "STREAMING_BLOB_VALUE",
    Bucket: "STRING_VALUE", // required
    CacheControl: "STRING_VALUE",
    ContentDisposition: "STRING_VALUE",
    ContentEncoding: "STRING_VALUE",
    ContentLanguage: "STRING_VALUE",
    ContentLength: Number("long"),
    ContentMD5: "STRING_VALUE",
    ContentType: "STRING_VALUE",
    ChecksumAlgorithm: "CRC32" || "CRC32C" || "SHA1" || "SHA256",
    ChecksumCRC32: "STRING_VALUE",
    ChecksumCRC32C: "STRING_VALUE",
    ChecksumSHA1: "STRING_VALUE",
    ChecksumSHA256: "STRING_VALUE",
    Expires: new Date("TIMESTAMP"),
    GrantFullControl: "STRING_VALUE",
    GrantRead: "STRING_VALUE",
    GrantReadACP: "STRING_VALUE",
    GrantWriteACP: "STRING_VALUE",
    Key: "STRING_VALUE", // required
    Metadata: { // Metadata
      "<keys>": "STRING_VALUE",
    },
    ServerSideEncryption: "AES256" || "aws:kms",
    StorageClass: "STANDARD" || "REDUCED_REDUNDANCY" || "STANDARD_IA" || "ONEZONE_IA" || "INTELLIGENT_TIERING" || "GLACIER" || "DEEP_ARCHIVE" || "OUTPOSTS" || "GLACIER_IR",
    WebsiteRedirectLocation: "STRING_VALUE",
    SSECustomerAlgorithm: "STRING_VALUE",
    SSECustomerKey: "STRING_VALUE",
    SSECustomerKeyMD5: "STRING_VALUE",
    SSEKMSKeyId: "STRING_VALUE",
    SSEKMSEncryptionContext: "STRING_VALUE",
    BucketKeyEnabled: true || false,
    RequestPayer: "requester",
    Tagging: "STRING_VALUE",
    ObjectLockMode: "GOVERNANCE" || "COMPLIANCE",
    ObjectLockRetainUntilDate: new Date("TIMESTAMP"),
    ObjectLockLegalHoldStatus: "ON" || "OFF",
    ExpectedBucketOwner: "STRING_VALUE",
});

const deleteObject = new DeleteObjectCommand({
    Bucket: "STRING_VALUE", // required
    Key: "STRING_VALUE", // required
    MFA: "STRING_VALUE",
    VersionId: "STRING_VALUE",
    RequestPayer: "requester",
    BypassGovernanceRetention: true || false,
    ExpectedBucketOwner: "STRING_VALUE",
});

//List S3 Music Objects
const listS3Music = async (request,response) => {
    try {
        const data = await client.send(listObjects);
    } 
    catch (error) {
        response.status(500).send({
            error: error.message
        });
    }
};


//Get S3 Music Object
const getS3Music = async (request,response) => {
    try {
        const data = await client.send(getObject);
    } 
    catch (error) {
        response.status(500).send({
            error: error.message
        });
    }
}; 

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

//Export Queries
module.exports = {
	listS3Music,
	getS3Music,
	putS3Music,
	deleteS3Music
  };