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

### AWS S3
- client-S3
    - ListObject
    - GetObject
    - DeleteObject
    - AbortMultiPartUpload
    - MultiPartUpload
- s3-request-presigner
    - getSignedUrl

### AWS DynamoDB




## Project Requirements
- Populate DynamoDB with inital data
- Build API endpoints for DynamoDB
- Connect DynamoDB with AWS JS SDK
- setup test code using Mocha for DynamoDB
- connect DynamoDB and S3 API's to work as a unit 
- Implement Exponential Backup
- Move Session Data into DynamoDB


- Setup Lambda and API Gateway
- Setup Cognito for Auth
- Setup Caching
- Setup CI/CD Pipeline
- Break out CFN into Stacks
- S3 Deep Dive with A Cloud Guru
- Cloudformation Deep Dive with A Cloud Guru














