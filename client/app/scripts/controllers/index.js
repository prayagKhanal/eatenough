'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:indexCtrl
 * @description
 * # indexCtrl
 * Controller of the clientApp
 */

angular.module('clientApp')
  .controller('indexCtrl', function($scope,sharedProperties,userInfo){
  	$scope.userinfo;
  	
    $scope.addressValue = sharedProperties.getString;  

    $scope.isuserset= function(){
    	var count=0;
    	if(userInfo.getFname()!=='noname' && count <=0 ){
    		count=1;
    		$scope.userinfo = userInfo.getFname();
    	return false;

    }
    else{
    	
    	return true;
    }
};


  $scope.myAccountClick = function() {
   alert("My account");
  };
    $scope.logOutClick = function() {
   alert("Log out");
  };
});