(function() {
    function Person(name) {
        this.name = name;
    }


    Person.prototype = {
        getName: function() {
            return this.name;
        }
    }



    var render = new Person('John Smith');
    console.log(render.getName());


    function Author(name, books) {
        Person.call(this, name);
        this.books = books;
    }

    Author.prototype = new Person(); // 让子类prototype指向超类的一个实例
    Author.prototype.constructor = Author; // 重新定义Author的constructor
    Author.prototype.getBooks = function() {
        return this.books;
    }

})();


/*function extend(subClass, superClass) {
    var F = function() {};
    F.prototype = superClass.prototype; // 将超类的prototype赋给一个空的function，以防止，在new的时候superClass会创建一个新实例，在new的时候，superClass会执行大量运算，或产生副作用。
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
}*/


/**
 * extend
 * @param  {Class} subClass 子类
 * @param  {Class} superClass 超类
 */
function extend(subClass, superClass) {
    var F = function() {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;

    subClass.superClass = superClass.prototype; // 为了弱化子类和超类之间的耦合，不用在子类中进行对超类的call调用，将这操作提出来，统一在extend中实现。
    if (superClass.prototype.constructor == Object.prototype.constructor) {
        superClass.prototype.constructor = superClass;
    }
}

/**
 * clone
 * @param  {Class} object
 * @return {Object}
 */
function clone(object) {
    function F() {};
    F.prototype = object;
    return new F;
}

/**
 * 多继承，掺元类
 */
function augment(receivingClass, givingClass) {
    if (arguments[2]) {
        for (var i = 2, len = arguments.length; i < len; i++) {
            receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
        }
    } else {
        for (methodName in givingClass.prototype) {
            if (!receivingClass.prototype[methodName]) {
                receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            }
        }
    }
}




/**
 * 类式继承
 */
(function() {
    var g = new Global('类式继承');
    g.start();

    function Person(name) {
        this.name = name;
    }

    Person.prototype = {
        getName: function() {
            return this.name;
        }
    }

    Person.prototype.constructor = Person;

    var render = new Person('John Smith');

    function Author(name, books) {
        Author.superClass.constructor.call(this, name);
        this.books = books;
    }

    extend(Author, Person);

    Author.prototype.getBooks = function() {
        return this.books;
    }

    // Author.prototype.getName = function() {
    //     var name = Author.superClass.getName.call(this);
    //     return name + ',Author of ' + this.getBooks().join(', ');
    // }

    var anthor = new Author('name', ['book_1']);
    console.log(anthor.getName());
    console.log(Author.superClass.getName === anthor.getName);
    g.end();
})();


/**
 * 原型式继承
 */
(function() {
    var g = new Global('原型式继承');
    g.start();
    var Person = {
        name: 'default name',
        getName: function() {
            return this.name;
        }
    }

    var p_1 = clone(Person);
    console.log(p_1.getName());

    var Author = clone(Person);
    Author.books = [];
    Author.getBooks = function() {
        return this.books;
    }

    var author = [];
    author[0] = clone(Author);
    author[0].name = 'author_0';
    author[0].books = [];
    author[0].books.push('123');

    author[1] = clone(Author);
    author[1].name = 'author_1';
    author[1].books = [];
    author[1].books.push('456');

    console.log(author[1].getName());
    console.log(author[0].getBooks());
    console.log(author[1].getBooks());
    g.end();
})();


/**
 * 4.7.1 实例：类式继承解决方案
 */
(function() {
    function EditInPlaceField(id, parent, value) {
        this.id = id;
        this.value = value || 'default value';
        this.parentElement = parent;

        this.createElements(this.id);
        this.attachEvents();
    };


    EditInPlaceField.prototype = {
        createElements: function(id) {
            this.containerElement = document.createElement('div');
            this.parentElement.appendChild(this.containerElement);

            this.staticElement = document.createElement('span');
            this.containerElement.appendChild(this.staticElement);
            this.staticElement.innerHTML = this.value;

            this.fieldElement = document.createElement('input');
            this.fieldElement.type = 'text';
            this.fieldElement.value = this.value;
            this.containerElement.appendChild(this.fieldElement);

            this.saveButton = document.createElement('input');
            this.saveButton.type = 'button';
            this.saveButton.value = 'Save';
            this.containerElement.appendChild(this.saveButton);

            this.cancelButton = document.createElement('input');
            this.cancelButton.type = 'button';
            this.cancelButton.value = 'Cancel';
            this.containerElement.appendChild(this.cancelButton);
            this.convertToText();
        },

        attachEvents: function() {
            var that = this;
            addEvent(this.staticElement, 'click', function() {
                that.convertToEditable();
            });
            addEvent(this.saveButton, 'click', function() {
                that.save();
            });
            addEvent(this.cancelButton, 'click', function() {
                that.cancel();
            })
        },
        convertToEditable: function() {
            this.staticElement.style.display = 'none';
            this.fieldElement.style.display = 'inline';
            this.saveButton.style.display = 'inline';
            this.cancelButton.style.display = 'inline';

            this.setValue(this.value);
        },
        save: function() {
            this.value = this.getValue();
            var that = this;
            var callback = {
                success: function() { that.convertToText(); },
                failure: function() { alert('Error saving value.'); }
            };
            ajaxRequest('GET', 'save.php?id=' + this.id + '&value=' + this.value, callback);
        },
        cancel: function() {
            this.convertToText();
        },
        convertToText: function() {
            this.fieldElement.style.display = 'none';
            this.saveButton.style.display = 'none';
            this.cancelButton.style.display = 'none';
            this.staticElement.style.display = 'inline';

            this.setValue(this.value);
        },

        setValue: function(value) {
            this.fieldElement.value = value;
            this.staticElement.innerHTML = value;
        },
        getValue: function() {
            return this.fieldElement.value;
        }
    };
})();


(function() {

})
