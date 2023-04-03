/*
 * @Description: 页面实例工具函数
 * @Author: 张盼宏
 * @Date: 2022-10-27 13:51:05
 * @LastEditors: 张盼宏
 * @LastEditTime: 2022-10-27 15:01:53
 */
import { getCurrentInstance, PageInstance, Page } from '@tarojs/taro';

let uniqueCount = 0;
const KEY = '__YtLifeCycleUniqueKey';

/**
 * 获取当前的页面实例
 */
export function getCurrentPageInstance() {
    const inst = getCurrentInstance()?.page;
    // 在 page 实例上做标记，用来区分是否是同一个页面
    if (inst && !Reflect.has(inst, KEY)) {
        Reflect.set(inst, KEY, `page-${uniqueCount++}`);
    }
    return inst;
}

/**
 * 比较两个页面 A和B 实例是否是同一个页面
 * @param pageA 页面A
 * @param pageB 页面B
 */
export function comparePageInstance(pageA: PageInstance | Page, pageB: PageInstance | Page) {
    return Reflect.get(pageA, KEY) === Reflect.get(pageB, KEY);
}
