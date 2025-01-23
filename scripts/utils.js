// Handling notification function and email verification

// Reference to the alert element in the HTML
const alertDiv = document.querySelector('#alert');
// Get all close buttons within the alert elements (to close alerts manually)
const closeBtn = document.getElementsByClassName("closebtn");

// Function to show an alert with a custom message and type (success, warning, or info)
function showAlert(message, type) {
    if (alertDiv != null) {
        alertDiv.classList.remove("alert"); 
        alertDiv.lastElementChild.innerHTML = message; 

        // Set a timeout to add the appropriate alert type (success, warning, or info)
        setTimeout(function () {
            alertDiv.classList.add("alert"); // Add the general alert class
            if (type === 'success') alertDiv.classList.add("success"); // Add success class for success alerts
            if (type === 'warning') alertDiv.classList.add("warning"); // Add warning class for warning alerts
            if (type === 'info') alertDiv.classList.add("info"); // Add info class for info alerts

        }, 100);

        // Set a timeout to fade the alert out after 3 seconds and remove its class
        setTimeout(function () {
            alertDiv.style.opacity = "0"; 
            alertDiv.className = ""; 
        }, 3000);
    }
}

// Loop through each close button and add an event listener to close the alert when clicked
for (let i = 0; i < closeBtn.length; i++) {
    closeBtn[i].onclick = function () {
        alertDiv.className = "";
    }
}

// Function to validate email format using regular expressions
// Returns true if the email is valid, false otherwise
function validateEmail(email) {
    return String(email)
        .toLowerCase() // Convert email to lowercase for uniform comparison
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // Regular expression for email format
        );
};
