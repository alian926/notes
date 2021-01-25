function isObject(obj) {
    return obj !== null && typeof obj === 'object'
}

function isValidMap(map) {
    return Array.isArray(map) || isObject(map)
}

function normalizeMap(map) {
    if (!isValidMap(map)) {
        return []
    }
    return Array.isArray(map) ?
        map.map(key => ({
            key,
            val: key
        })) :
        Object.keys(map).map(key => ({
            key,
            val: map[key]
        }))
}

// 适配器模式
function normalizeNamespace(fn) {
    return (namespace, map) => {
        if (typeof namespace !== 'string') {
            map = namespace
            namespace = ''
        } else if (namespace.charAt(namespace.length - 1) !== '/') {
            namespace += '/'
        }
        return fn(namespace, map)
    }
}

const mapState = normalizeNamespace((namespace, states) => {
    const res = {}
    normalizeMap(states).forEach(({
        key,
        val
    }) => {
        res[key] = function mappedState() {
            // let state = this.$store.state
            // let getters = this.$store.getters
            let state = {
                userInfo: {
                    name: 'Bob',
                    year: 22
                }
            }
            let getters = {}
            return typeof val === 'function' ? val.call(this, state, getters) : state[val]
        }
        // mark vuex getter for devtools
        res[key].vuex = true
    })
    return res
})

// mapState执行后得到 值为函数的对象, 在computed选项中, 都是getter,需要执行其函数本身,或者对象的get方法 将得到的值映射到 vm 上

console.log(52, mapState({
    userInfo: (state) => state.userInfo,
}))