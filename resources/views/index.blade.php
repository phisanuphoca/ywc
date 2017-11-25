@extends('layouts.content')


@section('style')
@stop

@section('meta')
    
    
@stop

@section('script')

    @parent
    <script src="{{ asset('lib/particles/particles.min.js') }}"></script>
    <script src="{{ asset('js/app-particles.js') }}"></script>
     <script type="text/javascript">$(".facebook").css("display", "block");</script>

    
@stop

@section('content')

@if(Auth::check())
<main ng-controller="IndexController as ctrl" ng-init="init({{ $user}})">
@else
<main ng-controller="IndexController as ctrl" ng-init="init()">
@endif


   <section class="section-header" >
        <div class="content">
            <div class="logo">
                <img src="https://ywc15.ywc.in.th/static/img/logo.png">
                <h1>ประกาศผู้มีสิทธิ์เข้าสัมภาษณ์</h1>

            </div>
            @if(Auth::check())
            <div class="facebook" ng-if="!ctrl.loadpage" style="display: none;">
                <img src="{{ $user->image}}">
                <div class="status"> @{{ ctrl.statusMess}}</div>
                <div class="status" ng-if="ctrl.status"> @{{ ctrl.interviewRef}}</div>
                <div class="status" ng-if="ctrl.status"> @{{ ctrl.statusMajor}}</div>
            </div>
            @endif

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

             <div class="search" >
                 @if(Auth::check())
                <div class="btn-t share" ng-click="share()" ng-if="ctrl.status">
                    <div class="btn-desc">
                        <i class="fa fa-facebook-square" aria-hidden="true"></i>
                        <span>แชร์</span>
                        
                    </div>
                </div>
                @endif
                <div class="btn-t " ng-click="isSearch = !isSearch">
                    <div class="btn-desc">
                        <i class="fa fa-search" aria-hidden="true"></i>
                        <span>ค้นหา</span>
                        
                    </div>
                </div>
                @if(!Auth::check())
                <div class="btn-t " >
                    <div class="btn-desc" ng-click="Facebook()">
                        <!-- <i class="fa fa-search" aria-hidden="true"></i> -->
                        <span>เข้าสู่ระบบ Facebook</span>
                        
                    </div>
                </div>
                @else
                <div class="btn-t " >
                    <div class="btn-desc" ng-click="logout()">
                        <!-- <i class="fa fa-search" aria-hidden="true"></i> -->
                        <span>ออกจากระบบ</span>
                        
                    </div>
                </div>
                @endif
                <div class="slow @{{ isSearch  ? 'zoomIn' : 'zoomOut' }} animated">
                    <input ng-model="searchText" placeholder="กรุณากรอกข้อมูลที่ต้องการค้นหา">
                    <div class="search-result">
                    
                        <div class="item"  ng-repeat="item in filteredItems = ( searchAll | filter:searchText | orderBy : 'interviewRef')">
                            <div ng-if="searchText">@{{ item.interviewRef+"   "+item.firstName+" "+item.lastName}}</div>
                        </div>
                        <div class="item" ng-hide="filteredItems.length">ไม่พบข้อมูลในระบบ</div>
                    </div>
                 </div>
            </div>
        </div>
    </section>
    <section class="section-menu">
    	<div class="content">
    		<div class="menu">
    			
                <div class="item">
                     <div class="item-content clearfix @{{ isSelect=='content' ? 'active' : '' }}" ng-click="ctrl.getListByMajor('content')">
                         <img src="https://ywc15.ywc.in.th/static/img/roles/content.png">
                         <div>
                             <h2 class="">web content</h2>
                         </div>
                     </div>
                </div>
                <div class="item">
                     <div class="item-content clearfix @{{ isSelect=='design' ? 'active' : '' }}" ng-click="ctrl.getListByMajor('design')">
                         <img src="https://ywc15.ywc.in.th/static/img/roles/design.png">
                         <div>
                             <h2 class="">web design</h2>
                         </div>
                     </div>
                </div>  
                <div class="item">
                     <div class="item-content clearfix @{{ isSelect=='marketing' ? 'active' : '' }}" ng-click="ctrl.getListByMajor('marketing')">
                         <img src="https://ywc15.ywc.in.th/static/img/roles/marketing.png">
                         <div>
                             <h2 class="">web marketing</h2>
                         </div>
                     </div>
                </div>  
                <div class="item">
                     <div class="item-content clearfix @{{ isSelect=='programming' ? 'active' : '' }}" ng-click="ctrl.getListByMajor('programming')">
                         <img src="https://ywc15.ywc.in.th/static/img/roles/programming.png">
                         <div>
                             <h2 class="">web programming</h2>
                         </div>
                     </div>
                </div>     
    		</div>
    	</div>
    </section>

    <section class="section-question">
        <div class="content">
            <div class="question-panal clearfix">
                <div class="head-panal clearfix">
                    <h3>@{{ homeworkView.title}} </h3> 
                </div>
                <div class="content-panal" ng-bind-html="homeworkView.question">
                 

                </div>
            </div>
        </div>
    </section>

    <section class="section-list">
        <div class="content">
            <div class="list-panal clearfix">
                <div class="head-panal clearfix">
                    <h3>รายชื่อผู้มีสิทธิ์เข้าสัมภาษณ์</h3> 
                </div>
                <div class="content-panal clearfix">
                    <div class="left-panal clearfix">
                     
                        <div class="item"  ng-repeat="item in collectionView | orderBy : 'interviewRef'" ng-if="$index < (collectionView.length / 2)">
                        @{{ item.interviewRef+"   "+item.firstName+" "+item.lastName}}
                        </div>
                       
                    </div >
                    <div class="right-panal clearfix">
                        <div class="item"  ng-repeat="item in collectionView  | orderBy : 'interviewRef'" ng-if="$index > (collectionView.length / 2)">
                        @{{ item.interviewRef+"   "+item.firstName+" "+item.lastName}}
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