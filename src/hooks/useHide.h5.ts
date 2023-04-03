/*
 * @Description: 加入 h5 端垫片的 hide hook
 * @Author: 张盼宏
 * @Date: 2022-10-25 19:37:39
 * @LastEditors: 张盼宏
 * @LastEditTime: 2022-10-26 17:31:06
 */
import { useEffect } from 'react';
import { getEnv, useDidHide, ENV_TYPE } from '@tarojs/taro';
import { onAppHide } from '../polyfill';

export default function useHide(cb: Parameters<typeof useDidHide>[0]) {
    useDidHide(cb);

    // H5 上需使用垫片来实现从后台切到前台时调用 onHide
    useEffect(() => {
        if (getEnv() !== ENV_TYPE.WEB) {
            return () => {};
        }
        return onAppHide(cb);
    }, [])
}
