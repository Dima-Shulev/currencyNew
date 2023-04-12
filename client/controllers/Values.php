<?php

namespace Controllers;

use Models\Value;

class Values{

    public static function getValues($column, $char, $item, $sort, $howSort){
        $sortValues = Value::where($column, $char, $item)->orderBy($sort, $howSort)->get();
        return $sortValues;
    }

    public static function countValues(){
        $countValues = Value::all()->count();
        return $countValues;
    }

    public static function deleteValue(){
        $deleteValue = Value::first()->delete();
        return $deleteValue;
    }
}
