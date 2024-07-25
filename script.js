const addButton = document.getElementById('addButton');
const deleteButton = document.getElementById('deleteButton');
const editButton = document.getElementById('editButton');
const applyButton = document.getElementById('applyButton');
const completeButton = document.getElementById('completeButton');
const taskInput = document.getElementById('taskInput');
const editInput = document.getElementById('editInput');
const taskList = document.getElementById('taskList')

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
  
addButton.addEventListener('click', addTask);
function addTask() {
    let task = taskInput.value;
    if (task !== '') {
        console.log('Task added:', task);
        let number = taskNumber();
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
        saveTask(task,number);
        let tsk = getTask(number);
    }
}

function enterAdd(event){
  if (event.key==='Enter'){
    addTask()
  }
}

const editButtons = document.querySelectorAll('.editButton');

// editButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     const taskTextDiv = button.parentElement.parentElement.querySelector('.taskText');
//     const currentText = taskTextDiv.textContent;
//     if (newText !== null) {
//       taskTextDiv.textContent = newText;
//     }
//   });
// });

// deleteButton.addEventListener('click', () => {
//     const task = taskInput.value;
//     if (task !== '') {
//         console.log('Task added:', task);
        
//         taskInput.value = ''; 
//     }
// });