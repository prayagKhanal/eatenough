// 'use strict';

// /**
//  * @ngdoc function
//  * @name clientApp.controller:MainCtrl
//  * @description
//  * # MainCtrl
//  * Controller of the clientApp
//  */
// angular.module('clientApp')
//   .controller('MainCtrl', function($scope, Mapprocess){
  
//    // if($scope.details{'address_components'}){
//    //  alert($scope.details['address_components']);
//    // }


//     $scope.change = function () {
//       var addr = $scope.result;


   
    
      
//       var res = addr.split(",");
//       if(res[0] && res[1] && res[2]){
        
//       var pushdata = { 
//                         state: res[2].trim(),
//                         city: res[1].trim(),
//                         street: res[0].trim()
//                       };
//     $scope.returned=Mapprocess.post(pushdata).$object;

// $scope.myvalue= $scope.returned;
//   }


   
     
// // $scope.returnvalue = $scope.returned.data[name[name]];
   
//        // $scope.restaurants = Mapprocess.getList().$object;
  



//     };

 

//      // $scope.restaurants = Restaurants.getList("restaurant").$object;

 

//     //        // use $.param jQuery function to serialize data from JSON 
//     //         var data = $.param({
//     //             address: $scope.result,
                
//     //         });
        
//     //         var config = {
//     //             headers : {
//     //                 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
//     //             }
//     //         };

//         //     $http.post('/mapprocess', data, config)
//         //     .success(function (data, status, headers, config) {
//         //         $scope.PostDataResponse = data;
//         //     })
//         //     .error(function (data, status, header, config) {
//         //         $scope.ResponseDetails = data +
//         //               status +
//         //              header +
//         //             config;
//         //     });
//         // };

  

//     // $scope.options = null;
//     // $scope.details = '';
   
//     // var input = document.getElementById('searchInput');

//     // var autocomplete = new google.maps.places.Autocomplete(input);
   
   
   

//     // autocomplete.addListener('place_changed', function() {
//     //    var place =autocomplete.getPlace();
//     //    console.log(place);
//     //    console.log(autocomplete.getPlace().formatted_address);

//     // if (place) {
//     //        var latvariable= place.geometry.location.lat();
//     //        var longvariable= place.geometry.location.lng();
//     //        alert (latvariable+"\nlong"
//     //         + longvariable);
//           //  var address1 =autocomplete.getPlace().formatted_address;
           
//           // var address2 = "1009 Liberty St, El Cerrito, CA 94530, USA";


//           //  directionsService = new google.maps.DirectionsService();
         
           
//           //   var request = {
//           //      origin:address1,
//           //      destination:address2,
//           //      travelMode: google.maps.DirectionsTravelMode.DRIVING
//           //   };
//           //   directionsService.route(request, function(response, status)
//           //   {
//           //      if (status == google.maps.DirectionsStatus.OK)
//           //      {
           
//           //         distance = "The distance between the two points on the chosen route is: "+response.routes[0].legs[0].distance.text;
//           //         distance += "The aproximative driving time is: "+response.routes[0].legs[0].duration.text;
//           //         document.getElementById("distance_road").innerHTML = distance;
//           //      }
//           //   });


//   //       }
//   //   else{
//   //     alert("not a lat");
//   //   }
//   // });

//   });
