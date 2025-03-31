import { makeInstaller } from '@sakana-element/utils';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import components from './components';
import '@sakana-element/theme/index.css';

library.add(fas);
const installer = makeInstaller(components); //为了让组件支持按需引入，我们需要将组件注册到一个全局的安装器中

export * from '../components'; //导出所有组件
export default installer;
