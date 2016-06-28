var fs = require('fs'),
	BreweryDb = require('brewerydb-node'),
	brewdb = new BreweryDb('f2f26c4abe60a3a41cf5c9ee27d9da60'),
	list = [
        // TOP 50 CRAFT
        "pX8lES", // D. G. Yuengling and Son, Inc
        "1wSztN", // Boston Beer Co
        "nHLlnK", // Sierra Nevada Brewing Co
        "Jt43j7", // New Belgium Brewing Co
        "i4p0jm", // Gambrinus
        "nLsoQ9", // Lagunitas Brewing Co
        "noGtDY", // Bell’s Brewery, Inc
        "YHij73", // Deschutes Brewery
        "S7K860", // Minhas Craft Brewery
        "709vEK", // Stone Brewing Co
        "1d90Lc", // Ballast Point Brewing Co
        "4OBVPn", // Brooklyn Brewery
        "qghrkC", // Firestone Walker Brewing Co
        "q6vJUK", // Oskar Blues Brewing Holding Co
        "KSqbyz", // Duvel Moortgat USA
        "g0jHqt", // Dogfish Head Craft Brewery
        "Qs29uy", // F.X. Matt Brewing Company
        "TMc6H2", // SweetWater Brewing Co
        "RzvedX", // Harpoon Brewery
        "YWVg1z", // New Glarus Brewing Co
        "uSFO4T", // Great Lakes Brewing Co
        "VPHkaP", // Alaskan Brewing Co
        "BBE5WM", // Abita Brewing Co
        "6PBXvz", // Anchor Brewing Co
        "djGgca", // Stevens Point Brewery Co
        "VoKbnS", // Victory Brewing Co
        "E8C6fp", // August Schell Brewing Co
        "2ntvtp", // Long Trail Brewing Co
        "05irfI", // Summit Brewing Co
        "5N0usi", // Shipyard Brewing
        "KmAbWk", // Full Sail Brewing Co
        "rQkKIB", // Odell Brewing Co
        "x8kqVp", // Southern Tier Brewing Co
        "X0l98q", // Rogue Ales Brewery
        "EdRcIs", // 21st Amendment Brewery
        "V4I9FT", // Ninkasi Brewing Co
        "jmGoBA", // Flying Dog Brewery
        "mGqkXE", // Narragansett Brewing Co
        "Ro08YF", // Left Hand Brewing Co
        "uoQoRs", // Uinta Brewing Co
        "Nj8cgD", // Green Flash Brewing Co
        "pdLPeS", // Allagash Brewing Co
        "HRLYCh", // Lost Coast Brewery
        "5tw2Iw", // Bear Republic Brewing Co
        "n5QFi2", // Troegs Brewing Co
        "mtUjck", // Karl Strauss Brewing Co
        "IImUD9", // Breckenridge Brewery
        "yLBNrD", // North Coast Brewing Company
        "XHDhqx", // Four Peaks Brewing Co
        "PHkaP0", // Revolution Brewing Co
        // TOP 50 OVERALL
        "BznahA", // Anheuser-Busch
            // Subsidiaries of Anheuser-Busch
            "snQlvg", // 10 Barrel
            "X2Qkw1", // Bass,
            "iDeqSN", // Beck’s
            "zo4Tui", // Blue Point
            "6RZC0v", // Golden Road (partial year)
            "APW1BC", // Goose Island
            "hvWfx5", // Elysian (partial year)
            "Uky9hi", // Landshark
            "fHseLN", // Michelob
            "MDO5n4", // Rolling Rock
            "xvAx8k", // Shock Top and Wild Series brands
        "hGFVYy", // Miller
            // Subsidiaries of Miller Coors
            "M4K0XQ", // A.C. Golden
            "UGQgMQ", // Blue Moon
            "avMkil", // Coors
            "IlAZ0Y", // Leinenkugel’s
            "vOvOzV", // Saint Archer (partial year)
        "AKyyYN", // Pabst Brewing Co
        // Yuengling
        // Boston Beer Co
        "azQ0as", // North American Breweries
        // Sierra Nevada
        // New Belgium
        "Rg7sL4", // Craft Brew Alliance
        // Lagunitas
        // Gambrinus
        // Bell's Brewery
        // Deschutes Brewery
        // Minhas Craft Brewery
        // Stone Brewing Co
        "D61TcY", // Sleeman Brewing Co
        // Ballast Point Brewing & Spirits
        // Brooklyn Brewery
        // Firestone Walker Brewing Co
        "Idm5Y5", // Founders Brewing Co
        // Oskar Blues Brewing Holding Co
        // Duvel Moortgat USA
        // Dogfish Head Craft Brewery
        // Matt Brewing Co
        // SweetWater Brewing Co
        // Harpoon Brewery
        // New Glarus Brewing Co
        // Great Lakes Brewing Co
        // Alaskan Brewing Co
        // Abita Brewing Co
        // Anchor Brewing Co
        // Stevens Point Brewery Co
        // Victory Brewing Co
        // August Schell Brewing Co
        // Long Trail Brewing Co
        // Summit Brewing Co
        // Shipyard Brewing Co
        // Full Sail Brewing Co
        // Odell Brewing Co
        // Southern Tier Brewing Co
        // Rogue Ales Brewery
        // 21st Amendment Brewery
        // Ninkasi Brewing Co
        // Flying Dog Brewery
        // Narragansett Brewing Co
        "O2ScDy", // Pittsburgh Brewing Co
        // Left Hand Brewing Co
        // Uinta Brewing Co
        // Green Flash Brewing Co
        // Allagash Brewing Co
    ];

fs.writeFile("beerStore.json", "", function(err) {
    if(err) {
        return console.log(err);
    }else{
    	getBeersFromIdList();
    }
});

function getBeersFromIdList(){
	var beerStore = [];
	// loop through list of ids
	for (var i = 0; i < list.length; i++) {
		// grab beers from brewerydb
		brewdb.breweries.getById(list[i], {}, function(err, data){
			if(err){
				console.error('error:', err);
				return err;
			}else{
				// no errors, if data exists...
				if(data !== null){
					//console.log(data);
					var brewObj = {
						id: data.id,
						name: data.nameShortDisplay,
						beers: []
					}
					//console.log(brewObj);
					brewdb.breweries.getById(data.id, { withBreweries: 'Y', beers: true }, function(err, data){
						if(err){
							console.error('error:', err);
							return err;
						}else{
							// no errors, if data exists...
							if(data !== null){
								//console.log(data);
								for (var i = 0; i < data.length; i++) {
									var beer = {
										id: data[i].id,
										name: data[i].nameDisplay
									}
									brewObj.beers.push(beer);
									// if loop is almost done...
									if(i === data.length - 1){
										// push to beerStore
										beerStore.push(brewObj);
										console.log(beerStore);
										// write beerStore as JSON to beerStore.json
										fs.writeFile("beerStore.json", JSON.stringify(beerStore), function(){
											console.log('WRITE');
										});
									}
								};
							}
						}
					});
				}
			}
		});
	};
}
