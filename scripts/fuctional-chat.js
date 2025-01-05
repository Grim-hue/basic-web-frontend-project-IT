// Retrieve the current user from localStorage
let currentUser = user
// For the duplicated chat


// Function to handle adding HTML to the div with class 'text' and storing messages in localStorage
function handleInputEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default Enter key behavior

        const inputField = document.getElementById("echos");
        const message = inputField.value.trim();

        if (message) {
            const textDiv = document.querySelector(".text");

            // Store message in localStorage
            const messages = JSON.parse(localStorage.getItem("newMessages")) || [];
            const newMessageObject = {
                id: messages.length + 1,
                onwerId: currentUser.id,
                message: message,
                left: false,
                right: false,
            };
            messages.push(newMessageObject);
            localStorage.setItem("newMessages", JSON.stringify(messages));

            // Clear the input field
            inputField.value = "";
        }
    }
}

// Function to load messages from localStorage and display those matching the current user's ID

function loadMessagesForCurrentUser() {
    const currentUser = user
    if (!currentUser) {
        console.error("No user found in localStorage.");
        return;
    }

    const messages = JSON.parse(localStorage.getItem("messages")) || [];


    const textDiv = document.querySelector(".text");

    // Clear existing messages in the textDiv
    textDiv.innerHTML = "";

    messages.forEach((messageObj) => {
        const newMessage = document.createElement("div");

        if (messageObj.onwerId == currentUser.id) {
            newMessage.classList.add("right-box");
            newMessage.innerHTML = `<div class='message-box-right'>${messageObj.message}</div>`;
            textDiv.appendChild(newMessage);
        } else {
            newMessage.classList.add("right-left");
            newMessage.innerHTML = `<div class='message-box-left'>${messageObj.message}</div>`;
            textDiv.appendChild(newMessage);
        }
    });

    let newMessages = JSON.parse(localStorage.getItem("newMessages")) || [];

    newMessages.forEach((messageObj) => {
        const newMessage = document.createElement("div");

        if (messageObj.onwerId == currentUser.id && messageObj.right) {
            newMessage.classList.add("right-box");
            newMessage.innerHTML = `<div class='message-box-right'>${messageObj.message}</div>`;
            textDiv.appendChild(newMessage);
        }
    });
}

// Add event listener to the input field
document.getElementById("echos").addEventListener("keydown", handleInputEnter);


loadMessagesForCurrentUser();
// Set interval to load messages for the current user every 1 second
setInterval(function () {
    const currentUser = user
    if (!currentUser) {
        console.error("No user found in localStorage.");
        return;
    }

    let messages = JSON.parse(localStorage.getItem("newMessages")) || [];

    const textDiv = document.querySelector(".text");

    messages.forEach((messageObj) => {
        const newMessage = document.createElement("div");

        if (messageObj.onwerId == currentUser.id && !messageObj.right) {
            newMessage.classList.add("right-box");
            newMessage.innerHTML = `<div class='message-box-right'>${messageObj.message}</div>`;
            textDiv.appendChild(newMessage);
            //scroll down if send message
            textDiv.scrollTop = messagesElem.scrollHeight - messagesElem.clientHeight;
            messageObj.right = true;

        } else if (messageObj.onwerId == otherUser.id && !messageObj.left) {
            newMessage.classList.add("right-left");
            newMessage.innerHTML = `<div class='message-box-left'>${messageObj.message}</div>`;
            textDiv.appendChild(newMessage);
            messageObj.left = true;
        }
        if (messageObj.left && messageObj.right) {
            // Store message in localStorage
            const oldMessages = JSON.parse(localStorage.getItem("messages")) || [];
            const newMessageObject = {
                id: oldMessages.length + 1,
                onwerId: messageObj.onwerId,
                message: messageObj.message,
            };
            oldMessages.push(newMessageObject);
            localStorage.setItem("messages", JSON.stringify(oldMessages));
            messages = [];
        }
    });

    localStorage.setItem("newMessages", JSON.stringify(messages));
}, 500);