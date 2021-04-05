module.exports = function (source) {
  // 接收三个参数，source，sourcesMap，ast，后面两个参数可选，取决于上一个loader是否返回
  console.log(source)
  const result = source.replace('kkb', 'loader2')
  return result
}