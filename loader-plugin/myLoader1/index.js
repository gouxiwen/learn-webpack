module.exports = function (source) {
  // 接收三个参数，source，sourcesMap，ast，后面两个参数可选，取决于上一个loader是否返回
  // console.log(this, this.query, source)
  // this.query获取options配置参数
  // const result = source.replace('loader', this.query.name)
  // 必须有返回值，官方推荐使用this.callback(err|null,string|buffer,sourceMap,ast)
  // return result
  // this.callback(null, result)

  // 处理异步
  const callback = this.async()
  setTimeout(() => {
    const result = source.replace('loader', this.query.name)
    callback(null, result)
  }, 3000);
}