
const navBar = document.querySelector("nav");
const menuBtns = document.querySelectorAll(".menu-icon");
const overlay = document.querySelector(".overlay");
const toggleDarkMode = document.querySelector("#dark-mode-toggle");
const body = document.querySelector("body");

menuBtns.forEach((menuBtn) => {
    menuBtn.addEventListener("click", () => {
        navBar.classList.toggle("open");
    });
});

overlay.addEventListener("click", () => {
    navBar.classList.remove("open");
});


toggleDarkMode.addEventListener("click", () => {
    //add or remove dark mode
    body.classList.toggle("dark-mode");
    //chages between moon and sun icon
    if(document.querySelector(".dark-mode")!=null){
        document.querySelector("#moon-sun").classList.remove("bxs-moon") 
        document.querySelector("#moon-sun").classList.add("bxs-sun") 
    }else {
        document.querySelector("#moon-sun").classList.remove("bxs-sun") 
        document.querySelector("#moon-sun").classList.add("bxs-moon") 
    }
});