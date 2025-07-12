const addTaskBtn = document.getElementById('addTaskBtn');
let taskInput = document.getElementById('taskInput');
let taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', () => { //добавить, чтоб при срабатывании Enter
    if (taskInput.value === ''){
        alert('Заполните пустое поле!');
    } else { // функция addTask
        addTask();
    }
})

function addTask(){
    let newTask = document.createElement('li');

    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';

    let taskContent = document.createElement('span');
    taskContent.textContent = taskInput.value;

    let deleteTask = document.createElement('button');
    deleteTask.textContent = 'Удалить'; //innerText and textContent what difference

    newTask.appendChild(checkBox);
    newTask.appendChild(taskContent);
    newTask.appendChild(deleteTask);

    taskList.prepend(newTask);
}

function deleteTask(){
    
}

