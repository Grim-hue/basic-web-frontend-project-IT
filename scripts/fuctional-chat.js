// Retrieve the current user from localStorage (or from the user object)
let currentUser = user;

// Function to handle sending a message when the Enter key is pressed
function handleInputEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default Enter key behavior (e.g., form submission)

        const inputField = document.getElementById("echos");
        const message = inputField.value.trim(); // Get the message text from the input field and remove any surrounding spaces

        if (message) {
            const textDiv = document.querySelector(".text");

            // Retrieve the existing messages from localStorage (or initialize an empty array)
            const messages = JSON.parse(localStorage.getItem("newMessages")) || [];
            
            // Create a new message object
            const newMessageObject = {
                id: messages.length + 1,   // Unique ID for the message (based on length of the array)
                onwerId: currentUser.id,    // ID of the current user (sender)
                message: message,           // The actual message content
                left: false,                // Indicates whether the message has been seen by the receiver (left side)
                right: false,               // Indicates whether the message has been sent (right side)
            };

            // Add the new message to the messages array
            messages.push(newMessageObject);

            // Store the updated messages array in localStorage
            localStorage.setItem("newMessages", JSON.stringify(messages));

            // Clear the input field
            inputField.value = "";
        }
    }
}

// Function to load and display messages for the current user
function loadMessagesForCurrentUser() {
    const currentUser = user;
    if (!currentUser) {
        console.error("No user found in localStorage.");
        return;
    }

    // Retrieve all stored messages from localStorage
    const messages = JSON.parse(localStorage.getItem("messages")) || [];

    const textDiv = document.querySelector(".text");

    // Clear any existing messages in the textDiv
    textDiv.innerHTML = "";

    // Loop through each message and display it based on the sender's ID
    messages.forEach((messageObj) => {
        const newMessage = document.createElement("div");

        // Check if the message belongs to the current user
        if (messageObj.onwerId == currentUser.id) {
            newMessage.classList.add("right-box");
            newMessage.innerHTML = `<div class='message-box-right'><p>${messageObj.message}</p></div>`;
            textDiv.appendChild(newMessage);
        } else {
            newMessage.classList.add("right-left");
            newMessage.innerHTML = `<div class='message-box-left'><p>${messageObj.message}</p></div>`;
            textDiv.appendChild(newMessage);
        }
    });

    // Load new messages from the "newMessages" list
    let newMessages = JSON.parse(localStorage.getItem("newMessages")) || [];

    // Loop through each new message and display it if it matches the current user's ID
    newMessages.forEach((messageObj) => {
        const newMessage = document.createElement("div");

        // Only display messages that belong to the current user
        if (messageObj.onwerId == currentUser.id && messageObj.right) {
            newMessage.classList.add("right-box");
            newMessage.innerHTML = `<div class='message-box-right'><p>${messageObj.message}</p></div>`;
            textDiv.appendChild(newMessage);
        }
    });
}

// Add an event listener to the input field for the "Enter" key
document.getElementById("echos").addEventListener("keydown", handleInputEnter);

// Load the messages when the page loads
loadMessagesForCurrentUser();

// Set an interval to check for new messages every 1 second
setInterval(function () {
    const currentUser = user;
    if (!currentUser) {
        console.error("No user found in localStorage.");
        return;
    }

    // Retrieve the new messages that have not been displayed yet
    let messages = JSON.parse(localStorage.getItem("newMessages")) || [];

    const textDiv = document.querySelector(".text");

    // Loop through each new message and display it based on ownership (sender)
    messages.forEach((messageObj) => {
        const newMessage = document.createElement("div");

        // Check if the message belongs to the current user and hasn't been displayed yet
        if (messageObj.onwerId == currentUser.id && !messageObj.right) {
            newMessage.classList.add("right-box");
            newMessage.innerHTML = `<div class='message-box-right'><p>${messageObj.message}</p></div>`;
            textDiv.appendChild(newMessage);

            // Scroll down to show the latest message
            textDiv.scrollTop = textDiv.scrollHeight - textDiv.clientHeight;

            // Mark the message as displayed for the current user
            messageObj.right = true;
        } else if (messageObj.onwerId == otherUser.id && !messageObj.left) {
            newMessage.classList.add("right-left");
            newMessage.innerHTML = `<div class='message-box-left'><p>${messageObj.message}</p></div>`;
            textDiv.appendChild(newMessage);

            // Mark the message as displayed for the other user
            messageObj.left = true;
        }

        // After both users have seen the message, move it to the "messages" array
        if (messageObj.left && messageObj.right) {
            // Retrieve the stored messages
            const oldMessages = JSON.parse(localStorage.getItem("messages")) || [];

            // Create a new message object to store in the main messages array
            const newMessageObject = {
                id: oldMessages.length + 1,
                onwerId: messageObj.onwerId,
                message: messageObj.message,
            };

            // Add the message to the main messages array
            oldMessages.push(newMessageObject);

            // Save the updated messages array in localStorage
            localStorage.setItem("messages", JSON.stringify(oldMessages));

            // Reset the newMessages array
            messages = [];
        }
    });

    // Save the updated newMessages array back to localStorage
    localStorage.setItem("newMessages", JSON.stringify(messages));
}, 500);
