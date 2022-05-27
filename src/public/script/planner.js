window.addEventListener('load', function () {
  allStorage()
})

const breakTask = document.getElementById("break");
const gymTask = document.getElementById("gym");
const studyTask = document.getElementById("study");
const bookTask = document.getElementById("book");
const tvTask = document.getElementById("tv");
const friendsTask = document.getElementById("friends");
const workTask = document.getElementById("work");
const deselectBtn = document.getElementById('deselect');
const taskContainer = document.querySelector(".task__container");
const scheduleContainer = document.querySelector(".schedule__container");
const resetBtn = document.querySelector('.deleteBtn');
const resetAllPlan = document.getElementById('deselect');


let selectedColor, active;

taskContainer.addEventListener('click', selectTask);
scheduleContainer.addEventListener('click', setColors);
deselectBtn.addEventListener('click', resetTasks);
resetAllPlan.addEventListener('click', deleteTasks);

function selectTask(e) {

  resetTasks();

  taskColor = e.target.style.backgroundColor;

  switch (e.target.id) {
    case "break":
      activeTask(breakTask, taskColor);
      icon = '<i class="fas fa-couch"></i>';
      break;
    case "gym":
      activeTask(gymTask, taskColor);
      icon = '<i class="fas fa-dumbbell"></i>';
      break;
      case "study":
        activeTask(studyTask, taskColor);
        icon = '<i class="fas fa-book-reader"></i>';
        break;
    case "book":
      activeTask(bookTask, taskColor);
      icon = '<i class="fas fa-book"></i>';
      break;
    case "tv":
      activeTask(tvTask, taskColor);
      icon = '<i class="fas fa-tv"></i>';
      break;
    case "friends":
      activeTask(friendsTask, taskColor);
      icon = '<i class="fas fa-users"></i>';
      break;
    case "work":
      activeTask(workTask, taskColor);
      icon = '<i class="fas fa-briefcase"></i>';
      break;
  }
}

async function setColors(e) {
  const tasks = document.querySelectorAll(".task");

  if (e.target.classList.contains("task") && active === true) {
    e.target.style.backgroundColor = selectedColor;
    e.target.innerHTML = icon;

    const data = { id: e.target.id, color: selectedColor, icon: icon };

    await fetch("/api/planner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      });
  
  } else if (e.target.classList.contains("fas") && active === true) {
    e.target.parentElement.style.backgroundColor = selectedColor;
    e.target.parentElement.innerHTML = icon;
  }

  
}

async function allStorage() {

  const data = await fetch("/api/planner", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    }).then((response) => response.text())
    .then((data) => JSON.parse(data));

    data.forEach(x => {
      document.getElementById(x.id).style.backgroundColor = x.color
      document.getElementById(x.id).innerHTML = x.icon
    })
}

function activeTask(task, color){
  task.classList.toggle('selected');

  if(task.classList.contains('selected')){
      active = true;
      selectedColor = color;
      return selectedColor;
  } else {
      active = false;
  }
}

function resetTasks(){
  const allTasks = document.querySelectorAll('.task__name');

  allTasks.forEach((item)=>{
      item.className = 'task__name';
  })
}

async function deleteTasks(){
  const allTasks = document.querySelectorAll('.task');

  allTasks.forEach((item)=>{
    item.innerHTML = '';
    item.style.backgroundColor = 'white'; 
   })

   const data = await fetch("/api/planner", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    })
}

