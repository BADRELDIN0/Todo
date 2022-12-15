const form = document.getElementById('form');
const input = document.getElementById('input');
const todos = document.getElementById('todos');

let container;

if (localStorage.getItem('todos') != null) {
    container = JSON.parse(localStorage.getItem('todos'));
    displayTodo(container);
}
else {
    container = [];
}

function addTodo() {
    if (validateTodo()) {
        let todo = {
            tInput: input.value,
            finished: false, // if finished == true then it is completed
        }
        container.push(todo);
        localStorage.setItem('todos', JSON.stringify(container));
        input.value = '';
        displayTodo(container);
    }
    else {
        alert('Please Enter Validate Todo List')
    }
}

form.addEventListener('submit', function () {
    addTodo();
})


function deleteTodo(index) {
    container.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(container))
    displayTodo(container);
}

function addToggleEvent() {
    let newList = document.querySelectorAll('li');
    for (let i = 0; i < newList.length; i++) {
        newList[i].addEventListener('click', () => {
            newList[i].classList.toggle('completed');
            container[i].finished = !(container[i].finished);
            localStorage.setItem('todos', JSON.stringify(container));
        })

    }
}
function addDeleteEvent() {
    let newList = document.querySelectorAll('li');
    for (let i = 0; i < newList.length; i++) {
        newList[i].addEventListener('dblclick', function (e) {
            e.preventDefault();
            deleteTodo(i);
            localStorage.setItem('todos', JSON.stringify(container));
        })
    }
}

function displayTodo(list) {
    let temp = ``;
    for (let i = 0; i < list.length; i++) {

        if (!(list[i].finished)) {

            temp += `<li>${list[i].tInput}</li>`;
        }
        else {

            temp += `<li class="completed">${list[i].tInput}</li>`;
        }
    }
    todos.innerHTML = temp;

    addDeleteEvent();
    addToggleEvent();
}



function validateTodo() {
    var regx = /([^\s]+)/;
    if (regx.test(input.value) == true) {
        return true;
    }
    else {
        return false;
    }
}