function selectProfile(profile) {
    document.getElementById('profile-selection').style.display = 'none';
    document.getElementById('chat-container').style.display = 'block';
}


function sendMessage() {
    const message = document.getElementById("message-input").value;
    if (message) {
        db.collection("messages").add({
            content: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        document.getElementById("message-input").value = "";
    }
}

db.collection("messages")
    .orderBy("timestamp")
    .onSnapshot((snapshot) => {
        const messagesContainer = document.getElementById("messages");
        messagesContainer.innerHTML = "";
        snapshot.forEach((doc) => {
            const messageElement = document.createElement("div");
            messageElement.textContent = doc.data().content;
            messagesContainer.appendChild(messageElement);
        });
    });


function addImage() {
    const messagesContainer = document.getElementById("messages");
    const imageElement = document.createElement("img");
    imageElement.src = "images/exemple_image.png"; // À remplacer avec la gestion d’upload
    imageElement.style.width = "100px";
    messagesContainer.appendChild(imageElement);
}

const firebaseConfig = {
    apiKey: "AIzaSyB8BPZmt0GhhIt07ztJbbnRdb-t6RxhTGg",
    authDomain: "nnapp-56897.firebaseapp.com",
    projectId: "nnapp-56897",
    storageBucket: "nnapp-56897.firebasestorage.app",
    messagingSenderId: "830385117177",
    appId: "1:830385117177:web:cf57a2ba30cd390be10f28",
    measurementId: "G-NKW2DKKEFT"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const analytics = getAnalytics(app);