
const deleteButton = document.querySelector(".box button");

deleteButton.onclick = async () => {

  const data = { id: deleteButton.id };
  await fetch("/api/note", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  
  location.reload();

}