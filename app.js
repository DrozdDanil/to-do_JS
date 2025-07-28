const addTaskBtn = document.getElementById('addTaskBtn');
let taskInput = document.getElementById('taskInput');
let taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', () => { //добавить, чтоб при срабатывании Enter
    if (taskInput.value.trim() === ''){
        alert('Заполните пустое поле!');
    } else { 
        addTask();
    }
})
//??????????????????????????????????????????????????????????????????????
taskInput.addEventListener('keydown', (e) => {
    let key = e.which || e.keyCode;  //что-то другое, это устарело
    //по типу: if(e.key === 'Enter' || e.keyCode === 13){}
    if(key === 13 ){
    if(taskInput.value.trim() === ''){
        alert('Заполните путое поле!');
    } else {
        addTask();
    }}
})

function addCheckBoxTask(){
    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList.add('task-checkbox');
    return checkBox;
}

function addSpanTask(text){
    let taskContent = document.createElement('span');
    taskContent.classList.add('task-content');
    taskContent.textContent = taskInput.value;
    return taskContent;
}

function addButtonTask(){
    let deleteTask = document.createElement('button');
    deleteTask.textContent = 'Удалить'; //innerText and textContent what difference
    deleteTask.classList.add('delete-button');
    return deleteTask;
}

function addTimeTask(){
    let now = new Date().toLocaleString().slice(0, -3);
    let timeOfCreatingTask = document.createElement('time');
    timeOfCreatingTask.classList.add('time');
    timeOfCreatingTask.textContent = now.toString();
    
    return timeOfCreatingTask;
    console.log(now);
}
addTimeTask();

function addTask(){ 
    let newTask = document.createElement('li');
    let checkBox = addCheckBoxTask();
    let taskContent = addSpanTask(taskInput.value);
    let timeOfCreatingTask = addTimeTask(); 
    let deleteTask = addButtonTask();

    let contentContainer = document.createElement('div');
    contentContainer.classList.add('content-container');

    let topRow = document.createElement('div');
    topRow.classList.add('top-row');
    
    topRow.appendChild(checkBox);
    topRow.appendChild(taskContent);
    topRow.appendChild(deleteTask);

    contentContainer.appendChild(topRow);
    contentContainer.appendChild(timeOfCreatingTask);

    newTask.appendChild(contentContainer);
    taskList.prepend(newTask);
    taskInput.value = '';
}


//либо проверять текст, либо привязать класс к кнопке "Удалить"
taskList.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete-button')){
        e.target.closest('li').remove();
    }
});

taskList.addEventListener('change', (e) => {
    if(e.target.classList.contains('task-checkbox')){
        console.log('pipi-pupu');
        const taskContent = e.target.closest('li').querySelector('.task-content');
        taskContent.classList.toggle('completed', e.target.checked);
    }
});





// function saveTasks(){
//     const tasks = [];
//     const listItems = document.querySelectorAll('#taskList li');
//     for(let i = 0; i < listItems.length; i++){ //forEach ?
//         const taskElement = listItems[i]; 
//         tasks.push({
//             text: taskElement.querySelector('.task-content').textContent,
//             completed: taskElement.querySelector('.task-checkbox').checked
//         });
//     }
//     localStorage.setItem('tasks', JSON.stringify(tasks));
// }

// function loadTasks(){
//     const savedTasks = localStorage.getItem('tasks');
//     if(savedTasks){
//         const tasks = JSON.parse(saveTasks);
//         for(let i = 0; i < tasks.length; i++){
//             taskInput.value = task.text;
//             addTask();      
//         }
//     } 
// }




