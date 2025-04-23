import { inject, ref, unref, computed, type Ref } from 'vue'; //inject用于注入依赖，ref创建响应式数据，unref获取响应式数据的值，computed创建计算属性，Ref是类型声明
import { omit } from 'lodash-es'; //用于从对象中排除指定属性
import { createI18n, i18nSymbol, type I18nInstance } from 'vue3-i18n';
import type { Language } from '@sakana-element/locale';
import English from '@sakana-element/locale/lang/en'; // 导入英文语言包

const omitInstall = (obj: I18nInstance) => omit(obj, 'install'); //从i18n实例中移除install方法

export function useLocale(localeOverrides?: Ref<Language>) {
  if (!localeOverrides) {
    //如果没有提供localeOverrides
    const i18n: Ref<I18nInstance> =
      inject(i18nSymbol) ?? //尝试通过inject获取已存在的i18n实例
      ref(createI18n({ locale: English.name, messages: { en: English.el } })); //如果没有找到，创建一个新的i18n实例，使用英语作为默认语言

    return computed(() => omitInstall(unref(i18n))); //返回一个计算属性，移除了i18n实例中的install方法
  }

  return computed(() =>
    //创建一个新的i18n实例，使用提供的语言作为当前语言
    omitInstall(
      createI18n({
        locale: localeOverrides.value.name, //设置当前语言
        messages: {
          en: English.el, //默认语言
          [localeOverrides.value.name]: localeOverrides.value.el, //当前语言
        },
      })
    )
  );
}

export default useLocale;
