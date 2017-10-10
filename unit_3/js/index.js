/**
 * 3.2.1
 */
(function() {
    var g = new Global('3.2.1');
    g.start();
    var Book = function(isbn, title, author) {
        if (isbn == undefined) throw new Error('Book constructor requires an isbn.');
        this.isbn = isbn;
        this.title = title || 'No title specified';
        this.author = author || 'No author specified';
    }

    Book.prototype.display = function() {
        console.log('title:' + this.title, 'author:' + this.author, 'isbn:' + this.isbn);
    };


    var book = new Book('isbn-book1');
    book.display();
    g.end();
})();


/**
 * 3.2.3
 * 函数作用域
 */
(function() {
    var g = new Global('3.2.3');
    g.start();

    function foo() {
        var a = 10;

        function bar() {
            a *= 2;
            return a;
        }

        return bar;
    }

    var baz = foo(); //JavaScript的租用域是词法性的，将foo方法赋值给baz后，函数运行在定义的租用域中，而不是在调用的作用域中。而bar被定义在foo中，bar能访问foo的所有变量，即使foo已经结束。

    console.log(baz(), baz(), baz());
    g.end();
})();


/**
 * 3.2.4
 */
(function() {
    var g = new Global('3.2.4');
    g.start();
    var Book = function(newIsbn, newTitle, newAuthor) {
        // Private attributes
        var isbn, title, author;

        // Private method.
        function checkIsbn(isbn) {
            if (typeof isbn != 'string') {
                throw new Error('typeof isbn is not string');
            }
            return true;
        }

        // Privileged methods.
        this.getIsbn = function() {
            return isbn;
        }

        this.setIsbn = function(newIsbn) {
            if (checkIsbn(newIsbn)) {
                isbn = newIsbn;
            }
        }

        this.getTitle = function() {
            return title;
        }

        this.setTitle = function(newTitle) {
            title = newTitle || 'No title specified';
        }

        this.getAuthor = function() {
            return author;
        }

        this.setAuthor = function(newAuthor) {
            author = newAuthor || 'No author specified';
        }

        // Constructor code
        this.setIsbn(newIsbn);
        this.setTitle(newTitle);
        this.setAuthor(newAuthor);
    }

    Book
    // Public method
        .method('display', function() {
        console.log('title:' + this.getTitle() + ' author:' + this.getAuthor() + ' isbn:' + this.getIsbn());
    });

    var book = new Book('isbn-1', 'title-1', 'author-1');
    book.display();
    g.end();
})();


/**
 * 3.3.1
 */

(function() {
    var g = new Global('3.3.1');
    g.start();
    var Book = (function() {
        // Private static attributes
        var numOfBooks = 0;

        // Private static method
        function checkIsbn(isbn) {
            return typeof isbn == 'string';
        }


        // Return the constructor
        return function(newIsbn, newTitle, newAuthor) { // implements Publication
            // Private attributes
            var isbn, title, author;
            // Privileged methods.
            this.getIsbn = function() {
                return isbn;
            }

            this.setIsbn = function(newIsbn) {
                if (checkIsbn(newIsbn)) {
                    isbn = newIsbn;
                }
            }

            this.getTitle = function() {
                return title;
            }

            this.setTitle = function(newTitle) {
                title = newTitle || 'No title specified';
            }

            this.getAuthor = function() {
                return author;
            }

            this.setAuthor = function(newAuthor) {
                author = newAuthor || 'No author specified';
            }

            this.getNum = function() {
                return numOfBooks;
            }

            numOfBooks++;

            this.setIsbn(newIsbn);
            this.setTitle(newTitle);
            this.setAuthor(newAuthor);
            this.display('this display');

        }

    })();

    // Public static method.
    Book.converToTitleCase = function(inputString) {
        console.log(inputString);
    };

    // Public, non-privileged methods
    Book
        .method('display', function(msg) {
            console.log(msg || 'object display');
        });

    var book = new Book('isbn', 'title', 'author');
    console.log('num:' + book.getNum());
    var book2 = new Book('isbn', 'title', 'author');
    var book3 = new Book('isbn', 'title', 'author');
    Book.converToTitleCase('Class public static');
    book.display();
    console.log('num:' + book2.getNum());
    g.end();
})();
