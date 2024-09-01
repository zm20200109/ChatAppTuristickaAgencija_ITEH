<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Aranzman extends Model
{
    use HasFactory;


    public $table='aranzman';

    protected $fillable = [
       'id', 'cena',	'br_mesta',	'datum','prevoz', 'destinacija','picture'
    ];


    public function putovanja() {
        return $this->hasMany(Putovanje::class);
    }
}
