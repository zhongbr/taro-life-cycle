/*
 * @Description: 监听页面被缓存
 * @Author: 张盼宏
 * @Date: 2022-10-25 16:04:24
 * @LastEditors: 张盼宏
 * @LastEditTime: 2022-10-27 16:45:17
 */
import { getCurrentPages, nextTick } from '@tarojs/taro';
import { getCurrentPageInstance, comparePageInstance } from './utils/page';
import { Trigger } from './types';

const onUnactivate: Trigger = (cb) => {
    // 获取并保存当前的页面实例
    const inst = getCurrentPageInstance();

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
                cb();
            }
        });
    }

    // 返回监听器
    return { onHide };
}

export default onUnactivate;
