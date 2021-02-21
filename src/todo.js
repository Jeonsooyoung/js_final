
const form = document.querySelector(".toDoForm"),
toDoInput = form.querySelector("input"),
pendingList = document.querySelector(".list.pending"),
finishedList = document.querySelector(".list.finished");

const TODOS_LS = "toDos";
const COMPLETE_LS = "completes";
let toDos = [];
let completes = [];

function completeTask(event) {
const btn = event.target;
const li = btn.parentNode.parentNode;
const toDoComplete = {
  text: li.querySelector("span").innerText,
  id: li.id
};

completes.push(toDoComplete);

saveCompletes();

loadCompletes(event.target, parseInt(li.id, 10));
delete toDos[parseInt(li.id, 10) - 1];
deleteToDo(event);
}
function pendingTask(event) {
const btn = event.target;
const li = btn.parentNode.parentNode;
let toD = {
  text: li.querySelector("span").innerText,
  id: li.id
};

toDos.push(toD);

saveToDos();
loadToDos(event.target, parseInt(li.id, 10));
delete completes[parseInt(li.id, 10) - 1];
deleteCompletes(event);
}
function deleteToDo(event) {
const btn = event.target;
const li = btn.parentNode.parentNode;
li.remove();

let cleanToDos = toDos.filter(function (toDo) {
  return toDo.id !== parseInt(li.id, 10);
});

toDos = cleanToDos;
saveToDos();
}

function deleteCompletes(event) {
const btn = event.target;
const li = btn.parentNode.parentNode;

li.remove();

let cleanComplete = completes.filter(function (toCom) {
  return toCom.id !== parseInt(li.id, 10);
});

completes = cleanComplete;
saveCompletes();
}

function saveToDos() {
localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function saveCompletes() {
localStorage.setItem(COMPLETE_LS, JSON.stringify(completes));
}

function paintToDo(text) {
const li = document.createElement("li");
const delBtn = document.createElement("button");
delBtn.innerHTML = "×";
delBtn.classList.add("btn");
delBtn.addEventListener("click", deleteToDo);

const confirmBtn = document.createElement("button");
confirmBtn.innerHTML = "v";
confirmBtn.classList.add("btn");
confirmBtn.addEventListener("click", completeTask);

const span = document.createElement("span");
span.innerHTML = text;
li.appendChild(span);
pendingList.appendChild(li);

const div = document.createElement("div");
div.classList.add("btngroup");
div.appendChild(confirmBtn);
div.appendChild(delBtn);
li.appendChild(div);

const newId = toDos.length + 1;
li.id = newId;
const toDoObj = {
  text: text,
  id: newId
};
toDos.push(toDoObj);
saveToDos();
}
function paintToDoSwitch(text, idx) {
const li = document.createElement("li");
const delBtn = document.createElement("button");
delBtn.innerHTML = "×";
delBtn.classList.add("btn");
delBtn.addEventListener("click", deleteToDo);

const confirmBtn = document.createElement("button");
confirmBtn.innerHTML = "v";
confirmBtn.classList.add("btn");
confirmBtn.addEventListener("click", completeTask);

const span = document.createElement("span");
span.innerHTML = text;
li.appendChild(span);
li.id = idx;
pendingList.appendChild(li);

const div = document.createElement("div");
div.classList.add("btngroup");
div.appendChild(confirmBtn);
div.appendChild(delBtn);
li.appendChild(div);
}

function paintToComplete(text) {
const li = document.createElement("li");
const delBtn = document.createElement("button");
delBtn.innerHTML = "×";
delBtn.classList.add("btn");
delBtn.addEventListener("click", deleteCompletes);

const backBtn = document.createElement("button");
backBtn.innerHTML = "↻";
backBtn.classList.add("btn");
backBtn.addEventListener("click", pendingTask);

const span = document.createElement("span");
const newId = completes.length + 1; //length가 0 이 나옴
span.innerHTML = text;
li.appendChild(span);
finishedList.appendChild(li);

const div = document.createElement("div");
div.classList.add("btngroup");
div.appendChild(backBtn);
div.appendChild(delBtn);
li.appendChild(div);

li.id = newId;
const toDoComplete = {
  text: text,
  id: newId
};
completes.push(toDoComplete);
saveCompletes();
}
function paintToCompleteSwitch(text, idx) {
const li = document.createElement("li");
const delBtn = document.createElement("button");
delBtn.innerHTML = "×";
delBtn.classList.add("btn");
delBtn.addEventListener("click", deleteCompletes);

const backBtn = document.createElement("button");
backBtn.innerHTML = "↻";
backBtn.classList.add("btn");
backBtn.addEventListener("click", pendingTask);

const span = document.createElement("span");

span.innerHTML = text;
li.appendChild(span);
li.id = idx;
finishedList.appendChild(li);

const div = document.createElement("div");
div.classList.add("btngroup");
div.appendChild(backBtn);
div.appendChild(delBtn);
li.appendChild(div);
}

function loadToDos(target, idx) {
const loadedToDos = localStorage.getItem(TODOS_LS);

if (loadedToDos !== null) {
  const parsedToDos = JSON.parse(loadedToDos);
  parsedToDos.forEach(function (toDo) {
    if (target !== null) {
      paintToDoSwitch(toDo.text, idx);
    } else {
      paintToDo(toDo.text);
    }
  });
}
}
function loadCompletes(target, idx) {
const loadedCompletes = localStorage.getItem(COMPLETE_LS);

if (loadedCompletes !== null) {
  const parsedComplets = JSON.parse(loadedCompletes);
  parsedComplets.forEach(function (toComp) {
    if (target !== null) {
      paintToCompleteSwitch(toComp.text, idx);
    } else {
      paintToComplete(toComp.text);
    }
  });
}
}

function handleSubmit(event) {
event.preventDefault();
const currentValue = toDoInput.value;
paintToDo(currentValue);
toDoInput.value = "";
}

