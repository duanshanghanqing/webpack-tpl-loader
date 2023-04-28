# tenant-web 租户应用

# 安装依赖

    npm install

## 开发

    npm run dev  # 开发环境
    npm run test # 测试环境
    npm run qas  # 质量保证环境
    npm run pre  # 预发布环境
    npm run pro  # 生产环境

## 部署

    npm run build:dev  # 开发环境
    npm run build:test # 测试环境
    npm run build:qas  # 质量保证环境
    npm run build:pre  # 预发布环境
    npm run build:pro  # 生产环境

#  CI/CD

## 编译

    echo 开始编译
    rm -rf ./node_modules
    npm config set registry http://110.40.159.189/
    npm install
    npm run build:dev
    echo 编译完成

## nginx 部署

### 创建目录 

    mkdir -p /usr/share/nginx/html/tenant-web
    cp -r ./dist/* /usr/share/nginx/html/tenant-web

### 配置

    location ^~/tenant-web {
        try_files $uri $uri.html /tenant-web/index.html $uri/ =404;
    }
