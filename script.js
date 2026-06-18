const addTaskBtn = document.querySelector("#add-task");
const formOverlay = document.querySelector(".form-overlay");
const closeForm = document.querySelector("#close-form");
const form = document.querySelector("form");
const taskContainer = document.querySelector(".task-container")
const pendingTasks = document.querySelector(".pending-tasks");
const completedTasks = document.querySelector(".completed-task");

let editIndex = null;

let TASKS = [
  {
    task: "test task",
    category: "study",
    status: "pending",
    bgcolor: "hsl(314, 60%, 82%)",
  },
];

let randomColor = () => {
  const hue = Math.floor(Math.random() * 360);

  return `hsl(${hue}, 70%, 85%)`;
};

let ui = () => {


  pendingTasks.innerHTML = "";
  completedTasks.innerHTML = "";

  TASKS.forEach((elem, index) => {
    if (elem.status === "pending") {
      pendingTasks.innerHTML += `
        <div class="task-card"  style="background-color:${elem.bgcolor}">
              <h3>${elem.task}</h3>

              <span class="category"> ${elem.category} </span>

              <div class="actions">
                <button class="edit-btn" onClick="editTask('${elem.task}')">Edit</button>

                <button class="complete-btn" onClick="markedCompleted(${index})">Complete</button>

                <button class="delete-btn" onClick="deleteTask(${index})">Delete</button>
              </div>
            </div>
        `;
    } else if (elem.status === "completed") {
      completedTasks.innerHTML += `
            <div class="task-card">
              <h3>${elem.task}</h3>

              <span class="category">${elem.category} </span>

              <div class="actions">
               
                <button class="delete-btn" onClick="deleteTask(${index})">Delete</button>
              </div>
            </div>
            `;
    }
  });
};
ui();

addTaskBtn.addEventListener("click", () => {
  formOverlay.style.display = "flex";
});

closeForm.addEventListener("click", () => {
  formOverlay.style.display = "none";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (form[0].value.trim() === "" || form.category.value === "") {
    alert("Please fill all the fields")
    formOverlay.style.display = "none";
    return; 
  }

  let task = form[0].value;
  let category = form.category.value;
  let bgcolor = randomColor();

  let obj = {
    task,
    category,
    status: "pending",
    bgcolor,
  };

  if (editIndex !== null) {
    TASKS[editIndex] = obj;
    editIndex = null;
    formOverlay.style.display = "none";
  } else {
    TASKS.push(obj);
    formOverlay.style.display = "none";
  }
  console.log(TASKS);
  ui();
  form.reset();
});

let editTask = (tName) => {
  formOverlay.style.display = "flex";
  form[2].textContent = "Edit";
  let taskContent = TASKS.find((elem) => elem.task === tName);
  editIndex = TASKS.findIndex((elem) => elem.task === tName);

  form[0].value = taskContent.task;
  form.category.value = taskContent.category;
};

let deleteTask = (index) => {
  TASKS.splice(index, 1);
  ui();
};

let markedCompleted = (index) => {
  TASKS[index].status = "completed";
  ui();
};
