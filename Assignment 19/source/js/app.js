const inputElem = document.getElementById("itemInput");
const addButton = document.getElementById("addButton");
const clearButton = document.getElementById("clearButton");
const todoListElem = document.getElementById("todoList");

let todosArray = [];

function addNewTodo() {
  let newTodoTitle = inputElem.value;

  let newTodoObj = {
    id: todosArray.length + 1,
    title: newTodoTitle,
    complete: false
  };
  inputElem.value = "";
  todosArray.push(newTodoObj);
  setLocalStorage(todosArray);
  todosGenerator(todosArray);

  inputElem.focus();
}
function setLocalStorage(todosList) {
  localStorage.setItem("todos", JSON.stringify(todosList));
}

function todosGenerator(todosList) {
  let newTodoLiElem, newTodoLabelElem, newTodoCompleteBtn, newTodoDeleteBtn;
  todoListElem.innerHTML = "";
  todosList.forEach(function (todo) {
    newTodoLiElem = document.createElement("li");
    newTodoLiElem.className = "completed well";

    newTodoLabelElem = document.createElement("label");
    newTodoLabelElem.innerHTML = todo.title;

    newTodoCompleteBtn = document.createElement("button");
    newTodoCompleteBtn.className = "btn btn-success";
    newTodoCompleteBtn.innerHTML = "Complete";
    newTodoCompleteBtn.setAttribute("onclick", "editTodo(" + todo.id + ")");

    newTodoDeleteBtn = document.createElement("button");
    newTodoDeleteBtn.className = "btn btn-danger";
    newTodoDeleteBtn.innerHTML = "Delete";
    newTodoDeleteBtn.setAttribute("onclick", "removeTodo(' + todo.id + ')");

    if (todo.complete) {
      newTodoLiElem.className = "uncompleted well";
      newTodoCompleteBtn.innerHTML = "UnComplete";
    }

    newTodoLiElem.append(
      newTodoLabelElem,
      newTodoCompleteBtn,
      newTodoDeleteBtn
    );

    todoListElem.append(newTodoLiElem);
  });
}

function editTodo(todoId) {
  let localStorageTodos = JSON.parse(localStorage.getItem("todos"));
  todosArray = localStorageTodos;
  todosArray.forEach(function (todo) {
    if (todo.id === todoId) {
      todo.complete = !todo.complete;
    }
  });
  setLocalStorage(todosArray);
  todosGenerator(todosArray);
}

function removeTodo(todoId) {
  let localStorageTodos = JSON.parse(localStorage.getItem("todos"));
  todosArray = localStorageTodos;
  let mainTodoIndex = todosArray.findIndex(function (todo) {
    return todo.id === todoId;
  });
  todosArray.splice(mainTodoIndex, 1);
  setLocalStorage(todosArray);
  todosGenerator(todosArray);
}

function getLocalStorage() {
  let localStorageTodos = JSON.parse(localStorage.getItem("todos"));
  if (localStorageTodos) {
    todosArray = localStorageTodos;
  } else {
    todosArray = [];
  }
  todosGenerator(todosArray);
}
function clearTodos() {
  todosArray = [];
  todosGenerator(todosArray);
  localStorage.removeItem("todos");
}

window.addEventListener("load", getLocalStorage);
addButton.addEventListener("click", addNewTodo);
clearButton.addEventListener("click", clearTodos);
inputElem.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    addNewTodo();
  }
});
