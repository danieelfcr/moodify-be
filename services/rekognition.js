require('dotenv').config();
const { RekognitionClient, DetectFacesCommand } = require('@aws-sdk/client-rekognition');

//Configuring AWS
const rekognitionClient = new RekognitionClient({
    region: process.env.AWS_REGION,
});


module.exports = rekognitionClient;