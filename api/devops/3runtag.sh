. ./devops/settings.sh

# echo --- Running $build ...
# sudo docker run --name $build -d -t $build
echo --- Tagging with the latest build number ...
sudo docker tag $build gen4/$build:api-${BUILD_NUMBER}
sudo docker tag $build gen4/$build:api-latest
