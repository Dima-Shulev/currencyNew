<?php

namespace Controllers;

use Models\Value;

class Values{


    public static function getSortValue($currencyId,$how){
        $getMinValue = Value::select("value","currency_id","created_at")
            ->where("currency_id",(int)$currencyId)
            ->orderBy("value",$how)
            //->take(10)
            ->get();
        if(count($getMinValue) > 0){
            return $getMinValue;
        }
    }


    public static function getDefault($currencyId){
        $valuesDefault = Value::select("value","created_at")
            ->where("currency_id","=",(int)$currencyId)
            ->orderBy("created_at","DESC")
            ->take(5)
            ->get();
        if(count($valuesDefault) > 0){
            return $valuesDefault ;
        }
    }

    public static function getOneMinute($currencyId){
        $valuesOneMinute = Value::select("value","created_at","currency_id")
            ->where("currency_id","=",(int)$currencyId)
            ->where("created_at","like","%%%%-%%-%% %%:%%:00")
            ->orderBy("created_at","DESC")
            ->take(5)
            ->get();
        if(count($valuesOneMinute) > 0){
            return $valuesOneMinute;
        }
    }

    public static function getFiveMinute($currencyId){
        $valuesFiveMinute = Value::select("value","created_at","currency_id")
            ->where([["currency_id",(int)$currencyId],["created_at","like","%%%%-%%-%% %%:%0:00"]])
            ->orWhere([["currency_id",(int)$currencyId],["created_at","like","%%%%-%%-%% %%:%5:00"]])
            ->orderBy("created_at","DESC")
            ->take(5)
            ->get();
        if(count($valuesFiveMinute) > 0){
            return $valuesFiveMinute;
        }
    }


    public static function getTenMinute($currencyId){
        $valuesTenMinute = Value::select("value","created_at","currency_id")
            ->where("currency_id",(int)$currencyId)
            ->where("created_at","like","%%%%-%%-%% %%:%0:00")
            ->orderBy("created_at","ASC")
            ->take(5)
            ->get();
        if(count($valuesTenMinute) > 0){
            return $valuesTenMinute;
        }
    }
    public static function getFifteenMinute($currencyId){
        $valuesFifteenMinute = Value::select("value","created_at")
            ->where([["currency_id","=",(int)$currencyId],["created_at","like","%%%%-%%-%% %%:15:00"]])
            ->orWhere([["currency_id","=",(int)$currencyId],["created_at","like","%%%%-%%-%% %%:30:00"]])
            ->orWhere([["currency_id","=",(int)$currencyId],["created_at","like","%%%%-%%-%% %%:45:00"]])
            ->orWhere([["currency_id","=",(int)$currencyId],["created_at","like","%%%%-%%-%% %%:00:00"]])
            ->orderBy("created_at","ASC")
            ->take(5)
            ->get();
        if(count($valuesFifteenMinute) > 0){
            return $valuesFifteenMinute;
        }
    }
    public static function getThirtyMinute($currencyId){
        $valuesThirtyMinute = Value::select("value","created_at")
            ->where([["currency_id",(int)$currencyId],["created_at","like","%%%%-%%-%% %%:00:00"]])
            ->orWhere([["currency_id",(int)$currencyId],["created_at","like","%%%%-%%-%% %%:30:00"]])
            ->orderBy("created_at","ASC")
            ->take(3)
            ->get();
        if(count($valuesThirtyMinute) > 0){
            return $valuesThirtyMinute;
        }
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
