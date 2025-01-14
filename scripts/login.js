
//Handling login and redirect

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
                name: "Andre Freitas",
                email: "andre@gmail.com",
                pic: "../images/profile_13.png",
                birth: "28 - 04 - 2004",
                post: 6,
                followers: 64,
                following: 128
            })
        );

        return true;
    } else if (email === "carlos@gmail.com" && password === "123") {
        // Set local storage for Carlos
        localStorage.setItem(
            "user",
            JSON.stringify({
                id: 2,
                name: "Carlos Arvela",
                email: "carlos@gmail.com",
                pic: "../images/profile_12.png",
                birth: "15 - 06 - 2004",
                post: 12,
                followers: 164,
                following: 328
            })
        );

        return true;
    }
    alert.lastElementChild.innerHTML = "Invalid email or password. Please try again.";

    setTimeout(function () { alert.classList.toggle("alert") }, 100);

    return false;
}