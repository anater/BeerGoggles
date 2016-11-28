const clientId = '74D47FB6EAA765FF3B20D181CF915E5C243311FF';
const clientSecret = '25417280E624D7EE5FA43F77AECDE3DCAE3E56B0';

function Untappd(endpoint, params, callback){
    console.log(`Calling Untappd ${endpoint} for:`, params);
	// TODO: restrict api key to domain when going public
	let request = new XMLHttpRequest(),
		resData,
        url = '';

    switch (endpoint) {
        case 'info':
            url = `https://api.untappd.com/v4/beer/info/${ params }?client_id=${ clientId }&client_secret=${ clientSecret }`;
            break;
        case 'search':
            url = `https://api.untappd.com/v4/search/beer/?client_id=${ clientId }&client_secret=${ clientSecret }&q=${ params }&limit=1`;
            break;
        default:
            console.error('Invalid Untappd enpoint!');
            return false;
    }

	request.onreadystatechange = function(){
		// if request is ready...
		if (request.readyState === 4) {
			// if request has successful status...
			if (request.status === 200) {
                // console.log('Untappd', request);
				// assign response to resData as JSON and run through processData()
				resData = JSON.parse(request.response);
				if(callback !== null || callback !== undefined){
					callback(resData);
				}
			} else {
				// error out
				console.error('Error!');
                callback(JSON.parse(request.response))
			}
		}
	}
	// open request, set content type, and send with payload
	request.open('GET', url, true);
	// request.setRequestHeader('Content-Type', 'application/json');
	request.send();
}

export default Untappd;
