/*
 * @Description: 注册 Taro 应用生命周期
 * @Author: 张盼宏
 * @Date: 2022-10-25 15:18:24
 * @LastEditors: 张盼宏
 * @LastEditTime: 2022-10-27 16:49:01
 */
import { AppLifeCycleEvents } from './msg';
import { AppLifeCycleEventEnum } from './types';

/**
 * 注册 Taro 应用级的生命周期的监听器
 */
export default function registerAppListener() {
    AppLifeCycleEvents.init();
    return {
        onShow: (...args) => {
            console.log('[app] on app show', args);
            AppLifeCycleEvents.trigger(AppLifeCycleEventEnum.SHOW, ...args);
        },
        onHide: (...args) => {
            console.log('[app] on app hide', args);
            AppLifeCycleEvents.trigger(AppLifeCycleEventEnum.HIDE, ...args);
        },
    };
}
