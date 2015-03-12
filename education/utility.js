

	//Convert letter grades to multipliers
	var GPMULT =	{
				"A": 4.0,
				"B": 3.0,
				"C": 2.0,
				"D": 1.0,
				"F": 0.0,
			};

	//colors generated so that chart colors persist
	colors = [
		"#3c0f7d",
		"#5a2cc0",
		"#6474b1",
		"#b1f561",
		"#7bb384",
		"#a4a335",
		"#175200",
		"#ba3ede",
		"#feadc7",
		"#47437d",
		"#dd7b06",
		"#5bf43e",
		"#ebecf6",
		"#c6b49b",
		"#1aa9f8",
		"#f7ad85",
		"#5c7c0f",
		"#a7a2e3",
		"#2de784",
		"#30e7e0"
		];


	function hexToRgb(hex) {
		if(hex == undefined){ return hex; }
		var bigint = parseInt(hex.slice(1), 16); //chop off the #
		console.log(bigint);
		var r = (bigint >> 16) & 255;
		var g = (bigint >> 8) & 255;
		var b = bigint & 255;
		return r + "," + g + "," + b;
	}

