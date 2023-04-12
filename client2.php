<?php
/*
//Подключение конфигураций
require_once dirname(__DIR__)."/app/config.php";
//Подключение зависимостей vendor
require_once dirname(__DIR__). "/app/vendor/autoload.php";
date_default_timezone_set("Europe/Moscow");


use Models\Database;
use Workerman\Worker;
use Workerman\Connection\AsyncTcpConnection;
use Workerman\Lib\Timer;
//use Controllers\Currencys;
//use Controllers\Values;
use Models\Moduls;
use Models\CurrencyValues;
use Models\Currency;

$db = new Database();
//$currencyValues = new CurrencyValues();

$worker = new Worker();
$worker->onWorkerStart = function(){

    $worker_connection = new AsyncTcpConnection("ws://fx-gen.otv5125.ru");
    $worker_connection->onConnect = function($connection){
        Timer::add(2, function() use($connection){
        $connection->send("New connection: \n");
        });
        $currencyValues = new CurrencyValues();
        Timer::add(60, function() use($connection, $currencyValues){
            echo "new line";
            $currencyValues->createNewLine();
        });
    };
    $worker_connection->onMessage = function($connection, $data){
        $res = json_decode($data);
        $tmp = Currency::firstOrCreate(['name' => $res->name]);
        $val = CurrencyValues::where('currency_id', $tmp->id)->orderBy('id','DESC')->first();
        if($val){
            $val->value = $res->value;
            $val->save();
        }
    };
    $worker_connection->onError = function($connection, $code, $msg){
        echo "Error: ".$msg;
    };
    $worker_connection->onClose = function($connection){
        echo "Connection Close ";
    };
    $worker_connection->connect();
};

Worker::runAll();
*/