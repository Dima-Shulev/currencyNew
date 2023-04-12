<?php

namespace Controllers;

use Models\Currency;

class Currencys{

    public static function newCurrency($currency)
    {
        $create = Currency::firstOrCreate(["name" => $currency]);
        return $create;
    }


}