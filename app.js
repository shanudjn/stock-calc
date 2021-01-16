var apiKey = "YFP9V17BQF706RYS";
// var apiKey = 0;
var stockList = document.querySelector('#stocks-list');
var price = document.querySelector('#price');
var quantity = document.querySelector('#quantity');
var checkBtn = document.querySelector('#check');
var loadingPara = document.querySelector('#loading');

var upEmoji = "🔼";
var downEmoji = "🔽";



checkBtn.addEventListener("click", handleClick)

function handleClick() {
    let stockName = stockList.value;
    let priceValue = price.value;
    let quantityValue = quantity.value;
    console.log(stockName, priceValue, quantityValue)

    getCurrentStockPrice(stockName);

}

function getCurrentStockPrice(stockName) {
    var url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + stockName + "&apikey=" + apiKey;
    let stockPrice = 0;
    loadingPara.innerText = "Loading ..."
    fetch(url)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            handleJSON(json);
            loadingPara.innerText = ""

        })

}
function handleJSON(json) {
    var result = json["Global Quote"]
    console.log(result);
    var stockPrice = result["05. price"];
    console.log(stockPrice);
}


