const slidesRoot = document.getElementById("slides");

const song1 = document.getElementById("song1");
const song2 = document.getElementById("song2");

const senderName   = "Sender";
const receiverName = "Receiver";

let currentSlide = 0;
let yesScale = 1;

/* -------------------------------------------------- */
/* slide data                                         */
/* -------------------------------------------------- */

const slides = [];

// Slides 1–10 : seasonal placeholders
for(let i=1;i<=10;i++){
  slides.push({
    type:"season",
    title:`Slide ${i}`,
    prompt:"Write here..."
  });
}

// Slide 11 : anime moment
slides.push({ type:"anime" });

// Slide 12 : japanese proposal
slides.push({ type:"proposal" });

/* -------------------------------------------------- */
/* render                                             */
/* -------------------------------------------------- */

slides.forEach((s,idx)=>{

  const el = document.createElement("div");
  el.className = "slide";

  if(s.type === "season"){
    el.innerHTML = `
      <div class="card">
        <h2>${s.title}</h2>
        <p>${s.prompt}</p>
        <textarea></textarea>
      </div>
    `;
  }

  if(s.type === "anime"){
    el.classList.add("anime");
    el.innerHTML = `
      <div class="anime-content">
        <h2>${senderName} ♡ ${receiverName}</h2>
        <p>Every story has a moment that changes everything.</p>
        <button id="animeNext">Continue →</button>
      </div>
    `;
  }

  if(s.type === "proposal"){
    el.classList.add("japanese");
    el.innerHTML = `
      <div class="card">
        <h2>Will you be mine forever?</h2>

        <textarea id="reply" placeholder="Your reply..."></textarea>

        <div class="proposal-area">
          <button id="yesBtn">Yes</button>
          <button id="noBtn">No</button>
        </div>
      </div>
    `;
  }

  slidesRoot.appendChild(el);
});

const slideEls = document.querySelectorAll(".slide");

/* -------------------------------------------------- */
/* navigation                                         */
/* -------------------------------------------------- */

function showSlide(index){

  slideEls.forEach(s=>s.classList.remove("active"));
  slideEls[index].classList.add("active");

  handleMusic(index);

  if(slides[index].type === "proposal"){
    initProposal();
  }

  if(slides[index].type === "anime"){
    document.getElementById("animeNext").onclick = next;
  }
}

function next(){
  if(currentSlide < slideEls.length-1){
    currentSlide++;
    showSlide(currentSlide);
  }
}

function prev(){
  if(currentSlide > 0){
    currentSlide--;
    showSlide(currentSlide);
  }
}

document.getElementById("next").onclick = next;
document.getElementById("prev").onclick = prev;

/* -------------------------------------------------- */
/* music logic                                        */
/* -------------------------------------------------- */

function handleMusic(i){

  // slides 0–9  -> song1
  // slide 10+  -> song2

  if(i <= 9){
    song2.pause();
    if(song1.paused){
      song1.currentTime = 0;
      song1.play().catch(()=>{});
    }
  }else{
    song1.pause();
    if(song2.paused){
      song2.currentTime = 0;
      song2.play().catch(()=>{});
    }
  }
}

/* -------------------------------------------------- */
/* proposal logic                                     */
/* -------------------------------------------------- */

function initProposal(){

  const yes = document.getElementById("yesBtn");
  const no  = document.getElementById("noBtn");
  const area = document.querySelector(".proposal-area");

  if(!yes || !no) return;

  yesScale = 1;
  yes.style.transform = "scale(1)";

  no.onmouseenter = () => {

    const box = area.getBoundingClientRect();

    const maxX = box.width - no.offsetWidth;
    const maxY = box.height - no.offsetHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    no.style.left = x + "px";
    no.style.top  = y + "px";
  };

  yes.onclick = () => {
    yesScale += 0.15;
    yes.style.transform = `scale(${yesScale})`;
    showCertificate();
  };
}

/* -------------------------------------------------- */
/* certificate                                       */
/* -------------------------------------------------- */

const cert = document.createElement("div");
cert.id = "certificate";

cert.innerHTML = `
  <div class="cert-card">
    <h2>Certificate of Love</h2>
    <div class="divider">──────── ♡ ────────</div>
    <p><strong>${senderName}</strong> & <strong>${receiverName}</strong></p>
    <p id="certReply"></p>
    <p style="margin-top:18px;font-size:14px;opacity:.8">
      With love,<br>${senderName}
    </p>
    <button id="closeCert">Close</button>
  </div>
`;

document.body.appendChild(cert);

function showCertificate(){

  const reply = document.getElementById("reply")?.value || "";
  document.getElementById("certReply").innerText = reply;

  cert.style.display = "flex";

  document.getElementById("closeCert").onclick = () =>{
    cert.style.display = "none";
  };
}

/* -------------------------------------------------- */

showSlide(0);
