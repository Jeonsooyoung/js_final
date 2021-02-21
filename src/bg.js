const body = document.querySelector("body");
const IMG_NUMBER = 3;

function loadBg (num) { 
    const image = new Image();  
    image.src = `src/images/img0${num}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
}

function getRandomNumber () {
    const randomNum = Math.ceil(Math.random() * IMG_NUMBER)
    return randomNum;
}