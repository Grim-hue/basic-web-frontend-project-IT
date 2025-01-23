// Function to handle login and redirect
function login() {
    let alert = document.getElementById('alert'); // Get the alert container element
    const email = document.getElementById('email').value; // Get the entered email value
    const password = document.getElementById('password').value; // Get the entered password value

    // Remove the "alert" class if the alert element is already present (this hides the alert)
    if (alert != null) {
        alert.classList.remove("alert");
    }

    // Validate the email format using a helper function (assumed to exist elsewhere)
    if (!validateEmail(email)) {
        // Display error message for invalid email
        alert.lastElementChild.innerHTML = "Please enter a valid email address.";
        setTimeout(function () { alert.classList.toggle("alert") }, 100); // Show the alert
    } else if (email === "andre@gmail.com" && password === "123") {
        // Check if the email and password match Andre's credentials
        // If valid, set the user data for Andre in localStorage
        localStorage.setItem(
            "user",
            JSON.stringify({
                id: 1,                          // User ID
                name: "Andre Freitas",           // User's name
                email: "andre@gmail.com",        // User's email
                pic: "../images/profile_13.png", // Path to user's profile picture
                birth: "28 - 04 - 2004",         // User's birth date
                post: 6,                         // Number of posts
                followers: 64,                   // Number of followers
                following: 128                   // Number of people the user is following
            })
        );

        return true; // Successful login
    } else if (email === "carlos@gmail.com" && password === "123") {
        // Check if the email and password match Carlos's credentials
        // If valid, set the user data for Carlos in localStorage
        localStorage.setItem(
            "user",
            JSON.stringify({
                id: 2,                          // User ID
                name: "Carlos Arvela",           // User's name
                email: "carlos@gmail.com",       // User's email
                pic: "../images/profile_12.png", // Path to user's profile picture
                birth: "15 - 06 - 2004",         // User's birth date
                post: 12,                        // Number of posts
                followers: 164,                  // Number of followers
                following: 328                  // Number of people the user is following
            })
        );

        return true; // Successful login
    }

    // If the email or password is incorrect, show an error message
    alert.lastElementChild.innerHTML = "Invalid email or password. Please try again.";

    // Show the alert after a small delay
    setTimeout(function () { alert.classList.toggle("alert") }, 100);

    return false; // Unsuccessful login
}
