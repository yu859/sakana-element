import { nextTick } from 'vue';

export const rAF = async () => {
  return new Promise((res) => {
    //在下一帧执行
    requestAnimationFrame(() => {
      //在下一帧执行
      requestAnimationFrame(async () => {
        res(null); // 让Promise变为resolve状态，然后返回null
        await nextTick(); // 等待dom更新
      });
    });
  });
};
