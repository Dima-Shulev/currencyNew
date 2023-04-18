class Draw{

    nameCurrency;
    date;
    options;
    chart;

    constructor(nameCurrency){
        this.nameCurrency = nameCurrency;
    }

    drawChartDb(obj) {
        let drawNow = [];
        drawNow[0] = [];
        drawNow[0][0] = "Время";
        drawNow[0][1] = this.nameCurrency;
        for (let i = 0, j = 1; i < obj.length; i++, j++) {
            drawNow[j] = [];
            drawNow[j][0] = obj[i].created_at.substring(10);
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

    drawChart(cur,obj) {
        for (let s = 0, h = 0; s < obj.time.length, h < obj.value.length; s++, h++) {
            this.data = google.visualization.arrayToDataTable([
                ["Время", cur],
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
}
