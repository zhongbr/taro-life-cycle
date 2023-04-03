/*
 * @Description: taro 扩展生命周期的核心逻辑
 * @Author: 张盼宏
 * @Date: 2022-10-25 15:17:35
 * @LastEditors: 张盼宏
 * @LastEditTime: 2022-10-27 16:49:27
 */
export { default as registerAppListener } from './registerAppListener';
export { default as onActivate } from './onActivate';
export { default as onUnactivate } from './onUnactivate';
export { default as onSwitchFront } from './onSwitchFront';
export { default as onSwitchBehind } from './onSwitchBehind';

export type { PageLifeCycleListener, Ref, UnmountEntryLifeCycleError } from './types';
