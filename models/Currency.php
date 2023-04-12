<?php

namespace Models;

use Illuminate\Database\Eloquent\Model;

class Currency extends Model{
     protected $table = "currencys";
     protected $fillable = ["name"];
     public $timestamps = false;

    public function values(){
         return $this->hasMany("Models\Value");
     }

}
