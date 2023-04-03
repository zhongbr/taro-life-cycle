/*
 * @Description: 在入口组件才能监听的应用生命周期的事件通道
 * @Author: 张盼宏
 * @Date: 2022-10-25 15:23:28
 * @LastEditors: 张盼宏
 * @LastEditTime: 2022-10-27 11:15:47
 */
import { Events as TaroEvents, getApp, nextTick } from '@tarojs/taro';
import { PUSH_CHANNELS_KEY, FLAG_KEY, UnmountEntryLifeCycleError } from './types';

class Events extends TaroEvents {
    /** 是否初始化 */
    private initFlag = false;

    constructor() {
        super();
        nextTick(() => {
            // 获取应用实例
            const app = getApp();

            // 判断入口组件是否接入了事件通道
            if (Reflect.get(app,FLAG_KEY)) {
                this.initFlag = true;
                // 将当前的事件通道实例，添加到 app 实例中
                app?.[PUSH_CHANNELS_KEY]?.(this);
            }
        });
    }

    /**
     * 初始化
     */
    public init() {
        this.initFlag = true;
    }

    /**
     * 检查是否初始化
     */
    private checkInit() {
        if (!this.initFlag) {
            throw new UnmountEntryLifeCycleError('[@zhongbr/taro-life-cycle] 请先在入口组件处初始化应用生命周期的监听器');
        }
    }

    public on(eventName: string, listener: (...args: any[]) => void): this {
        this.checkInit();
        return super.on(eventName, listener);
    }

    public once(eventName: string, listener: (...args: any[]) => void): this {
        this.checkInit();
        return super.once(eventName, listener);
    }
}

/** 应用全局生命周期的消息 */
export const AppLifeCycleEvents = new Events();
