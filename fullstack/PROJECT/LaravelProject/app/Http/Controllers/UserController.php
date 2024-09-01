<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users=User::all();
       
        return UserResource::collection($users);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user=User::find($id);





        if(is_null($user))
            return response()->json('Korisnik nije pronadjena. ', 404);
        return new UserResource($user);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,User $user): JsonResponse
    {
             // Validacija
             $request->validate([
                'name'=>'required|string|max:50',
                'email'=>'required|string|max:50|email',
                'password'=>['required', Password::min(8)->letters()->numbers()->mixedCase()]
            ]);



    
            try {
                
               // $user = User::findOrFail($user->id);
    
                
                $user->update($request->all());
    
              
                return response()->json(['message' => 'User izmenjena.', 'data' => $user], 200);
            } catch (\Exception $e) {
                  //npr. ako ne postoji resurs sa datim ID-jem
                return response()->json(['message' => 'Neuspesna izmena agencije.', 'error' => $e->getMessage()], 500);
            }
    }

    public function store(Request $request)
    { // Check if the user is authenticated
        if (!Auth::check()) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }
    
        $validator = Validator::make($request->all(), [
            'name'=>'required|string|max:50',
            'email'=>'required|string|max:50|email|unique:users',
            'password'=>['required', Password::min(8)->letters()->numbers()->mixedCase()]
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

    
        try{ 

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => $request->password, //password
            ]);
    
            return response()->json(['User uspesno kreiran.', new AranzmanResource($aranzman)]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }




















    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy($id): JsonResponse
    {
        
    try {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User uspešno obrisan.'], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Greška prilikom brisanja usera.', 'error' => $e->getMessage()], 500);
    }
    }
}
