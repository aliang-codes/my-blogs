set -ex

git add .
git commit -m'update'
git push origin master

sh deploy.sh

