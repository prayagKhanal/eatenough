'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:RestaurantsCtrl
 * @description
 * # RestaurantsCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')

  .controller('RestaurantsCtrl', function($scope, Restaurant, restaurantValues,restaurantdetailname,$location,Restangular,$timeout) {
  	

  	 var city = restaurantValues.getCity();
  	 var street = restaurantValues.getStreet();
  	 var state = restaurantValues.getState();
  	 var lat = restaurantValues.getlat();
  	 var lng = restaurantValues.getlng();
  	 $scope.result=null;
  	 $scope.propvalue='' ;
  	 $scope.restuarants= ' ';
  	 $scope.proptop=' ';
  	

$scope.loading =true;
$timeout(function() {
       $scope.loading=false;
    }, 3000);


$scope.proptopcheck=function(){
		if($scope.proptop===1){
		
		 return true;
	}
	else{
		return false;
	}
}
  	 $scope.propvaluecheck = function(){
	if($scope.propvalue===1){
		
		 return true;
	}
	else{
		return false;
	}

};

  	if(lat&&lng){
 	 $scope.restaurants = Restaurant.post({lat:lat, lng:lng}).$object;
 
  	}
  	else{
  		$location.path("/");
  	}

   $scope.getNumber = function(num) {
        return new Array(num);   
    }
  	
 
$scope.prop = function(value){
	if(value){
		
		$scope.propvalue=0;
		$scope.proptop=1;
		
	}
	else{
		$scope.propvalue=1;
		$scope.porptop=0;
	}
return true;
};





var countrating=0;
var ratingvalue=0;

$scope.checkrating = function(value){

	if(value==ratingvalue){
		if(countrating===0){
			return true;
		}
		else{
			return false;
		}

	}
	else{
		ratingvalue = value;
		countrating=1;
		return true;
	}
};

$scope.restaurantdetailname = function(value){
	restaurantdetailname.setRestaurantName(value);
	  		$location.path("/restaurantdetails");


};
 	

  });


