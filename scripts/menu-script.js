
const navBar = document.querySelector("nav");
const menuBtns = document.querySelectorAll(".menu-icon");
const overlay = document.querySelector(".overlay");
const toggleDarkMode = document.querySelector("#dark-mode-toggle");
const body = document.querySelector("body");
var user = JSON.parse(localStorage.getItem("user"));


menuBtns.forEach((menuBtn) => {
    menuBtn.addEventListener("click", () => {
        navBar.classList.toggle("open");
    });
});

overlay.addEventListener("click", () => {
    navBar.classList.remove("open");
});

function setDarkMode() {
    document.querySelector("#moon-sun").classList.remove("bxs-moon")
    document.querySelector("#moon-sun").classList.add("bxs-sun")

}
function removetDarkMode() {
    document.querySelector("#moon-sun").classList.remove("bxs-sun")
    document.querySelector("#moon-sun").classList.add("bxs-moon")

}
if (localStorage.hasOwnProperty('isDarkMode')) {
    if (localStorage.getItem('isDarkMode') === 'true') {
        body.classList.toggle("dark-mode");
        setDarkMode()
    }
} else {
    localStorage.setItem('isDarkMode', false);
}


toggleDarkMode.addEventListener("click", () => {
    //chages between moon and sun icon
    body.classList.toggle("dark-mode");
    if (document.querySelector(".dark-mode") != null) {
        localStorage.setItem('isDarkMode', 'true');
        setDarkMode()
    } else {
        localStorage.setItem('isDarkMode', 'false');
        removetDarkMode()
    }
});

function logout() {
    // Remove the user item from localStorage and redirect
    localStorage.removeItem("user");
    window.location.href = "login.html";
}


function getLastmessage() {
    let messages = JSON.parse(localStorage.getItem("newMessages")) || [];

    const notification = document.querySelector(".notification");
    const lastMessageDiv = document.querySelector(".last-message");
    if (notification != null && lastMessageDiv != null) {
        if (messages.length == 0) {
            notification.classList.remove("notification");
        } else {
            // get last item
            const lastMessage = messages.slice(-1).pop();

            if (lastMessage.onwerId != user.id) {
                notification.innerHTML = messages.length;
                lastMessageDiv.innerHTML = lastMessage.message + "...";
            } else {
                notification.classList.remove("notification");
            }
        }
    }
}

// Check if user data exists
if (user) {
    // Update the profile picture
    const profilePic = document.getElementById("myPFP");
    if (profilePic) {
        profilePic.src = user.pic;
    }

    // Update the name
    const nameElement = document.getElementById("name");
    if (nameElement) {
        nameElement.innerHTML = user.name;
    }

    // Update the number of posts
    const postsElement = document.getElementById("post");
    if (postsElement) {
        postsElement.innerHTML = user.post;
    }

    // Update the number of followers
    const followersElement = document.getElementById("followers");
    if (followersElement) {
        followersElement.innerHTML = user.followers;
    }

    // Update the number of following
    const followingElement = document.getElementById("following");
    if (followingElement) {
        followingElement.innerHTML = user.following;
    }

    // Update the birth date
    const dateElement = document.getElementById("date");
    if (dateElement) {
        dateElement.innerHTML = user.birth;
    }

    var otherUser;

    if (user.id === 2) {
        // Set user to Andre
        otherUser = {
            id: 1,
            name: "Andre",
            email: "andre@gmail.com",
            pic: "../images/profile_13.png",
        };


    } else if (user.id === 1) {
        // Set user to Carlos
        otherUser = {
            id: 2,
            name: "Carlos",
            email: "carlos@gmail.com",
            pic: "../images/profile_12.png",
        };
    }

    /* Duplicate chat for presentation
    the code is changed and repeated so that chat-duplicated.html can be logged with the other user at the same time */

    if (typeof reverse != 'undefined') {
        if (user.id === 2) {
            // Set user to Andre
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
            // Set user to Carlos
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

    //load pic and names 

    const profilePics = document.querySelectorAll('#myPFP');
    profilePics.forEach((img) => {
        img.src = user.pic;
    });

    const otherProfilePics = document.querySelectorAll('#otherUserPFP');
    otherProfilePics.forEach((img) => {
        img.src = otherUser.pic;
    });

    const otherProfileNames = document.querySelectorAll('#otherUserName');
    otherProfileNames.forEach((name) => {
        name.innerHTML = otherUser.name;
    });


    getLastmessage();
} else {
    // If no user is found, redirect to the login page
    window.location.href = "login.html";
}


