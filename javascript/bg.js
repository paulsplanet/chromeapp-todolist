const body = document.querySelector("body");

const IMG_NUMBER = 5;


function paintImage(imgNumber) {
    const image = new Image();
    image.src =  `img/${imgNumber}.jpg`;
    image.classList.add("bgImg")
    body.appendChild(image);
}
function generNumber() {
    const number = Math.ceil(Math.random() * IMG_NUMBER);
    return number;
}
function inti() {
    const randomNumber = generNumber();
    paintImage(randomNumber);
}
inti();
