<?php

namespace App\Http\Controllers;

use App\Models\Aranzman;
use App\Models\User;
use App\Models\Agencija;
use Illuminate\Http\Request;

use App\Http\Resources\UserResource;
use App\Http\Resources\AranzmanResource;

use App\Http\Resources\AgencijaResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rules\Password;


class AranzmanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

     //ne vidim poentu ove metode
    public function index()
    {
   
        $user = Auth::user();

        $aranzmani = $user->aranzmani;
        return AranzmanResource::collection($aranzmani);
      
     
    }




    //metoda vraca sve aranzmane
    public function indexAll()//vracanje svih aranzmana
    {
        $aranzmani=Aranzman::all();
        return AranzmanResource::collection($aranzmani);

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

     //metoda koja cuva novi aranzman
    public function store(Request $request)
    { // Check if the user is authenticated
        if (!Auth::check()) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }
    
        $validator = Validator::make($request->all(), [
            'prevoz' => 'required|string|max:100',
            'destinacija' => 'required|string|max:100',
            'cena' => 'required',
            'br_mesta' => 'required',
            'datum' => 'required',
            'picture' => 'required',

        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

    
        try {
            $aranzman = Aranzman::create([
                'prevoz' => $request->prevoz,
                'destinacija' => $request->destinacija,
                'cena' => $request->cena,
                'br_mesta' => $request->br_mesta,
                'datum' => $request->datum,
                'picture' => $request->picture,

            ]);
    
            return response()->json(['Aranzman uspesno kreiran.', new AranzmanResource($aranzman)]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Aranzman  $aranzman
     * @return \Illuminate\Http\Response
     */
    public function show(Aranzman $aranzman)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Aranzman  $aranzman
     * @return \Illuminate\Http\Response
     */
    public function edit(Aranzman $aranzman)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Aranzman  $aranzman
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,Aranzman $aranzman): JsonResponse
    {
             // Validacija
             $request->validate([
                'prevoz' => 'required|string|max:100',
                'destinacija' => 'required|string|max:100',
                'cena' => 'required',
                'br_mesta' => 'required',
                'datum' => 'required',
                'picture' => 'required',
            ]);



    
            try {
                
               // $user = User::findOrFail($user->id);
    
                
                $aranzman->update($request->all());
    
              
                return response()->json(['message' => 'Aranzman izmenjena.', 'data' => $aranzman], 200);
            } catch (\Exception $e) {
                  //npr. ako ne postoji resurs sa datim ID-jem
                return response()->json(['message' => 'Neuspesna izmena aranzmana.', 'error' => $e->getMessage()], 500);
            }
        }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Aranzman  $aranzman
     * @return \Illuminate\Http\Response
     */
    public function destroy($id): JsonResponse
    {
        
    try {
        $aranzman = Aranzman::findOrFail($id);
        $aranzman->delete();
        return response()->json(['message' => 'Aranzman uspešno obrisan.'], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Greška prilikom brisanja aranzmana.', 'error' => $e->getMessage()], 500);
    }
    }
}
