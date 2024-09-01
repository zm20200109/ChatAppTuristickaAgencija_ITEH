<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AgencijaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AranzmanController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\ChatGptController;
use App\Http\Controllers\BrosuraController;
use App\Http\Controllers\PutovanjeController;
use Illuminate\Http\JsonResponse; // Ensure this import is correct
use App\Http\Controllers\ChatController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::post('/chat', [ChatController::class, 'chatWithPython']);


// NEULOGOVANI USER

//NEULOGOVANI KORISNIK SME DA VIDI SAMO AGENCIJE KOJE VRSE USLUGE
//mozda mi je najbolje da admin moze da azurira sve agencije i da ih cuva

Route::resource('/putovanja', PutovanjeController::class); //resource ruta svih agencija koje usluzuju
//Route::resource('/agencije', AgencijaController::class); //resource ruta svih agencija koje usluzuju
//Route::get('agencija/{id}', [AgencijaController::class,'show']); // resource ruta neke agencije

//vrati bukvalno sve aranzmane
Route::get('/aranzmani',[AranzmanController::class,'indexAll']);
Route::get('/brosure',[BrosuraController::class,'index']);


//0. login and register rute za usera i admina
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);


///Route::post('sacuvaj_agenciju', [AgencijaController::class, 'store']);
//Route::put('azuriraj_agenciju/{id}', [AgencijaController::class, 'update']);
//Route::delete('obrisi_agenciju/{id}', [AgencijaController::class, 'destroy']);


//ADMIN
Route::group(['middleware'=>['auth:sanctum', 'admin']], function () {

//hocu da samo admin sme da vidi sve usere
Route::resource('/users', UserController::class); //resource ruta svih usera koje usluzuju
Route::delete('obrisi_usera/{id}', [UserController::class, 'destroy']);
Route::get('user/{id}', [UserController::class, 'show']); // resource ruta nekog usera
Route::put('users/{id}',[UserController::class, 'update']); //update usera


//rad nad aranzmanima
//imas rutu koja vraca sve aranzmane i ovde i na glavnom delu home-a
Route::post('aranzmani', [AranzmanController::class, 'store']); //get all aranzmani
Route::put('aranzmani/{id}',[AranzmanController::class,'update']); //update aranzman
Route::delete('obrisi_aranzman/{id}', [AranzmanController::class, 'destroy']);//obrisi aranzman

//rad nad putovanjima??? -> rezervacija
//post, delete - pa udjes kao admin umesto usera i obezbedis preko njegovog profila post putovanja sa njegovim kredencijalima






//Route::put('azuriraj_agenciju/{id}', [AgencijaController::class, 'update']);
//Route::post('sacuvaj_agenciju', [AgencijaController::class, 'store']);
//npr neka admin brise agenciju ovde takodje 
});




Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::get('/profile', function(Request $request) {
        return auth()->user();
    });
    Route::get('moja_putovanja',[PutovanjeController::class, 'getAllUser']); //redirect na login putanju neulogovanog usera!! 
    Route::post('sacuvaj_putovanje',[PutovanjeController::class,'storePutovanje']);
    Route::delete('obrisi_putovanje/{id}', [PutovanjeController::class, 'destroy']);

    Route::post('/logout', [AuthController::class, 'logout']);


    });