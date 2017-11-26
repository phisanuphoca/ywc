angular.module('myApp')
.factory('ApiImage', [
    "$q",
    "Request",
    "API_URL",
function($q,Request,API_URL){
    return {
        createImg:createImg
    }

    function createImg(params) {
      
        return $q(function(resolve,reject){
    		Request.callAPI({
                method: 'GET',
                url: API_URL+"create/img",
                params:params
            }).then(function(resp){
                resolve(resp)
            }, function(resp){
                console.error("ERROR",resp);
                reject(resp);
            })
        })
    }

}]);