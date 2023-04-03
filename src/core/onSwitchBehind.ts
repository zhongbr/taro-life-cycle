/*
 * @Description: Taro应用 切后台
 * @Author: 张盼宏
 * @Date: 2022-10-26 14:03:49
 * @LastEditors: 张盼宏
 * @LastEditTime: 2022-10-27 16:45:42
 */
import onUnactivate from './onUnactivate';
import { compositeLifeCycleListeners } from './utils/lifecycles';
import { AppLifeCycleEvents } from './msg';
import { AppLifeCycleEventEnum, Trigger } from './types';

interface Refs {
    /** 页面是否处于可见状态 */
    isPageVisible: boolean;
}

const onSwitchBehind: Trigger = (cb: () => void) => {
    const refs: Refs = {
        isPageVisible: false
    };

    // 监听页面显示，将页面可见性置为 true
    const onShow = () => {
        refs.isPageVisible = true;
    };

    // 监听页面被缓存，将页面可见性置为 false
    const unactivateListeners = onUnactivate(() => {
        refs.isPageVisible = false;
    });

    // 监听应用隐藏
    const onAppHide = () => {
        // 应用隐藏时，页面仍可见，就触发回调
        if (refs.isPageVisible) {
            cb();
        }
    };
    AppLifeCycleEvents.on(AppLifeCycleEventEnum.HIDE, onAppHide);

    // 监听页面卸载时，清除事件监听
    const onUnmount = () => {
        AppLifeCycleEvents.off(AppLifeCycleEventEnum.HIDE, onAppHide);
    };

    // 返回监听器
    return compositeLifeCycleListeners({ onUnmount, onShow }, unactivateListeners);
}

export default onSwitchBehind;
