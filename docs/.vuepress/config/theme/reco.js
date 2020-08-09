module.exports = {
  type: 'blog',
  blogConfig: {
    category: {
      location: 2,
      text: '分类'
    },
    tag: {
      location: 3,
      text: '标签'
    }
  },
  author: 'Tsengfhy',
  authorAvatar: '/avatar.jpg',
  search: true,
  searchMaxSuggestions: 10,
  lastUpdated: '最后更新时间',
  startYear: '2020',
  modePicker: false,
  smooth: true,
  noFoundPageByTencent: false,

  valineConfig: {
    appId: 'vhtBkyoi2fBpfMgxO6jY0nsx-gzGzoHsz',
    appKey: 'GcEW6NbLWx793mChsSqdpMxY',
  }
}