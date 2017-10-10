(function() {
    Function.prototype.method = function(name, fn) {
        this.prototype[name] = fn;
        return this;
    }

    var api = api || (function() {
        return function() {

        }
    })();

    api
        .method('add', function() {
            console.log('add');
        })
        .method('del', function() {
            console.log('del');
        })

    window.test = new api();
    test.add();
    test.del();
})();


/**
 * 链式调用
 * 每个方法都放回对象的应用。
 * 让类的每个方法都返回this值，即可使用链式调用。
 * 如果要让所有方法都适配链式调用，将需要返回值的方法在回调中执行，return还是返回this 
 */
(function() {
    var API = API || (function() {

        return function() {
            var name = 'monkey';

            this.getName = function() {
                return name;
            }
            this.setName = function(newName) {
                name = newName;
                return this;
            }
        };
    })();

    var new_api = new API();
    new_api.setName('monkey_1');
    console.log(new_api.getName());

    var API2 = API2 || (function() {
        return function() {
            var firstName = 'monkey';
            var lastName = 'loong'

            this.setFirstName = function(newFirstName) {
                firstName = newFirstName;
                return this;
            }

            this.setLastName = function(newLastName) {
                lastName = newLastName;
                return this;
            }

            this.getName = function(callback) {
                var _this = this;
                return typeof callback == 'function' ?
                    (function() {
                        callback.call(_this, firstName, lastName);
                        return _this;
                    })() :
                    firstName + lastName;
            }
        };
    })();

    var new_api2 = new API2();

    console.log(new_api2.getName());
    new_api2
        .getName(console.log)
        .setFirstName('firstName')
        .setLastName('lastName')
        .getName(console.log);
})();