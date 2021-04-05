;(function(graph) {
  function require(module) {
    function reRequire(relativepath) {
      return require(graph[module].dependencies[relativepath])
    }
    var exports = {}
    ;(function(require, exports, code) {
      eval(code)
    })(reRequire, exports, graph[module].code)
    return exports
  }
  // 从入口文件开始
  require('./src/index.js')
})({"./src/index.js":{"dependencies":{"./a.js":"./src/a.js","./b.js":"./src/b.js"},"code":"\"use strict\";\n\nvar _a = _interopRequireDefault(require(\"./a.js\"));\n\nvar _b = _interopRequireDefault(require(\"./b.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log(_a[\"default\"]);\nconsole.log('hello webpack');\nconsole.log(_b[\"default\"]);"},"./src/a.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\nvar _default = 'a file';\nexports[\"default\"] = _default;"},"./src/b.js":{"dependencies":{"./c.js":"./src/c.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _c = _interopRequireDefault(require(\"./c.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nvar _default = 'b file' + _c[\"default\"];\n\nexports[\"default\"] = _default;"},"./src/c.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\nvar _default = 'c file';\nexports[\"default\"] = _default;"}})