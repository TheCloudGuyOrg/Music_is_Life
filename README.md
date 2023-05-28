# Music_is_Life

## Overview
### Music is Life
This is the capstone Open-Ended Project for Code Academy. This app will allow users to upload DJ sets similar to Sound Cloud and then allow users to play those DJ Sets.

### Running the server
To run the server, run:

```
npm start
```    

## Prerequisites:

```
npm install 
```

## Software Components
### GitHub
- https://github.com/TheCloudGuyOrg/Music_is_Life

### Node Express
- express
- express-session
- dotenv
- body-parser
- helmet
- fs

### Mocha Test Suite
- mocha 
    - supertest
    - assert

### AWS Cloudformation
- S3 Bucket
- DynamoDB
    - Music-Is-Life Table
        - Primary Key: Artist
        - Sort Key: Track

### AWS S3
- client-S3
    - S3Client
    - GetObjectCommand
    - GetObjectAttributesCommand
    - DeleteObjectCommand
- s3-request-presigner
    - getSignedUrl
- s3-MultiPartUpload
    - CreateMultipartUploadCommand
    - UploadPartCommand
    - AbortMultipartUploadCommand
    - CompleteMultipartUploadCommand

### AWS DynamoDB
- client-DynamoDB
    - DynamoDBClient
    - QueryCommand
    - ScanCommand
    - PutItemCommand
    - DeleteItemCommand


## Project Requirements
# Backend
- Set up Authentication
    - Enable Authentication
- S3 Deep Dive with A Cloud Guru
- Java Deep Dive

# Front End
- Customize Cognito Login Page

# Full Stack
- AWS Amplify Deep Dive
- Setup CI/CD Pipeline
    - https://github.com/awslabs/aws-devops-essential
    - Define DEV, QA, and Prod Env
    - Setup Code Tools
- Cloudformation Deep Dive with A Cloud Guru
    - Break out CFN into Stacks
- Setup Lambda and API Gateway
    - SAM Templates
    - Setup Paramater Store 
    - Convert DynamoDB/S3 Upload to a Lambda trigger that triggers on the file upload and then adds to DyanmoDB
    - Move Session Data into DynamoDB

# Security
- Setup Cognito for Auth
- Setup KMS Custom Keys
- Remove dependancy on AWS API Keys














