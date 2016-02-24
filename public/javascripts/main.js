angular.module('JobApp', [])

angular.module('JobApp')
	.controller('homeController', ['$scope', function($scope){
		
	}]);

angular.module('JobApp')
	.controller('applicantController', ['$scope','$http', function($scope, $http){
		$http.get('/api/applicants')
			.then(function(response){
				$scope.applicants = response.data;
			});
	}]);
