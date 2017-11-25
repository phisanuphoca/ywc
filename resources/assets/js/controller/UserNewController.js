angular.module('myApp')
.controller('UserNewController',[
	"$scope",
  "ApiUser",
  
    "$window",
    "BASE_URL",
function($scope,ApiUser,$window,BASE_URL) {
	vm = this;
  vm.messageError = "";
  vm.Error = false;
  vm.name = {
      first_name : "",
      last_name : ""
  }

  vm.load = false;
  vm.successful = false;
  vm.home = home;

  $scope.editName = function editName(argument) {


      if(vm.name.first_name!="" && vm.name.last_name!=""){
         vm.load = true;
        console.log(vm.name);
          vm.successful = true;
           vm.Error = false;
          ApiUser.setName(vm.name)
          .then(function(res) {

             console.log('res');
          },function(res) {
             console.log("error");
          })
         
      }
      else
      {
        vm.Error = true;
          vm.messageError = "กรุณากรอกข้อมูลให้ครบถ้วน"
      }
  }



  function home() {
   
       $window.location.href = BASE_URL;
   }





    
}]);