const API_URL = "https://node-backends.onrender.com";

// GET NOTES
async function getNotes() {
  const res = await fetch(API_URL);
  const notes = await res.json();

  const container = document.getElementById("notesContainer");
  container.innerHTML = "";

  notes.forEach(note => {
    container.innerHTML += `
      <div class="note">
        <h3>${note.title}</h3>
        <p>${note.content}</p>

        <button onclick="deleteNote('${note._id}')">Delete</button>
      </div>
    `;
  });
}

// ADD NOTE
async function addNote() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content })
  });

  getNotes();
}

// DELETE NOTE
async function deleteNote(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  getNotes();
}

// Load notes on page start
getNotes();

async function updateNote(id) {
  const newTitle = prompt("New Title:");
  const newContent = prompt("New Content:");

  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: newTitle,
      content: newContent
    })
  });

  getNotes()
  if (notes.length === 0) {
  container.innerHTML = "<p>No notes yet. Add one!</p>";
  return;
}
  ;
}