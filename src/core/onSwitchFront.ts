/*
 * @Description: Taro 应用被从后台切到前台时
 * @Author: 张盼宏
 * @Date: 2022-10-25 16:14:21
 * @LastEditors: 张盼宏
 * @LastEditTime: 2022-10-27 16:46:44
 */
import onUnactivate from './onUnactivate';
import { AppLifeCycleEvents } from './msg';
import { AppLifeCycleEventEnum, Trigger } from './types';
import { compositeLifeCycleListeners } from './utils/lifecycles';

interface Refs {
    /** 页面是否处于可见状态 */
    isPageVisible: boolean;
    /** 是否是整个应用被从后台切到前台 */
    isAppShow: boolean;
}

const onSwitchFront: Trigger = (cb) => {
    const refs: Refs = {
        isAppShow: false,
        isPageVisible: true
    };

    /**
     * 监听页面显示
     */
    const onShow = () => {
        refs.isPageVisible = true;
        if (refs.isAppShow) {
            refs.isAppShow = false;
            cb();
        }
    };

    /**
     * 监听页面被缓存，将页面可见的标记置为 false
     */
    const unactivateListeners = onUnactivate(() => {
        refs.isPageVisible = false;
    });

    // 监听 Taro 应用的显示
    const onAppShow = () => {
        // 页面不可见时，不执行逻辑
        if (!refs?.isPageVisible) {
            return;
        }
        refs.isAppShow = true;
    };
    AppLifeCycleEvents.on(AppLifeCycleEventEnum.SHOW, onAppShow);

    // 页面卸载时，清除事件监听
    const onUnmount = () => {
        AppLifeCycleEvents.off(AppLifeCycleEventEnum.SHOW, onAppShow);
    };

    // 返回监听器
    return compositeLifeCycleListeners({ onShow, onUnmount }, unactivateListeners);
}

export default onSwitchFront;
