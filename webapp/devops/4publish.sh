. ./devops/settings.sh

echo --- Uploading to Docker Hub ...
sudo docker push gen4/$build:client-latest
sudo docker push gen4/$build:client-${BUILD_NUMBER}