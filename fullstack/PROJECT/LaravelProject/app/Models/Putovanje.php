<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Putovanje extends Model
{
    use HasFactory;



    
    public $table='putovanje';

    protected $fillable = [
       'id', 'user_id', 'aranzman_id',
    ];




    public function aranzman() {
        return $this->belongsTo(Aranzman::class);
    }
    
    
    public function user() {
        return $this->belongsTo(User::class);
    }
}
