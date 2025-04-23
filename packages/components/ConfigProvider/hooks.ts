import {
  ref,
  getCurrentInstance,
  inject,
  computed,
  provide,
  unref,
  watch,
} from 'vue';
import type { MaybeRef, Ref, App } from 'vue';
import {
  type ConfigProviderContext,
  configProviderContextKey,
} from './constants';
import { createI18n, i18nSymbol } from 'vue3-i18n';
import type { TranslatePair } from '@sakana-element/locale';
import English from '@sakana-element/locale/lang/en';
import { merge } from 'lodash-es';
import { debugWarn } from '@sakana-element/utils';

const globalConfig = ref<ConfigProviderContext>(); // 全局配置

//函数重载
export function useGlobalConfig<
  K extends keyof ConfigProviderContext, //keyof用于获取一个类型的所有键（属性名）组成的联合类型，表示泛型参数K必须是ConfigProviderContext接口中的某个属性名
  D extends ConfigProviderContext[K] //表示泛型参数D必须是ConfigProviderContext接口中K属性的类型
>(key: K, defaultVal?: D): Ref<Exclude<ConfigProviderContext[K], void>>;
export function useGlobalConfig(): Ref<ConfigProviderContext>;
export function useGlobalConfig(
  key?: keyof ConfigProviderContext, //keyof用于获取一个类型的所有键（属性名）组成的联合类型，表示泛型参数key必须是ConfigProviderContext接口中的某个属性名
  defaultVal = void 0 //void 0表示undefined，因为undefined可以赋值给任何类型，然后void 0如果是默认值，则可以赋值给任何类型
) {
  const config = getCurrentInstance()
    ? inject(configProviderContextKey, globalConfig) //inject注入，如果当前实例存在，则从当前实例的上下文中注入configProviderContextKey，否则使用globalConfig
    : globalConfig;

  return key ? computed(() => config.value?.[key] ?? defaultVal) : config;
}

const _createI18n = (opts?: ConfigProviderContext) => {
  const mergeMsg = (msg: TranslatePair) =>
    merge(msg, opts?.extendsI18nMsg ?? {});

  //如果opts?.locale不存在，则返回一个createI18n实例，locale为en，messages为mergeMsg({en: English.el})
  if (!opts?.locale) {
    return createI18n({
      locale: 'en',
      messages: mergeMsg({
        en: English.el,
      }),
    });
  }

  //如果opts?.locale存在，则返回一个createI18n实例，locale为opts.locale?.name，messages为mergeMsg({en: English.el, [opts.locale?.name]: opts.locale?.el ?? {}})
  return createI18n({
    locale: opts.locale?.name || 'en',
    messages: mergeMsg({
      en: English.el,
      [opts.locale?.name]: opts.locale?.el ?? {},
    }),
  });
};

export function provideGlobalConfig(
  config: MaybeRef<ConfigProviderContext> = { locale: English },
  app?: App, //app是vue3的app实例
  global = false
) {
  const instance = getCurrentInstance(); //获取当前组件实例
  const oldCfg = instance ? useGlobalConfig() : void 0; //如果当前组件实例存在，则使用useGlobalConfig获取当前组件实例的配置，否则返回void 0
  const provideFn = app?.provide ?? (instance ? provide : void 0); //如果app存在，则使用app的provide，否则使用instance的provide，如果instance不存在，则返回void 0

  if (!provideFn) {
    debugWarn(
      'provideGlobalConfig',
      'provideGlobalConfig() can only be used inside setup()'
    );
    return;
  }

  const context = ref(unref(config));
  watch(
    () => config,
    (val) => {
      const cfg = unref(val);
      if (!oldCfg?.value) return cfg;
      context.value = merge(oldCfg.value, cfg);
    },
    { deep: true }
  );

  //创建一个i18n实例，如果context.value不存在，则使用_createI18n(context.value)创建一个i18n实例，否则使用_createI18n(context.value)创建一个i18n实例
  const i18n = ref(_createI18n(context.value));
  watch(
    () => context.value,
    (val) => (i18n.value = _createI18n(val)),
    { deep: true }
  );

  //注入context和i18n实例
  provideFn(configProviderContextKey, context);
  provideFn(i18nSymbol, i18n);

  //如果app存在，则使用app的use方法，否则使用i18n.value的use方法
  if (app) app.use(i18n.value);
  //如果global为true，或者globalConfig.value不存在，则将context.value赋值给globalConfig.value
  if (global || !globalConfig.value) globalConfig.value = context.value;

  return context;
}
