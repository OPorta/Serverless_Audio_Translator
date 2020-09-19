var AWS = require("aws-sdk");

exports.handler = async (event) => {
    console.log("Received event:", JSON.stringify(event));
    
    const bucketName = event.Records[0].s3.bucket.name;
    const fileName = event.Records[0].s3.object.key;
    const s3 = new AWS.S3();
    const data = await s3.getObject({
        Bucket: bucketName, 
        Key: fileName
    }).promise();
    console.log("Transcription file content: ", JSON.stringify(JSON.parse(data.Body)));
    const message = JSON.parse(data.Body).results.transcripts[0].transcript;
    console.log("MESSAGE: "+message);
    
    const fileNameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.'));
    var sns = new AWS.SNS();
    var params = {
        Message: message, 
        Subject: fileNameWithoutExtension,
        TopicArn: process.env.OUTPUT_SNS_TOPIC
    };
    await sns.publish(params).promise();
    console.log("Message send successfully");
};
