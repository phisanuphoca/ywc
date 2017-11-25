angular.module('myApp')
.factory('ApiUser', [
    "$q",
    "Request",
    "API_URL",
function($q,Request,API_URL){
    return {
        setName:setName
    }

    function setName(data) {
      
        return $q(function(resolve,reject){
    		Request.callAPI({
                method: 'POST',
                url: API_URL+"user/name",
                data : data
            }).then(function(resp){
                resolve(resp)
            }, function(resp){
                console.error("ERROR",resp);
                reject(resp);
            })
        })
    }

}]);