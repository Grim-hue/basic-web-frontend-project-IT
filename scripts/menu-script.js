
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

function setDarkMode(){
    document.querySelector("#moon-sun").classList.remove("bxs-moon") 
    document.querySelector("#moon-sun").classList.add("bxs-sun") 

}
function removetDarkMode(){
    document.querySelector("#moon-sun").classList.remove("bxs-sun") 
    document.querySelector("#moon-sun").classList.add("bxs-moon") 
    
}
if (localStorage.hasOwnProperty('isDarkMode')) {
    if (localStorage.getItem('isDarkMode') === 'true') {
        body.classList.toggle("dark-mode");
        setDarkMode()
    }
 }else{
    localStorage.setItem('isDarkMode', false);
 }


toggleDarkMode.addEventListener("click", () => {
    //chages between moon and sun icon
    body.classList.toggle("dark-mode");
    if(document.querySelector(".dark-mode")!=null){
        localStorage.setItem('isDarkMode', 'true');
        setDarkMode() 
    }else {
        localStorage.setItem('isDarkMode', 'false');
        removetDarkMode()
    }


});