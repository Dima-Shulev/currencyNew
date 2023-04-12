<?php

namespace Models;

use Illuminate\Database\Eloquent\Model;


class CurrencyValues extends Model{
     protected $table = "currency_values";
     protected $fillable = [
         "currency_id",
         "value",
         "created_at",
     ];
    public $timestamps = false;

    public function createNewLine(){
        $currency = new Currency();
        $res = $currency->select(['id','name'])->groupBy('name')->get();
        if(count($res) > 0){
            foreach ($res as $item) {
                $lastVal = CurrencyValues::where('currency_id', $item->id)->orderBy('id','DESC')->first();
                $val = ($lastVal)?$lastVal->value:0;
                CurrencyValues::create([
                    'currency_id' => $item->id,
                    'value' => $val,//todo
                    'created_at' => Date("Y-m-d H:i:00")
                ]);
            }
        }
    }
}