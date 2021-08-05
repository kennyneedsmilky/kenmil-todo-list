/* ケンミル */ /* 神様最高 */ "use strict";

/** DOM */
const addTodoTxt = document.querySelector(".add-todo__txt");
const addTodoBtn = document.querySelector(".add-todo__btn");
const todosPageSection = document.querySelector(".--todos-page-section");

/** Important Variables */
const todoList = [];

/** Event Handlers */

// Init
init();

// Add Todo Btn
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
                if (e.target.classList.contains("--folder")) openModal(2, 0);
                if (e.target.classList.contains("--edit")) openModal(1, todo.getAttribute("data-id"));
                if (e.target.classList.contains("--done")) toggleDoneTodo(todo.getAttribute("data-id"));
                if (e.target.classList.contains("--delete")) openModal(3, todo.getAttribute("data-id"));
            }
        })
    });
}

// Render Todo
function renderTodo( _id = 0, inFolderId = 0, isDone = false, msg = "Buy cookies for Milky.") {
    todosPageSection.insertAdjacentHTML("afterbegin", `
    <div class="todo ${isDone === true ? 'done' : ''}" data-id="${_id}">
        <div class="todo__options">
            <button class="todo__btn --folder ${isDone === true ? 'done' : ''}"><i class="fas fa-folder"></i></button>
            <button class="todo__btn --edit ${isDone === true ? 'done' : ''}"><i class="fas fa-pen"></i></button>
            <button class="todo__btn --done ${isDone === true ? 'done' : ''}"><i class="fas fa-check"></i></button>
            <button class="todo__btn --delete"><i class="fas fa-trash"></i></button>
        </div>
        <p class="todo__msg ${isDone === true ? 'done' : ''}">${isDone === true ? '<s>' : ''}${msg}${isDone === true ? '</s>' : ''}</p>
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

// Change Todo Message.
function changeTodoMsg(e) {
    e.preventDefault();
    // We need to get the modal that has the data-modal-id 1.
    modals.forEach(modal => {
        if (modal.getAttribute("data-modal-id") == 1) {
            // Filter out the item to get an object from it.
            const currentTodo = todoList.filter(x => x._id == modal.getAttribute("data-todo-id"))[0];
            // Change the currentTodo msg to the modal's textArea value.
            if (modal.querySelector("textArea").value !== "") currentTodo.msg = modal.querySelector("textArea").value;
            closeModal(e);
            setTodoListData();
            updatePages();
        }
    })
}

// Toggle Done Todo
function toggleDoneTodo( id ) {
    // Filter out the item to get an object from it.
    const currentTodo = todoList.filter(x => x._id == id)[0];
    // Make sure the item is in the list. If so, toggle isDone.
    if (currentTodo.isDone === true) {
        currentTodo.isDone = false;
    } else {
        currentTodo.isDone = true;
    }
    setTodoListData();
    updatePages();
}

// Delete Todo
function deleteTodo( id ) {
    // Filter out the item to get an object from it.
    const currentTodo = todoList.filter(x => x._id == id)[0];
    // Make sure the item is in the list. If so, take it out of the list.
    if (todoList.indexOf(currentTodo) !== -1) todoList.splice(todoList.indexOf(currentTodo), 1);
    closeModal();
    setTodoListData();
    updatePages();
}