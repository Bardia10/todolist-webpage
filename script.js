const addButton = document.getElementById('addButton');
const deleteButton = document.getElementById('deleteButton');
const editButton = document.getElementById('editButton');
const applyButton = document.getElementById('applyButton');
const completeButton = document.getElementById('completeButton');
const taskInput = document.getElementById('taskInput');
const editInput = document.getElementById('editInput');
const taskList = document.getElementById('taskList')


window.onload = function() {
  let tasks = JSON.parse(sessionStorage.getItem('tasks'))||{};
  for (const [number, task] of Object.entries(tasks)) {
    addTask(task,number)
  }

};

function getNumber(){
  let number = JSON.parse(sessionStorage.getItem('highNumber')) || 0;
  number = parseInt(number)
  return number + 1 ;
}

function saveTask(task,number){
    let tasks = JSON.parse(sessionStorage.getItem('tasks')) || {};
    tasks[number]= task;
    sessionStorage.setItem('tasks',JSON.stringify(tasks));
    sessionStorage.setItem('highNumber',JSON.stringify(number));
    number++;
    
}

function getTask(number) {
    let tasks = JSON.parse(sessionStorage.getItem('tasks'));
    let taskKey = String(number); 
    return tasks[taskKey];
  }

function delTask(number){
  let tasks = JSON.parse(sessionStorage.getItem('tasks'));
  delete tasks[number];
  sessionStorage.setItem('tasks',JSON.stringify(tasks));

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

function enterAdd(event){
  if (event.key==='Enter'){
    addInput()
  }
}

taskList.addEventListener('click', (event) => {
  const target = event.target;
  const taskTextDiv = target.parentElement.parentElement.querySelector('.taskText');

  if (target.classList.contains('editButton')) {
    // Handle the edit button click
    let number = taskTextDiv.getAttribute('data-number');
    let liElement = target.parentElement.parentElement
    const currentText = taskTextDiv.textContent;
    let editBar = `
    <input type="text" class="editInput" value="${currentText}" >
    <button class="applyButton" data-number=${number}>Apply</button>
`
    liElement.innerHTML = editBar
  } else if (target.classList.contains('deleteButton')) {
    let number = taskTextDiv.getAttribute('data-number');
    let liElement = target.parentElement.parentElement
    const taskItem = target.closest('li'); // Find the parent <li> element
    if (taskItem) {
      taskItem.remove();
    delTask(number);
  }} else if (target.classList.contains('applyButton')) {
    let number = target.getAttribute('data-number');
    let liElement = target.parentElement
    const taskItem = target.closest('li'); // Find the parent <li> element
    let inputBar = liElement.querySelector('input')
    let editedItem=inputBar.value
    editTask(editedItem, number,liElement)
  }
});

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
    saveTask(newTask,number)
}
