let uploadedImages = [];

document.getElementById("images").addEventListener("change", function(e){
  const files = e.target.files;
  uploadedImages = [];

  for (let file of files){
    const reader = new FileReader();
    reader.onload = function(event){
      uploadedImages.push(event.target.result);
    };
    reader.readAsDataURL(file);
  }
});

function createStory(){

  if(!sender.value || !receiver.value || !message.value){
    alert("Please fill everything first 🌿");
    return;
  }

  const data = {
    sender: sender.value,
    receiver: receiver.value,
    date: date.value,
    message: message.value,
    email: yourEmail.value,
    images: uploadedImages
  };

  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(data))));

  const baseURL = window.location.origin + window.location.pathname.replace("index.html","");
const link = baseURL + "story.html?data=" + encoded;
  document.getElementById("generatedLink").innerHTML =
    `<p>Your Love Link:</p>
     <input value="${link}" style="width:90%" readonly>`;
}
