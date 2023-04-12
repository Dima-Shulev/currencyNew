<?php
//Подключение конфигураций
require_once dirname(__DIR__)."/app/config.php";
//Подключение зависимостей vendor
require_once dirname(__DIR__). "/app/vendor/autoload.php";

use Models\Database;

try{
    new Database();
}catch(PDOException $e){
    echo "Ошибка соединения с DB ". $e->getMessage();
}

//Подключение главной страницы приложения
require "public/index.html";
