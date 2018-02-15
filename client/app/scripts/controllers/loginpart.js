'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginPartCtrl
 * @description
 * # LoginPartCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('LoginPartCtrl', function($scope,$timeout,$location,User,Restangular,Authenticate,userInfo){
  
 $scope.asguest = function(){
 	$location.path('/summary');
 };
 $scope.loo=false;
 $scope.err=false;

var vm = this;

        $scope.register = function (){
        	alert("register");
            vm.dataLoading = true;
            User.post({fname:$scope.vm.user.fname, lname:$scope.vm.user.lname , email:$scope.vm.user.email, phone:$scope.vm.user.phone, password:$scope.vm.user.password});
            $location.path('/');
            vm.dataLoading = false;
        }

 $scope.login = function(){

 	vm.dataLoading = true;
 	$scope.token=Authenticate.post({email:$scope.vm.loginemail, password:$scope.vm.loginpassword}).$object;
 	
$scope.loo =true;

$scope.loofunction = function (value, fname){
	if(value===true){
	
		userInfo.setFname(fname);
		$location.path('/');
	}
	if(value!==true){
		$timeout(function() {
       $scope.err=true;
    }, 1000);
	}
	
 };
}






});