function sendEmail() {
    Email.send({
        Host: "smtp.yourisp.com",
        Username: "username",
        Password: "password",
        To: 'andremiguel.freitas@my.istec.pt',
        From: "sender@example.com",
        Subject: "Test Email",
        Body: "This is a test email sent using SMTP.js"
    })
        .then(function (message) {
            alert("Mail sent successfully") // Alert message on successful email delivery
        });
}

document.querySelector('.formcarry-form').addEventListener('submit', function (event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get form inputs
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();


    // Validation
    if (!name || !email || !message) {
        showAlert("All fields are required. Please fill in all fields.", "error");
        return;
    }

    // Email validation

    if (!validateEmail(email)) {
        showAlert("Please enter a valid email address.", "error");
        return;
    }


    // If everything is valid, submit the form
    showAlert('Form is valid. Submitting...', 'success');
});