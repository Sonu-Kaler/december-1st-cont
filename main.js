const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Load tasks from local storage and add them to the list
const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
savedTasks.forEach((task) => addTask(task.text, task.completed));

// Event listener for adding a new task
addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    addTask(taskText, false);
    taskInput.value = "";
  }
});

function addTask(text, completed) {
  // Create task item and set text
  const taskItem = document.createElement("li");
  const taskText = document.createElement("span");
  taskText.textContent = text;
  taskItem.appendChild(taskText);

  const spnBtn = document.createElement("span");

  // Mark as completed if applicable

  
  // Create and add "Complete" button
  const cButton = document.createElement("button");
  cButton.textContent="Mark Completed";
  cButton.addEventListener('click',function(){
    if(cButton.innerText==="Mark Completed"){
      cButton.textContent="Done";
      taskText.className="inlinee";
    }
    else{
      cButton.textContent="Mark COmpleted";
      taskText.className="";
    }
  });
  spnBtn.appendChild(cButton);

  // Create and add "Edit" button
  const eButton = document.createElement("button");
  eButton.textContent="Edit";
  eButton.addEventListener('click',function(){
    eButton.textContent="Done";
    let vl = taskInput.value;
    taskText.textContent=vl;
    eButton.textContent="Edit";
    taskInput.value="";
  })
  spnBtn.appendChild(eButton);

  // Add logic for editing a task


  // Create and add "Delete" button
  const dButton = document.createElement("button");
  dButton.textContent="Delete";
  dButton.addEventListener('click', function(){
    taskItem.remove();
    console.log("done");
  })
  spnBtn.appendChild(dButton);

  // Append buttons to task item and task item to list
  taskItem.appendChild(spnBtn);


  taskList.appendChild(taskItem);


  // Save updated tasks to local storage
  saveTasks();
}

function saveTasks() {
  const tasks = Array.from(taskList.children).map((task) => ({
    text: task.querySelector("span").textContent, // Extract task text
    completed: task.classList.contains("completed") // Check if task is completed
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Save to local storage
}
