/*
 * @Description: h5 端对 Taro 的 show 和 hide 生命周期的垫片
 * @Author: 张盼宏
 * @Date: 2022-10-25 19:09:29
 * @LastEditors: 张盼宏
 * @LastEditTime: 2022-10-26 10:53:59
 */
import lifecycle from 'page-lifecycle';

/**
 * h5 从后台切到前台的垫片
 * @param cb
 */
export function onAppShow(cb: () => void) {
    const handler = (event) => {
        // 页面从后台切到前台时触发
        if (event.newState === 'passive' && event.oldState === 'hidden') {
            cb?.();
        }
    };

    lifecycle.addEventListener('statechange', handler);

    return () => {
        lifecycle.removeEventListener('statechange', handler);
    }
}

/**
 * h5 切到后台的垫片
 * @param cb
 */
export function onAppHide(cb: () => void) {
    const handler = (event) => {
        // 页面切到后台
        if (event.newState === 'hidden') {
            cb?.();
        }
    };

    lifecycle.addEventListener('statechange', handler);

    return () => {
        lifecycle.removeEventListener('statechange', handler);
    }
}
