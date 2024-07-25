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

function taskNumber(){
  let tasks = JSON.parse(sessionStorage.getItem('tasks')) || {};
  let number = Object.keys(tasks).length;
  return number + 1;
}
function saveTask(task,number){
    let tasks = JSON.parse(sessionStorage.getItem('tasks')) || {};
    tasks[number]= task;
    sessionStorage.setItem('tasks',JSON.stringify(tasks));
}

function getTask(number) {
    let tasks = JSON.parse(sessionStorage.getItem('tasks'));
    let taskKey = String(number); 
    return tasks[taskKey];
  }

// function delTask(number){
  
// }
  
addButton.addEventListener('click', addInput);
function addInput() {
    let task = taskInput.value;
    if (task !== '') {
        console.log('Task added:', task);
        let number = taskNumber();
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
  const liElement = target.parentElement.parentElement
  const taskTextDiv = target.parentElement.parentElement.querySelector('.taskText');

  if (target.classList.contains('editButton')) {
    // Handle the edit button click
    let number = taskTextDiv.getAttribute('data-number');
    const currentText = taskTextDiv.textContent;
    let editBar = `
    <input type="text" class="editInput" value="${currentText}">
    <button class="applyButton">Apply</button>
`
    liElement.innerHTML = editBar
    console.log(currentText);
  } else if (target.classList.contains('deleteButton')) {
    let number = taskTextDiv.getAttribute('data-number');
    const taskItem = target.closest('li'); // Find the parent <li> element
    if (taskItem) {
      taskItem.remove();

  }}
});
// const editButtons = document.querySelectorAll('.editButton');

// editButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     edit(button);
//   });
// });
// function edit(button) {
//   let taskTextDiv = button.parentElement.parentElement.querySelector('.taskText');
//   let currentText = taskTextDiv.textContent;
//   console.log(currentText);
// }
// // deleteButton.addEventListener('click', () => {
//     const task = taskInput.value;
//     if (task !== '') {
//         console.log('Task added:', task);
        
//         taskInput.value = ''; 
//     }
// });