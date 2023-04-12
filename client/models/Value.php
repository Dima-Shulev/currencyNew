<?php

namespace Models;

use Illuminate\Database\Eloquent\Model;

class Value extends Model{
    protected $table = "currency_values";
    protected $fillable = ["value","currency_id","created_at"];
    public $timestamps = false;

    public function currency(){
        return $this->belongsTo("Models\Currency");
    }

}
