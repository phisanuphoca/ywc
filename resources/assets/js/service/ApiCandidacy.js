angular.module('myApp')
.factory('ApiCandidacy', [
    "$q",
    "Request",
function($q,Request,API_URL){
    return {
        getInterview:getInterview
    }

    function getInterview() {
        return $q(function(resolve,reject){
    		Request.callAPI({
                method: 'GET',
                url: "https://ywc15.ywc.in.th/api/interview"
            }).then(function(resp){
                resolve(resp)
            }, function(resp){
                console.error("ERROR",resp);
                reject(resp);
            })
        })
    }

}]);