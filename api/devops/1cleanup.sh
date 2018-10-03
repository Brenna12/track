
echo ************************************
echo * Building: $build
echo ************************************
echo
echo 

. ./devops/settings.sh

echo --- Stopping $build container ...
sudo docker stop $build
echo --- Removing $build container ...
sudo docker rm $build
echo --- Removing $build images ...
sudo docker images -a | grep "$build" | awk '{print $3}' | xargs sudo docker rmi

exit 0