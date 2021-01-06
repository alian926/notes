// 1.代码分割 动态import,cra中开箱即用
import('./math').then(math => {
    console.log(math.add(16, 26))
})

// 2.React.lazy (和Suspense还不支持服务端渲染),允许你像渲染常规组件一样动态引入组件
// 在首次渲染时,自动引入组件包, React.lazy接收一个动态调用import的函数,它必须返回一个Promise,这个Promise需要resolve一个default export的React组件
// 在Suspense组件中渲染lazy组件,使我们可以使用在等待加载lazy组件优雅降级, Suspense组件可以包含多个懒加载的组件, 也可以置于lazy组件的任意父级位置

// 后代组件抛出错误的时候 ,可以使用 componentDidCatch()捕获错误 ,static getDerivedStateFromError() 更新state,渲染降级后的UI(返回值更新state)
// 只有class组件才可以成为错误边界组件, 因为只有类组件才有这个周期
// 无法捕获的错误: 事件处理, 异步代码(setTimeout,raf回调),服务端渲染,自身抛出的错误
// 自React16起,任何未被错误边界捕获的错误将会导致整个 React 组件树被卸载。

/// 使用前:
import OtherComponent from './OtherComponet'

/// 使用后:
import React, {Suspense} from 'react'
const OtherComponent = React.lazy(() => import('./OtherComponent'))
function MyComponent() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <OtherComponent/>
                <section>
                    <OtherComponent/>
                </section>
            </Suspense>
        </div>
    )
}

// context, 全局共享状态
// React.createContext 创建一个Context对象,返回一个Provider React组件
// 将undefined传递给Provider的组件value,消费组件的defaultValue不会生效,只有没有匹配到Provider时,defaultValue参数是才会生效
const ThemeContext = React.createContext('light');
class App extends React.Component {
    render() {
        return (
            // Provider接收一个value属性, 可以有多个消费组件,也可以嵌套多层Provider,里层覆盖外层
            <ThemeContext.Provider value="dark">
                <Toolbar/>
            </ThemeContext.Provider>
        )
    }
}
class Toolbar() {
    return (
        <div>
            <ThemedButton />
        </div>
    )
}
// consumer组件不受制与sholdComponentUpdate函数,祖先组件退出更新时,也可以更新
// 新旧值检测使用Object.is()相同的算法 
class ThemedButton extends React.Component{
    static contextType = ThemeContext
    render() {
        return <Button theme={ this.context}/>
    }
}
