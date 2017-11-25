@extends('layouts.content')


@section('style')
@stop


@section('script')

    @parent
    <script src="{{ asset('lib/particles/particles.min.js') }}"></script>
    <script src="{{ asset('js/app-particles.js') }}"></script>

    
@stop

@section('content')
<main ng-controller="UserNewController as ctrl" >
  

   <section class="section-newuser">
        <div class="content">
            <div class="logo">
                <img src="https://ywc15.ywc.in.th/static/img/logo.png">
                <h1>กรุณาใส่ชื่อจริง นามสกุลจริง</h1>
            </div>
            <!-- <div class="ssss">
             <form onsubmit="submitFn(this, event);">
                <div class="search-wrapper">
                    <div class="input-holder">
                        <input type="text" class="search-input" placeholder="Type to search" />
                        <button class="search-icon" onclick="searchToggle(this, event);"><span></span></button>
                    </div>
                    <span class="close" onclick="searchToggle(this, event);"></span>
                    <div class="result-container">

                    </div>
                </div>
            </form>
            </div> -->

             <div class="search">

                <div ng-if="!ctrl.successful"> 
                <div class="" >
                    <input  placeholder="ชื่อ" ng-model="ctrl.name.first_name">
                    <input  placeholder="นามสกุล" ng-model="ctrl.name.last_name">
                 </div>
                 <h3 ng-if="ctrl.Error" class="error">กรุณาใส่ชื่อจริง นามสกุลจริง</h1>
                 <div class="btn-t " ng-click="editName()" ng-if="!ctrl.load">
                    <div class="btn-desc">

                        <!-- <i class="fa fa-search" aria-hidden="true"></i> -->
                        <span>ยืนยัน</span>
                        
                    </div>
                </div>
                </div>
                <div class="cssload-container" ng-if="ctrl.load && !ctrl.successful">
                <div class="cssload-speeding-wheel"></div>
                </div>
                <div class="successful-div" ng-if="ctrl.successful">
                <h3  class="successful">บันทึกสำเร็จ</h1>
                <h3  class="successful-name">ยินดีต้อนรับ คุณ@{{ctrl.name.first_name}} @{{ctrl.name.last_name}}</h1>
                  <div class="btn-t " ng-click="ctrl.home()" >
                    <div class="btn-desc">

                        <!-- <i class="fa fa-search" aria-hidden="true"></i> -->
                        <span>กลับสู๋หน้าหลัก</span>
                        
                    </div>
                </div>
                </div>
            </div>
        </div>
    </section>
   


    <div id="particles-js">
      </div>


</main>


@stop