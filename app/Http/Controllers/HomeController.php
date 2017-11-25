<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Intervention\Image\ImageManagerStatic as Image;
class HomeController extends Controller
{
    public function index()
    {
    	if(Auth::check())
  		{
  			$user = Auth::User();
  			return view('index')->with('user',$user);
  		}
    	return view('index');
    	
    }

    public function addnew()
    {
      if(Auth::check())
      {
        $user = Auth::User();
        if($user->first_name != null || $user->last_name != null)
        {
            return redirect('/');
        }
      }
    	return view('newUser');
    }


    public function createImg()
    {
  
        $img = Image::make(public_path('images/ywc.png'));
        $mask = Image::canvas($img->getWidth(), $img->getHeight());  
       $img->text('พิษณุ โพคา', 480, 225, function($font) {  
          $font->file(public_path('fonts/prompt/Prompt-Regular.ttf'));  
          $font->size(28);  
          $font->color('#e1e1e1');  
          $font->align('center');  
          $font->valign('bottom');  
          // $font->angle(90);  
      });

       $img->text('PG55_', 480, 275, function($font) {  
          $font->file(public_path('fonts/prompt/Prompt-Regular.ttf'));  
          $font->size(28);  
          $font->color('#e1e1e1');  
          $font->align('center');  
          $font->valign('bottom');  
          // $font->angle(90);  
      }); 
       $img->text('web programming', 480, 325, function($font) {  
          $font->file(public_path('fonts/prompt/Prompt-Regular.ttf'));  
          $font->size(28);  
          $font->color('#e1e1e1');  
          $font->align('center');  
          $font->valign('bottom');  
          // $font->angle(90);  
      }); 

       $imgFace = Image::make('https://scontent.xx.fbcdn.net/v/t1.0-1/c35.125.764.764/s320x320/18920321_1473786459352093_7144334791244536102_n.jpg?oh=d0faf26c7f2d81af67d91922d4365b7e&oe=5A9EF09E');
       $imgFace->resize(null, 170, function ($constraint) {
            $constraint->aspectRatio();
        });
       $mask->insert($imgFace, 'top-left', 140, 182);
       $mask->insert($img);
       $mask->save(public_path('images/hardik3.jpg'));  




       return response()->json([
                         "successful"=>true
                       
                     ],200);

    }
}
