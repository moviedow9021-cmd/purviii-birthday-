const screens=[...document.querySelectorAll(".screen")];
let current=0;
const music=document.getElementById("music");

function show(index){
  screens[current].classList.remove("active");
  current=index;
  screens[current].classList.add("active");
  if(current>0){
    music.play().catch(()=>{});
  }
}
function nextScreen(id){
  const index=screens.findIndex(x=>x.id===id);
  if(index>=0) show(index);
}
function replay(){
  location.reload();
}

function decorateCake(){
  document.getElementById("flame").textContent="🕯️";
  document.getElementById("cakeHint").textContent="Make a wish... ✨";
  document.getElementById("cakeNext").classList.remove("hidden");
  burst();
}

function burst(){
  for(let i=0;i<30;i++){
    const e=document.createElement("div");
    e.className="piece";
    e.textContent=["✨","💗","🎉","⭐"][Math.floor(Math.random()*4)];
    e.style.left=Math.random()*100+"%";
    e.style.top="-20px";
    e.style.fontSize=(12+Math.random()*12)+"px";
    e.style.animationDelay=(Math.random()*.7)+"s";
    document.getElementById("confetti").appendChild(e);
    setTimeout(()=>e.remove(),3500);
  }
}

// Photo-card swipe/drag
const stack=document.querySelector(".photo-stack");
if(stack){
  let startX=0,drag=false;
  stack.addEventListener("pointerdown",e=>{startX=e.clientX;drag=true});
  stack.addEventListener("pointerup",e=>{
    if(!drag)return; drag=false;
    if(e.clientX-startX>50 || e.clientX-startX<-50){
      const top=stack.querySelector(".photo-card:not(.top)");
      if(top){
        top.classList.add("top");
        setTimeout(()=>{top.classList.remove("top");stack.appendChild(top)},450);
      }
    }
  });
}

// Stars
const canvas=document.getElementById("stars"),ctx=canvas.getContext("2d");
let stars=[];
function resize(){
  canvas.width=innerWidth*devicePixelRatio;
  canvas.height=innerHeight*devicePixelRatio;
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  stars=Array.from({length:Math.min(140,Math.floor(innerWidth/4))},()=>({
    x:Math.random()*innerWidth,y:Math.random()*innerHeight,
    r:Math.random()*1.5+.3,a:Math.random()
  }));
}
function draw(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  for(const s of stars){
    s.a+=.01;
    ctx.globalAlpha=.35+.35*Math.sin(s.a);
    ctx.fillStyle="#fff";
    ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();
  }
  requestAnimationFrame(draw);
}
addEventListener("resize",resize);resize();draw();
