/**
 * 一般模式
 */
(function() {

    // Class BicycleShop
    var BicycleShop = function() {

    };

    BicycleShop.prototype = {
        sellBicyle = function(model) {
            var bicyle;
            switch (model) {
                case 'bicyle_1':
                    bicyle = new Bicyle_1();
                    break;
                case 'bicyle_2':
                    bicyle = new Bicyle_2();
                    break;
                case 'bicyle_3':
                default:
                    bicyle = new Bicyle_3();
                    break;
            }
        }
    }
})();