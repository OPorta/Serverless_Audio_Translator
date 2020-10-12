UPLOAD_BUCKET_NAME=$(aws cloudformation describe-stack-resource --stack-name audio-translator-transcribe-audio-and-send-transcription-to-sns --logical-resource-id UploadBucket --query "StackResourceDetail.PhysicalResourceId" --output text)
NEW_FILE=sample-${RANDOM}.wav
echo "New File: $NEW_FILE"
aws s3api put-object --bucket ${UPLOAD_BUCKET_NAME} --key $NEW_FILE --body ./8323__levinj__powerwords-english.wav
