const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

(function(){
    document.getElementById('tab-btn-all').checked = true;
})();

class Task {
    constructor(text){
        this.text = text.trim();
        this.date = new Date();
        this.completed = false;
        this.element = this.createSomeTask();
    }

    createSomeTask(){
        const taskLi = document.createElement('li');
        taskLi.classList.add('task');

        const contentContainer = document.createElement('div');
        contentContainer.classList.add('content-container');

        this.checkbox = this.createCheckbox();
        this.content = this.createContent();
        this.deleteBtn = this.createDeleteButton();
        this.timeOfCreationEl = this.createTimeOfCreation();

        const topRow = document.createElement('div');
        topRow.classList.add('top-row');
        topRow.append(this.checkbox, this.content, this.deleteBtn);

        contentContainer.append(topRow, this.timeOfCreationEl);
        taskLi.appendChild(contentContainer);

        return taskLi;
    }

    createCheckbox(){
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('task-checkbox');
        checkbox.checked = this.completed;
        checkbox.addEventListener('change', () => this.toggleComplete());
        return checkbox;
    }

    createContent(){
        const content = document.createElement('span');
        content.classList.add('task-content');
        if(this.completed){
            content.classList.add('completed');
        }

        const visibleText = this.getVisibleText();
        content.textContent = visibleText.text;
        if(visibleText.isTrunc){
            content.title = this.text;
        } 
        return content;
    }
    
    getVisibleText(){
        const MAX_TEXT_LENGTH = 15;
        const normText = this.text.replace(/\s+/g, ' ');
        if(normText.length > MAX_TEXT_LENGTH){
            return{
                text: normText.slice(0, 15) + '…',
                isTrunc: true,
            };
        }
        return{
            text: normText,
            isTrunc: false,
        }
    }

    createDeleteButton(){
        const button = document.createElement('button');
        button.textContent = '×';
        button.classList.add('delete-button');
        button.addEventListener('click', () => this.remove());
        return button;
    }

    createTimeOfCreation(){
        const timeOfCreationEl = document.createElement('time');
        timeOfCreationEl.classList.add('time');
        timeOfCreationEl.textContent = this.date.toLocaleString().slice(0, -3);
        return timeOfCreationEl;
    }

    toggleComplete(){
        this.completed = this.checkbox.checked;
        this.content.classList.toggle('completed', this.completed);
        filterTasks(getActiveFilter());
    }

    remove(){
        this.element.remove();
    }

    processing(){
        taskList.prepend(this.element);
    }
}

function filterTasks(filterType) {
    const tasks = document.querySelectorAll('.task');
    
    tasks.forEach(taskEl => {
        const isCompleted = taskEl.querySelector('.task-checkbox').checked;
        
        switch(filterType) {
            case 'all':
                taskEl.style.display = 'block';
                break;
            case 'active':
                taskEl.style.display = isCompleted ? 'none' : 'block';
                break;
            case 'completed':
                taskEl.style.display = isCompleted ? 'block' : 'none';
                break;
        }
    });
}

function getActiveFilter(){
    const activeTab = document.querySelector('.tab:checked');
    return activeTab ? activeTab.dataset.target : 'all';
}

document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('change', e => {
        if(e.target.checked){
            filterTasks(e.target.dataset.target);
        }
    })
})

function validAddTask(){
    if(taskInput.value.trim() === ''){
        alert('Заполните пустое поле!');
        return false;
    }
    
    const task = new Task(taskInput.value);
    task.processing();
    taskInput.value = '';

    filterTasks(getActiveFilter());
    return true;
}

addTaskBtn.addEventListener('click', validAddTask);
taskInput.addEventListener('keydown', e => {
    if(e.key === 'Enter'){
        validAddTask();
    }
})