##Prepare SAM deployment's bucket
accountId=$(curl -s http://169.254.169.254/latest/dynamic/instance-identity/document | jq -r .accountId)
s3_deploy_bucket="audio-translator-sam-deploys-${accountId}"
echo $s3_deploy_bucket
aws s3 mb s3://$s3_deploy_bucket

##Get resources from other CloudFormations' stacks
TRANSCRIPTIONS_BUCKET=$(aws cloudformation describe-stack-resource --stack-name audio-translator-send-audio-to-transcribe --logical-resource-id TranscriptionsBucket --query "StackResourceDetail.PhysicalResourceId" --output text)

##Deploy with SAM
sam build
sam package --output-template-file packaged.yaml --s3-bucket $s3_deploy_bucket
sam deploy --template-file packaged.yaml --stack-name audio-translator-send-transcription-to-sns --capabilities CAPABILITY_IAM --parameter-overrides "TranscriptionsBucket"=$TRANSCRIPTIONS_BUCKET
