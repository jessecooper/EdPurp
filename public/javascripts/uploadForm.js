(function(angular) {
  'use strict';
   angular.module('radioForm', [])
       .controller('tSelection', ['$scope', function($scope) {
	 $scope.formHandle = function(event) {	
		if (event.target.value == "book") 
		{
			$scope.isbnVar = true;
        		//$scope.checked = true;
		}
		else if (event.target.value == "movie")
		{
			$scope.isbnVar = false;
			$scope.isbn = null;
		}
		else if (event.target.value == "music")
		{
			$scope.isbnVar = false;	
			$scope.isbn = null;
		}
		else if (event.target.value == "app")
		{
			$scope.isbnVar = false;	
			$scope.isbn = null;
		}
		else if (event.target.value == "game")
		{
			$scope.isbnVar = false;	
			$scope.isbn = null;
		}
	 };
   }]);
})(window.angular);
