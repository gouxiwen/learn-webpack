# 实现一个简单版的loader
1.分别创建myLoader1和myLoader2，并且使用path引入
2.把以上两个loader合并到myLoaders目录下，用resolveLoader处理查找路径
3.实现一个less-loader，需要先安装less，利用less的api处理less文件
# 实现一个简单版的plugin课程未将，后期自行探索
插件设计模式：
事件驱动
发布订阅
plugin是一个类，里面包含一个apply函数，接受一个参数compiler，就是webpack实例