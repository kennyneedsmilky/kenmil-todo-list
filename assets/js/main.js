/* ケンミル */ /* 神様最高 */ "use strict"; console.log(new Date);

/** DOM */
const modals = document.querySelectorAll(".modal");
const modalBtns = document.querySelectorAll(".modal__btn");
const modalChangeBtn = document.querySelector(".modal__change-btn");
const modalConfirmBtns = document.querySelectorAll(".modal__confirm-btn");

/** Event Handlers */

// Modal Close Btns
modals.forEach(modal => {
    modal.addEventListener("click", e => {
        if (e.target.classList.contains("modal__close-btn")) closeModal(e);
        if (e.target.classList.contains("modal__btn")) {
            if (e.target.getAttribute("data-action") === "cancel") closeModal(e);
            if (e.target.getAttribute("data-action") === "erase") deleteTodo(e.target.getAttribute("data-todo-id"));
        }
    })
})

// Modal Confirm Btns
modalConfirmBtns.forEach(btn => btn.addEventListener("click", e => closeModal(e)));

// Modal Change Btn
modalChangeBtn.addEventListener("click", e => changeTodoMsg(e)); // This function is on todos.js

/** Functions */

// Open Modal 
function openModal(modalId, todoId = 0) {
    modals.forEach(modal => {
        // Open the modal that matches the modalId.
        // console.log(modalId, modal.getAttribute("data-modal-id"), todoId);

        if (modal.getAttribute("data-modal-id") == modalId ) modal.classList.remove("hidden");
        
        // If it is the edit modal, make sure to show the text of the todo to edit.
        if (modalId == modal.getAttribute("data-modal-id") && modalId == 1) {
            // Filter out the item to get an object from it.
            const currentTodo = todoList.filter(x => x._id == todoId)[0];
            // Add the currentTodo id to the data-todo-id.
            modal.setAttribute("data-todo-id", currentTodo._id);
            modal.querySelector("textArea").value = currentTodo.msg;
        }
        
        if (modalId == modal.getAttribute("data-modal-id") && modalId == 3) {
            modal.querySelector(".modal__btn.--danger").setAttribute("data-todo-id", todoId);
        }
    })
}

// Close Modal
function closeModal(e = null) {
    if (e !== null ) e.preventDefault();
    modals.forEach(modal => modal.classList.add("hidden"));
}