var CalendarOperations = (
  function(){
    var year;
    var birthDayArray;
    var squareLength;
    var year;
    var days = ["sun","mon","tue","wed","thu","fri","sat"];
    var dayObject = { "sun" : {"length" : 0, "count" : 0},
                      "mon" : {"length" : 0, "count" : 0},
                      "tue" : {"length" : 0, "count" : 0},
                      "wed" : {"length" : 0, "count" : 0},
                      "thu" : {"length" : 0, "count" : 0},
                      "fri" : {"length" : 0, "count" : 0},
                      "sat" : {"length" : 0, "count" : 0},
                    }
    var bgcolor = [""];

    var updateCalendar = function(){
      document.getElementById("error").innerHTML="";
      birthDayArray = document.getElementById("json-input").value;
      year = parseInt(document.getElementById("year").value);
      if(isJsonValid(birthDayArray) && birthDayArray !== ""){
        var count = birthDayArray.length;
        squareLength = calculateSquareLength(count);
        populateSquares(count);
        //clear the existing div and calculate square lengths
    		for(var day in days){
    			document.getElementById(days[day]).innerHTML ='';
    			squareLength = calculateSquareLength(dayObject[day][count]);
    			dayObject[day][length] = squareLength;
    		}
      }else{
        document.getElementById("error").innerHTML="This is not a valid JSON."
      }
    }

    var calculateSquareLength = function(count){
     var width = document.getElementById("mon").clientWidth;
     var height = document.getElementById("mon").clientHeight;
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
      var month = parseInt(entry.birthday.substr(0,2)) ;
	if(month>12){
		document.getElementById("error").innerHTML="Invalid Date format for " + entry.name;
	}else{
	var date = parseInt(entry.birthday.substr(3,2));
      	var dayNumber = new Date(year,month-1,date).getDay();
     	var dayName = days[dayNumber];
      	var personName = getInitials(entry.name);
      	var box = createDiv(dayName,personName);
      	document.getElementById(dayName).appendChild(box);
	}
    }

    var createDiv = function(id, text){
      var box = document.createElement('div');
      box.id = "bday-box";
      box.innerHTML = text;
      box.setAttribute("style", "background-color:" + getRandomColor()+";height:" +squareLength+"px" +";width:" + squareLength+"px" +";float:left");
      return box;
    }

    var getInitials = function (name){
    var names = name.split(' ');
        initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
    }

    var getRandomColor = function(){
    return '#' + Math.floor(Math.random()*16777215).toString(16);
    }

    return {updateCalendar : updateCalendar};
  }
)();
