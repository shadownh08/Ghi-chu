import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, push, onValue, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCtna9R5Rk7xp5YDoMG9EDeLenKwXYd4kw",
  authDomain: "ghi-chu-3680a.firebaseapp.com",
  databaseURL: "https://ghi-chu-3680a-default-rtdb.firebaseio.com",
  projectId: "ghi-chu-3680a",
  storageBucket: "ghi-chu-3680a.firebasestorage.app",
  messagingSenderId: "137043146791",
  appId: "1:137043146791:web:a192a194f42114700d7602",
  measurementId: "G-N4RLX5X24X"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const noteInput = document.getElementById("noteInput");
const noteList = document.getElementById("noteList");

// Nhấn Enter để lưu
noteInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && noteInput.value.trim() !== "") {
    push(ref(db, "notes"), {
      text: noteInput.value.trim(),
      time: serverTimestamp()
    });
    noteInput.value = "";
  }
});

// Hiển thị ghi chú theo thứ tự mới nhất
onValue(ref(db, "notes"), (snapshot) => {
  const notes = [];
  snapshot.forEach(child => notes.push(child.val()));
  notes.sort((a, b) => (b.time || 0) - (a.time || 0));

  noteList.innerHTML = notes
    .map(n => `<li>${n.text}</li>`)
    .join("");
});
