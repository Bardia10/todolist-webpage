const addButton = document.getElementById('addButton');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList')


window.onload = function() {
  let tasks = JSON.parse(sessionStorage.getItem('tasks'))||{};
  for (const [number, task] of Object.entries(tasks)) {
    addTask(task,number)
  }

};

function addTask(task, number){
  const newItem = `<li>
        <div class="taskText" data-number="${number}">${task}</div>
        <div class="taskButtons">
            <button class="editButton">Edit</button>
            <button class="deleteButton">Delete</button>
            <input type="checkbox" class="completeButton">
        </div>
        </li>`;
  taskInput.value = ''; 
  taskList.insertAdjacentHTML('beforeend',newItem);
  saveTask(task,number)
}

function saveTask(task,number){
  let tasks = JSON.parse(sessionStorage.getItem('tasks')) || {};
  tasks[number]= task;
  sessionStorage.setItem('tasks',JSON.stringify(tasks));
  sessionStorage.setItem('highNumber',JSON.stringify(number));  
}


addButton.addEventListener('click', addInput);
function addInput() {
    let task = taskInput.value;
    if (task !== '') {
        let number = getNumber();
        addTask(task, number)
        taskInput.value = ''; 
    }
}

function getNumber(){
  let number = JSON.parse(sessionStorage.getItem('highNumber')) || 0;
  number = parseInt(number)
  return number + 1 ;
}

function enterAdd(event){
  if (event.key==='Enter'){
    addInput()
  }
}



taskList.addEventListener('click', (event) => {
  const target = event.target;

  if (target.classList.contains('editButton')) {
    let taskTextDiv = target.parentElement.parentElement.querySelector('.taskText');
    let number = taskTextDiv.getAttribute('data-number');
    // let liElement = target.parentElement.parentElement
    const liElement = target.closest('li'); // Find the parent <li> element
    const currentText = taskTextDiv.textContent;
    let editBar = `
    <input type="text" class="editInput" value="${currentText}" >
    <button class="applyButton" data-number=${number}>Apply</button>
    `
    liElement.innerHTML = editBar
  } 
  else if (target.classList.contains('deleteButton')) {
    let taskTextDiv = target.parentElement.parentElement.querySelector('.taskText');
    let number = taskTextDiv.getAttribute('data-number');
    // let liElement = target.parentElement.parentElement
    const liElement = target.closest('li'); // Find the parent <li> element
    if (liElement) {
      liElement.remove();
    delTask(number);
  }} 
  else if (target.classList.contains('applyButton')) {
    let number = target.getAttribute('data-number');
    // let liElement = target.parentElement
    const liElement = target.closest('li'); // Find the parent <li> element
    let inputBar = liElement.querySelector('input')
    let editedItem=inputBar.value
    editTask(editedItem, number,liElement)
  }
});

function delTask(number){
  let tasks = JSON.parse(sessionStorage.getItem('tasks'));
  delete tasks[number];
  sessionStorage.setItem('tasks',JSON.stringify(tasks));
  
  }

function editTask(newTask,number,liElement){
    let editedItem = `
        <div class="taskText" data-number="${number}">${newTask}</div>
        <div class="taskButtons">
            <button class="editButton">Edit</button>
            <button class="deleteButton">Delete</button>
            <input type="checkbox" class="completeButton">
        </div>
`
    liElement.innerHTML = editedItem
    updateTask(newTask,number)
}

function updateTask(task, number){
  let tasks = JSON.parse(sessionStorage.getItem('tasks')) || {};
  tasks[number]= task;
  sessionStorage.setItem('tasks',JSON.stringify(tasks));
}



