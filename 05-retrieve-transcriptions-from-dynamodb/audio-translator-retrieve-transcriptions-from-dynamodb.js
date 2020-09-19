var AWS = require("aws-sdk");

exports.handler = async (event) => {
    console.log("Received event:", JSON.stringify(event));
    
    const dynamodb = new AWS.DynamoDB();
    var params = {
      TableName: process.env.DB_TABLE_NAME,
      ProjectionExpression: process.env.FIELDS_TO_RETRIEVE
    };
    
    const data = await dynamodb.scan(params).promise();
    console.log("Transcriptions read from DynamoDB: ", JSON.stringify(data));
    var transcriptionList = [];
    data.Items.map(item => transcriptionList.push(item.MessageText.S));
    console.log("Transcriptions List: ", JSON.stringify(transcriptionList));
    const response = {
        statusCode: 200,
        body: JSON.stringify(transcriptionList),
    };
    return response;
};