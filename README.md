# Luck App Pro
```
本管理系统为telegram红包项目配套的后端管理，可直接部署到vercel.com

```
注意：需要配合登录系统后端api使用。或者替换http://lh.bbbang.com/oauth2/v1/oauth2/login
实现登录功能

`````
pnpm run dev
pnpm install xlsx

`````

## vercel.com
````
变更执行命令为：

pnpm run build
pnpm  install
````
404问题  vercel.json
`````
{
    "rewrites": [
        {"source": "/(.*)", "destination": "/"}
    ]
}

`````