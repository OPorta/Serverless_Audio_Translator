##Prepare SAM deployment's bucket
accountId=$(curl -s http://169.254.169.254/latest/dynamic/instance-identity/document | jq -r .accountId)
s3_deploy_bucket="audio-translator-sam-deploys-${accountId}"
echo $s3_deploy_bucket
aws s3 mb s3://$s3_deploy_bucket

##Get resources from other CloudFormations' stacks
TRANSCRIPTIONS_DB_TABLE=$(aws cloudformation describe-stack-resource --stack-name audio-translator-store-transcription-from-sns --logical-resource-id TranscriptionsDBTable --query "StackResourceDetail.PhysicalResourceId" --output text)
echo "TRANSCRIPTIONS_DB_TABLE: ${TRANSCRIPTIONS_DB_TABLE}"

##Deploy with SAM
sam build
sam package --output-template-file packaged.yaml --s3-bucket $s3_deploy_bucket
sam deploy --template-file packaged.yaml --stack-name audio-translator-retrieve-transcriptions-from-dynamodb --capabilities CAPABILITY_IAM --parameter-overrides "TranscriptionsDBTable"=$TRANSCRIPTIONS_DB_TABLE
