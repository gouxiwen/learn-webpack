const fs = require('fs');
const paser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const path = require('path');
const { transformFromAst } = require('@babel/core');
module.exports = class Webpack {
  constructor(options) {
    this.entry = options.entry
    this.output = options.output
    this.modules = []
  }

  run(){
    const info = this.paser(this.entry)
    // console.log(info)
    this.modules.push(info)
    // 递归分析其他模块，动态增加this.modules的长度
    for (let i = 0; i < this.modules.length; i++) {
      const item = this.modules[i];
      const { dependencies } = item
      for (const key in dependencies) {
        this.modules.push(this.paser(dependencies[key]))
      }
    }
    // console.log(this.modules)
    // 将数组转化成对象，方便根据文件路径获取依赖和代码
    const obj = {}
    this.modules.forEach(item => {
      obj[item.entryFile] = {
        dependencies: item.dependencies,
        code: item.code
      }
    })
    console.log(obj)
    this.file(obj)
  }

  paser(entryFile) {
    const content = fs.readFileSync(entryFile, 'utf-8')
    const ast = paser.parse(content, {
    // 使用babel的api分析代码，生成ast，安装@bebel/parser
      sourceType: 'module'
    })
    // console.log(ast.program.body)
    // 使用traverse遍历分析ast，处理模块
    const dependencies = {}
    traverse(ast, {
      ImportDeclaration({ node }) {
        // console.log(node.source.value)
        // 将'./a.js'处理成'./src/a.js'，根目录下的相对路径
        const newPath = './' + path.join(path.dirname(entryFile), node.source.value)
        // console.log(newPath)
        dependencies[node.source.value] = newPath
      }
    })
    // 处理代码
    // 把代码处理成浏览器可运行的代码，要使用@babel/core和@babel/preset-env，把ast转化成合适的代码
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    })
    // console.log(code)
    return {
      entryFile,
      dependencies,
      code
    }
  }
  file(code) {
    // 经过@babel/presets处理的代码依然不能被浏览器直接允许，需要进一步处理
    // 创建自运行函数，处理require，import，export
    // 生成main.js -->dist/main.js
    const filePath = path.join(this.output.path, this.output.filename)
    const newCode = JSON.stringify(code)
    // 自运行函数
    const bundle = 
`;(function(graph) {
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
  require('${this.entry}')
})(${newCode})`
    if(fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
    fs.writeFileSync(filePath, bundle, 'utf-8') 
  }
}