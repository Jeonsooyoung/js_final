const clockCnt = document.querySelector(".clock-container"),
  dateTxt = clockCnt.querySelector(".date");
  clockTxt = clockCnt.querySelector(".time");

function loadTime() {
  const date = new Date(),
  minutes = date.getMinutes(),
  hours = date.getHours(),
  seconds = date.getSeconds(),
  year = date.getFullYear(),
  month = date.getMonth() + 1,
  day = date.getDate(),
  yoil = date.getDay();
  
  var weekday=new Array(7);
  weekday[0]="Sun";
  weekday[1]="Mon";
  weekday[2]="Tue";
  weekday[3]="Wed";
  weekday[4]="Thu";
  weekday[5]="Fri";
  weekday[6]="Sat";

  dateTxt.innerText = `${weekday[yoil]} ${month} . ${day} . ${year}` ;

  clockTxt.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
  

}
