/* Script for handling: 
    - switch dark mode
    - menu open and close
    - adding last message on contacts
    - loading name for logged user and others
    - setting current user var and other user var 
*/

const navBar = document.querySelector("nav"); // Select the navigation bar
const menuBtns = document.querySelectorAll(".menu-icon"); // Select all menu icons
const overlay = document.querySelector(".overlay"); // Select the overlay
const toggleDarkMode = document.querySelector("#dark-mode-toggle"); // Select the dark mode toggle button
const body = document.querySelector("body"); // Select the body of the page
var user = JSON.parse(localStorage.getItem("user")); // Retrieve user data from localStorage


// Event listener for each menu button to toggle the navigation menu
menuBtns.forEach((menuBtn) => {
    menuBtn.addEventListener("click", () => {
        navBar.classList.toggle("open"); // Toggle the 'open' class to show or hide the menu
    });
});

// Event listener to close the menu when overlay is clicked
overlay.addEventListener("click", () => {
    navBar.classList.remove("open"); // Remove the 'open' class to close the menu
});

// Function to set dark mode
function setDarkMode() {
    document.querySelector("#moon-sun").classList.remove("bxs-moon"); // Remove moon icon class
    document.querySelector("#moon-sun").classList.add("bxs-sun"); // Add sun icon class
}

// Function to remove dark mode
function removetDarkMode() {
    document.querySelector("#moon-sun").classList.remove("bxs-sun"); // Remove sun icon class
    document.querySelector("#moon-sun").classList.add("bxs-moon"); // Add moon icon class
}

// Check if dark mode is stored in localStorage, and apply it
if (localStorage.hasOwnProperty('isDarkMode')) {
    if (localStorage.getItem('isDarkMode') === 'true') {
        body.classList.toggle("dark-mode"); // Apply dark mode to the body
        setDarkMode(); // Update the icon to sun
    }
} else {
    localStorage.setItem('isDarkMode', false); // Set the default dark mode setting
}

// Event listener for dark mode toggle button
toggleDarkMode.addEventListener("click", () => {
    body.classList.toggle("dark-mode"); // Toggle dark mode class on the body
    if (document.querySelector(".dark-mode") != null) {
        localStorage.setItem('isDarkMode', 'true'); // Store the dark mode state in localStorage
        setDarkMode(); // Update the icon to sun
    } else {
        localStorage.setItem('isDarkMode', 'false'); // Store the light mode state
        removetDarkMode(); // Update the icon to moon
    }
});

// Logout function: removes the user data from localStorage and redirects to login page
function logout() {
    localStorage.removeItem("user"); // Remove user data from localStorage
    window.location.href = "login.html"; // Redirect to login page
}

// Function to display the last message from contacts
function getLastmessage() {
    let messages = JSON.parse(localStorage.getItem("newMessages")) || []; // Retrieve messages from localStorage

    const notification = document.querySelector(".notification"); // Select notification element
    const lastMessageDiv = document.querySelector(".last-message"); // Select last message element
    if (notification != null && lastMessageDiv != null) {
        if (messages.length == 0) {
            notification.classList.remove("notification"); // Remove notification class if no messages
        } else {
            const lastMessage = messages.slice(-1).pop(); // Get the last message

            // If the last message is not from the current user, display it
            if (lastMessage.onwerId != user.id) {
                notification.innerHTML = messages.length; // Set notification count
                lastMessageDiv.innerHTML = lastMessage.message + "..."; // Display last message content
            } else {
                notification.classList.remove("notification"); // Remove notification if message is from current user
            }
        }
    }
}

// Check if user data exists in localStorage
if (user) {
    // Update profile picture
    const profilePic = document.getElementById("myPFP");
    if (profilePic) {
        profilePic.src = user.pic; // Set profile picture from user data
    }

    // Update name
    const nameElement = document.getElementById("name");
    if (nameElement) {
        nameElement.innerHTML = user.name; // Set user name
    }

    // Update number of posts
    const postsElement = document.getElementById("post");
    if (postsElement) {
        postsElement.innerHTML = user.post; // Set user posts count
    }

    // Update number of followers
    const followersElement = document.getElementById("followers");
    if (followersElement) {
        followersElement.innerHTML = user.followers; // Set user followers count
    }

    // Update number of following
    const followingElement = document.getElementById("following");
    if (followingElement) {
        followingElement.innerHTML = user.following; // Set user following count
    }

    // Update birth date
    const dateElement = document.getElementById("date");
    if (dateElement) {
        dateElement.innerHTML = user.birth; // Set user birth date
    }

    // Set the other user depending on the current user
    var otherUser;

    if (user.id === 2) {
        // If the current user is Carlos, set other user to Andre
        otherUser = {
            id: 1,
            name: "Andre",
            email: "andre@gmail.com",
            pic: "../images/profile_13.png",
        };
    } else if (user.id === 1) {
        // If the current user is Andre, set other user to Carlos
        otherUser = {
            id: 2,
            name: "Carlos",
            email: "carlos@gmail.com",
            pic: "../images/profile_12.png",
        };
    }

    /* Handle duplicate chat for presentation purposes
    Switch users for testing scenarios */
    if (typeof reverse != 'undefined') {
        if (user.id === 2) {
            user = {
                id: 1,
                name: "Andre",
                email: "andre@gmail.com",
                pic: "../images/profile_13.png",
            };
            otherUser = {
                id: 2,
                name: "Carlos",
                email: "carlos@gmail.com",
                pic: "../images/profile_12.png",
            };
        } else if (user.id === 1) {
            user = {
                id: 2,
                name: "Carlos",
                email: "carlos@gmail.com",
                pic: "../images/profile_12.png",
            };
            otherUser = {
                id: 1,
                name: "Andre",
                email: "andre@gmail.com",
                pic: "../images/profile_13.png",
            };
        }
    }

    // Load profile pictures and names for the current and other user
    const profilePics = document.querySelectorAll('.myPFP');
    profilePics.forEach((img) => {
        img.src = user.pic; // Set the current user's profile picture
    });

    const otherProfilePics = document.querySelectorAll('#otherUserPFP');
    otherProfilePics.forEach((img) => {
        img.src = otherUser.pic; // Set the other user's profile picture
    });

    const otherProfileNames = document.querySelectorAll('#otherUserName');
    otherProfileNames.forEach((name) => {
        name.innerHTML = otherUser.name; // Set the other user's name
    });

    // Display the last message in contacts
    getLastmessage();
} else {
    // If no user data is found, redirect to login page
    window.location.href = "login.html";
}
