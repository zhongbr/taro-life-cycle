/*
 * @Description: 生命周期工具函数
 * @Author: 张盼宏
 * @Date: 2022-10-27 14:37:27
 * @LastEditors: 张盼宏
 * @LastEditTime: 2022-10-27 14:57:21
 */
import { PageLifeCycleListener } from '../types';

/**
 * 组合多个 生命周期的监听器 为一个
 * @param listeners 要组合的监听生命周期监听
 */
export function compositeLifeCycleListeners(...listeners: PageLifeCycleListener[]) {
    const getListener = (name: keyof PageLifeCycleListener) => {
        return () => {
            listeners.forEach(lifeCycle => lifeCycle[name]?.());
        };
    };

    return {
        onUnmount: getListener('onUnmount'),
        onShow: getListener('onShow'),
        onHide: getListener('onHide'),
    } as PageLifeCycleListener;
}
