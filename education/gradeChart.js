



	var PIECHART;
	var LINECHART;
	var COLORDATA = {};
	var LINECHARTDEPARTMENT = undefined;

	function lineChartDataGen(SEMESTERDATA){
		var labels = [];
		var data1 = [];
		var data2 = [];
		var unitSum = 0;
		var GPSum = 0;
		var cumulativeUnits = 0;
		var cumulativeGP = 0;
		for(key in SEMESTERDATA){
			labels.push(key);
			for(var ii = 0; ii < SEMESTERDATA[key].length; ii++){
				//what the hell : (
				if(	SEMESTERDATA[key][ii].Grade != "CR" &&
					(
						LINECHARTDEPARTMENT == undefined ||
						SEMESTERDATA[key][ii].Department === LINECHARTDEPARTMENT
					)
				){
					unitSum += SEMESTERDATA[key][ii].Units;
					GPSum += SEMESTERDATA[key][ii].GP;
				}
			}
			cumulativeGP += GPSum;
			cumulativeUnits += unitSum;
			console.log(cumulativeGP, cumulativeUnits, GPSum, unitSum);
			data1.push(unitSum == 0 ? 0 : (GPSum/unitSum).toFixed(3));				//this happens if you took only CR/NC classes
			data2.push(cumulativeUnits == 0 ? 0 : (cumulativeGP/cumulativeUnits).toFixed(3));	//this only happens if no units on record
			unitSum = 0;
			GPSum = 0;
		}
		return [data1, data2, labels];
	}

	/*
		Generate a pie chart on the 
	*/
	function pieChartGen(data, ctx, yMin, yMax){
		var yearMin = 0 || yMin;
		var yearMax = 10000 || yMax;
		var pieData = {};
		colorIndex = 0;	//we will be adding a color for each department
		for(var ii = 0; ii < data.length; ii++){
			if(!(data[ii].Department in pieData)){
				pieData[data[ii].Department] = 0;
				COLORDATA[data[ii].Department] = colors[colorIndex];
				colorIndex++;
				console.log(data[ii].Department, COLORDATA[data[ii].Department]);
			}
			if(data[ii].Year >= yearMin && data[ii].Year <= yearMax){
				pieData[data[ii].Department] += parseInt(data[ii].Units);
			}
		}
		pies = [];
		for(key in pieData){
			pies.push({
				value: parseInt(pieData[key]),
				label: key,
				color: COLORDATA[key]
			});
		}
		
		if(PIECHART != undefined){
			PIECHART.destroy();
		}
		PIECHART = new Chart(ctx).Pie(pies, null);
	}


	function generateLineChartFromData(data, ctx){

		var data1 = data[0];
		var data2 = data[1];
		var labels = data[2];

		console.log(data2);
		console.log(data1);

		var color = hexToRgb(COLORDATA[LINECHARTDEPARTMENT]) || "220, 220, 220";
		console.log(COLORDATA[LINECHARTDEPARTMENT], color);

		var lineChartData = {
			labels: labels,
			datasets: [
					{
					label: "Cumulative GPA",
					fillColor: "rgba(151,187,205,0.2)",
					strokeColor: "rgba(151,187,205,1)",
					pointColor: "rgba(151,187,205,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(220,220,220,1)",
					data: data2
					},
					{
					label: "GPA by Semester",
					fillColor: "rgba("+color+",.2)",
					strokeColor: "rgba("+color+",1)",
					pointColor: "rgba("+color+",1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(220,220,220,1)",
					data: data1
					}
				]
		};
		if(LINECHART != undefined){
			LINECHART.destroy();
		}
		LINECHART = new Chart(ctx).Line(lineChartData, {scaleOverride: true, scaleStartValue: 0, scaleStepWidth: 1, scaleSteps: 4});
	}

	function lineChartGen(SEMESTERDATA, ctx){
		generateLineChartFromData(lineChartDataGen(SEMESTERDATA), ctx);
	}



