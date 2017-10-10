(function() {
    // namespace
    var GiantCorp = {};

    GiantCorp.DataParser = (function() {
        // Private attributes.
        var whitespaceRegex = /\s+/;

        // Private methods
        function stripWhitespace(str) {
            return str.replace(whitespaceRegex, '');
        }

        function stringSplit(str, delimiter) {
            return str.split(delimiter);
        }

        return {
            // Public method
            stringToArray: function(str, delimiter, stripWS) {
                if (stripWS) {
                    str = stripWhitespace(str);
                }
                var outputArray = stringSplit(str, delimiter);
                return outputArray;
            }
        };
    })();
})();


(function() {
    window.module = (function() {
        var num = 123;

        function getNumber() {
            return num;
        }

        function setNumber(newNum) {
            num = newNum;
        }

        return {
            getNumber: getNumber,
            setNumber: setNumber
        }
    })();
})();