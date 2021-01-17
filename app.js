var apiKey = "YFP9V17BQF706RYS";
// var apiKey = 0;
var stockList = document.querySelector('#stocks-list');
var price = document.querySelector('#price');
var quantity = document.querySelector('#quantity');
var checkBtn = document.querySelector('#check');
var loadingPara = document.querySelector('#loading');

var upEmoji = "🔼";
var downEmoji = "🔻";

var stockNameHeaderOne = document.querySelector('#header-one');
var stockNameHeaderTwo = document.querySelector('#header-two');

var differenceHeader = document.querySelector('#profit-loss-amount');
var percentageHeader = document.querySelector('#profit-loss-percentage');

var emoji = document.querySelector('#emoji');
var percEmoji = document.querySelector('#perc-emoji')



checkBtn.addEventListener("click", handleClick)

function handleClick() {
    let stockName = stockList.value;
    let priceValue = price.value;
    let quantityValue = quantity.value;
    console.log(stockName, priceValue, quantityValue)

    getCurrentStockPrice(stockName, priceValue, quantityValue);

}

function getCurrentStockPrice(stockName, price, quantity) {
    var url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + stockName + "&apikey=" + apiKey;
    let stockPrice = 0;
    loadingPara.innerText = "Loading ..."
    fetch(url)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            calculate(json, price, quantity);
            loadingPara.innerText = ""

        })

}
function calculate(json, price, quantity) {
    var result = json["Global Quote"]
    // console.log(result);
    var stockPrice = result["05. price"];
    // console.log(stockPrice);
    let difference;
    let userBuyPrice = price * quantity;
    let currentPrice = stockPrice * quantity;
    difference = currentPrice - userBuyPrice;
    console.log(difference)
    handleOutput(difference, userBuyPrice);
}

function handleOutput(difference, userBuyPrice) {
    stockNameHeaderOne.innerText = stockList.value;
    stockNameHeaderTwo.innerText = stockList.value;
    var percentage = difference / userBuyPrice * 100
    if (difference < 0) {
        differenceHeader.innerText = difference.toFixed(2) + downEmoji;
        percentageHeader.innerText = percentage.toFixed(2) + "%" + downEmoji;

        // differenceHeader.style.color = "#876583"

    }
    else {
        differenceHeader.innerText = difference.toFixed(2) + upEmoji;
        percentageHeader.innerText = percentage.toFixed(2) + "%" + upEmoji;
    }
}


