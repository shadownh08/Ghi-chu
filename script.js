// Import các hàm cần dùng từ Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

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

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// Lấy các phần tử từ HTML
const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const noteList = document.getElementById("noteList");

// Hàm thêm ghi chú
addBtn.addEventListener("click", () => {
  const noteText = noteInput.value.trim();
  if (noteText !== "") {
    const noteRef = push(ref(db, "notes"));
    set(noteRef, {
      text: noteText,
      time: new Date().toLocaleString(),
      createdAt: Date.now() // thêm thời gian tạo để sắp xếp
    });
    noteInput.value = "";
  }
});

// Lắng nghe thay đổi dữ liệu và hiển thị
onValue(ref(db, "notes"), (snapshot) => {
  noteList.innerHTML = "";
  const data = snapshot.val();
  if (data) {
    const notes = Object.entries(data)
      .sort((a, b) => b[1].createdAt - a[1].createdAt); // sắp theo thời gian giảm dần

    notes.forEach(([id, note]) => {
      const li = document.createElement("li");
      li.textContent = `${note.text} (${note.time})`;
      noteList.appendChild(li);
    });
  }
});
