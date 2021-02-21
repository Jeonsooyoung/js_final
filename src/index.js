function init() {
    //Random Background Image.
    const randomNum = getRandomNumber();
    loadBg(randomNum);
    //Clock.
    loadTime();
    setInterval(loadTime, 1000);
    //Username Persistance.
    loadUserInfo()
    //To Do List.
    loadToDos();
    loadCompletes();
    form.addEventListener("submit", handleSubmit);
    //Weather with Geolocation.
    loadLocation();

}
init()