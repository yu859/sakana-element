import type { LoadingOptions, LoadingOptionsResolved } from './types';
import { ref, createApp, reactive, nextTick } from 'vue';
import { useZIndex } from '@sakana-element/hooks';
import LoadingComp from './Loading.vue';
import { defer, delay, isNil, isString } from 'lodash-es';

const RELATIVE_CLASS = 'er-loading-parent--relative' as const;
const HIDDEN_CLASS = 'er-loading-parent--hiden' as const;
const LOADING_NUMB_KEY = 'er-loading-numb' as const;

//Map类型键是HTMLElement，值是LoadingInstance
const instanceMap: Map<HTMLElement, LoadingInstance> = new Map();
//useZIndex 获取z-index
const { nextZIndex } = useZIndex(3000);

function createLoading(opts: LoadingOptionsResolved) {
  const visible = ref(opts.visible);
  const afterLeaveFlag = ref(false);
  const handleAfterLeave = () => {
    if (!afterLeaveFlag.value) return;
    destory();
  };

  const data = reactive({
    ...opts,
    onAfterLeave: handleAfterLeave,
  });

  const setText = (text: string) => (data.text = text);

  const destory = () => {
    const target = data.parent;
    subtLoadingNumb(target);
    if (getLoadingNumb(target)) return;
    //delay 延迟执行，1毫秒后执行
    delay(() => {
      removeRelativeClass(target);
      removeHiddenClass(target);
    }, 1);
    instanceMap.delete(target ?? document.body);
    vm.$el?.parentNode?.removeChild(vm.$el);
    app.unmount();
  };

  let afterLeaveTimer: number;
  const close = () => {
    if (opts.beforeClose && !opts.beforeClose()) return;

    afterLeaveFlag.value = true;
    clearTimeout(afterLeaveTimer);
    afterLeaveTimer = defer(handleAfterLeave); //defer延迟执行

    visible.value = false;
    opts.closed?.();
  };

  const app = createApp(LoadingComp, {
    ...data,
    zIndex: data.fullscreen ? nextZIndex() : void 0,
    visible,
  });
  const vm = app.mount(document.createElement('div'));

  return {
    get $el(): HTMLElement {
      return vm.$el;
    },
    vm,
    close,
    visible,
    setText,
  };
}

//resolveOptions 解析options
function resolveOptions(opts: LoadingOptions): LoadingOptionsResolved {
  let target: HTMLElement;
  if (isString(opts.target)) {
    //获取opts.target的html元素
    target = document.querySelector(opts.target) ?? document.body;
  } else {
    target = opts.target || document.body;
  }
  return {
    parent: target === document.body || opts.body ? document.body : target,
    background: opts.background ?? 'rgba(0, 0, 0, 0.5)',
    spinner: opts.spinner,
    text: opts.text,
    fullscreen: target === document.body && (opts.fullscreen ?? true), //??表示如果opts.fullscreen为undefined或null，则返回右边值否则返回左边值
    lock: opts.lock ?? false,
    visible: opts.visible ?? true,
    target,
  };
}

function addRelativeClass(target: HTMLElement = document.body) {
  //classList 获取html指定元素的class列表然后添加RELATIVE_CLASS
  target.classList.add(RELATIVE_CLASS);
}

function removeRelativeClass(target: HTMLElement = document.body) {
  //classList 获取html指定元素的class列表然后移除RELATIVE_CLASS
  target.classList.remove(RELATIVE_CLASS);
}

function addHiddenClass(target: HTMLElement = document.body) {
  //classList 获取html指定元素的class列表然后添加HIDDEN_CLASS
  target.classList.add(HIDDEN_CLASS);
}

function removeHiddenClass(target: HTMLElement = document.body) {
  //classList 获取html指定元素的class列表然后移除HIDDEN_CLASS
  target.classList.remove(HIDDEN_CLASS);
}

function getLoadingNumb(target: HTMLElement = document.body) {
  //getAttribute 获取html指定元素的属性值
  return target.getAttribute(LOADING_NUMB_KEY);
}

function removeLoadingNumb(target: HTMLElement = document.body) {
  //removeAttribute 移除html指定元素的属性值
  target.removeAttribute(LOADING_NUMB_KEY);
}

function addLoadingNumb(target: HTMLElement = document.body) {
  const numb = getLoadingNumb(target) ?? '0';
  //setAttribute 设置html指定元素的属性值，parseint 将字符串转换为整数
  target.setAttribute(LOADING_NUMB_KEY, `${Number.parseInt(numb) + 1}`);
}

function subtLoadingNumb(target: HTMLElement = document.body) {
  const numb = getLoadingNumb(target);
  if (numb) {
    const newNumb = Number.parseInt(numb) - 1;
    if (newNumb === 0) {
      //numb等于0时 removeLoadingNumb 移除html指定元素的属性值
      removeLoadingNumb(target);
    } else {
      //numb不等于0时 设置html指定元素的属性值 setAttribute 设置html指定元素的属性值
      target.setAttribute(LOADING_NUMB_KEY, `${newNumb}`);
    }
  }
}

//添加class
function addClass(
  options: LoadingOptions,
  parent: HTMLElement = document.body
) {
  //如果滚动条被锁定，则添加HIDDEN_CLASS
  if (options.lock) {
    addHiddenClass(parent);
  } else {
    removeHiddenClass(parent);
  }

  //添加RELATIVE_CLASS
  addRelativeClass(parent);
}

let fullscreenInstance: LoadingInstance | null = null;

//ReturnType 获取函数返回值的类型 类型属于createLoading的返回值
export type LoadingInstance = ReturnType<typeof createLoading>;

export function Loading(options: LoadingOptions = {}): LoadingInstance {
  const resolved = resolveOptions(options);
  const target = resolved.parent ?? document.body;

  //如果是全屏，并且已经存在实例，则返回实例，isNil表示是否为空
  if (resolved.fullscreen && !isNil(fullscreenInstance)) {
    return fullscreenInstance;
  }

  //parent是传入的dom元素，遮罩在哪个dom元素上
  addLoadingNumb(resolved?.parent);
  //如果instanceMap存在target，则返回target的实例
  if (instanceMap.has(target)) {
    return instanceMap.get(target)!; //一定有值
  }

  const instance = createLoading({
    ...resolved,
    //添加关闭事件
    closed: () => {
      resolved.closed?.(); //执行关闭事件

      if (resolved.fullscreen) {
        fullscreenInstance = null; // 如果是全屏 Loading，关闭时清空全屏实例
      }
    },
  });

  //添加class
  addClass(options, resolved?.parent);

  //instance.$el 是LoadingComp的根元素，将LoadingComp的根元素添加到resolved.parent中
  resolved.parent?.appendChild(instance.$el);

  //nextTick 在下一个tick执行，将instance.visible.value设置为resolved.visible
  nextTick(() => (instance.visible.value = !!resolved.visible));

  //如果是全屏，则将instance赋值给fullscreenInstance
  if (resolved.fullscreen) {
    fullscreenInstance = instance;
  }

  //将instance添加到instanceMap中
  instanceMap.set(target, instance);
  return instance;
}
