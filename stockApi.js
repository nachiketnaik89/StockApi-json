var httpServer = require("http");  
var string = ["AAPL",   "ABBV", "ABT", "ACN",
"AIG",  "ALL",  "AMGN", "AMZN", "APA",  "APC",  "AXP",  "BA",   "BAC", "BAX",
"BIIB", "BK",   "BMY",  "BRK.B",    "C",    "CAT",  "CL",   "CMCSA", "COF",
"COP",  "COST", "CSCO", "CVS",  "CVX",  "DD",   "DIS",  "DOW",  "DVN", "EBAY",
"EMC",  "EMR",  "EXC",  "F",    "FB",   "FCX",  "FDX",  "FOXA", "GD", "GE",
"GILD", "GM",   "GOOG", "GS",   "HAL",  "HD",   "HON",  "HPQ",  "IBM", "INTC",
"JNJ",  "JPM",  "KO",   "LLY",  "LMT",  "LOW",  "MA",   "MCD", "MDLZ", "MDT",
"MET",  "MMM",  "MO",   "MON",  "MRK",  "MS",   "MSFT", "NKE", "NOV",  "NSC",
"ORCL", "OXY",  "PEP",  "PFE",  "PG",   "PM",   "QCOM", "RTN", "SBUX", "SLB",
"SO",   "SPG",  "T",    "TGT",  "TWX",  "TXN",  "UNH",  "UNP", "UPS",  "USB",
"UTX",  "V",    "VZ",   "WBA",  "WFC",  "WMT",  "XOM"].join();

httpServer.createServer(function(request,response){ 
	response.writeHead(200);
	getResponse(request,response);
 }).listen(8000);

function getResponse(request,response){ 
	var Converter =require("csvtojson").Converter;
	var converter = new Converter({ noheader:true,headers:["sticker","price","date","time","change","NA","dayHigh","dayLow","volume"]});
	converter.on("end_parsed", function (jsonObj) { 
		response.end(JSON.stringify(jsonObj));
	});  
	require("request").get("http://download.finance.yahoo.com/d/quotes.csv?s="+string+"&f=sl1d1t1c1ohgv&e=.csv").pipe(converter);
 }

