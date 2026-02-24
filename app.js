const stageTitles=[
"How We Met",
"Our First Conversation",
"The Little Moments",
"The Ups and Downs",
"Why I Feel This",
"The Day I Knew",
"Your Smile",
"The Future I See",
"My Promise",
"Will You Be Mine Forever?"
];

// CREATE PAGE
if(document.getElementById("stages")){
  const container=document.getElementById("stages");

  for(let i=0;i<10;i++){
    container.innerHTML+=`
      <h3>${stageTitles[i]}</h3>
      <textarea id="content${i+1}" placeholder="Write your feelings..."></textarea>
      <input id="song${i+1}" placeholder="Song URL for this page"><br>
    `;
  }
}

function createStory(){
  const story={ stages:[] };

  for(let i=1;i<=10;i++){
    story.stages.push({
      content:document.getElementById(`content${i}`).value,
      song:document.getElementById(`song${i}`).value
    });
  }

  localStorage.setItem("loveStory", JSON.stringify(story));
  window.location="story.html?stage=1";
}

// STORY PAGE
if(window.location.pathname.includes("story.html")){
  const params=new URLSearchParams(window.location.search);
  let stage=parseInt(params.get("stage"));

  const story=JSON.parse(localStorage.getItem("loveStory"));

  if(!story){
    alert("No story found. Please create again.");
    window.location="create.html";
  }

  loadStage();

  function loadStage(){
    document.getElementById("title").innerText=stageTitles[stage-1];
    document.getElementById("content").innerText=story.stages[stage-1].content;
    document.getElementById("music").src=story.stages[stage-1].song;

    applyAnimation(stage);

    if(stage!==10)
      document.getElementById("acceptBtn").style.display="none";
  }

  window.nextStage=function(){
    if(stage<10){
      window.location=`story.html?stage=${stage+1}`;
    }
  }

  window.acceptProposal=function(){
    alert("Forever Begins ❤️");
  }
}
