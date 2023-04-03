/*
 * @Description: 类型
 * @Author: 张盼宏
 * @Date: 2022-10-25 15:51:24
 * @LastEditors: 张盼宏
 * @LastEditTime: 2022-10-27 16:51:47
 */
/**
 * Taro 应用级别生命周期的枚举
 */
export enum AppLifeCycleEventEnum {
    /**
     * 应用 show
     */
    SHOW = 'show',
    /**
     * 应用 hide
     */
    HIDE = 'hide',
    /**
     * 脚本发生错误
     */
    ERROR = 'error',
    /**
     * 页面不存在
     */
    PAGE_NOT_FOUND = 'page_not_found'
}

/**
 * 在触发逻辑内，声明一个固定的引用的函数
 */
export type Ref<T = any> = (ref: T) => { current: T };

/**
 * 触发逻辑的函数类型
 */
export type Trigger = (cb: (...args) => void) => PageLifeCycleListener;

/**
 * 对应 Taro 页面级生命周期的监听器
 */
export interface PageLifeCycleListener {
    /** 监听页面卸载 */
    onUnmount?: () => void;
    /** 监听页面显示 */
    onShow?: () => void;
    /** 监听页面隐藏 */
    onHide?: () => void;
}

/** 挂载全局 app 实例上，标识入口组件是否接入了生命周期事件通道 */
export const FLAG_KEY = '_taroAppLifeCycleFlag';
/** 挂载全局 app 实例上的生命周期事件通道 */
export const PUSH_CHANNELS_KEY = '_taroPushAppLifeCycleEventChannels';


/** 未挂载入口组件生命周期异常 */
export class UnmountEntryLifeCycleError extends Error {}
