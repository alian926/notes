// 官网实例代码

// 1 渲染
ReactDOM.render(
    <h1>Hello, world</h1>,
    document.getElementById('root')
)

// 2 JXS
const element = <h1>Hello, world</h1>

// 3 JXS中使用变量
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>

ReactDOM.render(
    element,
    document.getElementById('root')
)

// 4 JSX中使用函数
function formatName(user) {
    return user.firstName + '' + user.lastName
}

const user = {
    firstName: 'Harper',
    lastName: 'Perez'
}

const element = (
    <h1>Hello, {formatName(user)}</h1>
)

ReactDOM.render(
    element,
    document.getElementById('root')
)

// 5 JSX也是表达式
function getGreeting(user) {
    if (user) {
        return <h1>Hello, {formatName(user)}!</h1>
    }
    return <h1>Hello, Stranger.</h1>
}

// 6 JSX特定属性, 对同一个属性不能同时使用下面两种方式,区别于Vue
// 引号指定字符串字面量
const element = <div tabIndex="0"></div>
// 大括号插入表达式
const element = <img src={user.avatarUrl}></img>

// 7 JSX 标签可以使用自闭合的方式,渲染前会默认进行转义,方式XSS攻击,Babel会把JXS转义成React.createElement()函数的调用,它会预先执行一些检查, 创建出一个React元素(vdom对象)
const element = (
    <h1 className="greeting">
        Hello, world!
    </h1>
)

const element = React.createElement(
    'h1',
    { className: 'greeting' },
    'Hello, world!'
)

// 8 将元素渲染为DOM,执行ReactDOM.render()
const element = <h1>Hello, world</h1>
ReactDOM.render(element, document.getElementById('root'))

// 9 更新已渲染元素, React元素是不可变对象,更新UI的唯一方式是创建一个新的元素,将其传入ReactDOM.render
function tick() {
    const element = (
        <div>
            <h1>Hello, world</h1>
            <h2>It is {new Date().toLocaleTimeString()}</h2>
        </div>
    )
    ReactDOM.render(element, document.getElementById('root'))
}
setInterval(tick, 1000)

// 10 函数组件和class组件, 组件名称必须以大写字母开头, 小写字母开头的组件会被视为原生DOM标签
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>
}

class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>
    }
}

// 11 渲染组件, 当React元素为用户自定义组件的时候,会将JSX接收到的属性以及子组件转为为单个对象传递给组件, 这个对象称之为"props"
const element = <Welcome name="Sara" />
ReactDOM.render(
    element,
    document.getElementById('root')
)

// 12 组合组件
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>
}

function App() {
    return (
        <div>
            <Welcome name="Sara" />
            <Welcome name="Cahal" />
            <Welcome name="Edite" />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)

// 13 提取组件 Props的只读性, 所有React组件都必须像纯函数一样保护props不被更改
function Comment(props) {
    return (
        <div className="Comment">
            <div className="UserInfo">
                <img className="Avatar"
                    src={props.author.avatarUrl}
                    alt={props.author.name}
                />
                <div className="UserInfo-name">
                    {props.author.name}
                </div>
            </div>
            <div className="Comment-text">
                {props.text}
            </div>
            <div className="Comment-date">
                {formatDate(props.date)}
            </div>
        </div>
    )
}

// 提取出Avatar组件, 组件使用更通用的名字,不需要关注它是如何在外部渲染的
function Avatar(props) {
    return (
        <img className="Avatar"
            src={props.user.avatarUrl}
            alt={props.user.name}
        />
    )
}

// 提取UserInfo组件
function UserInfo(props) {
    return (
        <div className="UserInfo">
            <Avatar user={props.user} />
            <div className="UserInfo-name">
                {props.user.name}
            </div>
        </div>
    )
}

function Comment(props) {
    return (
        <div className="Comment">
            <UserInfo user={props.author} />
            <div className="Comment-text">
                {props.text}
            </div>
            <div className="Comment-date">
                {formatDate(props.date)}
            </div>
        </div>
    )
}

// 14 state 和 生命周期, state是私有的,完全受控于当前组件
function Clock(props) {
    return (
        <div>
            <h1>Hello, world</h1>
            <h2>It is {props.date.toLocaleTimeString()}</h2>
        </div>
    )
}

function tick() {
    ReactDOM.render(
        <Clock date={new Date()} />,
        document.getElementById('root')
    )
}

setInterval(tick, 1000)

// 15将函数组件转换成class组件, 添加局部的state, class组件应该始终用props参数来调用父类的构造函数
class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.state = { date: new Date() }
    }
    render() {
        return (
            <div>
                <h1>Hello, world</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}</h2>
            </div>
        )
    }
}

ReactDOM.render(
    <Clock />,
    document.getElementById('root')
)

// 16 将生命周期方法添加到Class中, 可以向class中任意添加不参与数据流的额外字段, 
class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.state = { date: new Date() }
    }

    // 组件已经被渲染到DOM中后运行
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        )
    }

    // 组件从DOM中移除,卸载时调用
    componentWillMount() {
        clearInterval(this.timerID)
    }

    tick() {
        this.setState({
            date: new Date()
        })
    }

    render() {
        return (
            <div>
                <h1>Hello, world</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}</h2>
            </div>
        )
    }
}

ReactDOM.render(
    <Clock />,
    document.getElementById('root')
)

// 17 正确的使用state, 不直接修改state,构造函数是唯一可以给this.state赋值的地方; state的更新可能是异步的,不要依赖他们的值更新下一个状态; state的更新会被合并(浅合并 Object.assign())

/* this.state.commet = 'Hello' */
this.setState({ comment: 'Hello' })

/* this.setState({
    counter: this.state.counter + this.props.increment
}) */
// 采用回调函数的方式, 上一个state,更新被应用时的props
this.setState((state, props) => {
    counter: state.counter + props.increment
})

    // 18 数据是向下流动的, 组件课程把它的state作为props向下传递到子组件中,单向数据流
    (< FormattedDate date={this.state.date} />)
function FormattedDate(props) {
    return <h2>It is {props.date.toLocaleTimeString()}</h2>
}

// 19 事件处理, React事件的命名采用小驼峰,而不是纯小写, 使用JSX语法时,需要传入一个函数作为事件处理函数,而不是一个字符串, 不能通过返回false来阻止默认行为,必须调用preventDefault
<button onClick={activateLasers()}>Activate Lasers</button>
function ActionLink() {
    function handleClick(e) {
        // e是一个合成事件, React解决了浏览器的兼容性问题
        e.preventDefault()
        console.log('The link was clicked')
    }
    return (
        <a href="#" onClick={handleClick}> Click me</a>
    )
}

class Toggle extends React.Component {
    constructor(props) {
        super(props)
        this.state = { isToggleOn: true }
        // JavaScript中, class的方法默认不会绑定this
        // 为了在回调中使用this, 必须绑定, 或者在声明方法的时候使用箭头函数,或者在事件回调中使用箭头函数(此语法问题在于每次渲染是会创建不同的回调函数, 如果这些回调函数作为prop传入子组件,可能到导致子组件进行重新渲染)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }))
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'On' : 'Off'}
            </button>
        )
    }
}

ReactDOM.render(
    <Toggle />,
    document.getElementById('root')
)

    // 20 向事件处理程序传递参数
    (<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>)
    (<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>)

// 21 条件渲染
function UserGreeting(props) {
    return <h1>Welcome back!</h1>
}
function GuestGreeting(props) {
    return <h1>Please sign up!</h1>
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />
    }
    return <GuestGreeting />
}
ReactDOM.render(
    <Greeting />,
    document.getElementById('root')
)

// 22 元素变量, 有条件地渲染组件的一部分,而其它的渲染部分不会因此改变
function LoginButton(props) {
    return (
        <button onClick={props.onClick}>Login</button>
    )
}
function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>Logout</button>
    )
}

class LoginConctrol extends React.Component {
    constructor(props) {
        super(props)
        this.state = { isLoggedIn: false }
        this.handleLoginClick = this.handleLoginClick.bind(this)
        this.handleLogoutClick = this.handleLogoutClick.bind(this)
    }

    handleLoginClick() {
        this.setState({ isLoggedIn: true })
    }

    handleLogoutClick() {
        this.setState({ isLoggedIn: false })
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick}></LogoutButton>
        } else {
            button = <LoginButton onClick={this.handleLoginClick}></LoginButton>
        }

        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn}></Greeting>
                {button}
            </div>
        )
    }
}

ReactDOM.render(
    <LoginConctrol />,
    document.getElementById('root')
)

// 23 与运算 &&
function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
        <div>
            <h1>Hello!</h1>
            {unreadMessages.length > 0 &&
                <h2>
                    You have {unreadMessages.length} unread messages.
                </h2>
            }
        </div>
    )
}
const messages = ['React', 'Re:React', 'Re:Re: React'];
ReactDOM.render(
    <Mailbox unreadMessages={messages} />,
    document.getElementById('root')
)

// 24 三目运算符
function LoginControl(props) {
    return (
        <div>
            {props.isLoggedIn ? 'Login' : 'Logout'}
        </div>
    )
}

// 25 阻止条件渲染, 使render返回null
function WarningBanner(props) {
    if (!props.warn) {
        return null
    }
    return (
        <div className="warning">
            Warning!
        </div>
    )
}

// 26 使用map得到一个元素集合
const numbers = [1, 2, 3, 4, 5]
const listItems = numbers.map(number => <li>{number}</li>)

ReactDOM.render(
    <ul>{listItems}</ul>,
    document.getElementById('root')
)

// 27 为列表分配key属性, key帮助React识别哪些元素被识别了,最好在列表中拥有独一无二的字符串,万不得已使用索引index作为key, 不显示指定key值,那么默认使用索引作为key
function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map(number =>
        <li key={number.toString()}>{number}</li>
    )
    return (
        <ul>{listItems}</ul>
    )
}
const numbers = [1, 2, 3, 4, 5]
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
)
// 28 元素的key要放在就近的数组上下文中, 只是在兄弟节点中需要唯一
function ListItem(props) {
    // key不可以写在这里
    return <li>{props.value}</li>
}
function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map(number =>
        // key写在这里, 就近, 即map方法中的元素需要设置key属性
        <ListItem key={number.toString()} value={number}></ListItem>
    )
    return (
        <ul>
            {listItems}
        </ul>
    )
}
const numbers = [1, 2, 3, 4, 5]
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
)

// 29 JSX中嵌入map
function NumberList(props) {
    const numbers = props.numbers;
    return (
        <ul>
            {
                numbers.map(number =>
                    <ListItem key={number.toString() value={number}}/>
                )
            }
        </ul>
    )
}

// 30 受控组件
class NameForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { value: '' }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event) {
        this.setState({ value: event.target.value })
    }
    handleSubmit(event) {
        alert('提交你的名字:' + this.state.value)
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    名字:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="提交" />
            </form>
        )
    }
}

// 31 textarea标签 通过value控制文本内容, 在正常HTML中,通过子元素定义文本内容
class EssayForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '请写你的文章'
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event) {
        this.setState({ value: event.target.value })
    }
    handleSubmit(event) {
        alert('你的文章:' + this.state.value)
        event.preventDefault()
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    文章:
                     <textarea value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="提交" />
            </form>
        )
    }
}

// 32 select标签 不在选中的option标签上配置selected属性,而是在select标签的value配置对应的
class FlavorForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { value: 'coconut' }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event) {
        this.setState({ value: event.target.value })
    }
    handleSubmit(event) {
        alert('你喜欢的风味是:' + this.state.value)
        event.preventDefault()
    }
    render() {
        <form onSubmit={this.handleSubmit}>
            <label>
                选择你喜欢的风味:
                <select value={this.state.value} onChange={this.handleChange}>
                    <option value="grapefruit">葡萄柚</option>
                    <option value="lime">酸橙</option>
                    <option value="coconut">椰子</option>
                    <option value="mango">芒果</option>
                </select>
            </label>
            <input type="submit" value="提交" />
        </form>
    }
}
// 33 select多选,配置multiple属性, value传入数组
<select multiple={true} value={['B', 'C']} />

// 34 处理多个输入, 可以给元素添加name属性,根据event.target.name的值执行操作
class Reservation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isGoing: true,
            numberOfGuests: 2
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }
    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = name === 'isGoing' ? target.checked : target.value;
        this.setState({
            [name]: value
        })
    }
    render() {
        return (
            <form>
                <label>
                    参与:
                    <input
                        name='isGoing'
                        type='checkbox'
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange}
                    />
                </label>
                <br />
                <label>
                    来宾人数:
                    <input
                        name='numberOfGuests'
                        type='number'
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange}
                    />
                </label>
            </form>
        )
    }
}

// 35 状态提升
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9
}
function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32
}
function tryConvert(temperature, convert) {
    const input = parseFloat(temperature)
    if (Number.isNaN(input)) {
        return ''
    }
    const output = convert(input)
    const rounded = Math.round(output * 1000) / 1000
    return rounded.toString();
}

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>The water would boil</p>
    }
    return <p>The water would not boil</p>
}

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
}

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        this.props.onTemperatureChange(e.target.value)
    }
    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature} onChange={this.handleChange} />
            </fieldset>
        )
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props)
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
        this.state = {
            temperature: '',
            scale: 'c'
        }
    }

    handleCelsiusChange(temperature) {
        this.setState({ scale: 'c', temperature })
    }

    handleFahrenheitChange(temperature) {
        this.setState({ scale: 'f', temperature })
    }

    render() {
        const scale = this.state.scale
        const temperature = this.state.temperature
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
        return (
            <div>
                <TemperatureInput
                    scale='c'
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange}
                />
                <TemperatureInput
                    scale='f'
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange}
                />
                <BoilingVerdict celsius={parseFloat(celsis)} />
            </div>
        )
    }
}

// 36 组合 特殊的属性 props.children 展示嵌套内容
function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    )
}

function WelcomeDialog() {
    return (
        <FancyBorder color="Blue">
            <h1 className="Dialog-title">
                Welcome
            </h1>
            <p className="Dialog-message">
                Thank you for visiting our spacecraft!
            </p>
        </FancyBorder>
    )
}

// 37 也可以将组件传入props 中 进行渲染, React元素本质就是对象,可以把他们当做props,像其他数据一样传递, 可以将任何东西作为props传递
function SplitPane(props) {
    return (
        <div className="SplitPane">
            <div className="SplitPane-left">
                {props.left}
            </div>
            <div className="SplitPane-right">
                {props.right}
            </div>
        </div>
    )
}

function App() {
    return (
        <SplitPane
            left={
                <Contacts />
            }
            right={
                <Chat />
            }
        />
    )
}
// 38 特例关系, 把一些组件看做是其他组件的特殊实例, 无论是函数式的还是class式的
function Dialog(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                {props.title}
            </h1>
            <p className="Dialog-message">
                {props.message}
            </p>
        </FancyBorder>
    )
}

function WelcomeDialog() {
    return (
        <Dialog
            title="Welcome"
            message="Thank you"
        />
    )
}

class SignUpDialog extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSignUp = this.handleSignUp.bind(this)
        this.state = { login: '' }
    }

    handleChange(e) {
        this.setState({ login: e.target.value })
    }

    handleSignUp() {
        alert('You have sign up')
    }

    render() {
        return (
            <Dialog title="Mars" message="how you">
                <input value={this.state.login} onChange={this.handleSignUp} />
                <button onClick={this.handleSignUp}>Sign me Up</button>
            </Dialog>
        )
    }
}