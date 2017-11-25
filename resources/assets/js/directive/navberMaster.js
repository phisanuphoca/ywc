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