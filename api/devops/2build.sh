. ./devops/settings.sh

echo --- Building $build ...

sudo docker build -t $build .
