const userForm = document.querySelector(".user-form"),
  userInput = userForm.querySelector("input"),
  userInfo = document.querySelector(".user-infobox");

const USER_LS = "currentUser",
  SHOWING_CN = "show";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmitUser(event) {
  event.preventDefault();
  const userVal = userInput.value;
  printUserInfo(userVal);
  saveName(userVal);
}

function askForName() {
  userForm.classList.add(SHOWING_CN);
  userForm.addEventListener("submit", handleSubmitUser);
}

function printUserInfo(user) {
  userForm.classList.remove(SHOWING_CN);
  userInfo.classList.add(SHOWING_CN);
  userInfo.innerText = `안녕하세요. ${user}님`;
}

function loadUserInfo() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    printUserInfo(currentUser);
  }
}