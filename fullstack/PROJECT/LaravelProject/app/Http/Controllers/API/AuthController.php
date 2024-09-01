<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use App\Models\Aranzman;

class AuthController extends Controller
{

    public function register(Request $request) { //request prima parametre za registraciju
        


  




        $validator = Validator::make($request->all(),[
            'name'=>'required|string|max:50',
            'email'=>'required|string|max:50|email|unique:users',
            'password'=>['required', Password::min(8)->letters()->numbers()->mixedCase()]

        ]);


        if($validator->fails())
            return response()->json(['warnning:' => 'Sifra mora imati minimalno 8 karaktera. Mora sadrzati barem jedno veliko i barem jedno malo slovo, kao i barem 1 broj.']);

 
        
        $hashedPassword = Hash::make($request->password);

        $user = User::create([
            'name' => $request->name,
            'email'=>$request->email,
            'password'=>$hashedPassword,

        ]);


        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(['data' => $user, 'access_token' => $token, 'token_type'=>'Bearer']);






    }


    public function login(Request $request) {

 
  // Validacija unosa
  $request->validate([
    'email' => 'required|email',
    'password' => 'required',
]);

// Pokušajte da se prijavite pomoću Auth::attempt
if (Auth::attempt($request->only('email', 'password'))) {
    $user = Auth::user(); // Pronađite trenutno prijavljenog korisnika

    // Generišite token za autentifikaciju
    $token = $user->createToken('auth_token')->plainTextToken;

    // Vratite odgovor sa tokenom i informacijama o korisniku
    return response()->json([
        'message' => 'Hi, ' . $user->name . ', welcome to home.',
        'access_token' => $token,
        'token_type' => 'Bearer',
        'id' => $user->id,
        'user_role' => $user->user_role
    ]);
}

// Ako prijava nije uspela, vratite odgovor sa greškom
return response()->json(['message' => 'Unauthorized'], 401);  
           

    }
    



    public function logout(Request $request)
    {
       $request->user()->tokens()->delete();
       return response()->json(['message'=> 'Successfully logged out!']);
    }



    
}
