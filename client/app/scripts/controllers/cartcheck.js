
angular.module('clientApp')

.controller('CartCheckCtrl', function($scope,$location,totalItemsAndCost)
 {
  
$scope.loginCheck = function(subtotal,taxrate,totalcost,totalitems,items,finalcost){
totalItemsAndCost.setSubtotal(subtotal);
totalItemsAndCost.setTaxRate(taxrate);
totalItemsAndCost.setTotalCost(totalcost);
totalItemsAndCost.setTotalItems(totalitems);
totalItemsAndCost.setItems(items);
totalItemsAndCost.setFinalCost(finalcost);
$location.path('/login');
};
});


