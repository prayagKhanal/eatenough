'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:RestaurantdetailsCtrl
 * @description
 * # RestaurantdetailsCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.filter('removeSpaces', [function() {
    return function(string) {
        if (!angular.isString(string)) {
            return string;
        }
        return string.replace(/[\s]/g, '');
    };
}])
 .directive('scrollTo', ['ScrollTo', function(ScrollTo){
    return {
      restrict : "AC",
      compile : function(){
        
        return function(scope, element, attr) {
          element.bind("click", function(event){
            ScrollTo.idOrName(attr.scrollTo, attr.offset);
          });
        };
      }
    };
  }])
  .service('ScrollTo', ['$window', 'ngScrollToOptions', function($window, ngScrollToOptions) {

    this.idOrName = function (idOrName, offset, focus) {//find element with the given id or name and scroll to the first element it finds
        var document = $window.document;
        
        if(!idOrName) {//move to top if idOrName is not provided
          $window.scrollTo(0, 0);
        }

        if(focus === undefined) { //set default action to focus element
            focus = true;
        }

        //check if an element can be found with id attribute
        var el = document.getElementById(idOrName);
        if(!el) {//check if an element can be found with name attribute if there is no such id
          el = document.getElementsByName(idOrName);

          if(el && el.length)
            el = el[0];
          else
            el = null;
        }

        if(el) { //if an element is found, scroll to the element
          if (focus) {
              el.focus();
          }

          ngScrollToOptions.handler(el,offset);
        }
        
        //otherwise, ignore
      }

  }])
  .provider("ngScrollToOptions", function() {
    this.options = {
      handler : function(el, offset) {
        if (offset) {
          var top = $(el).offset().top - offset;
          window.scrollTo(0, top);
        }
        else {
          el.scrollIntoView();
        }
      }
    };
    this.$get = function() {
      return this.options;
    };
    this.extend = function(options) {
      this.options = angular.extend(this.options, options);
    };
  })
.directive('setClassWhenAtTop', function ($window) {
    var $win = angular.element($window); // wrap window object as jQuery object

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
        	element='.courseselect';
            var topClass = attrs.setClassWhenAtTop, // get CSS class from directive's attribute value
              offsetTop = $(element).offset().top; // get element's top relative to the document

            $win.on('scroll', function (e) {
                if ($win.scrollTop() >= offsetTop + 100 ) {
                    $(element).addClass(topClass);
                } else {
                    $(element).removeClass(topClass);
                }
            });
        }
    };
})
  .controller('RestaurantdetailsCtrl', function($scope, Restaurantdetails,RestaurantCourse,restaurantdetailname,$location,Restangular,$filter,ngCart,$mdDialog, $mdMedia,$timeout,$anchorScroll,ScrollTo) {
  	$scope.loading =true;
$timeout(function() {
       $scope.loading=false;
    }, 3000);
  	 ngCart.setTaxRate(7.5);
    ngCart.setShipping(2.99);
  	$scope.restaurantmenu=' ';
  $scope.dats=' ';
  $scope.coursename='';
  $scope.dats=restaurantdetailname.getRestaurantName();
  if($scope.dats!==''){
  var uppername = $scope.dats;
   $scope.RestaurantCourse=RestaurantCourse.post({restaurantName:uppername}).$object;
 $scope.restaurantmenu= Restaurantdetails.post({restaurantName:uppername}).$object;

$scope.coursedetail = function(course){
	$scope.coursename=$filter('uppercase')(course);
	return true;
	
};

$scope.coursecheck = function(coursetocheck){
	var data=$filter('uppercase')(coursetocheck);
	if(data==$scope.coursename){
		return true;
	}
	else{
		return false;
	}
};


}
else{
	$location.path('/');
}

$scope.onCategoryChange=function(value){
        
                     ScrollTo.idOrName(value, 180);
          
  

      };





  

  });

