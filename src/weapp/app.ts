import { AppLifeCycleEventEnum, PUSH_CHANNELS_KEY, FLAG_KEY } from '../core/types';

interface EventChannel {
    trigger: (eventName: string, ...args) => void;
}

type AppOptions<T> = WechatMiniprogram.App.Options<T> & {
    // 分包加载时，会将监听应用生命周期的事件通道挂载到本属性上
    // 由于分包的数量不确定，可能有多个分包要监听，所以使用数组来保存
    [PUSH_CHANNELS_KEY]?: (channel: EventChannel) => void;
    _taroLifeCycleEventsChannels?: EventChannel[];
    // 用于给分包内的消息通道判断主包入口组件是否接入的标记
    [FLAG_KEY]?: boolean;
}

/**
 * 暴露给主包是原生小程序使用的 App 构造函数
 * @param options App的构造参数
 * @constructor
 */
export default function WxApp<T>(options: AppOptions<T>) {
    // 定义要监听的生命周期与事件通道枚举值的映射
    const hookEvents = new Map<keyof AppOptions<T>, AppLifeCycleEventEnum>([
        ['onShow', AppLifeCycleEventEnum.SHOW],
        ['onHide', AppLifeCycleEventEnum.HIDE]
    ]);

    hookEvents.forEach((lifecycle, eventName) => {
        if (!Reflect.has(options, eventName)) {
            return;
        }

        const origin = Reflect.get(options, eventName);
        Reflect.set(options, eventName, function (...args) {
            // 遍历所有的事件通道，触发对应的生命周期事件
            this?._taroLifeCycleEventsChannels?.forEach?.(eventChannel => {
                eventChannel.trigger(lifecycle, ...args);
            });
            return origin.call(this, ...args);
        });
    });

    // 标识主包入口组件已经接入了事件通道
    Reflect.set(options, FLAG_KEY, true);
    // 设置事件通道的方法
    Reflect.set(options, PUSH_CHANNELS_KEY, function (channel: EventChannel) {
        if (!this?._taroLifeCycleEventsChannels) {
            this._taroLifeCycleEventsChannels = [];
        }
        this?._taroLifeCycleEventsChannels?.push(channel);
    })

    return App.call(this, options);
}
