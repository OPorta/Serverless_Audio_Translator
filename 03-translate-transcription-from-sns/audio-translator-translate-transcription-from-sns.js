var AWS = require("aws-sdk");

exports.handler = async (event) => {
    console.log("Received event:", JSON.stringify(event));
    
    const messageToTranslate = event.Records[0].Sns.Message;
    const messageTitle = event.Records[0].Sns.Subject;
    console.log("Message received:", messageToTranslate);
    
    const translate = new AWS.Translate();
    const awsTranslateResponse = await translate.translateText({
       "SourceLanguageCode": "en",
       "TargetLanguageCode": "es",
       "Text": messageToTranslate
    }).promise();
    const translatedText = awsTranslateResponse.TranslatedText;
    console.log("Translated Text:", translatedText);
    
    const newFileName = messageTitle+"-ES.txt";
    const s3 = new AWS.S3();
    await s3.putObject({
        Bucket: process.env.OUTPUT_BUCKET_NAME, 
        Key: newFileName,
        Body: translatedText
    }).promise();
    console.log("Translation Saved");
};
