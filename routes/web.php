<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('auth/login/facebook', 'SocialLoginController@facebookAuthRedirect');
Route::get('auth/logout/facebook', 'SocialLoginController@logout');
Route::get('auth/login/facebook/index', 'SocialLoginController@facebookSuccess');

Route::get('new', 'HomeController@addnew');
Route::get('api/create/img', 'HomeController@createImg');
Route::get('/', 'HomeController@index');
Route::post('api/user/name', 'UserController@setName');


Route::get('/ts', function()
{
    $img = Image::make('foo.jpg')->resize(300, 200);

    return $img->response('jpg');
});

Route::get('check/db',function(){
	if(DB::connection()->getDatabaseName())
	{
		return "Yes! successfully connected to the DB: " . DB::connection()->getDatabaseName();
	}else{
 		return 'Connection False !!';
 	}
});