

var schoolData = function(d){

	//changing data
	this.DATA = d;
	this.SEMESTERDATA = {};

	this.addGP();

	this.sortChronological();

	this.generateSemesterData();
	
	this.GPDATA = JSON.parse(JSON.stringify(this.DATA));	//hax for deep copy

	this.generateGPData(this.GPDATA);


};


	//utility
	//orders the semesters
	schoolData.prototype.SEASONORDER = { "FALL": 1, "SUMR": 2, "SPR":3};

	/*
		Add acheived grade points to the global data object
	*/
	schoolData.prototype.addGP = function(){
		for(var ii = 0; ii < this.DATA.length; ii++){
			if(this.DATA[ii].Grade != "CR"){
				var multiplier = GPMULT[this.DATA[ii].Grade.charAt(0)];

				if(this.DATA[ii].Grade.charAt(1) == '+'){
					multiplier += .3;
				}else if(this.DATA[ii].Grade.charAt(1) == '-'){
					multiplier -= .3;
				}
				this.DATA[ii].GP = (multiplier*this.DATA[ii].Units);
			}
		}
	};

	/*
		put them in bins by semester and year
	*/
	schoolData.prototype.generateSemesterData = function(){
		this.SEMESTERDATA;
		var currentBin;
		for(var ii = 0; ii < this.DATA.length; ii++){
			currentBin = this.DATA[ii].Term + " " + this.DATA[ii].Year;
			if(!(currentBin in this.SEMESTERDATA)){
				this.SEMESTERDATA[currentBin] = [];
			}
			this.SEMESTERDATA[currentBin].push(this.DATA[ii]);
			
		}
	}

	//orders the semesters chronologically
	schoolData.prototype.semesterOrder = function(a, b){
			var aYear, bYear;
			aYear = parseInt(a.Year);
			bYear = parseInt(b.Year);
			if(aYear < bYear){
				return -1;
			}else if(aYear > bYear){
				return 1;
			}else{
				return schoolData.prototype.SEASONORDER[b.Term] - schoolData.prototype.SEASONORDER[a.Term];
			}
			return 0;
	}

	//use the utility functions to sor the data
	schoolData.prototype.sortChronological = function(){
		this.DATA.sort(this.semesterOrder);
	}

	function gpOrder(a, b){
		return a.GP-b.GP;
	}
	schoolData.prototype.generateGPData = function(data){
		return data.sort(gpOrder);
	}












