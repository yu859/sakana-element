import { each, isFunction } from 'lodash-es'; //导入lodash-es，用于遍历数组和判断是否是函数
import shell from 'shelljs'; //导入shelljs，用于删除文件

export default function hooksPlugin({
  //参数
  rmFiles = [], //默认值
  beforeBuild, //可选
  afterBuild, //可选
}: {
  //：后面是类型定义
  rmFiles?: string[]; //string[]类型，？表示可选
  beforeBuild?: Function; //Function类型
  afterBuild?: Function; //Function类型
}) {
  return {
    name: 'hooks-plugin', //插件名称
    buildStart() {
      //打包开始时执行
      each(rmFiles, (fName) => shell.rm('-rf', fName)); //遍历rmFiles，删除文件
      isFunction(beforeBuild) && beforeBuild(); //判断beforeBuild是否是函数，如果是函数则执行
    },
    buildEnd(err?: Error) {
      //打包结束时执行
      !err && isFunction(afterBuild) && afterBuild(); //判断afterBuild是否是函数，如果是函数则执行
    },
  };
}
