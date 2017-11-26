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
              if(user!=null)
              {
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
              }
               

           })

           if(!vm.status )
           {
               vm.statusMess = "น้องยังไม่ผ่านนะครับ ไว้โอกาศหน้ามาสมัครอีกนะครับ สู้ๆนะครับ";
           }
           else
           {
             if(user!=null)
             {
              console.log(user.first_name+" "+user.last_name,vm.interviewRef,vm.statusMajor,"useruseruseruseruseruseruser");
                ApiImage.createImg({
                    name : user.first_name+" "+user.last_name,
                    ref : vm.interviewRef,
                    major : vm.statusMajor,
                    img : user.image
                })
                .then(function(res) {
                  console.log(res);
                });
             }
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