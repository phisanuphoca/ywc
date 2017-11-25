angular.module('myApp')
.factory('Request', ["$q", "$http", function($q, $http){
    return {
        callAPI:callAPI
    }
    
    function callAPI(httpOption,noLoading){
    
        return $q(function(resolve, reject) {
            $http(httpOption)
            .then(function(response){
                resolve(response.data);
            },function(response){
                reject(response.data);
            });
        });
    }
}]);