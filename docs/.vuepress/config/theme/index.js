const nav = require('../nav');
const sidebar = require('../sidebar');

const reco = require('./reco');

module.exports = {
  reco: Object.assign({}, reco, {
    nav,
    sidebar
  })
}