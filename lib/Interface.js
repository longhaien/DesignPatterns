/**
 * Author: Monkey
 * Date: 2017.06.14
 */

/**
 * Class Interface
 * @param {String} name 接口名称
 * @param {StrArray} methods 接口实现方法，字符串数组
 */
var Interface = function(name, methods) {
    if (arguments.length != 2) {
        throw new Error(
            'Interface constructor called with ' +
            arguments.length +
            'arguments, but expected 2.'
        );
    }

    this.name = name;
    this.methods = [];
    for (var i = 0, len = methods.length; i < len; i++) {
        if (typeof methods[i] != 'string') {
            throw new Error('Interface contructor expects method names to be passed in as a string.')
        }
        this.methods.push(methods[i]);
    }
};

/**
 * 检查借口是否实现
 * @param  {object} object 必须要两个以上的参数，第一个是实现借口的对象，第二个参数开始对象需要用到的借口。
 * @return null
 */
Interface.ensureImplements = function(object) {
    if (arguments.length < 2) {
        throw new Error(
            'Function Interface.ensureImplements called widt ' +
            arguments.length +
            'arguments, but expected at least 2.'
        );
    }

    for (var i = 1, len = arguments.length; i < len; i++) {
        var interface = arguments[i];
        if (interface.constructor !== Interface) {
            throw new Error(
                'Function Interface.ensureImplements ' +
                'expects arguments twe and above to be instances of Interface.'
            );
        }

        for (var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {
            var method = interface.methods[j];
            if (!object[method] || typeof object[method] !== 'function') {
                throw new Error(
                    'Function Interface.ensureImplements: object dose not implement the ' +
                    interface.name + ' interface. method ' + method + ' was not found.'
                );
            }
        }
    }
};