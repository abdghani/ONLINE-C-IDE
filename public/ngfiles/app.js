var app = angular.module('ide',['ngSanitize','ui.codemirror','angularModalService','ngResource'])


app.factory('session',function GetSession($http,$q,$rootScope){
	var defer = $q.defer();

    $http.get('/login/logincheck')
	.success(function(data){
		if(data!='0'){
			$rootScope.currentUser = data;
			defer.resolve('done')
		}
		else{
			$rootScope.currentUser = null;
			defer.resolve('done')
		}
	})
    return defer.promise;
})



app.factory('usercode',function($resource){
	return $resource('/usercode/:id')
})