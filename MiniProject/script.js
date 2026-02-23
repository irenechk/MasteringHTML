/* INTRO SEQUENCE */

const scenes=document.querySelectorAll(".scene");
let index=0;

function nextScene(){
scenes[index].classList.remove("active");
index++;
if(index<scenes.length){
scenes[index].classList.add("active");
}else{
document.getElementById("intro").style.display="none";
document.getElementById("mainSite").style.display="block";

/* Start synthwave music after user interaction */
document.body.addEventListener("click",()=>{
document.getElementById("bgMusic").play();
},{once:true});
}
}

setInterval(nextScene,3000);

/* TAB SWITCH */
document.querySelectorAll("nav button").forEach(btn=>{
btn.addEventListener("click",()=>{
document.querySelectorAll(".tab").forEach(t=>t.classList.remove("activeTab"));
document.getElementById(btn.dataset.tab).classList.add("activeTab");
});
});

/* START EXPERIENCE */
document.getElementById("startExperience").addEventListener("click",()=>{
document.querySelectorAll(".tab").forEach(t=>t.classList.remove("activeTab"));
document.getElementById("screensaver").classList.add("activeTab");
});

/* GAME ENGINE */

const dvd=document.getElementById("dvdLogo");
const container=document.getElementById("dvdContainer");
const explosion=document.getElementById("explosion");

let x=100,y=100,dx=3,dy=3;
let score=0,corners=0,level=1;
let colors=["#ff00ff","#00ffff","#ffff00","#ff0000","#00ff00","#ffffff"];

function animate(){
const rect=container.getBoundingClientRect();
x+=dx;y+=dy;

let hitX=false,hitY=false;

if(x+dvd.offsetWidth>rect.width||x<0){dx=-dx;hitX=true;}
if(y+dvd.offsetHeight>rect.height||y<0){dy=-dy;hitY=true;}

if(hitX||hitY){
dvd.style.background=colors[Math.floor(Math.random()*colors.length)];
score+=5;
document.getElementById("score").textContent=score;
}

if(hitX&&hitY){
corners++;
score+=50;
document.getElementById("corners").textContent=corners;
triggerExplosion(x,y);
}

dvd.style.left=x+"px";
dvd.style.top=y+"px";

requestAnimationFrame(animate);
}
animate();

/* TELEPORT + MEME SOUND */
container.addEventListener("click",(e)=>{
const rect=container.getBoundingClientRect();
x=e.clientX-rect.left-dvd.offsetWidth/2;
y=e.clientY-rect.top-dvd.offsetHeight/2;

document.getElementById("memeSound").play();
});

/* EXPLOSION */
function triggerExplosion(px,py){
explosion.style.left=px+"px";
explosion.style.top=py+"px";
explosion.style.opacity=1;
explosion.style.transform="scale(1.5)";
setTimeout(()=>{
explosion.style.opacity=0;
explosion.style.transform="scale(0.5)";
},400);
}

/* GAME MODE */
document.getElementById("startGame").addEventListener("click",()=>{
setInterval(()=>{
level++;
dx+=(dx>0?1:-1);
dy+=(dy>0?1:-1);
document.getElementById("level").textContent=level;
},5000);
});

/* LEADERBOARD */
function saveScore(){
let scores=JSON.parse(localStorage.getItem("dvdScores"))||[];
scores.push(score);
scores.sort((a,b)=>b-a);
scores=scores.slice(0,5);
localStorage.setItem("dvdScores",JSON.stringify(scores));
displayLeaderboard();
}

function displayLeaderboard(){
let scores=JSON.parse(localStorage.getItem("dvdScores"))||[];
let list=document.getElementById("leaderboardList");
list.innerHTML="";
scores.forEach(s=>{
let li=document.createElement("li");
li.textContent=s;
list.appendChild(li);
});
}
displayLeaderboard();