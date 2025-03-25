/* eslint-env node */
//配置postcss插件，为了支持嵌套、变量、循环等特性
module.exports = {
  plugins: [
    require('postcss-nested'),
    require('postcss-each-variables'),
    require('postcss-each')({
      plugins: {
        beforeEach: [require('postcss-for'), require('postcss-color-mix')]
      }
    })
  ]
}
