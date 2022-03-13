/*
Displays the current Satoshi/EUR exchange rate
*/
const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=bitcoin`;
const req = new Request(url)
const apiReq = await req.loadJSON()

function satoshiPrice() {
	
	const price = apiReq[0].current_price / 100000000
	const price_change = apiReq[0].price_change_percentage_24h
	return {price:price,price_change:price_change}
	
}

function createWidget() {
	
	let widgetL = new ListWidget()
	let descr = widgetL.addText("Satoshi")
	descr.font = Font.boldSystemFont(15)
	descr.centerAlignText()
	
	//displays current price
	widgetL.addSpacer(7)
	const sData = satoshiPrice()
	let amountSats = widgetL.addText(sData.price + ''+'€')
	amountSats.textColor = Color.orange()
	amountSats.centerAlignText()
	
	//displays 24h change
	widgetL.addSpacer(7)
	let price_change = widgetL.addText(sData.price_change + ''+'%')
	if (price_change >= 0) {
		price_change.textColor = Color.green()
	}
	else {
		price_change.textColor = Color.red()
	}
	price_change.centerAlignText()
	return widgetL
}

let mWidget = createWidget()


if (config.runsInWidget) {
// create widget 
Script.setWidget(mWidget)
Script.complete()
}
else {
mWidget.presentSmall()
}