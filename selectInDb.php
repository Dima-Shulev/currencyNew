<?php
require_once dirname(__DIR__)."/app/config.php";
require_once dirname(__DIR__). "/app/vendor/autoload.php";

use Models\Database;
use Controllers\Currencys;
use Controllers\Values;


class SelectInDb{

    protected $db;
    protected $currency;

    public function __constructor()
    {}

    public function getCurrency($post){
        $this->db = new Database();
        foreach($post as $key=>$val) {
            $currency = str_replace(["{", "\"", ":"], "", $key);
            $currency = substr($currency, 0, 6);

            $how = str_replace(["\""], "", $key);
            $how = substr($how, 6);


            if ($how === "default") {
                $currencyId = Currencys::currencyId($currency);
                $valuesData = Values::getDefault($currencyId->id);
                echo json_encode($valuesData);
            }

            if ($how === "one") {
                $currencyId = Currencys::currencyId($currency);
                $valuesData = Values::getOneMinute($currencyId->id);
                echo json_encode($valuesData);
            }

            if ($how === "five") {
                $currencyId = Currencys::currencyId($currency);
                $valuesData = Values::getFiveMinute($currencyId->id);
                echo json_encode($valuesData);
            }

            if ($how === "ten") {
                $currencyId = Currencys::currencyId($currency);
                $valuesData = Values::getTenMinute($currencyId->id);
                echo json_encode($valuesData);
            }

            if ($how === "fifteen") {
                $currencyId = Currencys::currencyId($currency);
                $valuesData = Values::getFifteenMinute($currencyId->id);
                echo json_encode($valuesData);
            }

            if ($how === "thirty") {
                $currencyId = Currencys::currencyId($currency);
                $valuesData = Values::getThirtyMinute($currencyId->id);
                echo json_encode($valuesData);
            }

            if ($how === "min") {
                $currencyId = Currencys::currencyId($currency);
                $valuesData = Values::getSortValue($currencyId->id,"ASC");
                echo json_encode($valuesData);
            }
            if ($how === "max") {
                $currencyId = Currencys::currencyId($currency);
                $valuesData = Values::getSortValue($currencyId->id,"DESC");
                echo json_encode($valuesData);
            }
        }

    }
}
$timeNow = new SelectInDb();
$timeNow->getCurrency($_POST);

$countValues = Values::countValues();
   if ($countValues >= 1000) {
      $delValue = Values::deleteValue();
       return json_encode($delValue);
   };
