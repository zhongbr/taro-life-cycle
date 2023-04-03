/*
 * @Description: 监听页面从路由缓存内激活
 * @Author: 张盼宏
 * @Date: 2022-10-25 16:04:24
 * @LastEditors: 张盼宏
 * @LastEditTime: 2022-10-27 16:46:22
 */
import { getCurrentPages, nextTick } from '@tarojs/taro';
import { getCurrentPageInstance, comparePageInstance } from './utils/page';
import { Trigger } from './types';

interface Refs {
    /** 页面是否被缓存 */
    isPageCached: boolean;
}

const onActivate: Trigger = (cb) => {
    // 获取并保存当前的页面实例
    const inst = getCurrentPageInstance();

    const refs: Refs = {
        isPageCached: false
    };

    /**
     * 监听页面显示
     */
    const onShow = () => {
        // 如果页面是从缓存内显示的，调用回调
        if (refs.isPageCached) {
            refs.isPageCached = false;
            cb();
        }
    };

    /**
     * 监听页面隐藏
     */
    const onHide = () => {
        nextTick(() => {
            // 获取当前的页面栈
            const pages = getCurrentPages();
            // 在页面栈内寻找当前的页面，如果还能找到，并且不在栈顶，代表页面是被缓存了
            if (pages?.some((page, index) =>
                    index !== pages.length - 1 &&
                    comparePageInstance(inst, page)
            )) {
                console.log('[on activate] page cached');
                refs.isPageCached = true;
            }
        });
    }

    // 返回监听器
    return { onShow, onHide };
}

export default onActivate;
