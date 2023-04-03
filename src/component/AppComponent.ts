/*
 * @Description: 入口组件
 * @Author: 张盼宏
 * @Date: 2022-10-25 16:37:26
 * @LastEditors: 张盼宏
 * @LastEditTime: 2022-10-27 17:05:14
 */
import { registerAppListener } from '../core';
import Component from './Component';

export default class AppComponent<P = {}, S = {}> extends Component<P, S> {
    private listeners: ReturnType<typeof registerAppListener>;

    constructor(props) {
        super(props);
        // 注册应用生命周期的监听器
        this.listeners = registerAppListener();
    }

    onLaunch() {}

    onError() {}

    onPageNotFound() {}

    componentDidShow(...args) {
        this.listeners.onShow(...args);
    }

    componentDidHide(...args) {
        this.listeners.onHide(...args);
    }
}
