const theme = require('./config/theme');

module.exports = {
  title: "Tsengfhy's Blog",
  description: '',
  dest: 'public',
  head: [
    ['link', {rel: 'icon', href: '/favicon.ico'}],
    ['meta', {name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no'}]
  ],
  theme: 'reco',
  themeConfig: theme.reco,
  markdown: {
    lineNumbers: true
  },
  plugins: [
    ['@vuepress/nprogress'],
    ["code-copy", true],
    ['reading-progress'],
    ['flowchart'],
    ['autometa'],
    ['baidu-autopush'],
  ]
}  
