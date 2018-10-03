echo Removing Track images ....
sudo docker images -a | grep "gen4/track" | awk '{print $3}' | xargs sudo docker rmi
echo Building Track API ...
sudo docker build -t gen4/track .
echo Tagging with the latest build number ...
sudo docker tag gen4/track gen4/track:api-${BUILD_NUMBER}
sudo docker tag gen4/track gen4/track:api-latest
echo Uploading to Docker Hub ...
sudo docker push gen4/track:api-${BUILD_NUMBER}
sudo docker push gen4/track:api-latest