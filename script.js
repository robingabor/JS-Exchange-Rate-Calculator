// lets grab the needed DOM Elements
const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");




// fethc exchange rates and update DOM
function calculate(){
    const curr1 = currencyEl_one.value;
    const curr2 = currencyEl_two.value;
    // hitting a our excange rate api endpoint with a GET request
    // fetch API returns a Promise we can catch that with a then()handler
    // but be aware that the first then handler returns not the data yet but a ReadableStream we have to format this stream into JSON object
    // thereofre we need another then() handler with the actual data
    fetch(`https://v6.exchangerate-api.com/v6/17cb15d02b1905d04c5a8fa3/latest/${curr1}`)
        .then(res => res.json())
        .then(data => {
            // get the rate
            const rate =  data.conversion_rates[curr2];
            // show the rate
            rateEl.innerText = `1 ${curr1} = ${rate} ${curr2}`;

            // calculate and set the amount 2
            amountEl_two.value = (amountEl_one.value * rate).toFixed(2);


            console.log(rate)
        }); 
    
    
}

// Event listeners

currencyEl_one.addEventListener("change",()=>{
    calculate();
})
amountEl_one.addEventListener("input",()=>{
    calculate();
})
currencyEl_two.addEventListener("change",()=>{
    calculate();
})
amountEl_two.addEventListener("input",()=>{
    calculate();
})

swap.addEventListener("click",()=>{
    // swap exchange rate values
    const tmp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value
    currencyEl_two.value = tmp;
    calculate();
});

calculate();