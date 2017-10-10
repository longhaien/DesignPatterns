/**
 * 2.3.2
 */
(function() {
    function implements(object) {
        for (var i = 1; i < arguments.length; i++) {
            var interfaceName = arguments[i];
            var interfaceFound = false;
            for (var j = 0; j < object.implementsInterfaces.length; j++) {
                if (object.implementsInterfaces[j] == interfaceName) {
                    interfaceFound = true;
                    break;
                }
            }
            if (!interfaceFound) {
                return false;
            }
        }
        return true;
    }


    /* 
    
    interface Composite{
        function add(clild);
        function remove(child);
        function getChild(index);
    }

    interface FormItem{
        function save();
    }

    */

    var CompositeForm = function(id, method, action) {
        this.implementsInterfaces = ['Composite', 'FormItem'];
    }

    function addForm(formInstance) {
        if (!implements(formInstance, 'Composite', 'FormItem')) {
            throw new Error('object does not implement a required interface.');
        }
    }
})();


/**
 * 2.5.3
 */
(function() {
    var ResultSet = new Interface('ResultSet', ['getDate', 'getResults']);

    var ResultFormatter = function(resultsObject) {
        /*if (!(resultsObject instanceof TestResult)) {
            throw new Error('ResultFormatter: constructor requires an instance of TestResult as an argument.');
        }*/
        Interface.ensureImplements(resultsObject, ResultSet);
        this.resultsObject = resultsObject;
    }

    ResultFormatter.prototype.renderResults = function() {
        var dateOfTest = this.resultsObject.getDate();
        var resultsArray = this.resultsObject.getResults();

        var resultsContainer = document.createElement('div');

        var resultsHeader = document.createElement('h3');
        resultsHeader.innerHTML = 'Test Results from ' + dateOfTest.toLocaleString();
        resultsContainer.appendChild(resultsHeader);

        var resultsList = document.createElement('ul');
        resultsContainer.appendChild(resultsList);

        for (var i = 0, len = resultsArray.length; i < len; i++) {
            var listItem = document.createElement('li');
            listItem.innerHTML = resultsArray[i];
            resultsList.appendChild(listItem);
        }

        return resultsContainer;
    }

    var Message = function() {

    }

    Message
        .method('getDate', function() {
            return new Date();
        })
        .method('getResults', function() {
            return ['hello', 'world'];
        })

    var msg = new Message();

    var result = new ResultFormatter(msg);

    document.getElementsByTagName('body')[0].appendChild(result.renderResults());
})();
