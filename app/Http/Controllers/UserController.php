<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Auth;
class UserController extends Controller
{
    public function setName(Request $request)
    {
    	try {
		    $user = User::where('facebook_id',Auth::User()->facebook_id)->first();
	    	$user->first_name = $request->first_name;
	    	$user->last_name = $request->last_name;
	    	$user->save();
	    	return response()->json([
                             "successful"=>true,
                             "message"=>"บันทึกเรียบร้อย"
                         ],200);

		} catch (Exception $e) {
	   	 	return response()->json([
                         "successful"=>false,
                         "message"=>$e->getMessage()
                     ],422);
		}
    	
    	
    	// $user = User::where()
    }
}
