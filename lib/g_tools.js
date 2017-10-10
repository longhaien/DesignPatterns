/**
 * Global Function 
 */
(function() {
    Function.prototype.method = function(name, fn) {
        this.prototype[name] = fn;
        return this;
    }
})();


/**
 * Class Global
 */
var Global = (function() {
    function Global(name) {
        this.name = name && name + ' ' || '';
    }

    Global
        .method('start', function() {
            console.log('================= ' + this.name + 'start =================')
        })
        .method('end', function() {
            console.log('================= ' + this.name + 'end =================');
        })

    return Global;
})();
