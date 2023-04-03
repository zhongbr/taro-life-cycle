/*
 * @Description: 加入 h5 端垫片的 show hook
 * @Author: 张盼宏
 * @Date: 2022-10-25 19:37:39
 * @LastEditors: 张盼宏
 * @LastEditTime: 2022-10-26 17:31:13
 */
import { useEffect } from 'react';
import { getEnv, useDidShow, ENV_TYPE } from '@tarojs/taro';
import { onAppShow } from '../polyfill';

export default function useShowH5(cb: Parameters<typeof useDidShow>[0]) {
    useDidShow(cb);

    // H5 上需使用垫片来实现从后台切到前台时调用 onShow
    useEffect(() => {
        if (getEnv() !== ENV_TYPE.WEB) {
            return () => {};
        }
        return onAppShow(cb);
    }, [])
}
