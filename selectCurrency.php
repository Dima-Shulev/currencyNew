<?php

require_once dirname(__DIR__)."/app/config.php";
require_once dirname(__DIR__)."/app/vendor/autoload.php";

use Models\Database;
use Controllers\Currencys;

class SelectCurrency{

    protected $db;

    public function __constructor(){}

    public function getCurrencys(){
        $this->db = new Database();
            $currencys = Currencys::allCurrency();
            echo json_encode($currencys);

   }
}
$currencys = new SelectCurrency;
$currencys->getCurrencys();