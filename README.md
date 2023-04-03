# 包信息

> @zhongbr/taro-life-cycle
> 对 Taro 生命周期的扩展，并对 h5 进行了一些兼容处理

安装命令：

```shell
npm i @zhongbr/taro-life-cycle@latest
```

# 支持的生命周期

| 生命周期  | 是否需入口组件接入 | Class 组件                | 函数组件            | 备注                                |
|-------|-----------|-------------------------|-----------------|-----------------------------------|
| 页面显示  | 否         | componentDidShow        | useShow         | h5 端支持在浏览器切到前台时执行                 |
| 页面隐藏  | 否         | componentDidHide        | useHide         | h5 端支持在浏览器切到后台时执行                 |
| 页面激活  | 否         | componentDidActivate    | useActivate     | 页面从页面栈缓存里显示出来时执行                  |
| 页面缓存  | 否         | componentDidUnactivate  | useUnactivate   | 缓存到页面栈里时执行                        |
| 页面切前台 | 是         | componentSwitchToFront  | useSwitchFront  | 应用整体从后台切到前台时执行（只有当前在页面栈顶部的页面才会执行） |
| 页面切后台 | 是         | componentSwitchToBehind | useSwitchBehind | 应用整体从前台切到后台时执行（只有当前在页面栈顶部的页面才会执行） |               

# 快速开始

## 1.修改 webpack 配置

@zhongbr/taro-life-cycle 包内，含有多端的代码，Taro 脚手架生成的项目默认情况下，不会处理 node_modules 里的多端文件，所以需要修改一下项目的
webpack 配置，增加对 @zhongbr/taro-life-cycle 的多端文件的处理。

参考：[解析 node_modules 内的多端文件](https://docs.taro.zone/docs/envs#%E8%A7%A3%E6%9E%90-node_modules-%E5%86%85%E7%9A%84%E5%A4%9A%E7%AB%AF%E6%96%87%E4%BB%B6)

在 Taro 项目的 config/index.js 文件内，加入如下的代码：

```js
{
    mini: {
        webpackChain: (chain) => {
            chain.resolve.plugin('MultiPlatformPlugin').tap(args => {
                args[2]["include"] = ['@zhongbr/taro-life-cycle'];
                return args;
            })
        }
    }
}
```

## 2. 修改入口组件（可选步骤）
@zhongbr/taro-life-cycle 在扩展生命周期时，有时需要用到一些 入口组件 才有的应用级别的生命周期。

使用需要入口组件接入的生命周期（看到下面的报错时就代表需要修改入口组件），请参考下面的内容修改入口组件：

![img.png](https://img.hicdn.cn/fed/images/20221028/2b28d74f520647052fd88814f31d1073_882x170.png@.webp)

根据入口组件的类型：

### 入口组件是 Class 组件

将入口组件原本继承的 React.Component 修改为继承 @zhongbr/taro-life-cycle 内的 AppComponent。

注意事项：

- 如果入口组件有 constructor ，需要在原来的 constructor 内调用 super
- 重写入口组件的 React 生命周期、小程序端提供的生命周期方法时，调用父类对应 super.xxx 方法

```jsx
import {AppComponent} from '@zhongbr/taro-life-cycle';

class App extends AppComponent {
    constructor(props) {
        super(props);
    }

    componentDidShow() {
        // 调用父类的方法
        super.componentDidShow();
    }

    onLaunch() {
        // 调用父类的方法
        super.onLaunch();
    }
}
```

### 入口组件是函数组件

在入口组件内执行 @zhongbr/taro-life-cycle 的 useAppLifeCycleMsg hook。

```jsx
import {useAppLifeCycleMsg} from '@zhongbr/taro-life-cycle';

function App(props) {
    // 调用 useAppLifeCycleMsg hook
    useAppLifeCycleMsg();

    return props.children;
}
```

### 在分包中使用

如果 Taro 工程在小程序中是作为分包加载运行的，Taro 工程的入口组件在小程序中不会被执行。

还需要修改主包的入口组件：将原本的 App 构造函数修改为 @zhongbr/taro-life-cycle 提供的 WxApp 构造函数。

```js
import { WxApp } from '@zhongbr/taro-life-cycle/weapp/index';

WxApp({
    globalData: {
        // xxx
    },
    onLaunch() {
        // xxx
    },
    onShow() {
        // xxx
    }
});
```

## 3. 在页面内使用

### 在 Class 组件页面内使用

对于 Class 组件页面，将原本继承的 React.Component 父类，修改为 @zhongbr/taro-life-cycle 内的 PageComponent 类。

注意事项：

- 与 入口组件 类似，需要在 constructor 内以及 React 生命周期、小程序扩展生命周期方法内，调用父类。

```jsx
import {PageComponent} from '@zhongbr/taro-life-cycle';

class Page extends PageComponent {
    // 在 h5 端可以在浏览器从后台切到前台时触发，Taro 本身不支持此场景
    componentDidShow() {
        super.componentDidShow();
    }

    // 在 h5 端可以在浏览器切到后台时触发，Taro 本身不支持此场景
    componentDidHide() {
        super.componentDidHide();
    }

    // 页面从路由缓存中被激活时，会执行此生命周期
    componentDidActivate() {
    }

    // 应用从后台切到前台时，会执行此生命周期
    componentSwitchToFront() {
    }
}
```

### 在函数组件页面内使用

在函数组件页面内，直接从 @zhongbr/taro-life-cycle 引入对应的 hook 即可。
