# 部署与自检清单（PowerShell）

## 0. 发布前必做
1. 将简历放到 `assets/resume.pdf`（否则下载按钮 404）。
2. 把脱敏截图放进 `assets/`，然后把 `index.html` 里四处 `./assets/xxx.svg` 改为你的图片（建议先压缩，单张 < 200KB，jpg/webp）。
3. 敏感词自检（应无输出）：
```powershell
Select-String -Path index.html,README.md -Pattern "智慧校园|抢名额|代刷|爬虫|\.key|token|password" 
```
4. 切勿把原始项目目录（含 `.key/.crt`、`data.json`、`frpc.exe`、服务脚本）放进仓库。**只推送 `portfolio/` 文件夹。**

## 1. 一键推送到 GitHub 并开启 Pages
需先安装 git 与 GitHub CLI（`gh auth login` 登录一次）。
```powershell
cd d:\zhxy3.02_new\作品集\portfolio
New-Item .nojekyll -ItemType File -Force | Out-Null
git init -b main
git add .
git commit -m "feat: portfolio site"
gh repo create yiting-portfolio --public --source=. --remote=origin --push
gh api -X POST repos/:owner/yiting-portfolio/pages -f "source[branch]=main" -f "source[path]=/"
```
约 1 分钟后访问：`https://<用户名>.github.io/yiting-portfolio/`

后续更新：
```powershell
git add . ; git commit -m "update" ; git push
```

## 2. 国内备用链接（Netlify）
打开 https://app.netlify.com/drop ，把 `portfolio` 文件夹整个拖入即可获得链接。也可用 Gitee Pages / 国内对象存储静态托管（上传同一文件夹）。

## 3. 自检
```powershell
# 本地预览
python -m http.server 8080
# 线上状态
curl.exe -I https://<用户名>.github.io/yiting-portfolio/
curl.exe -I https://<用户名>.github.io/yiting-portfolio/assets/resume.pdf
```
- 手机微信里打开链接，测：首屏 2 秒内出现、两个复制按钮、简历下载、Demo“一键核对”。
- 无外链检查（应无输出）：`Select-String -Path index.html -Pattern "https?://"`
- 微信直接发链接可能被拦截：建议用 Netlify 链接，或生成二维码发送。

