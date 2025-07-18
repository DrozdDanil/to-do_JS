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

function addTask(){
    let newTask = document.createElement('li');

    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList.add('task-checkbox');

    let taskContent = document.createElement('span');
    taskContent.classList.add('task-content');
    taskContent.textContent = taskInput.value;

    let deleteTask = document.createElement('button');
    deleteTask.textContent = 'Удалить'; //innerText and textContent what difference
    deleteTask.classList.add('delete-button');

    newTask.appendChild(checkBox);
    newTask.appendChild(taskContent);
    newTask.appendChild(deleteTask);

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

function saveTasks(){

}




