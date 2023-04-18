class AllSortToBlock extends CurrencyDate{

    allSort;
    sortTimes;
    sortValues;

    constructor(){
        super();
    }

    orderSort(){
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
}