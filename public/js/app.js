angular.module('myApp',['ngRoute','720kb.socialshare']);





// $(document).ready(function(){
// 	$(".navbar-container").on("click", function(){
// 		// $("nav ul").toggleClass("showing");
// 		// $(".span-bar").toggleClass("showing-span");
// 		console.log('test');
// 	});
// });



angular.module('myApp')
.controller('IndexController',[
	"$scope",
    "ApiCandidacy",
    "$sce",
    "$window",
    "BASE_URL",
    "Socialshare",
    "ApiImage",
function($scope,ApiCandidacy,$sce,$window,BASE_URL,Socialshare,ApiImage) {
	vm = this;
    vm.collection = {};
    vm.getListByMajor = getListByMajor;
    $scope.searchAll=[];
    $scope.isSelect = null;
    $scope.collectionView = [];
    $scope.homeworkView = "";
    $scope.Facebook = Facebook;
     $scope.logout = logout;
    $scope.init = init;
    $scope.share = share;

    vm.loadpage = true;
    vm.status = false;
    vm.statusMess = "";
    vm.statusMajor = "";
    vm.interviewRef = "";
    var homework = {
        "content" : {
            "title" : "การบ้านสาขาคอนเทนท์",
            "question" : "ให้น้อง ๆ เลือกทำคอนเทนต์ใด คอนเทนต์หนึ่งจาก 2 หัวข้อด้านล่าง โดยต้องทำเป็นคอนเทนต์ออกมาจริงเท่านั้น ไม่จำกัดรูปแบบการนำเสนอหัวข้อที่ให้เลือก<ul><li>1. คอนเทนต์ที่ทำให้ผู้ใช้ Social เข้าใจ Cyberbullying และตระหนักถึงปัญหาที่เกิดขึ้นจาก Cyberbullying</li><li>2. คอนเทนต์ที่ทำให้คนไทยเปลี่ยนพฤติกรรมเสพติดหน้าจอ เสพติด Social หันมาพูดคุยกัน เจอหน้ากันในชีวิตจริง ๆ มากกว่าที่เป็นอยู่</li><ul>",
        },

        "design" : {
            "title" : "การบ้านสาขาดีไซน์",
            "question" : "ให้ผู้ผ่านเข้ารอบสัมภาษณ์ออกแบบเว็บไซต์ของ \"คณะรักษาความสงบแห่งชาติ หรือ คสช.\" เพื่อเป็นสื่อกลางในการประชาสัมพันธ์นโยบายต่าง ๆ และเป็นสื่อกลางระหว่างประชาชนกับคณะรักษาความสงบแห่งชาติ โดยให้ออกแบบในลักษณะของ One Page Design Website<p>** สำหรับผู้ผ่านเข้ารอบสัมภาษณ์คนใดทำ CSS มา คณะกรรมการจะพิจารณาเป็นพิเศษ<p>",
        },
        "marketing" : {
            "title" :  "การบ้านสาขามาร์เก็ตติ้ง",
            "question" : "ให้ทำแผนการตลาด (Marketing Plan) สำหรับเว็บไซต์หนึ่งเว็บไซต์ โดยเลือกเว็บไซต์ใด ๆ ก็ได้ ทั้งเว็บไซต์ของไทยและเว็บไซต์ของต่างประเทศ<br>นำเสนอในรูปแบบพรีเซนเทชั่น ไม่เกิน 10 หน้า ภายในเวลา 5 นาที",
        },
        "programming" : {
            "title" :  "การบ้านสาขาโปรแกรมมิ่ง",
            "question" : "ให้เขียน เว็บไซต์ประกาศผลผู้ผ่านเข้ารอบสัมภาษณ์ของ YWC#15 โดยใช้ข้อมูลจาก API โดยมี Feature ดังนี้• ดึงข้อมูลจาก API โดยตรง<ul><li>ให้แสดงผลแยกแต่ละสาขา</li><li>มีระบบค้นหาชื่อผ่านกล่อง Search</li><li>ความสามารถหรือ Feature พิเศษอื่น ๆ ที่มีความแตกต่าง </li></ul>และแสดงความสามารถของน้องออกมาให้ได้มากที่สุดเมื่อทำเสร็จแล้วให้ Push Source Code ขึ้น GitHub ก่อนเวลาสัมภาษณ์",
        }
    }

    function init(user) {

      console.log(user);
        ApiCandidacy.getInterview()
        .then(function(res){

           console.log(res);
           $scope.searchAll = res;
           res.forEach(function(person) {
               if(!vm.collection[person.major])
               {
                    vm.collection[person.major] = new Array(person);
               }
               else
               {
                    vm.collection[person.major].push(person);
               }
     
               if(!status && person.firstName == user.first_name && person.lastName == user.last_name)
               {
                  vm.statusMess  = "ยินดีด้วยครับ น้อง"+user.first_name+" "+user.last_name+" ผ่านเข้ารอบสัมภาษณ์";
                  vm.status = true;
                  switch(person.major) {
                      case "content":
                          vm.statusMajor = "web content";
                          break;
                      case "design":
                          vm.statusMajor = "web design";
                          break;
                      case "marketing":
                          vm.statusMajor = "web marketing";
                          break;
                      case "programming":
                          vm.statusMajor = "web programming";
                          break;
                      default:
                          vm.statusMajor = "";
                          break;
                  }
                 vm.interviewRef = person.interviewRef+"_";
               }

           })

           if(!vm.status )
           {
               vm.statusMess = "น้องยังไม่ผ่านนะครับ ไว้โอกาศหน้ามาสมัครอีกนะครับ สู้ๆนะครับ";
           }
           else
           {
              ApiImage.createImg()
              .then(function(res) {
                console.log(res);
              });
             
           }
           vm.loadpage = false;

           console.log(vm.collection);
        },function(res){
            console.log("ไม่สามารถดึงข้อมูลได้");
        })


    }
   

   function getListByMajor(major) {
       $scope.isSelect = major;
      $scope.collectionView = vm.collection[major];
      $scope.homeworkView = {
            "title" : homework[major].title,
            "question" :$sce.trustAsHtml(homework[major].question)
      }
      console.log($scope.collectionView);
   }
   function share(e){
        


    Socialshare.share(
    {
        'provider': 'facebook',
        'attrs': {
            'socialshareUrl': 'http://onestone.eng.src.ku.ac.th/~asusinwza/share.html'
        },
        'conf' : {
            'trigger': 'click'
        }
    });

   }
   function Facebook() {
   
       $window.location.href = BASE_URL+"auth/login/facebook";
   }
    function logout() {
   
       $window.location.href = BASE_URL+"auth/logout/facebook";
   }






    
}]);
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
// angular.module('myApp')
// .directive("navbarMaster",[
//     "BASE_URL",
//     "$location",
//     "$window",
// function(BASE_URL , $location, $window){
//     return {
//         scope:{

//         },
//         templateUrl: BASE_URL+"templates/navbar-master.html",
//         link:function(scope,element,attr){
//             console.log(BASE_URL,'navbarMaster');
//             scope.BASE_URL = BASE_URL;
//             scope.route = route;
//             scope.isActive = false;
//             function route(name){
//                 switch(name) {
//                     case 'tracking' :
//                         return BASE_URL+"tracking";
//                     case 'home' :
//                         return BASE_URL+"";
//                     case 'review' :
//                         return BASE_URL+"review";
//                     case 'contact' :
//                         return BASE_URL+"contact";
//                     default:
//                         return BASE_URL+"";
//                 }
//             }

//             scope.go = function ( path ) {
//                 switch(name) {
                   
//                     case 'home' :
//                         $window.location.href = BASE_URL;
//                         break;
                       
//                     case 'review' :
//                         console.log('ss');
//                         $window.location.href = BASE_URL+"review";
//                         break;
//                     default:
//                         $window.location.href = BASE_URL;
//                         break;
//                 }
               
//             };
//             scope.toggle = function ( e ) {
               
//                 scope.isActive = !scope.isActive;
        
//             };



//         }

      
//     }
// }]);
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
angular.module('myApp')
.factory('ApiImage', [
    "$q",
    "Request",
    "API_URL",
function($q,Request,API_URL){
    return {
        createImg:createImg
    }

    function createImg() {
      
        return $q(function(resolve,reject){
    		Request.callAPI({
                method: 'GET',
                url: API_URL+"create/img"
            }).then(function(resp){
                resolve(resp)
            }, function(resp){
                console.error("ERROR",resp);
                reject(resp);
            })
        })
    }

}]);
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