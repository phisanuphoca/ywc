<!DOCTYPE html>

<html  ng-app="myApp"
		xmlns="http://www.w3.org/1999/xhtml"
      xmlns:fb="http://ogp.me/ns/fb#">
	<head>
		<meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
		<title>ประกาศผลผู้เข้ารอบสัมภาษณ์</title>

   
		<link href="https://fonts.googleapis.com/css?family=Prompt" rel="stylesheet">
		<link href="http://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
		@yield('link')
		<link href="{{ asset('css/animate.css') }}" rel="stylesheet" type="text/css" />
		<link href="{{ asset('css/app.min.css') }}" rel="stylesheet" type="text/css" />
		<link href="{{ asset('css/pp.css') }}" rel="stylesheet" type="text/css" />
		@yield('meta')
		<!-- <script type="text/javascript" src="{{asset('js/jquery-3.1.1.min.js')}}"></script> -->
	
	</head>
	<body>


		@yield('content')
		@yield('footer')
		
        <script src="{{ asset('js/jquery.js') }}" type="text/javascript"></script>
        <script src="{{asset('lib/angular/angular.min.js')}}" type="text/javascript"></script>
		<script src="{{asset('lib/angular-route/angular-route.min.js')}}" type="text/javascript"></script>
		<script src="{{asset('lib/angular-socialshare/dist/angular-socialshare.min.js')}}" type="text/javascript"></script>
    	<script src="{{ asset('js/app.js') }}" type="text/javascript"></script>

		<script type="text/javascript">
            angular.module('myApp')
            .constant("BASE_URL","{{url('/')}}/")
            .constant("API_URL","{{url('/')}}/api/")
        </script>
        @section("script")
		
        @show
	</body>
</html>