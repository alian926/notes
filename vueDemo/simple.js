
class Watcher {
    constructor(expr, vm, cb) {
        this.expr = expr;
        this.vm = vm;
        this.cb = cb;
        // 触发getter,找到正在执行的watcher
        this.oldValue = this.getOldValue();
    }

    getOldValue() {
        Dep.target = this;
        const oldValue = utils.getValue(this.expr, this.vm);
        Dep.target = null;
        return oldValue;
    }

    updata() {
        const newValue = utils.getValue(this.expr, this.vm);
        if (newValue !== this.oldValue) {
            this.cb(newValue);
        }
    }
}

class Dep {
    static target;
    constructor() {
        this.collect = [];
    }
    addWatcher(watcher) {
        this.collect.push(watcher)
    }
    notify() {
        this.collect.forEach(w => w.updata())
    }
}

const utils = {
    getValue(expr, vm) {
        return vm.$data[expr];
    },
    setValue(expr, vm, newValue) {
        vm.$data[expr] = newValue;
    },
    model(node, expr, vm) {
        const initValue = this.getValue(expr, vm);
        new Watcher(expr, vm, (newValue) => {
            this.modelUpdater(node, newValue)
        })
        node.addEventListener('input', e => {
            const newValue = e.target.value;
            this.setValue(expr, vm, newValue);
        })
        this.modelUpdater(node, initValue)
    },
    text(node, expr, vm) {
        // 判断来自 {{msg}} 插值表达式
        let result;
        if (expr.includes('{{')) {
            result = expr.replace(/\{\{(.+)\}\}/, (...args) => {
                // console.log('正则表达式内容', args); // ["{{msg}}", "msg", 0, "{{msg}}"]
                const realExpr = args[1].trim();
                new Watcher(realExpr, vm, (newValue) => {
                    this.textUpdater(node, newValue)
                });
                return this.getValue(realExpr, vm);
            })
        } else {
            //还是v-text
            result = this.getValue(expr, vm);
        }

        this.textUpdater(node, result)
    },
    on(node, expr, vm, eventName) {
        node.addEventListener(eventName, vm[expr])
    },
    textUpdater(node, value) {
        node.textContent = value;
    },
    modelUpdater(node, value) {
        node.value = value;
    }
}

class Compiler {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;

        const fragment = this.compileFragment(this.el)

        this.compile(fragment)

        this.el.appendChild(fragment)
    }

    compile(fragment) {
        const childNodes = Array.from(fragment.childNodes);
        childNodes.forEach(childNode => {
            if (this.isElementNode(childNode)) {
                // 标签节点 v-model v-text 
                this.compileElement(childNode)
            } else if (this.isTextNode(childNode)) {
                // 文本节点 {{}}
                this.compileText(childNode)
            }

            this.compile(childNode);
        })
    }

    compileElement(node) {
        const attrs = Array.from(node.attributes);
        attrs.forEach(attr => {
            const { name, value } = attr;
            if (this.isDirect(name)) {
                // v-model, v-bind, v-on:click
                const [, directve] = name.split('-');  // on:click
                const [compileKey, eventName] = directve.split(':')
                // 这个value其实是获取到的vm.$data上的键值, 可能是字符串也可能是表达式,如三目运算符
                utils[compileKey](node, value, this.vm, eventName)
            } else if (this.isEventName(name)) {
                // @click=""
                const [, eventName] = name.split('@');
                utils['on'](node, value, this.vm, eventName);
            }
        })
    }

    isDirect(name) {
        return name.startsWith('v-');
    }

    isEventName(name) {
        return name.startsWith('@');
    }

    compileText(node) {
        // {{ msg }}, 注意空格
        const content = node.textContent;
        if (/\{\{(.+)\}\}/.test(content)) {
            utils['text'](node, content, this.vm)
        }
    }

    isElementNode(el) {
        return el.nodeType === 1;
    }

    isTextNode(el) {
        return el.nodeType === 3;
    }

    compileFragment(el) {
        const f = document.createDocumentFragment();
        let firstChild
        while (firstChild = el.firstChild) {
            f.appendChild(firstChild)
        }
        return f
    }


}

class Observer {
    constructor(data) {
        this.observer(data);
    }

    observer(data) {
        if (data && typeof data === 'object') {
            Object.keys(data).forEach(key => {
                this.defineReactive(data, key, data[key])
            })
        }
    }

    defineReactive(data, key, value) {
        this.observer(value)
        const dep = new Dep();
        Object.defineProperty(data, key, {
            get() {
                console.log('getter ', value)
                const target = Dep.target;
                target && dep.addWatcher(target);
                return value
            },
            set(newValue) {
                console.log('setter ', newValue)
                if (value === newValue) return;
                value = newValue
                dep.notify();
            }
        })
    }
}

class Vue {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        this.$methods = options.methods;
        this.$options = options;

        new Observer(this.$data);

        this.proxyMethods(this.$methods);

        this.proxyData(this.$data);

        new Compiler(this.$el, this);
    }

    proxyMethods(methods) {
        Object.keys(methods).forEach(key => {
            Object.defineProperty(this, key, {
                get: () => {
                    return methods[key].bind(this)
                }
            })
        })
    }

    proxyData(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                get() {
                    return data[key]
                },
                set(newValue) {
                    data[key] = newValue
                }
            })
        })
    }
}

