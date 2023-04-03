/*
 * @Description: h5端兼容文件
 * @Author: 张盼宏
 * @Date: 2022-10-25 16:37:26
 * @LastEditors: 张盼宏
 * @LastEditTime: 2022-10-26 10:40:58
 */
import React, { Component } from 'react';
import { getEnv, ENV_TYPE } from '@tarojs/taro';
import { onAppShow, onAppHide } from '../polyfill';

/**
 * 对 h5 端针对浏览器被切换到后台时
 * show 和 hide 声明周期触发的垫片
 */
export default class AppComponent<P = {}, S = {}> extends Component<P, S> {
    private readonly disposePolyfill: () => void;

    constructor(props) {
        super(props);
        // 在 h5 端使用垫片触发网页被切换到后台时的 show 和 hide
        if (getEnv() === ENV_TYPE.WEB) {
            const showDispose = onAppShow(this.componentDidShow.bind(this));
            const hideDispose = onAppHide(this.componentDidHide.bind(this));
            this.disposePolyfill = () => {
                showDispose();
                hideDispose();
            };
        }
    }

    // 下面的虚方法是为了避免后续扩展生命周期时需要在业务代码里增加 super 调用，先占个坑

    componentWillMount() {}

    componentDidMount() {}

    componentDidShow() {}

    componentDidHide() {}

    componentWillUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any) {}

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: any) {}

    componentWillUnmount() {
        // 销毁垫片
        this.disposePolyfill();
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {}
}
