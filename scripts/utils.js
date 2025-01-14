
//Handling notification fuction and email verification

// Reference to the alert element
const alertDiv = document.querySelector('#alert');
//Get all alert close buttons
const closeBtn = document.getElementsByClassName("closebtn");

// Function to show alert with a custom message
function showAlert(message, type) {
    if (alertDiv != null) {
        alertDiv.classList.remove("alert");
        alertDiv.lastElementChild.innerHTML = message;
        setTimeout(function () {
            alertDiv.classList.add("alert")
            if (type === 'success') alertDiv.classList.add("success")
            if (type === 'warning') alertDiv.classList.add("warning")
            if (type === 'info') alertDiv.classList.add("info")

        }, 100);
        setTimeout(function () {
            alertDiv.style.opacity = "0";
            alertDiv.className = "";
        }, 3000);
    }
}

// close on any click with class closebtn
for (let i = 0; i < closeBtn.length; i++) {
    closeBtn[i].onclick = function () {
        alertDiv.className = "";
    }
}




// Function to validate Email (true if valid)

function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};