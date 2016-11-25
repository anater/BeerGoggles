function GoogleVision(imgURI, callback){
	// TODO: restrict api key to domain when going public
	var googleApiKey = 'AIzaSyAGGlb-1bzMvGhqW9awVbV4xFGyTV-ny3I',
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
		    "content": imgURI.replace(/data:image\/jpeg;base64,/, "")
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
                callback(JSON.parse(googleReq.response))
			}
		}
	}
	// open request, set content type, and send with payload
	googleReq.open('POST', googleUrl, true);
	googleReq.setRequestHeader('Content-Type', 'application/json');
	googleReq.send(jsonData);
}

export default GoogleVision;
