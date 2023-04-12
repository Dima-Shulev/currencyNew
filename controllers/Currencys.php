<?php

namespace Controllers;

use Models\Currency;

class Currencys{

    public static function currencyId($currency){
        $currencyId = Currency::where("name","=",$currency)->first();
        return $currencyId;
    }

    public static function allCurrency(){
        $allCurrency = Currency::select("name","id")
            ->orderBy("id","ASC")
            ->get();
        if(count($allCurrency) > 0){
            return $allCurrency;
        }
    }

}