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
    - GetObjectAttributesCommand
- s3-request-presigner
    - getSignedUrl

### AWS DynamoDB
- client-DynamoDB
    - DynamoDBClient
    - QueryCommand
    - ScanCommand


## Project Requirements
- Setup DynamoDB
    - connect DynamoDB and S3 API's to work as a unit 
        - Post Music
            - Find Smaller Test File
        - Delete Music
    - Add DynamoDB Error Checks
    - Implement Exponential Retries
    - Move Session Data into DynamoDB
- S3 Deep Dive with A Cloud Guru
    - Add S3 Error Checks
    - remove bucket name from S3 Tests
    - Implement Exponential Retries
- Cloudformation Deep Dive with A Cloud Guru
    - Break out CFN into Stacks
- Setup Cognito for Auth
- Setup Lambda and API Gateway
    - SAM Templates
    - Setup Paramater Store 
    - Convert DynamoDB/S3 Upload to a Lambda trigger that triggers on the file upload and then adds to DyanmoDB
- Setup CI/CD Pipeline
    - https://github.com/awslabs/aws-devops-essential
    - Define DEV, QA, and Prod Env
    - Setup Code Tools


















