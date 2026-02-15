let time = 180;

setInterval(()=>{
time--;

let m=Math.floor(time/60);
let s=time%60;

document.getElementById("timer").innerText=
String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");

},1000);
