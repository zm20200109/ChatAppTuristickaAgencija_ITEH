<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Agencija;
use App\Http\Controllers\AgencijaController;




use Illuminate\Http\Request;



class AranzmanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {


   
        $id = $this->resource->agencija_id; //RADI
        
        //$agencijaData = Agencija::find($id); 
//      $agencijaData = $this->whenLoaded('agencija'); // Ensure 'agencija' relationship is loaded
     //   $agencijaData = Agencija::get()->where('id',$id);



       return [
            'id'=>$this->resource->id,
            'cena'=>$this->resource->cena,
            'br_mesta'=>$this->resource->br_mesta,
            'datum'=>$this->resource->datum,
            'prevoz'=>$this->resource->prevoz,
            'destinacija'=>$this->resource->destinacija,
            'picture'=>$this->resource->picture,
  //         'agencija'=>new AgencijaResource($this->resource->agencija),  //relationship method!!
    
     //       'agencija' => new AgencijaResource($agencijaData),
       //    'agencija'=>new AgencijaResource($this->resource->turisticka_agencija),
      //           'agencija' => new AgencijaResource($this->resource->turisticka_agencija),
       //     'agencija'=> new AgencijaResource($this->resource->agencijaData),
               //'agencija' => agencijaData,
     //          'user'=>new UserResource($this->resource->user),
   //       'xes'=> Agencija::find($id),
    //       'a_id'=> $id  //RADI
          ];
    }




    

   /* public function with($request)
    {
        return [
            'meta' => [
                'pagination' => [
                    'total' => $this->resource->total(),
                    'count' => $this->resource->count(),
                    'per_page' => $this->resource->perPage(),
                    'current_page' => $this->resource->currentPage(),
                    'total_pages' => $this->resource->lastPage(),
                    'links' => [
                        'prev' => $this->resource->previousPageUrl(),
                        'next' => $this->resource->nextPageUrl(),
                    ],
                ],
            ],
        ];
    }*/
























}
