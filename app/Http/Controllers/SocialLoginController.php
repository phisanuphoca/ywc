<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Socialite;
use Hash;
use Auth;
use App\User;
class SocialLoginController extends Controller
{
    public function facebookAuthRedirect() {
		return Socialite::with('facebook')->redirect();
	}


	public function facebookSuccess(Request $request) {
	 
		$provider = Socialite::with('facebook');
	
		
		if ($request->has('code')){
			$facebookUser = $provider->stateless()->user();
			

			$userInDB = $this->checkUser($facebookUser->id);
			if($userInDB)
			{
				$this->updateUser($facebookUser->id,$facebookUser->avatar);
				Auth::login($userInDB);
				
			}
			else
			{
				$userInDB = $this->register($facebookUser->email,$facebookUser->name,substr($facebookUser->token,0,10),$facebookUser->id,$facebookUser->avatar);

				Auth::login($userInDB);
				
			}
			$user = Auth::User();
			if($user->first_name==null || $user->last_name==null){
				return redirect('/new');
			}
			return redirect('/');
		}
		
		
	}
	private function checkUser($facebook_id){
		$user = User::where('facebook_id',$facebook_id)->first();
		return $user;
	}
	private function updateUser($facebook_id,$image){
		$user = User::where('facebook_id',$facebook_id)->first();
		if($user!=null)
		{
			$user->image = $image;
			$user->save();
		}
		return $user;
	}
 	private function register($email,$name,$password,$facebook_id,$avatar){
 		$user = new User;
		$user->email = $email;
		$user->name = $name;
		$user->image = $avatar;
		$user->password = Hash::make($password."YWC_"); // Hash::make
		$user->facebook_id = $facebook_id;
		$user->save();
 
		return $user;
 	}

 	public function logout()
 	{
 		if(Auth::check())
 		{
 			Auth::logout();
 		}
 		return redirect('/');
 		

 	}
}
