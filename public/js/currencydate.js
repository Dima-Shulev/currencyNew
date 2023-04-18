class CurrencyDate {

    currency;
    newCurrency;
    datetime;
    options;
    select;
    online;
    nameCurrency;
    selectHow;
    howValue;
    getCur;

    option;
    data;
    chart;
    cur;
    newArray;
    lengthArr;
    checkCur;
    currencyDb;

    constructor() {
        this.currency = {};
        this.newCurrency = {};
        this.order = document.querySelector("#filter");
        this.select = document.querySelector("#select");
        this.online = document.querySelector("#online");
        this.getCur = document.querySelector("#cur");
        this.allOrder = document.querySelector("#filter");
        this.cur = {};
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
        if(this.getCur.value === "def"){
            this.writeDraw();
        }
    }

    //вывод онлайн графика выбранной валюты
    onlineCurrency(){
        this.online.onclick = () => {
            this.writeDraw();
        };
    }

    writeDraw(){
        for(const property in this.checkCur) {
            if (property === this.select.value) {
                this.getCur.value = "def";
                this.order.value = "default";
                this.drawChart(this.checkCur[property]);
                this.lengthArr = this.checkCur[property].value.length;
                if (!this.newArray[property]) this.newArray[property] = [];
                this.newArray[property].push(this.checkCur[property].value);

                if (this.checkCur[property].value.length !== this.newArray[property].length) {
                   this.drawChart(this.checkCur[property]);
                }
            }
        }
    }

    //запуск метода по выводу валют в форме
   // getCurrencyDb(){
   //     this.newAjax(this.cur,"selectCurrency.php","application/x-www-form-urlencoded");
   // }

    // скрытие и открытие элементов типа сортировки в зависимости от выбора пользователя
    /*
    orderSort(){
        this.allOrder = document.querySelector("#filter");
        this.allOrder.addEventListener("click", (event)=>{
            this.sortTimes = document.getElementById("orderTime");
            this.sortValues = document.getElementById("orderValue");

            if(event.target.value === "timeType"){
                this.sortTimes.style.display = "block";
                this.sortValues.style.display = "none";

            }else if(event.target.value === "currencyType"){
                this.sortTimes.style.display = "none";
                this.sortValues.style.display = "block";

            }else if(event.target.value === "default"){
                this.sortTimes.style.display = "none";
                this.sortValues.style.display = "none";
            }
        });
    }
*/
    //запрос к db на получение данных для графиков
 /*   ajax(bodyDate, url, ContentType) {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": ContentType
            },
            body: JSON.stringify(bodyDate)
        }).then(response => response.json())
            .then(result => this.drawChartDb(result))
    }

    //запрос к db всех валют
    newAjax(bodyDate, url, ContentType) {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": ContentType
            },
            body: JSON.stringify(bodyDate)
        }).then(response => response.json())
            .then(result => this.allCurrency(result))
    }
*/
    // вывод всех существующих валют в db
   /* allCurrency(cur) {
        for (let oneCurrency in cur) {
            this.currencyDb = document.createElement("option");
            this.currencyDb.innerText = cur[oneCurrency].name;
            this.currencyDb.value = cur[oneCurrency].name;
            this.getCur.append(this.currencyDb);
        }

        // событие при выборе конкретной валюты из бд
        this.getCur.addEventListener("click", (event) => {
            this.nameCurrency = String(event.target.value);
            this.selectHow = document.querySelector("#selectHow");
            this.howValue = document.querySelector("#selectValue");

                //сортировка по интервалам времени
                this.selectHow.addEventListener("click", (event) => {
                    if(this.selectHow.value) {
                        this.selectHow.value = event.target.value;
                        if (this.selectHow.value === "one") {
                            this.ajax(this.nameCurrency + "one", "selectInDb.php", "application/x-www-form-urlencoded");
                        }
                        if (this.selectHow.value === "five") {
                            this.ajax(this.nameCurrency + "five", "selectInDb.php", "application/x-www-form-urlencoded");
                        }
                        if (this.selectHow.value === "ten") {
                            this.ajax(this.nameCurrency + "ten", "selectInDb.php", "application/x-www-form-urlencoded");
                        }
                        if (this.selectHow.value === "fifteen") {
                            this.ajax(this.nameCurrency + "fifteen", "selectInDb.php", "application/x-www-form-urlencoded");
                        }
                        if (this.selectHow.value === "thirty") {
                            this.ajax(this.nameCurrency + "thirty", "selectInDb.php", "application/x-www-form-urlencoded");
                        }
                    }
                });

                //сортировка по значению меньше->больше или наоборот
                this.howValue.addEventListener("click", (ev) => {
                if(this.howValue) {
                    if (ev.target.value === "min") {
                        this.ajax(this.nameCurrency + "min", "selectInDb.php", "application/x-www-form-urlencoded");
                    } else if (ev.target.value === "max") {
                        this.ajax(this.nameCurrency + "max", "selectInDb.php", "application/x-www-form-urlencoded");
                    }
                }
                });
        });
    }
*/
    //вывод графика в онлайн режиме
    drawChart(obj) {
        for (let s = 0, h = 0; s < obj.time.length, h < obj.value.length; s++, h++) {
                this.data = google.visualization.arrayToDataTable([
                    ["Время", this.select.value],
                    [obj.time[s], obj.value[h]],
                    [obj.time[++s], obj.value[++h]],
                    [obj.time[++s], obj.value[++h]],
                    [obj.time[++s], obj.value[++h]],
                    [obj.time[++s], obj.value[++h]],
                    [obj.time[++s], obj.value[++h]],
                ])
        }
        this.options = {
            title: 'График котировок',
            hAxis: {title: 'Время', titleTextStyle: {color: '#333'}},
            vAxis: {minValue: 0}
        };
        this.chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
        this.chart.draw(this.data, this.options);
    }

    //вывод графика из бд в зависимости от типа и направления сортировки
   /* drawChartDb(obj) {

             let drawNow = [];
             drawNow[0] = [];
             drawNow[0][0] = "Время";
             drawNow[0][1] = this.nameCurrency;

             for (let i = 0, j = 1; i < obj.length; i++, j++) {
                 drawNow[j] = [];
                 drawNow[j][0] = obj[i].created_at;
                 drawNow[j][1] = obj[i].value;
             }

            this.data = google.visualization.arrayToDataTable(drawNow);

                 this.options = {
                     title: 'График котировок',
                     hAxis: {title: 'Время', titleTextStyle: {color: '#333'}},
                     vAxis: {minValue: 0}
                 };

                 this.chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
                 this.chart.draw(this.data, this.options);
    }

    */
}