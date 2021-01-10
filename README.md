
# 介绍

基于vue的移动端多页应用脚手架。

# 技术栈

* [vue2.0](https://github.com/vuejs/vue)
* [webpack4.0](https://github.com/webpack/webpack)
* [sass](https://github.com/sass/sass)
* [es6](http://es6-features.org/)
* [eslint](https://eslint.org/)
* [superagent](https://github.com/visionmedia/superagent)
* [qcloudcdn](https://cloud.tencent.com/product/cos)
* [flexible](https://github.com/amfe/lib-flexible)

# 起步

首先，在`node`和`npm`环境下，生成新的项目：

    npm install --global vue-cli
    vue init freedomcly/vue-cli-multi-page YOUR_PROJECT_NAME

运行项目：

    cd YOUR_PROJECT_NAME
    npm install
    npm start

打开浏览器并访问 http://localhost:8080/pages/PAGE_NAME/PAGE_NAME.html

# 发布

首先，在`package.json`中修改腾讯云配置：

    {
      "deploy": {
        "bucket": "",
        "region": "",
        "secretid": "",
        "secretkey": "",
        "filepath": ""
      }
    }

然后执行如下命令：

    npm run version

就可以把静态资源发布到腾讯云`cdn`。
线上页面地址：https://cdn-qcloud.DOMAIN.com/FILE_PATH/PROJECT_NAME/PAGE_NAME.html。

# TODOs

- [x] import autoprefixer
- [x] limit js size(244kb)
