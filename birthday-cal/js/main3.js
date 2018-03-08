var CalendarOperations = (
  function(){
    var year;
    var days = ["sun","mon","tue","wed","thu","fri","sat"];
    var colorCodes = {};
    var birthDayArray;

    var updateCalendar = function(){
      birthDayArray = document.getElementById("json-input").value;
      year = parseInt(document.getElementById("year").value);
      if(isJsonValid(birthDayArray) && birthDayArray !== ""){
        clubNamesDayWiseAndDraw();
      }else{
        document.getElementById("error").innerHTML="This is not a valid JSON."
      }
    }

    var clubNamesDayWiseAndDraw = function(){
      var namesEachDay = {};
      var countForEachDays = {};
      for( var birthday in birthDayArray) {
           var dayName = getDayNumber(birthDayArray[birthday]);
           if(!countForEachDays[dayName]){
             countForEachDays[dayName] = 0;
           }
           countForEachDays[dayName]++;
           if(!namesEachDay[dayName]){
             namesEachDay[dayName] =[];
           }
         namesEachDay[dayName].push(birthDayArray[birthday]);
      }
      startDrawing(namesEachDay,countForEachDays);
    }

    var startDrawing = function(namesEachDay,countForEachDays){
      for(var day in days){
  			document.getElementById(days[day]).innerHTML =''; //clear prev draws
  			var squareLength = calculateSquareLength(countForEachDays[days[day]]);
        populateSquares(squareLength, countForEachDays[days[day]], namesEachDay[days[day]], days[day]);
  		}
    }

    var calculateSquareLength = function(count){
     var width = document.getElementById("container").clientWidth;
     var height = document.getElementById("container").clientHeight;
     var area = height * width;
     var elementArea = parseInt(area / count);
     var sideLength = parseInt(Math.sqrt(elementArea));
     var numX = Math.ceil(width/sideLength);
     sideLength = width/numX;
     while (numX <= count) {
         if (Math.floor(height/sideLength) * numX >= count) {
             return sideLength;
         }
         numX++;
         sideLength = width/numX;
     }
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

    var populateSquares = function(sqLength, countOfNames, names, day){
      for(var i=0; i<countOfNames; i++){
        var boxData = getNameAndDay(names[i], sqLength, day, i);
      }
    }

    var getNameAndDay = function(entry,length,day,index){
        var personName = getInitials(entry.name);
        var box = createDiv(day,personName, length, index);
        document.getElementById(day).appendChild(box);
    }

    var createDiv = function(dayName, text, sqLength, index){
      var box = document.createElement('div');
      box.id = "bday-box";
      box.innerHTML = text;
      box.setAttribute("style", "background-color:" + getRandomColor(index)+";height:" +sqLength+"px" +";width:" + sqLength+"px" +";float:left");
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

    var getRandomColor = function(index){
       if(!colorCodes[index]){
         colorCodes[index] = generateRandomColor();
       }
       return colorCodes[index];
    }

    var generateRandomColor = function() {
        return '#' + Math.floor(Math.random()*16777215).toString(16);
      }

    return {updateCalendar : updateCalendar};
  }
)();
