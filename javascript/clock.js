const clockContainer = document.querySelector(".js-clock"), 
    clockTitle = clockContainer.querySelector("h1"),
    ampmm = clockContainer.querySelector(".apm");

function getTime() {
    const date = new Date();
    const min = date.getMinutes();
    const hr = date.getHours();
    const sec = date.getSeconds();
    clockTitle.innerHTML = `${hr > 12 ? `${hr-12}` : hr}:${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
    ampmm.innerHTML = `${hr > 12 ? "PM" : "AM"}`; 
}
function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();

