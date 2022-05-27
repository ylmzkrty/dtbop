
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
  let userEnteredValue = inputBox.value; 
  if (userEnteredValue.trim() != 0) {
  
    addBtn.classList.add("active"); 
  } else {
    addBtn.classList.remove("active"); 
  }
};

showTasks();

addBtn.onclick = () => {
  
  const data = { task: inputBox.value };

  fetch("/api/task", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  setTimeout(() => {
    showTasks();

  }, 300)
};

async function showTasks() {
  const getLocalStorageData = await fetch("/api/task", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.text())
    .then((data) => data);



  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData);
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; 
  if (listArray.length > 0) {
    
    deleteAllBtn.classList.add("active"); 
  } else {
    deleteAllBtn.classList.remove("active"); 
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element.task}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag;
  inputBox.value = ""; 
}

function deleteTask(index) {
  const data = { index: index, all: false };
  fetch("/api/task", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  showTasks();
}

deleteAllBtn.onclick = (index) => {
  console.log("a")
  const data = { index: index, all: true };
  fetch("/api/task", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  showTasks();
};
