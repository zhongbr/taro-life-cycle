/*
 * @Description: 扩展声明周期
 * @Author: 张盼宏
 * @Date: 2022-10-26 15:46:34
 * @LastEditors: 张盼宏
 * @LastEditTime: 2022-10-27 14:56:02
 */
import { useEffect, useRef } from 'react';
import useHide from './useHide';
import useShow from './useShow';
import { PageLifeCycleListener } from '../core';

export type CB = (...args) => void;

const noop = () => {};

export default function useLifeCycle(trigger: (cb: CB) => PageLifeCycleListener, cb: CB) {
    const listeners = useRef<PageLifeCycleListener>();
    if (!listeners.current) {
        listeners.current = trigger(cb);
    }

    const { onShow = noop, onHide = noop, onUnmount = noop } = listeners.current;

    useShow(onShow);
    useHide(onHide);

    useEffect(() => onUnmount, []);
}
