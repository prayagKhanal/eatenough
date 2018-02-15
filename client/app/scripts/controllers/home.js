'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('HomeCtrl', function($scope,sharedProperties,$location,restaurantValues,$timeout){
  
   // if($scope.details{'address_components'}){
   //  alert($scope.details['address_components']);
   // }

   $scope.loading =true;
$timeout(function() {
       $scope.loading=false;
    }, 3000);
   $scope.returned=0;
   $scope.details ='';
   $scope.latitude='';
   $scope.longitude='';
   $scope.latvar=function(){

   };
    $scope.lngvar=function(){

   };
 
   
    $scope.change = function () 
    {
      var addr = $scope.result; 
      var res = addr.split(",");
      if(res[0] && res[1] && res[2])
      {
        sharedProperties.setString(addr);
        restaurantValues.setStreet(res[0].trim());
        restaurantValues.setCity(res[1].trim());
        restaurantValues.setState(res[2].trim());
        
        $scope.latvar = function(value,value1){
          $scope.latitude =value;
          restaurantValues.setlat($scope.latitude);
          $scope.longitude =value1;
          restaurantValues.setlng($scope.longitude);
        };

           // varreturned = Mapprocess.post({lat:$scope.latitude, lng:$scope.longitude});
           var justcheck=sharedProperties.getString();
           if(addr===justcheck){
        $location.path("/restaurants");
      }
      else{
        alert(justcheck);
      }
      };
    }
  });
