'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */

angular
  .module('clientApp', [
  
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
      
    'ngAutocomplete',
    'restangular',
    'ngMaterial',
    'ngMessages', 
    'ngCart',
    
    
  ])
   .service('viewSlideIndex', function () {
    var viewIndex;
    return {
        getViewIndex: function () {
            return viewIndex;
        },
        setViewIndex: function (val) {
            viewIndex = val;
        }
    };
})
    .service('userInfo', function () {
    var fname='noname';
    return {
        getFname: function () {
            return fname;
        },
        setFname: function (val) {
            fname = val;
        }
    };
})
   .service('totalItemsAndCost',function(){
    var subtotal;
    var taxrate;
    var totalcost;
    var totalitems;
    var items;
    var finalcost;
    return {
        getSubtotal: function() {
            return subtotal;
        },
        setSubtotal: function(value) {
            subtotal = value;
        },
        getTaxRate: function() {
            return taxrate;
        },
        setTaxRate: function(value) {
            taxrate = value;
        },
        getTotalCost: function() {
            return totalcost;
        },
        setTotalCost: function(value) {
            totalcost = value;
        },
        getTotalItems: function() {
            return totalitems;
        },
        setTotalItems: function(value) {
            totalitems = value;
        },
        getItems: function() {
            return items;
        },
        setItems: function(value) {
            items = value;
        },
         getFinalCost: function() {
            return finalcost;
        },
        setFinalCost: function(value) {
            finalcost = value;
        }
    };
  })
   
  .service('restaurantdetailname',function(){
    var restaurantname="Creasian Taste of the Himalayas";

    return {
        getRestaurantName: function() {
            return restaurantname;
        },
        setRestaurantName: function(value) {
            restaurantname = value;
        }
    };
  })
  .service('sharedProperties', function() {
    var addressValue;
   
    
    return {
        getString: function() {
            return addressValue;
        },
        setString: function(value) {
            addressValue = value;
        }
    };
})
   .service('restaurantValues', function() {
    var streetAddress;
    var city;
    var state;
    var lat;
    var lng;
   
    
    return {
       getlat: function() {
            return lat;
        },
        getlng: function() {
            return lng;
        },
        getStreet: function() {
            return streetAddress;
        },
        getCity: function(){
            return city;
        },
        getState: function(){
            return state;
        },
        setStreet: function(streetValue) {
            streetAddress = streetValue;
        },
        setCity: function(cityValue) {
            city = cityValue;
        },
        setState: function(stateValue) {
            state = stateValue;
        },
        setlat: function(latValue) {
            lat = latValue;
        },
        setlng: function(lngValue) {
            lng = lngValue;
        }
    };
})
  .config(function ($routeProvider, RestangularProvider) {
    
    RestangularProvider.setBaseUrl('http://localhost:3000');
  
 
    
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
       .when('/login', {
        templateUrl: 'views/login.html',
          controller: 'LoginPartCtrl',
        controllerAs: 'loginpart'
       
      })
       .when('/summary', {
        templateUrl: 'template/ngCart/summary.html'
       
      })
       .when('/checkout', {
        templateUrl: 'template/ngCart/checkout.html',
        controller: 'CheckoutCtrl',
        controllerAs: 'checkout'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/movies', {
        templateUrl: 'views/movies.html',
        controller: 'MoviesCtrl',
        controllerAs: 'movies'
      })
      .when('/restaurants', {
        templateUrl: 'views/restaurants.html',
        controller: 'RestaurantsCtrl',
        controllerAs: 'restaurants'
      })
       .when('/menu', {
        templateUrl: 'views/menu.html',
        controller: 'MenuCtrl',
        controllerAs: 'menu'
      })
       .when('/restaurantdetails', {
        templateUrl: 'views/restaurantdetails.html',
        controller: 'RestaurantdetailsCtrl',
        controllerAs: 'restaurantdetails'
      })
    
.when('/pg1', {
        templateUrl: 'pg1.html',
        controller: 'CartCheckCtrl'
    })
.when('/pg2', {
        templateUrl: 'pg2.html',
        controller: 'CartCheckCtrl'
    })
.when('/pg3', {
        templateUrl: 'pg3.html',
        controller: 'CartCheckCtrl'
    })
  .otherwise({
        redirectTo: '/'
      })


  })
  .config(function(RestangularProvider) {

    // add a response interceptor
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
      var extractedData;
      // .. to look for getList operations
      if (operation === "getList" || operation === "post") {
        // .. and handle the data and meta data

        extractedData = data.result;
        
        // if(extractedData[0]['success']==true){
        //   extractedData='1';

        // }
        // else{
        //    extractedData='0';
        // }
        // extractedData.street= data.name.street;
        // extractedData.name = data.name.name;
      } else {
        extractedData = data;
      }
      return extractedData;
    });

})
  .factory('MenuRestangular', function(Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer){
      RestangularConfigurer.setRestangularFields({
        id : '_id'
      });
    });
  })
  .factory('Menu', function(MenuRestangular){
    return MenuRestangular.service('menu');
  })
  .factory('MapRestangular', function(Restangular){
    return Restangular.withConfig(function(RestangularConfigurer){
      RestangularConfigurer.setRestangularFields({
        id : '_id'
      });
    });
  })
  .factory('Mapprocess', function(MapRestangular){
    return MapRestangular.service('mapprocess');
  })
   .factory('RestaurantRestangular', function(Restangular){
    return Restangular.withConfig(function(RestangularConfigurer){
      RestangularConfigurer.setRestangularFields({
        id : '_id'
      });
    });
  })
  .factory('Restaurant', function(RestaurantRestangular){
    return RestaurantRestangular.service('restaurant');
  })
  .factory('RestaurantdetailsRestangular', function(Restangular){
    return Restangular.withConfig(function(RestangularConfigurer){
      RestangularConfigurer.setRestangularFields({
        id : '_id'
      });
    });
  })
  .factory('Restaurantdetails', function(RestaurantdetailsRestangular){
    return RestaurantdetailsRestangular.service('restaurantdetails');
  })
  .factory('RestaurantCourseRestangular', function(Restangular){
    return Restangular.withConfig(function(RestangularConfigurer){
      RestangularConfigurer.setRestangularFields({
        id : '_id'
      });
    });
  })
  .factory('RestaurantCourse', function(RestaurantCourseRestangular){
    return RestaurantCourseRestangular.service('restaurantcourse');
  })
  .factory('UserRestangular', function(Restangular){
    return Restangular.withConfig(function(RestangularConfigurer){
      RestangularConfigurer.setRestangularFields({
        id : '_id'
      });
    });
  })
  .factory('User', function(UserRestangular){
    return UserRestangular.service('signup');
  })
   .factory('AuthenitcationRestangular', function(Restangular){
    return Restangular.withConfig(function(RestangularConfigurer){
      RestangularConfigurer.setRestangularFields({
        id : '_id'
      });
    });
  })
  .factory('Authenticate', function(AuthenitcationRestangular){
    return AuthenitcationRestangular.service('authenticate');
  });
  
