// Import Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

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
const db = getFirestore(app);

// Elements of UI
const startScreen = document.getElementById('startScreen');
const chatScreen = document.getElementById('chatScreen');
const reminderScreen = document.getElementById('reminderScreen');
const profileSelection = document.getElementById('profileSelection');

const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessageButton');
const messagesContainer = document.getElementById('messagesContainer');

const reminderList = document.getElementById('reminderList');
const addReminderButton = document.getElementById('addReminderButton');

let currentProfile;

// Profile Selection
profileSelection.addEventListener('click', function(event) {
  currentProfile = event.target.dataset.profile;
  if (currentProfile) {
    startScreen.style.display = 'none';
    chatScreen.style.display = 'block';
  }
});

// Send Message
sendMessageButton.addEventListener('click', async function() {
  const message = messageInput.value;
  if (message) {
    try {
      await addDoc(collection(db, 'messages'), {
        sender: currentProfile,
        message: message,
        timestamp: Date.now()
      });
      messageInput.value = '';
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
});

// Load Messages
async function loadMessages() {
  const querySnapshot = await getDocs(collection(db, 'messages'));
  messagesContainer.innerHTML = '';
  querySnapshot.forEach((doc) => {
    const messageData = doc.data();
    const messageElement = document.createElement('div');
    messageElement.textContent = `${messageData.sender}: ${messageData.message}`;
    messagesContainer.appendChild(messageElement);
  });
}

// Set Interval for loading messages
setInterval(loadMessages, 1000);

// Reminders List
addReminderButton.addEventListener('click', async function() {
  const reminder = prompt('Enter a new reminder:');
  if (reminder) {
    try {
      await addDoc(collection(db, 'reminders'), {
        reminder: reminder,
        completed: false
      });
    } catch (e) {
      console.error('Error adding reminder: ', e);
    }
  }
});

// Load Reminders
async function loadReminders() {
  const querySnapshot = await getDocs(collection(db, 'reminders'));
  reminderList.innerHTML = '';
  querySnapshot.forEach((doc) => {
    const reminderData = doc.data();
    const reminderElement = document.createElement('div');
    reminderElement.textContent = reminderData.reminder;
    reminderList.appendChild(reminderElement);
  });
}

// Set Interval for loading reminders
setInterval(loadReminders, 5000);

// Easter Egg
const easterEggElement = document.getElementById('easterEgg');
easterEggElement.addEventListener('click', function() {
  alert('You found the hidden bear! 🐻');
});

// Initialize App Screens
startScreen.style.display = 'block';
chatScreen.style.display = 'none';
reminderScreen.style.display = 'none';