/*
 * @Description: hooks 聚合
 * @Author: 张盼宏
 * @Date: 2022-10-25 16:29:44
 * @LastEditors: 张盼宏
 * @LastEditTime: 2022-10-27 14:12:33
 */
import { onActivate, onSwitchBehind, onSwitchFront, onUnactivate } from '../core';
import useLifeCycle, { CB } from './useLifeCycle';

export type LifeCycleHook = (cb: CB) => void;

export const useActivate = useLifeCycle.bind(null, onActivate) as LifeCycleHook;
export const useSwitchFront = useLifeCycle.bind(null, onSwitchFront) as LifeCycleHook;
export const useSwitchBehind = useLifeCycle.bind(null, onSwitchBehind) as LifeCycleHook;
export const useUnactivate = useLifeCycle.bind(null, onUnactivate) as LifeCycleHook;

export { default as useHide } from './useHide';
export { default as useShow } from './useShow';
export { default as useAppLifeCycleMsg } from './useAppLifeCycleMsg';
