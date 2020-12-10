const path = require('path')
const fs = require('fs')
const vm = require('vm')

function customRequire(pathToModule) {
    const pathToModuleAbs = path.resolve(__dirname, pathToModule)
    const content = fs.readFileSync(pathToModuleAbs, 'utf-8')
    const funcWrapper = [
        '(function funcWrapper(require,module,exports,__dirname,__filename) {',
        '})'
    ]
    const result = `${funcWrapper[0]}${content}${funcWrapper[1]}`
    const script = new vm.Script(result)
    const func = script.runInThisContext()

    const m = {exports: {}}
    func(customRequire, m, m.exports)
    return m.exports
}

const requireResult = customRequire('./module.js')
console.log(requireResult)