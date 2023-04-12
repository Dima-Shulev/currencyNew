class ModulTime {

    myTime;
    dateObj;
    container;

    constructor(){
       this.container = document.querySelector(".timeNow");
       this.myTime = document.createElement("div");
    }

    ajax(bodyData,url,ContentType){
        fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": ContentType
                },
                body: JSON.stringify(bodyData)
            }).then(response => response.json())
            .then(result => this.showTime(result))
    }


    showTime(timeNow){
        const hour = timeNow.getHours();
        const minutes = timeNow.getMinutes();
        const second = timeNow.getSeconds();
        this.myTime.className = "timeDate";

        this.myTime.innerText = hour + ":" + minutes + ":" + second;
        this.container.append(this.myTime);

    }

    getTimes(){
         setInterval(()=>{
             this.dateObj = new Date();
             this.showTime(this.dateObj);
         },1000);
    }
}