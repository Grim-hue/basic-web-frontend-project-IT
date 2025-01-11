function login() {
    let alert = document.getElementById('alert');
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    if (alert != null) {
        alert.classList.remove("alert");
    }
    if (!validateEmail(email)) {
        alert.lastElementChild.innerHTML = "Please enter a valid email address.";
        setTimeout(function () { alert.classList.toggle("alert") }, 100);
    } else if (email === "andre@gmail.com" && password === "123") {
        // Set local storage for Andre
        localStorage.setItem(
            "user",
            JSON.stringify({
                id: 1,
                name: "Andre",
                email: "andre@gmail.com",
                pic: "../images/profile_13.png",
            })
        );
        return true;
    } else if (email === "carlos@gmail.com" && password === "123") {
        // Set local storage for Carlos
        localStorage.setItem(
            "user",
            JSON.stringify({
                id: 2,
                name: "Carlos",
                email: "carlos@gmail.com",
                pic: "../images/profile_12.png",
            })
        );
        return true;
    }
    alert.lastElementChild.innerHTML = "Invalid email or password. Please try again.";

    setTimeout(function () { alert.classList.toggle("alert") }, 100);

    return false;
}