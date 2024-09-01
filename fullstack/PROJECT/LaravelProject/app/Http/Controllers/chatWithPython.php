<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class chatWithPython extends Controller
{
    public function chatWithPython(Request $request)
    {
        $client = new Client();
        $apiUrl = 'http://localhost:5000/chat'; // URL vašeg Python servera
        $prompt = $request->input('prompt');

        try {
            $response = $client->post($apiUrl, [
                'json' => ['prompt' => $prompt],
            ]);

            $responseData = json_decode($response->getBody(), true);
            return response()->json($responseData);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
