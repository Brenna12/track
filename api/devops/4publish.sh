. ./devops/settings.sh

echo --- Uploading to Docker Hub ...
sudo docker push gen4/$build:api-latest
sudo docker push gen4/$build:api-${BUILD_NUMBER}