//Selectors
const body = document.body;

//Task Manager
const addTaskBtn = document.querySelector("#add-task");
const formOverlay = document.querySelector(".form-overlay");
const closeForm = document.querySelector("#close-form");
const form = document.querySelector("form");
const taskContainer = document.querySelector(".task-container");
const pendingTasks = document.querySelector(".pending-tasks");
const completedTasks = document.querySelector(".completed-task");
const countPending = document.querySelector("#stats-pending");
const countCompleted = document.querySelector("#stats-completed");

//Theme
const themeBtn = document.querySelector(".theme-btn");
const themeIcon = document.querySelector("#theme-icon");

//Event Delegation
const grandparent = document.querySelector(".grandparent");
const parent = document.querySelector(".parent");
const child = document.querySelector(".child");
const modeSelection = document.querySelector(".modes");
const modeBtns = document.querySelectorAll(".mode");
const consoleBox = document.querySelector(".console");

//input.value VS .getAttribute("value")
const diffInput = document.querySelector("#diff-input");
const diffVal = document.querySelector("#diff-out-value");
const diffAtr = document.querySelector("#diff-out-attri");

//Browser Render Pipeline
const arrows = document.querySelectorAll(".arrow");
const mediaQuery = window.matchMedia("(min-width: 1024px)");

//Variables
let btn;
let editIndex = null;
let TASKS = [
  {
    task: "test task",
    category: "study",
    status: "pending",
    bgcolor: "hsl(314, 60%, 82%)",
  },
];
let timers = [];
let delay = 0;
let isRunning = false;

themeBtn.addEventListener("click", () => {
  if (body.getAttribute("data-theme") !== "light") {
    body.setAttribute("data-theme", "light");

    themeIcon.classList.replace("ri-sun-line", "ri-moon-clear-fill");
  } else {
    body.setAttribute("data-theme", "dark");
    themeIcon.classList.replace("ri-moon-clear-fill", "ri-sun-line");
  }
});

let randomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 85%)`;
};

taskContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("empty-add-btn")) {
    formOverlay.style.display = "flex";
  }
});

let ui = () => {
  pendingTasks.innerHTML = "";
  completedTasks.innerHTML = "";

  //Task stats
  let totalPending = 0;
  let totalCompleted = 0;
  TASKS.forEach((elem) => {
    if (elem.status === "pending") {
      totalPending++;
    } else if (elem.status === "completed") {
      totalCompleted++;
    }
  });
  countPending.textContent = totalPending;
  countCompleted.textContent = totalCompleted;

  //Task rendering
  // if (totalPending === 0 && totalCompleted === 0) {
  //   pendingTasks.innerHTML = `
  //   <div class="empty-state">
  //     <i class="ri-file-list-3-line"></i>
  //     <h3>No tasks yet</h3>
  //     <p>Click "Add Task" to create your first task.</p>
  //     <button class="empty-add-btn">+ Add Task</button>
  //   </div>
  // `;
  //   completedTasks.innerHTML = "";
  //   return;
  // }

    // Empty state - Pending
  if (totalPending === 0) {
    pendingTasks.innerHTML = `
      <div class="empty-state">
        <i class="ri-file-list-3-line"></i>
        <h3>No Pending Tasks</h3>
        <p>Create a new task to get started.</p>
        <button class="empty-add-btn">+ Add Task</button>
      </div>
    `;
  }

    // Empty state - Completed
  if (totalCompleted === 0) {
    completedTasks.innerHTML = `
      <div class="empty-state">
        <i class="ri-checkbox-circle-line"></i>
        <h3>No Completed Tasks</h3>
        <p>Complete a task to see it here.</p>
      </div>
    `;
  }
  TASKS.forEach((elem, index) => {
    if (elem.status === "pending") {
      pendingTasks.innerHTML += `
        <div class="task-card"  style="background-color:${elem.bgcolor}">
              <h3>${elem.task}</h3>

              <span class="category"> ${elem.category} </span>

              <div class="actions">
                <button class="edit-btn" onClick="editTask('${index}')">Edit</button>

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
                <button class="undo-btn" onClick="undoClicked(${index})">Undo</button>
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
  form.reset();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (form[0].value.trim() === "" || form.category.value === "") {
    alert("Please fill all the fields");
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
    TASKS.unshift(obj);
    formOverlay.style.display = "none";
  }
  // console.log(TASKS);
  ui();
  form.reset();
});

let editTask = (index) => {
  formOverlay.style.display = "flex";
  form[2].textContent = "Edit";

  editIndex = index;

  form[0].value = TASKS[index].task;
  form.category.value = TASKS[index].category;
};

let deleteTask = (index) => {
  TASKS.splice(index, 1);
  ui();
};

let markedCompleted = (index) => {
  TASKS[index].status = "completed";
  ui();
};

let undoClicked = (index) => {
  TASKS[index].status = "pending";
  ui();
};

/*
DEFINATION:
Event Propogation is the phenomenon of the direction in which the event travells across the webpage. Event Bubbling moves from bottom up that means from target element up to the root, whereas in Event Capturing the event moves from the root to the bottom target element.
*/
consoleBox.addEventListener("click", (e) => {
  if ((e.target.id = "clear-console")) {
    consoleBox.innerHTML = `
      <div class="output">
        Output <button id="clear-console">Clear console</button>
      </div>
      <div class="input-line">
        <span class="prompt">&gt</span>
        <span class="cursor"></span>
      </div>
    `;

    console.clear();
  }
});

modeSelection.addEventListener("click", (e) => {
  if (!e.target.classList.contains("mode")) return;
  modeBtns.forEach((elem) => (elem.style.filter = "initial"));

  delay = 0;

  btn = e.target.dataset.mode;
  e.target.style.filter = "brightness(1.5)";

  consoleBox.innerHTML = `
        <div class="output">Output <button id="clear-console">Clear console</button></div>
              <div class="input-line">
                <span class="prompt">&gt</span>
                <span class="cursor"></span>
              </div>
  `;

  console.clear();
});

let showOutputOnConsole = (relative, propagation) => {
  let timer = setTimeout(() => {
    consoleBox.innerHTML += ` 
              <div class="input-line">
                <span class="prompt">&gt</span>
                <span class="command">${propagation} mode - ${relative}</span>
              </div>
  `;
    console.log(`${propagation} mode - ${relative} clicked`);
  }, delay);

  delay += 300;
  timers.push(timer);
};

//Event Listeners - Grandparent <--> parent <--> child
grandparent.addEventListener("click", () => {
  if (btn === "bubbling") showOutputOnConsole("Grandparent", "Bubbling");
});
grandparent.addEventListener(
  "click",
  () => {
    delay = 0;
    if (btn === "capturing") showOutputOnConsole("Grandparent", "Capturing");
  },
  true,
);

parent.addEventListener("click", () => {
  if (btn === "bubbling") showOutputOnConsole("Parent", "Bubbling");
});
parent.addEventListener(
  "click",
  () => {
    if (btn === "capturing") showOutputOnConsole("Parent", "Capturing");
  },
  true,
);

child.addEventListener("click", () => {
  if (isRunning) return;

  isRunning = true;
  delay = 0;
  setTimeout(() => {
    isRunning = false;
  }, 1000);

  if (btn === "bubbling") showOutputOnConsole("Child", "Bubbling");
});

child.addEventListener(
  "click",
  () => {
    if (btn === "capturing") showOutputOnConsole("Child", "Capturing");
  },
  true,
);

/*
  DIFFERENCE BETWEEN input.value and input.getAttribute("value")
  They both are used to fetch the value of input element, but the key difference between them is that input.value works dynamically means it changes its results according to the live changes happening in the input values, wherease the input.getAttribute("value") method only gives the static default text written in the input value, doesn't change with respect to live changes.
*/
diffInput.addEventListener("input", (e) => {
  // console.log(diffInput.getAttribute("value"))
  diffVal.textContent = `${e.target.value}`;
  diffAtr.textContent = `${diffInput.getAttribute("value")}`;
});

//Changing arrow alignment resposively
function handleResoponsiveArrow(e) {
  if (e.matches) {
    arrows.forEach((arrow) =>
      arrow.classList.replace(
        "ri-arrow-down-long-line",
        "ri-arrow-right-long-line",
      ),
    );

    console.log("welcome desktop user!");
  } else {
    arrows.forEach((arrow) =>
      arrow.classList.replace(
        "ri-arrow-right-long-line",
        "ri-arrow-down-long-line",
      ),
    );
    console.log("welcome mobile user!");
  }
}
mediaQuery.addEventListener("change", handleResoponsiveArrow);
handleResoponsiveArrow(mediaQuery);
