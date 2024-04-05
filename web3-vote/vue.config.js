const { VantResolver } = require('@vant/auto-import-resolver');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
    transpileDependencies: true,  // 这里添加了逗号
    configureWebpack: {
        plugins: [
          ComponentsPlugin({
            resolvers: [VantResolver()],
          }),
        ],
    },
});
