/*
	1. grab image from file input
	2. convert to base64, strip base64 tags if necessary
	3. send request to Google Vision
	4. store whole text response (if any)
	5. search text for known beers
	   - add findings to results (for UI)
	   - remove any found in text
	6. split remaining text by line break, remove any blank strings
	7. search reamining strings in BreweryDB
	8. match results against queries
	   - add results within Levenshtein threshold to results (for UI)
	9. return results to UI
*/

function loadBeerStore(callback){
	var req = new XMLHttpRequest(),
		beerStore = JSON.parse(localStorage.getItem('beerStore'));
	req.onreadystatechange = function(){
		// if request is ready...
		if (req.readyState === XMLHttpRequest.DONE) {
			var jsonRes = JSON.parse(req.response);
			localStorage.setItem('beerStore', req.response);
			// if we have a callback, run it
			if(callback !== null || callback !== undefined){
				callback(jsonRes);
			}
		}
	}
	// open request, set content type, and send
	req.open('GET', 'js/beerStore.json', true);
	req.setRequestHeader('Content-Type', 'application/json');
	// if there's no beerStore in localStorage, grab the .json
	// if(beerStore !== null || beerStore !== ""){
	// 	req.send(null);
	// }else{
	// 	// if there was and a callback was passed, run it with the beerStore
	// 	if(callback !== null || callback !== undefined){
	// 		callback(beerStore);
	// 	}
	// }
	req.send(null);
}

function findBeersInText(beerStore){
	var breweries = beerStore;
	console.log(breweries);
	if(breweries !== undefined && breweries.length > 0){
		for (var i = 0; i < breweries.length; i++) {
			searchBeers(breweries[i].name, breweries[i].beers);
		};
	}
}

function searchBeers(breweryName, beers){
	var text = sessionStorage.getItem('scannedText').toUpperCase();
	for (var i = 0; i < beers.length; i++) {
		var fullName = breweryName + " " + beers[i].name,
			testFullName = text.indexOf(fullName.toUpperCase()),
			testBeerName = text.indexOf(beers[i].name.toUpperCase());
		if(testBeerName !== -1){
			console.log('NAME MATCH ON (' + breweryName + ') ' + beers[i].name);
			console.log(testBeerName);
		}
		if(testFullName !== -1){
			console.log('FULL NAME MATCH ON ' + fullName);
			console.log(testFullName);
		}
	};
}

function processData(data){
	console.log(data);
	var annotations = data.responses[0].textAnnotations,
		wholeText = annotations[0];

	//console.log(wholeText.description);

	splitByLineBreak(wholeText.description);
	//var capitalWords = capitalWordSearch(wholeText.description);
	// for (var i = 0; i < capitalWords.length; i++) {
	// 	breweryDbSearch(capitalWords[i], checkBeerMatches);
	// };
	//googleOut.textContent = wholeText;
}

function checkBeerMatches(query, response){
	var beer = response.data[0],
		brewery = beer.breweries[0],
		strDistance = getStringDistance(query, beer.name);
	if(strDistance < 15){
		beers.push(beer);
		//console.log("Search: "+ query, "Result: "+ beer.name, "Distance: "+ strDistance);
	}
}

function capitalWordSearch(text){
	//console.log(text);
	var regexp = /([A-Z][\w-]*(\s+[A-Z][\w-]*)+)/,
		splitText,
		matches = [];

	splitText = text.split(regexp);

	for (var i = 0; i < splitText.length; i++) {
		var isMatch = regexp.test(splitText[i]);
		if(isMatch === true){
			var match = splitText[i].replace(/(\r\n|\n|\r)/gm," ");
			matches.push(match);
		}
	};
	//console.log(matches);
	return matches;
}

function getStringDistance(str1, str2){
	var L = new Levenshtein(str1, str2);
	return L.distance;
}

function splitByLineBreak(text){
	//console.log(text);
	var regexp = /\r?\n|\r/g,
		splitText,
		matches = [];

	splitText = text.split(regexp);
	return splitText;
}

function alphaNum(text){
    var noPrice = text.replace(/\$\S+/g, ''),
        nothingElse = noPrice.replace(/[^\w\s]/gi, '');
    return nothingElse;
}

function breweryDbSearch(query, callback){
	//console.log(query);
	var key = 'f2f26c4abe60a3a41cf5c9ee27d9da60',
		req = new XMLHttpRequest(),
		url = 'https://api.brewerydb.com/v2/search?q=' + query + '&type=beer&withBreweries=Y&key=' + key,
		res;

	req.onreadystatechange = function(){
		// if request is ready...
		if (req.readyState === XMLHttpRequest.DONE) {
			// if request has successful status...
			if (req.status === 200) {
				res = JSON.parse(req.response);
				callback(res, query);
				//console.log(res);
				// return res;
			} else {
				// error out
				console.error('Error!');
			}
		}
	}
	// open request, set content type, and send
	req.open('GET', url, true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.send(null);
}

function breweryDbGetBrewery(query, callback){
	//console.log(query);
	var key = 'f2f26c4abe60a3a41cf5c9ee27d9da60',
		req = new XMLHttpRequest(),
		url = 'https://api.brewerydb.com/v2/brewery/' + query + '/beers?key=' + key + '&format=json',
		res;

	req.onreadystatechange = function(){
		// if request is ready...
		if (req.readyState === XMLHttpRequest.DONE) {
			// if request has successful status...
			if (req.status === 200) {
				res = JSON.parse(req.response);
				callback(query, res);
			} else {
				// error out
				console.error(req.response);
			}
		}
	}
	// open request, set content type, and send
	req.open('GET', url.toString(), true);
	//req.setRequestHeader('Content-Type', 'application/json');
	req.send(null);
}

function googleVision(imgURI, callback){
	// TODO: restrict api key to domain when going public
	var googleApiKey = 'AIzaSyCF9N6od_VE8MfVh2-FhOaAmqgPCdx4SyM',
		googleUrl = 'https://vision.googleapis.com/v1/images:annotate?key=' + googleApiKey + "&alt=json",
		googleReq = new XMLHttpRequest(),
		// raw request, eventually will be built dynamically with input from UI
		reqData = {
		 "requests": [
		  {
		   "features": [
		    {
		     "type": "TEXT_DETECTION"
		    }
		   ],
		   "image": {
		    "content": imgURI
		   }
		  }
		 ]
		},
		// stringify before sending request
		jsonData = JSON.stringify(reqData),
		resData;

	googleReq.onreadystatechange = function(){
		// if request is ready...
		if (googleReq.readyState === XMLHttpRequest.DONE) {
			// if request has successful status...
			if (googleReq.status === 200) {
				// assign response to resData as JSON and run through processData()
				resData = JSON.parse(googleReq.response);
				if(callback !== null || callback !== undefined){
					callback(resData);
				}
			} else {
				// error out
				console.error('Error!');
			}
		}
	}
	// open request, set content type, and send with payload
	googleReq.open('POST', googleUrl, true);
	googleReq.setRequestHeader('Content-Type', 'application/json');
	googleReq.send(jsonData);
}
