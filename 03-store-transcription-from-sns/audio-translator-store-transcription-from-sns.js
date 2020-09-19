var AWS = require("aws-sdk");

exports.handler = async (event) => {
    console.log("Received event:", JSON.stringify(event));
    
    const messageToTranslate = event.Records[0].Sns.Message;
    const messageTitle = event.Records[0].Sns.Subject;
    console.log("Message received:", messageToTranslate);
    
    const dynamodb = new AWS.DynamoDB();
    var params = {
      TableName: process.env.DB_TABLE_NAME,
      Item: {
          'MessageTitle': {S: messageTitle},
          'MessageText': {S: messageToTranslate}
      }
    };
    
    await dynamodb.putItem(params).promise();
    console.log("Transcription Stored to DynamoDB");
};
