var TodoListApp = (function() {
var a = 10;
let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

// console.log('working');
async function fetchTodos() {
    // GET request
    // this fetch will give me a promise
    // // Method 1 using promises
    // fetch('https://jsonplaceholder.typicode.com/todos')
    // .then(function (response) {
    //     // console.log(response);
    //     return response.json();
    // }) .then (function (data) {
    //     console.log(data);
    //     tasks = data.slice(0,10);
    //     renderList();
    // })
    // .catch(function (error) {
    //     console.log('error',error);
    // })

    // method 2 using async- await
      
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        tasks = data.slice(0,10);
        renderList();
    }
    catch(error){
        console.log(error);
    }

}

// render list for showing actually on the screen
function addTaskToDOM(task) {
    const li = document.createElement('li');

    li.innerHTML =`
     <li>
    <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    <img src= "https://cdn2.iconfinder.com/data/icons/thin-line-color-1/21/33-512.png"  class="delete" data-id="${task.id}">
    </li>
    `
    tasksList.append(li);

}
function renderList() {
    tasksList.innerHTML = '';

    for(let i=0;i<tasks.length;i++) {
        addTaskToDOM(tasks[i]);
    }

    tasksCounter.innerHTML = tasks.length;
}

function toggleTask (taskId) {
    const task = tasks.filter(function (task) {
        return task.id == Number(taskId);
    });

    if(task.length>0){
        const currTask = task[0];

        currTask.completed = !currTask.completed;
        renderList();
        showNotification('Task toggled successfully');
        return;
    }
    showNotification('Could not toggle the task');
}

function deleteTask (taskId) {
    const newTasks = tasks.filter(function(task){
        return task.id !== Number(taskId);
       })
       tasks = newTasks;
    //    console.log(tasks.length);
       renderList();
       showNotification('Task deleted successfully');
}

function addTask(task) {
    if(task) {

         // GET request
    // this fetch will give me a promise
    // Method for post in api but it will not work since
    // it is a dummy dataset
    // fetch('https://jsonplaceholder.typicode.com/todos', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body:JSON.stringify(task),
    // })
    // .then(function (response) {
    //     // console.log(response);
    //     return response.json();
    // }) .then (function (data) {
    //     console.log(data);
    //     tasks.push(task);
    //     renderList();
    //     showNotification('Task added successfully');
    // })
    // .catch(function (error) {
    //     console.log('error',error);
    // })

        tasks.push(task);
        renderList();
        showNotification('Task added successfully');
        return;
    }
    showNotification('Task can not be added');
}

function showNotification(text) {
    alert(text);
}

function handleInputKeypress(event) {
    if(event.key == 'Enter'){
        const text = event.target.value;
        if(!text) {
            showNotification('Task text can not be empty');
            return ;
        }

        const task = {
            title :text,
            id:Date.now().toString(),
            completed:false
        }

        event.target.value = '';
        addTask(task);
    }

  

}

function handleClickListener(event){
    const target = event.target;
    if(target.className === 'delete'){
        const taskId = target.dataset.id;
        // console.log(taskId);
        deleteTask(taskId);
        return;
    }
    else if(target.className === 'custom-checkbox') {
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }
}

function initializeApp(){
    fetchTodos();
    addTaskInput.addEventListener('keyup' , handleInputKeypress);
document.addEventListener('click',handleClickListener);
}


// ye return mein wo sb rahega jo hm publicily available rkhna chaahenge
// and rest will be private
return {
    initialize: initializeApp,
    a:a
}

}) ()
