class ResponseAjax extends CurrencyDate
{
    selectHow;
    howValue;
    currencyDb;
    nameCurrency;
    draw;

    constructor(){
        super();
    }
    //запрос и получение данных с db
    ajax(bodyDate, url, ContentType) {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": ContentType
            },
            body: JSON.stringify(bodyDate)
        }).then(response => response.json())
            .then(result => this.draw.drawChartDb(result))
            .catch(error => console.log(error))
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
            .catch(error => console.log(error))
    }
    //вывод валют из db
    getCurrencyDb(){
        this.newAjax("", "selectCurrency.php", "application/x-www-form-urlencoded");
    }

    //отправка выбора пользователя
    allCurrency(cur) {
        for (let oneCurrency in cur) {
            this.currencyDb = document.createElement("option");
            this.currencyDb.innerText = cur[oneCurrency].name;
            this.currencyDb.value = cur[oneCurrency].name;
            this.getCur.append(this.currencyDb);
        }

        this.getCur.addEventListener("click", (event) => {
            this.nameCurrency = String(event.target.value);

            this.draw = new Draw(this.nameCurrency);

            this.selectHow = document.querySelector("#selectHow");
            this.howValue = document.querySelector("#selectValue");
            //сортировка по интервалам времени
            this.selectHow.addEventListener("click", (event) => {
                if (this.selectHow.value) {
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
                if (this.howValue) {
                    if (ev.target.value === "min") {
                        this.ajax(this.nameCurrency + "min", "selectInDb.php", "application/x-www-form-urlencoded");
                    } else if (ev.target.value === "max") {
                        this.ajax(this.nameCurrency + "max", "selectInDb.php", "application/x-www-form-urlencoded");
                    }
                }
            });
        });
    }
}