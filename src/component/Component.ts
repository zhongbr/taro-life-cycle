/*
 * @Description: h5 端垫片组件
 * @Author: 张盼宏
 * @Date: 2022-10-25 16:37:26
 * @LastEditors: 张盼宏
 * @LastEditTime: 2022-10-26 10:35:46
 */
import React, { Component } from 'react';

export default class AppComponent<P = {}, S = {}> extends Component<P, S> {
    // 下面的虚方法是为了避免后续扩展生命周期时需要在业务代码里增加 super 调用，先占个坑

    componentWillMount() {}

    componentDidMount() {}

    componentDidShow() {}

    componentDidHide() {}

    componentWillUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any) {}

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: any) {}

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {}
}
