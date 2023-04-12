class СurrencyDate {

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
    allOrder;
    sortTimes;
    sortValues;
    option;
    data;
    chart;
    cur;
    newArray;
    lengthArr;

    constructor() {
        this.currency = {};
        this.newCurrency = {};
        this.select = document.querySelector("#select");
        this.online = document.querySelector("#online");
        this.getCur = document.querySelector("#cur");
        this.cur = {};
        this.newArray = {};

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
    // подгругка валют с сервера онлайн и вывод в выборе
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

        //вывод списка подгруженных валют
        this.selectForm(this.currency);

        this.lengthArr = this.currency[bodyEvent.name].value.length;
        if (!this.newArray[bodyEvent.name]) this.newArray[bodyEvent.name] = [];
        this.newArray[bodyEvent.name].push(bodyEvent.value);

        this.newLength = this.newArray[bodyEvent.name].length;


        //если выбрана валюта
        this.select.addEventListener("click", (event) => {
            if ((this.select.value === bodyEvent.name) && (event.type === "click")) {
                //если нажата кнопка онлайн
              online.addEventListener("click", () => {
                    console.log(this.lengthArr);
                    console.log(this.newLength);
                    if (this.newLength !== this.lengthArr) {
                       this.drawChart(this.currency[bodyEvent.name]);
                    }
                    this.drawChart(this.currency[bodyEvent.name]);
                });
            }
        });
    }

    //запуск метода по выводу валют в форме
    getCurrencyDb(){
        this.newAjax(this.cur,"selectCurrency.php","application/x-www-form-urlencoded");
    }

    // скрытие и открытие элементов типа сортировки в зависимости от выбора пользователя
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

    //запрос к db на получение данных для графиков
    ajax(bodyDate, url, ContentType) {
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

    // вывод всех существующих валют в db
    allCurrency(cur) {
        for (let oneCurrency in cur) {
                let option = document.createElement("option");
                option.innerText = cur[oneCurrency].name;
                option.value = cur[oneCurrency].name;
                this.getCur.append(option);
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
    drawChartDb(obj) {

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
}