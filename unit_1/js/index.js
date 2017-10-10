/**
 * Global Example
 */
(function() {
    var g_1 = new Global();
    g_1.start(); // start
    g_1.end(); // end
})();




/**
 * 1.3
 */
(function() {
    var g = new Global('1.3');
    g.start();
    var baz;
    (function() {
        var foo = 10;
        var bar = 2;
        baz = function() {
            return foo * bar;
        }
    })();
    console.log(baz()); // 20
    g.end();
})();

/**
 * 1.4
 */
(function() {
    var g = new Global('1.4');
    g.start();

    /* Class Person */
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype = {
        getName: function() {
            return this.name;
        },
        getAge: function() {
            return this.age;
        }
    }

    var alice = new Person('Alice', 93);
    var bill = new Person('Bill', 30);

    Person.prototype.getGreeting = function() {
        return 'Hi ' + this.getName() + '!';
    };

    alice.displayGreeting = function() {
        console.log(this.getGreeting());
    }

    alice.displayGreeting(); // Hi Alice!;
    //bill.displayGreeting() // error: is not a function
    g.end();
})();
