cd 01-transcribe-audio-and-send-transcription-to-sns
    sh deploy.sh
cd ..
cd 02-translate-transcription-from-sns
    sh deploy.sh
cd ..
cd 03-store-transcription-from-sns
    sh deploy.sh
cd ..
cd 04-retrieve-transcriptions-from-dynamodb
    sh deploy.sh
cd ..
echo "ALL RESOURCES DEPLOYED"