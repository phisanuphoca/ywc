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


    public function createImg(Request $request)
    {
          
          $img = Image::make(public_path('images/ywc.png'));
          $mask = Image::canvas($img->getWidth(), $img->getHeight());  
          $img->text($request->has('name') ? $request->name : '', 480, 225, function($font) {  
            $font->file(public_path('fonts/prompt/Prompt-Regular.ttf'));  
            $font->size(28);  
            $font->color('#e1e1e1');  
            $font->align('center');  
            $font->valign('bottom');  
            // $font->angle(90);  
          });

          $img->text($request->has('ref') ? $request->ref : '', 480, 275, function($font) {  
            $font->file(public_path('fonts/prompt/Prompt-Regular.ttf'));  
            $font->size(28);  
            $font->color('#e1e1e1');  
            $font->align('center');  
            $font->valign('bottom');  
            // $font->angle(90);  
          }); 
          $img->text($request->has('major') ? $request->major : '', 480, 325, function($font) {  
            $font->file(public_path('fonts/prompt/Prompt-Regular.ttf'));  
            $font->size(28);  
            $font->color('#e1e1e1');  
            $font->align('center');  
            $font->valign('bottom');  
            // $font->angle(90);  
          }); 

          $imgFace = Image::make($request->has('img') ? $request->img : '');
          $imgFace->resize(null, 170, function ($constraint) {
              $constraint->aspectRatio();
          });
          $mask->insert($imgFace, 'top-left', 140, 182);
          $mask->insert($img);
          $mask->save(public_path('images/hardik3.jpg'));  
        
        




       return response()->json([
                         "successful"=>$request->all()
                     ],200);

    }
}
