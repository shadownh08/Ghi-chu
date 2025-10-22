// Import các hàm cần thiết từ Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Cấu hình Firebase
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

// Khởi tạo Firebase và Realtime Database
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Lấy phần tử HTML
const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const noteList = document.getElementById("noteList");

// Sự kiện thêm ghi chú
addBtn.addEventListener("click", () => {
  const note = noteInput.value.trim();
  if (note !== "") {
    const newNoteRef = push(ref(db, "notes"));
    set(newNoteRef, {
      text: note,
      time: new Date().toLocaleString()
    });
    noteInput.value = "";
  }
});

// Lấy dữ liệu realtime từ Firebase
onValue(ref(db, "notes"), (snapshot) => {
  noteList.innerHTML = "";
  const data = snapshot.val();
  if (data) {
    Object.keys(data).forEach((id) => {
      const li = document.createElement("li");
      li.textContent = `${data[id].text} (${data[id].time})`;
      noteList.appendChild(li);
    });
  }
});
