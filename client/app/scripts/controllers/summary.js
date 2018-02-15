angular.module('clientApp')

.controller('SummaryCtrl', function($scope,$location,totalItemsAndCost,ngCart)
 {
$scope.final =0 ;

$scope.subtotal=totalItemsAndCost.getSubtotal();
$scope.taxrate=totalItemsAndCost.getTaxRate();
$scope.totalcost=totalItemsAndCost.getTotalCost();
$scope.totalitems=totalItemsAndCost.getTotalItems();
$scope.items=totalItemsAndCost.getItems();

$scope.finalcost = function(value){
	 $scope.final = $scope.final + value;

};


});