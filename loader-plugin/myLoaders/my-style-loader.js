module.exports = function (source) {
  const result = `const ele = document.createElement('style');
  ele.innerHTML = ${JSON.stringify(source)};
  document.head.appendChild(ele)`
  return result
}