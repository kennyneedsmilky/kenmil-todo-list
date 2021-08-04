/* ケンミル */ /* 神様最高 */ "use strict";

/** DOM */
const addTodoTxt = document.querySelector(".add-todo__txt");
const addTodoBtn = document.querySelector(".add-todo__btn");
const todosPageSection = document.querySelector(".--todos-page-section");

/** Important Variables */
const todoList = [];

/** Event Handlers */
init();

addTodoBtn.addEventListener("click", e => {
    addItem(e);
})

/** Functions */

// Init
function init() {
    loadTodoListData();
    updatePages();
}

// Load Todo List Data
function loadTodoListData() {
    todoList.length = 0;
    if (localStorage.getItem("todoListData")) {
        const loadedData = JSON.parse(localStorage.getItem("todoListData"));
        todoList.push(...loadedData);
    }
}

// Load Todo List Data
function setTodoListData() {
    localStorage.setItem("todoListData", JSON.stringify(todoList));
}

// Update Pages
function updatePages() {
    // We need to make all the sections blank.
    addTodoTxt.value = "";
    todosPageSection.innerHTML = "";
    // Run through the todolist and put it in the right sections.
    todoList.forEach(todo => {
        if (todo.inFolderId === 0) renderTodo(todo._id, todo.inFolderId, todo.isDone, todo.msg);
    })
    // We need to have a node list of the todo's that are being shown.
    document.querySelectorAll(".todo").forEach(todo => {
        todo.addEventListener("click", e => {
            if (e.target.classList.contains("todo__btn")) {
                // If Delete
                if (e.target.classList.contains("--delete")) {
                    deleteTodo(todo.getAttribute("data-id"));
                }
            }
            
        })
    });
}

// Render Todo
function renderTodo( _id = 0, inFolderId = 0, isDone = false, msg = "Buy cookies for Milky.") {
    todosPageSection.insertAdjacentHTML("beforeend", `
    <div class="todo" data-id="${_id}">
        <div class="todo__options">
            <button class="todo__btn --folder"><i class="fas fa-folder"></i></button>
            <button class="todo__btn --edit"><i class="fas fa-pen"></i></button>
            <button class="todo__btn --done"><i class="fas fa-check"></i></button>
            <button class="todo__btn --delete"><i class="fas fa-trash"></i></button>
        </div>
        <p class="todo__msg">${msg}</p>
    </div>
    `);
}

// Add Item
function addItem(e) {
    e.preventDefault();
    if (addTodoTxt.value !== "") {
        todoList.push({ _id: Date.now(), inFolderId: 0, isDone: false, msg: `${addTodoTxt.value}`});
        // Must update the pages after adding a new todo.
        setTodoListData();
        updatePages();
        
    }
}

// Delete Todo
function deleteTodo( id ) {
    // Filter out the item to get an object from it.
    const currentTodo = todoList.filter(x => x._id == id)[0];
    // Make sure the item is in the list.
    if (todoList.indexOf(currentTodo) !== -1) todoList.splice(todoList.indexOf(currentTodo), 1);
    setTodoListData();
    updatePages();
}