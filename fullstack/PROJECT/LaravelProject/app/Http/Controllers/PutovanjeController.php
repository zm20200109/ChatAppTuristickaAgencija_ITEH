<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Putovanje;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\PutovanjeResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;




class PutovanjeController extends Controller
{
    
    public function index()//vracanje svih putovanja
    {
        $putovanja=Putovanje::all();
        return PutovanjeResource::collection($putovanja);

    }



    public function getAllUser()
    {
   
        $user = Auth::user();

        $putovanja = $user->putovanja;
        return PutovanjeResource::collection($putovanja);
      
     
    }


    public function storePutovanje(Request $request){
//prepravi ovu metodu i dodaj novi interfjes model u angular-u

        { // Check if the user is authenticated
            if (!Auth::check()) {
                return response()->json(['error' => 'User not authenticated'], 401);
            }
        
            $validator = Validator::make($request->all(), [
             
                'user_id' => 'required',
                'aranzman_id' => 'required',
            ]);
        
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }
        
            // Retrieve the authenticated user
            $user = Auth::user();
        
            // Check if the user ID is available
            if (!$user || !$user->id) {
               return response()->json(['error' => 'User ID not available'], 400);
            }
        
            try {
                $putovanje = Putovanje::create([

                  //  'id' => $request->id,
                    'user_id'=> $user->id,
                    'aranzman_id'=>$request->aranzman_id
                    
                ]);
        
                return response()->json(['Aranzman uspesno kreiran.']);
            } catch (Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        }
    }




    public function destroy($id): JsonResponse
    {
        
    try {
        $putovanje = Putovanje::findOrFail($id);
        $putovanje->delete();
        return response()->json(['message' => 'Putovanje uspešno obrisano.'], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Greška prilikom brisanja putovanja.', 'error' => $e->getMessage()], 500);
    }
    }
















}
