const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    checkedList = document.querySelector(".js-checkedList");

const TODOS_LS = "toDos";
const CHEKCKDOS_LS = "checkedList";

let toDos = [];
let checkDos = [];

function checkToDo(event) {
    // transfer from todo to checkedToDo
    const content = event.target.parentNode.textContent;
    const checkedDo = content.slice(0, content.length -2);
    const newId = checkDos.length + 1;
    const checkDoObj = {
        text: checkedDo,
        id: newId,
    };
    paintCheckedDo(checkDoObj.text, checkDoObj.id);
    saveCheckedDos();
    // delete from todo localStorage
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
    console.log(checkDos);
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function deleteCheckDo(event) {
    const li = event.target.parentNode;
    checkedList.removeChild(li);
    const cleanCheckDos = checkDos.filter(function(checkDo) {
        return checkDo.id !== parseInt(li.id);
    });
    checkDos = cleanCheckDos;
    saveCheckedDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function saveCheckedDos() {
    localStorage.setItem(CHEKCKDOS_LS, JSON.stringify(checkDos));  
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    }
}

function loadCheckedDos() {
    const loadedCheckedDos = localStorage.getItem(CHEKCKDOS_LS);
    if(loadedCheckedDos !== null) {
        const parsedCheckDos = JSON.parse(loadedCheckedDos);
        parsedCheckDos.forEach(function(checkDo) {
            paintCheckedDo(checkDo.text, checkDo.id);
        });
    }
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const chkBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerHTML = "❌"; 
    delBtn.addEventListener("click", deleteToDo);
    chkBtn.addEventListener("click", checkToDo);
    chkBtn.innerHTML = "✔"; 
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(chkBtn);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId,
    };
    toDos.push(toDoObj);
    saveToDos();
}

function paintCheckedDo(text, id) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");  
    delBtn.innerHTML = "❌"; 
    delBtn.addEventListener("click", deleteCheckDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = id;
    checkedList.appendChild(li);

    const checkDoObj = {
        text,
        id,
    };
    checkDos.push(checkDoObj);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function init() {
    loadToDos();
    loadCheckedDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();