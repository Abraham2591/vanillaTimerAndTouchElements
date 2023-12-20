const myBtn1 = document.getElementById("myBtn");
const moveDiv = document.querySelector("#moveDiv");
const dragDiv = document.querySelector("#dragDiv");
const downTimer = document.querySelector("#timeLab");
const startBtn = document.querySelector("#startBtn");
const resetBtn = document.querySelector("#resetBtn");
const upBtn = document.querySelector("#upBtn");
const leftBtn = document.querySelector("#leftBtn");
const rightBtn = document.querySelector("#rightBtn");
const downBtn = document.querySelector("#downBtn");



myBtn1.addEventListener("click", chgTxt);
startBtn.addEventListener("click", updownTimer);
resetBtn.addEventListener("click", resetdownTimer);
window.addEventListener("keydown", moveEvents);
upBtn.addEventListener("click", ydirUp);
leftBtn.addEventListener("click", xdirLeft);
rightBtn.addEventListener("click", xdirRight);
downBtn.addEventListener("click", ydirDown);
document.getElementById("dragDiv").addEventListener('mousedown', mouseDown, false);
window.addEventListener('mouseup', mouseUp, false);

document.body.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, false); 

dragDiv.addEventListener('touchmove', function(event) {
  // exactly 1 finger on element
  if (event.targetTouches.length == 1) {
    var touch = event.targetTouches[0];
    // Place element
    dragDiv.style.left = (touch.pageX - 35) + 'px';
    dragDiv.style.top = (touch.pageY - 555) + 'px';
  }
}, false);

let x = 0;
let y = 0;
let intervalId;





function updownTimer(){ 
  var inputHrs = document.getElementById("inputHrs").value;
  var inputMin = document.getElementById("inputMin").value;
  var inputSec = document.getElementById("inputSec").value;

  document.getElementById("inputHrs").disabled = true;
  document.getElementById("inputMin").disabled = true;
  document.getElementById("inputSec").disabled = true;
  document.getElementById("startBtn").disabled = true;
  
  var timeTotal = (parseFloat(inputHrs) * 60 * 60) + (parseFloat(inputMin) * 60) + parseFloat(inputSec) + 1;

  intervalId = setInterval(function() {
    if(timeTotal > 0){
      timeTotal--;
      
      var outHrs = Math.floor(timeTotal / 60  / 60) % 60;
      var outMin = Math.floor(timeTotal / 60) % 60;
      var outSec = Math.floor(timeTotal % 60);

      outHrs = pad(outHrs);
      outMin = pad(outMin);
      outSec = pad(outSec);
      
      downTimer.innerHTML = `${outHrs}:${outMin}:${outSec}`;
      console.log(timeTotal);

      function pad(unit){
        return (("0") + unit).length > 2 ? unit : "0" + unit;
    }
    }
    else{
      clearInterval(intervalId);
      downTimer.innerHTML = "00:00:00";
      document.getElementById("inputHrs").disabled = false;
      document.getElementById("inputMin").disabled = false;
      document.getElementById("inputSec").disabled = false;
      document.getElementById("startBtn").disabled = false;

    }
  }, 1000);  
}

function resetdownTimer(){
  clearInterval(intervalId);
  downTimer.innerHTML = "00:00:00";
  document.getElementById("inputHrs").disabled = false;
  document.getElementById("inputMin").disabled = false;
  document.getElementById("inputSec").disabled = false;
  document.getElementById("startBtn").disabled = false;
}





function chgTxt(){
    const iniText = "Shine";

  if (myBtn1.innerHTML.toLowerCase().includes(iniText.toLowerCase())) {
    myBtn1.innerHTML = "Bright Like a Diamond";
  } else {
    myBtn1.innerHTML = iniText;
  }
}

function moveEvents(event){
    switch(event.key){
        case "ArrowDown":
            y+=32;
            moveDiv.style.top = y + "px";
            break;
        case "ArrowUp":
            y-=32;
            moveDiv.style.top = y + "px";
            break;
        case "ArrowRight":
            x+=32;
            moveDiv.style.left = x + "px";
            break;
        case "ArrowLeft":
            x-=32;
            moveDiv.style.left = x + "px";
            break;
        default:
            break;                
    }
}

function ydirUp(){
  y-=32;
  moveDiv.style.top = y + "px";
}

function xdirLeft(){
  x-=32;
  moveDiv.style.left = x + "px";
}

function xdirRight(){
  x+=32;
  moveDiv.style.left = x + "px";
}

function ydirDown(){
  y+=32;
  moveDiv.style.top = y + "px";
}

function mouseUp()
{
    window.removeEventListener('mousemove', divMove, true);
}

function mouseDown(e){
  window.addEventListener('mousemove', divMove, true);
}

function divMove(e){
    var div = document.getElementById("dragDiv");
  dragDiv.style.position = 'absolute';
  dragDiv.style.top = e.clientY + 'px';
  dragDiv.style.left = e.clientX + 'px';
}
