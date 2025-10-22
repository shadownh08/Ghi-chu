// script.js (module) - chạy với Firebase v11+ (import từ CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getDatabase, ref, push, set, onValue, update, remove
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// === Dán firebaseConfig của bạn vào đây ===
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
// ==========================================

// Khởi tạo Firebase + DB
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// DOM
const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const noteList = document.getElementById("noteList");

// HÀM thêm note
function addNote() {
  const txt = noteInput.value.trim();
  if (!txt) return;
  const noteRef = push(ref(db, "notes"));
  set(noteRef, {
    text: txt,
    time: new Date().toLocaleString(),
    createdAt: Date.now()
  });
  noteInput.value = "";
  noteInput.focus();
}

// Hỗ trợ: nhấn Enter để thêm
noteInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // tránh submit form nếu có
    addNote();
  }
});
addBtn.addEventListener("click", addNote);

// 1 lần chạy: nếu có note cũ thiếu createdAt thì cập nhật (chạy 1 lần tự động)
onValue(ref(db, "notes"), (snapshot) => {
  const data = snapshot.val();
  if (data) {
    Object.entries(data).forEach(([id, note]) => {
      if (!note.createdAt) {
        update(ref(db, "notes/" + id), { createdAt: Date.now() });
      }
    });
  }
});

// Lắng nghe realtime và hiển thị (sắp theo createdAt giảm dần)
onValue(ref(db, "notes"), (snapshot) => {
  noteList.innerHTML = "";
  const data = snapshot.val();
  if (!data) return;

  const notes = Object.entries(data)
    .sort((a, b) => (b[1].createdAt || 0) - (a[1].createdAt || 0));

  notes.forEach(([id, note]) => {
    const li = document.createElement("li");
    li.className = "note";

    const left = document.createElement("div");
    left.style.flex = "1";

    const text = document.createElement("div");
    text.textContent = note.text;
    text.style.wordBreak = "break-word";

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = note.time || "";

    left.appendChild(text);
    left.appendChild(meta);

    const right = document.createElement("div");

    // nút xóa
    const delBtn = document.createElement("button");
    delBtn.className = "btn-trash";
    delBtn.title = "Xóa ghi chú";
    delBtn.innerHTML = '🗑️';
    delBtn.onclick = () => {
      if (confirm("Xóa ghi chú này?")) {
        remove(ref(db, "notes/" + id));
      }
    };

    right.appendChild(delBtn);

    li.appendChild(left);
    li.appendChild(right);

    noteList.appendChild(li);
  });
});
