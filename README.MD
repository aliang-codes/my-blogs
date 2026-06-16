# aliang - 个人技术博客

基于 VuePress 和 Vdoing 主题构建的个人技术博客。

## 快速上手

```bash
# clone the project
git clone https://github.com/aliang-codes/my-blogs.git

# enter the project directory
cd my-blogs

# install dependency
npm install # or yarn install

# develop
npm run dev # or yarn dev
```

## 部署

### 部署到 GitHub Pages

```bash
# 手动部署
npm run deploy github

# 或者推送到 master 分支自动部署（通过 GitHub Actions）
git push origin master
```

### 部署到个人服务器

```bash
npm run deploy server
```

## GitHub Pages 配置

1. 在 GitHub 仓库设置中启用 GitHub Pages
2. 选择 `gh-pages` 分支作为源
3. 访问 `https://aliang-codes.github.io/my-blogs/` 查看部署结果

## 评论系统

本博客使用 Gitalk 作为评论系统。首次使用需要在 GitHub 创建 OAuth App：

1. 访问 https://github.com/settings/developers
2. 创建新的 OAuth App
3. 设置 Homepage URL 和 Authorization callback URL
4. 更新 `docs/.vuepress/config.ts` 中的 clientID 和 clientSecret

## 许可证
[MIT](https://github.com/aliang-codes/my-blogs/blob/master/LICENSE)

