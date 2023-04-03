/*
 * @Description:  Taro 扩展生命周期
 * @Author: 张盼宏
 * @Date: 2022-10-25 16:56:57
 * @LastEditors: 张盼宏
 * @LastEditTime: 2022-10-27 19:48:36
 */
// 函数组件: hooks
export { useAppLifeCycleMsg, useHide, useShow, useActivate, useUnactivate, useSwitchFront, useSwitchBehind } from './hooks';
// Class 组件
export { AppComponent, PageComponent } from './component';
// 原生小程序入口
export { WxApp } from './weapp';

export { UnmountEntryLifeCycleError } from './core';
