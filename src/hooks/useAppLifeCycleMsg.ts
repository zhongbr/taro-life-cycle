/*
 * @Description: 注册 Taro 应用级的生命周期
 * @Author: 张盼宏
 * @Date: 2022-10-25 16:31:06
 * @LastEditors: 张盼宏
 * @LastEditTime: 2022-10-27 16:53:48
 */
import useHide from './useHide';
import useShow from './useShow';
import { registerAppListener } from '../core';

/**
 * 注册 Taro 应用级别生命周期消息的触发器
 * 需要在 Taro 应用的**入口组件**上使用
 */
export default function useAppLifeCycleMsg() {
    const { onHide, onShow } = registerAppListener();

    useShow(onShow);

    useHide(onHide);
}
