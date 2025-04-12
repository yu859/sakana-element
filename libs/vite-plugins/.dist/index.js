import { isFunction, each } from "lodash-es";
import shell from "shelljs";
function hooksPlugin({
  //参数
  rmFiles = [],
  //默认值
  beforeBuild,
  //可选
  afterBuild
  //可选
}) {
  return {
    name: "hooks-plugin",
    //插件名称
    buildStart() {
      each(rmFiles, (fName) => shell.rm("-rf", fName));
      isFunction(beforeBuild) && beforeBuild();
    },
    buildEnd(err) {
      !err && isFunction(afterBuild) && afterBuild();
    }
  };
}
export {
  hooksPlugin
};
