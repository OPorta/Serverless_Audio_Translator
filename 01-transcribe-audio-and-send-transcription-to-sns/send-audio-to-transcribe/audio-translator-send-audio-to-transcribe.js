var AWS = require('aws-sdk');

exports.handler = async (event) => {
    console.log("Received event:", JSON.stringify(event));
    const s3BucketName = event.Records[0].s3.bucket.name;
    const fileName = decodeURIComponent(event.Records[0].s3.object.key);
    console.log("File to transcribe: " + fileName);
    const fileUri = "s3://" + s3BucketName + "/" + fileName;
    console.log("File URI: " + fileUri);

    const fileNameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.'));
    const transcribeservice = new AWS.TranscribeService();
    await transcribeservice.startTranscriptionJob({
      LanguageCode: "en-US", 
      MediaFormat: "wav", 
      Media: {
          MediaFileUri: fileUri
      },
      TranscriptionJobName: fileNameWithoutExtension,
      OutputBucketName: process.env.OUTPUT_BUCKET_NAME,
      JobExecutionSettings: {
        DataAccessRoleArn: process.env.TRANSCRIBE_DATA_ACCESS_ROLE
      }
    })
    .promise();
    console.log("Start transcription job successfully");
};