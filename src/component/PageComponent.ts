/*
 * @Description: 扩展生命周期的页面组件
 * @Author: 张盼宏
 * @Date: 2022-10-25 16:45:04
 * @LastEditors: 张盼宏
 * @LastEditTime: 2022-10-27 17:00:32
 */
import { onSwitchFront, onActivate, onUnactivate, onSwitchBehind, PageLifeCycleListener } from '../core';
import Component from './Component';

export default class PageComponent<P = {}, S = {}> extends Component<P, S> {
    /** 各个扩展生命周期的监听器 */
    private readonly listeners: Array<PageLifeCycleListener | void>;

    constructor(props) {
        super(props);

        this.listeners = [
            [onActivate, this.componentDidActivate],
            [onUnactivate, this.componentDidUnactivate],
            [onSwitchBehind, this.componentSwitchToBehind],
            [onSwitchFront, this.componentSwitchToFront]
        ].map(([factory, callback]) => factory(callback.bind(this)));
    }

    /**
     * 触发所有扩展周期的监听器
     * @param listenerName 要触发的周期
     * @param args 传入的参数
     */
    private trigger(listenerName: keyof PageLifeCycleListener, ...args) {
        this.listeners?.map(listeners => {
            listeners?.[listenerName]?.(...args);
        })
    }

    onLoad() {}

    onReady() {}

    onPullDownRefresh() {}

    onReachBottom() {}

    onUnload() {}

    onPageScroll() {}

    onResize() {}

    componentDidShow(...args) {
        this.trigger('onShow', ...args);
    }

    componentDidHide(...args) {
        this.trigger('onHide', ...args);
    }

    componentWillUnmount(...args) {
        this.trigger('onUnmount', ...args);
    }

    /**
     * 组件从路由缓存中被激活时会执行此生命周期
     */
    componentDidActivate() {}

    /**
     * 组件被路由缓存时执行此生命周期
     */
    componentDidUnactivate() {}

    /**
     * 组件从后台切到前台时会执行此生命周期
     */
    componentSwitchToFront() {}

    /**
     * 组件从前台切到后台时会执行此生命周期
     */
    componentSwitchToBehind() {}
}
