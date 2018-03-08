var CalendarOperations = (
  function(){
    var year;
    var birthDayArray;
    var squareLength;
	  var squareLengthEachDay = {"sun" : 0, "mon": 0, "tue": 0, "wed": 0, "thu": 0, "fri": 0, "sat": 0};
    var dayObject = { "sun" : {"length" : 0, "count" : 0},
                      "mon" : {"length" : 0, "count" : 0},
                      "tue" : {"length" : 0, "count" : 0},
                      "wed" : {"length" : 0, "count" : 0},
                      "thu" : {"length" : 0, "count" : 0},
                      "fri" : {"length" : 0, "count" : 0},
                      "sat" : {"length" : 0, "count" : 0},
                    }
    var days = ["sun","mon","tue","wed","thu","fri","sat"];
    var bgcolor = [""];

    var updateCalendar = function(){
	  let countForEachDays = { "sun" : 0, "mon": 0, "tue": 0, "wed": 0, "thu": 0, "fri": 0, "sat": 0};
      birthDayArray = document.getElementById("json-input").value;
      year = parseInt(document.getElementById("year").value);
      if(isJsonValid(birthDayArray) && birthDayArray !== ""){
        var count = birthDayArray.length;
        //count number of same day birthdays
    		for( var birthday in birthDayArray) {
    			var dayName = getDayNumber(birthDayArray[birthday]);
    			dayObject[dayName]["count"]++;
    		}

  		//clear the existing div and calculate square lengths
  		for(var day in days){
  			document.getElementById(days[day]).innerHTML ='';
  			squareLength = calculateSquareLength(dayObject[days[day]]["count"]);
  			dayObject[days[day]]["length"] = squareLength;
  		}

        //squareLength = calculateSquareLength(count);
        populateSquares(count);
      }else{
        document.getElementById("error").innerHTML="This is not a valid JSON."
      }
    }

    var calculateSquareLength = function(count){
     var width = document.getElementById("main-container").clientWidth;
     var height = document.getElementById("main-container").clientHeight;
     var area = height * width;
     var elementArea = parseInt(area / count);

     // Calculate side length if there is no "spill":
     var sideLength = parseInt(Math.sqrt(elementArea));

     // We now need to fit the squares. Let's reduce the square size
     // so an integer number fits the width.
     var numX = Math.ceil(width/sideLength);
     sideLength = width/numX;
     while (numX <= count) {
         // With a bit of luck, we are done.
         if (Math.floor(height/sideLength) * numX >= count) {
             // They all fit! We are done!
             return sideLength;
         }
         // They don't fit. Make room for one more square i each row.
         numX++;
         sideLength = width/numX;
     }
     // Still doesn't fit? The window must be very wide
     // and low.
     sideLength = height;
     return sideLength;
    }

    var isJsonValid = function(jsonInput){
      try{
        birthDayArray = JSON.parse(jsonInput);
        return true;
      }catch(e){
        return false;
      }
    }

    var populateSquares = function(count){
      for(var i=0; i<count; i++){
        var boxData = getNameAndDay(birthDayArray[i]);
      }
    }

    var getNameAndDay = function(entry){
	  var dayName = getDayNumber(entry);
      var personName = getInitials(entry.name);
      var box = createDiv(dayName,personName, squareLengthEachDay[dayName] , dayName);
      document.getElementById(dayName).appendChild(box);
    }

    var createDiv = function(id, text, sqLength, dayName){
      var box = document.createElement('div');
      box.id = "bday-box";
      box.innerHTML = text;
      box.setAttribute("style", "background-color:" + getRandomColor(dayName)+";height:" +sqLength+"px" +";width:" + sqLength+"px" +";float:left");
      return box;
    }

	var getDayNumber = function(entry){
	  var month = parseInt(entry.birthday.substr(0,2)) -1;
      var date = parseInt(entry.birthday.substr(3,2));
      var dayNumber = new Date(year,month,date).getDay();
	  return days[dayNumber];
	}

    var getInitials = function (name){
    var names = name.split(' ');
        initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
    }

    var getRandomColor = function(day){
		switch (day) {
		  case 'mon':
			return 'red';
			break;
		  case 'tue':
			return 'violet';
			break;
		  case 'wed':
			return '#00FFFF';
			break;
		  case 'thu':
			return 'pink';
			break;
		  case 'fri':
			return '#FFE4C4';
			break;
	      case 'sat':
			return 'yellow';
			break;
		 case 'sun':
			return 'green';
			break;
			break;
		  default:
			return 'red';
}
    }

    return {updateCalendar : updateCalendar};
  }
)();
