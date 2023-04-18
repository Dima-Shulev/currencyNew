class CurrencyDate {
    currency;
    newCurrency;
    datetime;
    options;
    select;
    online;
    getCur;
    option;
    data;
    chart;
    newArray;
    lengthArr;
    checkCur;
    draws;

    constructor() {
        this.currency = {};
        this.newCurrency = {};
        this.order = document.querySelector("#filter");
        this.getCur = document.querySelector("#cur");
        this.select = document.querySelector("#select");
        this.newArray = {};
        this.onlineCurrency();
    }

    chartsGoogle() {
        google.charts.load("current", {packages: ["corechart"]});
        google.charts.setOnLoadCallback(this.connectChart);
    }

    connectChart = () => {
                let socket = new WebSocket("ws://fx-gen.otv5125.ru");
                socket.onopen = function () {
                    setInterval(() => {
                        socket.send(2);
                    }, 1000)
                };
                socket.onclose = function (event) {
                    if (event.wasClean) {
                    } else {
                    }
                };
                socket.onmessage = (event) => {
                    this.parseDate(JSON.parse(event.data));
                socket.onerror = function (error) {
                alert("Ошибка " + error.message);
            };
        }
    }

    // подгрузка валют с сервера онлайн и вывод в выборе
    selectForm(bodyEvent) {
        for (let property in bodyEvent) {
            if (!this.newCurrency[property]) {
                if (property !== "datetime") {
                    this.newCurrency[property] = bodyEvent[property];
                    this.option = document.createElement("option");
                    this.option.className = "option";
                    this.option.innerText = property;
                    this.select.append(this.option);
                }
            }
        }
    }

    parseDate(bodyEvent) {
        if (!this.currency[bodyEvent.name]) {
            this.currency[bodyEvent.name] = {};
        }
        this.dateTime = new Date();
        this.dateTime = this.dateTime.getHours() + ":" + this.dateTime.getMinutes() + ":" + this.dateTime.getSeconds();
        if (!this.currency[bodyEvent.name].time) {
            this.currency[bodyEvent.name].time = [];
        }
        this.currency[bodyEvent.name].time.push(this.dateTime);
        if (!this.currency[bodyEvent.name].value) {
            this.currency[bodyEvent.name].value = [];
        }
        this.currency[bodyEvent.name].value.push(bodyEvent.value);
        this.checkCur = this.currency;
        //вывод списка подгруженных валют
        this.selectForm(this.currency);
        //если валюта из истории не выбрана, а стоит по умолчанию срабатывает валюта выбранная в онлайне
        //разделение онлайн от статики
        if(this.getCur.value === "def"){
            this.writeDraw();
        }
    }

    //вывод онлайн графика выбранной валюты
    onlineCurrency(){
        this.online = document.querySelector("#online");
        this.online.onclick = () => {
            this.writeDraw();
        };
    }

    writeDraw(){
        for(const property in this.checkCur) {
            if (property === this.select.value) {
                this.getCur.value = "def";
                this.order.value = "default";

                this.draws = new Draw();
                this.draws.drawChart(this.select.value,this.checkCur[property]);

                this.lengthArr = this.checkCur[property].value.length;
                if (!this.newArray[property]) this.newArray[property] = [];
                    this.newArray[property].push(this.checkCur[property].value);
                if (this.checkCur[property].value.length !== this.newArray[property].length) {
                    this.draws.drawChart(this.select.value,this.checkCur[property]);
                }
            }
        }
    }
}