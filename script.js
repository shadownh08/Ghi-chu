const noteInput = document.getElementById("noteInput");
const saveBtn = document.getElementById("saveBtn");
const noteList = document.getElementById("noteList");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Hiển thị ghi chú khi mở trang
function renderNotes() {
    noteList.innerHTML = "";
    notes.forEach((note, index) => {
        const li = document.createElement("li");
        li.textContent = note;
        li.onclick = () => {
            if (confirm("Xóa ghi chú này?")) {
                notes.splice(index, 1);
                localStorage.setItem("notes", JSON.stringify(notes));
                renderNotes();
            }
        };
        noteList.appendChild(li);
    });
}
renderNotes();

// Lưu ghi chú
saveBtn.onclick = () => {
    const text = noteInput.value.trim();
    if (text !== "") {
        notes.push(text);
        localStorage.setItem("notes", JSON.stringify(notes));
        noteInput.value = "";
        renderNotes();
    }
};
