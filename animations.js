function applyAnimation(stage) {
  const container = document.createElement("div");
  container.className = "motion";
  document.body.appendChild(container);

  if(stage === 9){
    const canvas=document.createElement("canvas");
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    container.appendChild(canvas);
    const ctx=canvas.getContext("2d");

    setInterval(()=>{
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for(let i=0;i<200;i++){
        ctx.fillStyle="white";
        ctx.fillRect(Math.random()*canvas.width,Math.random()*canvas.height,2,2);
      }
    },400);
    return;
  }

  const effects=["🌸","🍂","🦋","✨","💌","🌿","🌹","🕊","🌌","❤️"];

  for(let i=0;i<25;i++){
    const el=document.createElement("div");
    el.innerHTML=effects[stage-1];
    el.style.position="absolute";
    el.style.left=Math.random()*100+"vw";
    el.style.top=Math.random()*100+"vh";
    el.style.fontSize="22px";

    el.animate([
      { transform:"translateY(100vh)" },
      { transform:"translateY(-100vh)" }
    ],{
      duration:7000+Math.random()*4000,
      iterations:Infinity
    });

    container.appendChild(el);
  }
}
