'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('AboutCtrl', function ($scope, Restaurantdetails, restaurantdetailname,$location) {
   	$scope.restaurantmenu=' ';
  $scope.dats=' ';
  $scope.dats=restaurantdetailname.getRestaurantName();
  if($scope.dats){
 $scope.restaurantmenu=Restaurantdetails.post({restaurantName:$scope.dats});
}
else{
	$location.path('/');
}
  });

