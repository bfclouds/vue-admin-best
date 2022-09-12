const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:1314',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': '',
        // },
      },
    },
  },
})
