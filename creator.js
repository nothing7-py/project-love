<input type="text" id="sender" placeholder="Your Name">
<input type="text" id="receiver" placeholder="Receiver Name">
<input type="date" id="date">
<textarea id="message" placeholder="Your Message"></textarea>
<input type="email" id="yourEmail" placeholder="Your Email">
<input type="file" id="images" multiple accept="image/*">
<button onclick="createStory()">Create Story</button>

<div id="generatedLink"></div>

<script>
let uploadedImages = [];

// Handle image uploads
document.getElementById("images").addEventListener("change", function (e) {
  const files = Array.from(e.target.files);
  uploadedImages = [];

  if (!files.length) return;

  let loadedCount = 0;

  files.forEach(file => {
    const reader = new FileReader();

    reader.onload = function (event) {
      uploadedImages.push(event.target.result);
      loadedCount++;

      if (loadedCount === files.length) {
        console.log("All images loaded successfully 🌿");
      }
    };

    reader.readAsDataURL(file);
  });
});

function createStory() {
  const sender = document.getElementById("sender");
  const receiver = document.getElementById("receiver");
  const date = document.getElementById("date");
  const message = document.getElementById("message");
  const yourEmail = document.getElementById("yourEmail");

  if (!sender.value || !receiver.value || !message.value) {
    alert("Please fill everything first 🌿");
    return;
  }

  const data = {
    sender: sender.value.trim(),
    receiver: receiver.value.trim(),
    date: date.value,
    message: message.value.trim(),
    email: yourEmail.value.trim(),
    images: uploadedImages
  };

  // Encode safely
  const encoded = btoa(
    encodeURIComponent(JSON.stringify(data))
  );

  const baseURL =
    window.location.origin +
    window.location.pathname.replace("index.html", "");

  const link = baseURL + "story.html?data=" + encoded;

  document.getElementById("generatedLink").innerHTML = `
    <p>Your Love Link:</p>
    <input value="${link}" style="width:90%" readonly onclick="this.select()">
  `;
}
</script>
