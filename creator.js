let uploadedImages=[];

document.getElementById("images").addEventListener("change",function(e){
  const files=e.target.files;

  for(let file of files){
    const reader=new FileReader();
    reader.onload=function(event){
      compress(event.target.result).then(res=>{
        uploadedImages.push(res);
      });
    };
    reader.readAsDataURL(file);
  }
});

function compress(base64){
  return new Promise(resolve=>{
    const img=new Image();
    img.src=base64;
    img.onload=()=>{
      const canvas=document.createElement("canvas");
      const ctx=canvas.getContext("2d");
      canvas.width=img.width*0.5;
      canvas.height=img.height*0.5;
      ctx.drawImage(img,0,0,canvas.width,canvas.height);
      resolve(canvas.toDataURL("image/jpeg",0.6));
    };
  });
}

function createStory(){
  const data={
    sender:sender.value,
    receiver:receiver.value,
    date:date.value,
    message:message.value,
    email:yourEmail.value,
    images:uploadedImages
  };

  const encoded=btoa(encodeURIComponent(JSON.stringify(data)));

  const link=`${window.location.origin}${window.location.pathname.replace("index.html","")}story.html?data=${encoded}`;

  generatedLink.innerHTML=`<a href="${link}" target="_blank">${link}</a>`;
}
