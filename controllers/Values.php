<?php

namespace Controllers;

use Models\Value;

class Values{

    public $timeDate;

    public function __constructor(){
    }

    public static function getSortValue($currencyId,$how){
        $getMinValue = Value::select("value","currency_id","created_at")
            ->where("currency_id",(int)$currencyId)
            ->orderBy("value",$how)
            ->take(5)
            ->get();
        if(count($getMinValue) > 0){
            return $getMinValue;
        }
    }
    public static function getDefault($currencyId){
        $valuesDefault = Value::select("value","created_at")
            ->where("currency_id","=",(int)$currencyId)
            ->orderBy("created_at","ASC")
            ->take(5)
            ->get();
        if(count($valuesDefault) > 0){
            return $valuesDefault ;
        }
    }
    public static function getOneMinute($currencyId){
        $strtotime = strtotime("-6 minutes");
        $timeDate = Date("Y-m-d H:i:s",$strtotime);
        $valuesOneMinute = Value::select("value","created_at","currency_id")
            ->where("currency_id","=",(int)$currencyId)
            ->where([["created_at","like","%%%%-%%-%% %%:%%:00"],["created_at",">",$timeDate]])
            ->orderBy("created_at","ASC")
            ->take(5)
            ->get();
        if(count($valuesOneMinute) > 0){
            return $valuesOneMinute;
        }
    }

    public static function getFiveMinute($currencyId){
        $strtotime = strtotime("-30 minutes");
        $timeDate = Date("Y-m-d H:i:s",$strtotime);
        $valuesFiveMinute = Value::select("value","created_at","currency_id")
            ->where([["currency_id",(int)$currencyId],["created_at","like","%%%%-%%-%% %%:%0:00"],["created_at",">",$timeDate]])
            ->orWhere([["currency_id",(int)$currencyId],["created_at","like","%%%%-%%-%% %%:%5:00"],["created_at",">",$timeDate]])
            ->orderBy("created_at","ASC")
            ->take(5)
            ->get();
        if(count($valuesFiveMinute) > 0){
            return $valuesFiveMinute;
        }
    }
    public static function getTenMinute($currencyId){
        $strtotime = strtotime("-55 minutes");
        $timeDate = Date("Y-m-d H:i:s",$strtotime);
        $valuesTenMinute = Value::select("value","created_at","currency_id")
            ->where("currency_id",(int)$currencyId)
            ->where([["created_at","like","%%%%-%%-%% %%:%0:00"],["created_at",">",$timeDate]])
            ->orderBy("created_at","ASC")
            ->take(5)
            ->get();
        if(count($valuesTenMinute) > 0){
            return $valuesTenMinute;
        }
    }
    public static function getFifteenMinute($currencyId){
        $strtotime = strtotime("-85 minutes");
        $timeDate = Date("Y-m-d H:i:s",$strtotime);
        $valuesFifteenMinute = Value::select("value","created_at")
            ->where([["currency_id","=",(int)$currencyId],["created_at","like","%%%%-%%-%% %%:15:00"],["created_at",">",$timeDate]])
            ->orWhere([["currency_id","=",(int)$currencyId],["created_at","like","%%%%-%%-%% %%:30:00"],["created_at",">",$timeDate]])
            ->orWhere([["currency_id","=",(int)$currencyId],["created_at","like","%%%%-%%-%% %%:45:00"],["created_at",">",$timeDate]])
            ->orWhere([["currency_id","=",(int)$currencyId],["created_at","like","%%%%-%%-%% %%:00:00"],["created_at",">",$timeDate]])
            ->orderBy("created_at","ASC")
            ->take(5)
            ->get();
        if(count($valuesFifteenMinute) > 0){
            return $valuesFifteenMinute;
        }
    }
    public static function getThirtyMinute($currencyId){
        $strtotime = strtotime("-200 minutes");
        $timeDate = Date("Y-m-d H:i:s",$strtotime);
        $valuesThirtyMinute = Value::select("value","created_at")
            ->where([["currency_id",(int)$currencyId],["created_at","like","%%%%-%%-%% %%:00:00"],["created_at",">",$timeDate]])
            ->orWhere([["currency_id",(int)$currencyId],["created_at","like","%%%%-%%-%% %%:30:00"],["created_at",">",$timeDate]])
            ->orderBy("created_at","ASC")
            ->take(5)
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
