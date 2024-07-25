const addButton = document.getElementById('addButton');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList')

addButton.addEventListener('click', () => {
    const task = taskInput.value;
    if (task !== '') {
        console.log('Task added:', task);
        
        taskInput.value = ''; 
    }
});
