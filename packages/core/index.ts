import makeInstaller from './makeInstaller';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import components from './components';
import printLogo from './printLogo';
import '@sakana-element/theme/index.css';

printLogo();

library.add(fas);
const installer = makeInstaller(components); //为了让组件支持按需引入，我们需要将组件注册到一个全局的安装器中

export * from '@sakana-element/components'; //导出所有组件
export * from '@sakana-element/locale';
export default installer;
