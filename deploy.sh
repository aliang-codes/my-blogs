#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 获取参数，决定部署到哪
DEPLOY_TARGET=${1:-github} # 默认部署到 github

if [ "$DEPLOY_TARGET" = "server" ]; then
  # 部署到个人服务器
  push_addr=`git remote get-url --push origin`
  commit_info=`git describe --all --always --long`
  dist_path=docs/.vuepress/dist
  push_branch=gh-pages

  # 生成静态文件
  npm run build

  # 进入生成的文件夹
  cd $dist_path

  echo 'erlangtui.top' > CNAME

  git init
  git add -A
  git commit -m "deploy to server, $commit_info"
  git push -f git@8.140.51.225:/data/website/my-blogs.git HEAD:master

  cd -
  rm -rf $dist_path

elif [ "$DEPLOY_TARGET" = "github" ]; then
  # 部署到 GitHub Pages
  push_addr=`git remote get-url --push origin`
  commit_info=`git describe --all --always --long`
  dist_path=docs/.vuepress/dist
  push_branch=gh-pages

  # 生成静态文件
  npm run build

  # 进入生成的文件夹
  cd $dist_path

  # 不需要 CNAME，因为使用 erlangtui.github.io/aliang 路径
  # 如果使用的是自定义域名，则取消注释下一行
  # echo 'your-domain.com' > CNAME

  git init
  git add -A
  git commit -m "deploy to github pages, $commit_info"
  git push -f $push_addr HEAD:$push_branch

  cd -
  rm -rf $dist_path

else
  echo "未知部署目标: $DEPLOY_TARGET"
  echo "用法: ./deploy.sh [github|server]"
  exit 1
fi
