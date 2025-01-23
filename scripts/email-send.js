// Handling the initialization of EmailJS
(function () {
    // Initialize EmailJS with the id
    emailjs.init("");
})();

// Function to send an email using EmailJS
async function sendEmail(name, from, body, btn) {
    // Set the parameters required by the EmailJS template
    var templateParams = {
        reply_to: from,  // Reply-to email address
        from_name: name, // Name of the sender
        message: body    // Email message body
    };

    // Send email using EmailJS and handle success/error responses
    emailjs.send('service_3j57mek', 'template_gxbebhk', templateParams)
        .then(function(response) {
            showAlert('Mail sent successfully', 'success');
            // Reset the button text and state
            btn.innerHTML = 'Send';
            btn.disabled = false;
        }, function(error) {
            showAlert('Failed to send email. Check the console for details.', 'error');
            // Reset the button text and state
            btn.innerHTML = 'Send';
            btn.disabled = false;
        });
}

// Event listener for form submission
document.querySelector('.formcarry-form').addEventListener('submit', async function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Retrieve input values from the form fields
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim(); 
    const message = document.getElementById('message').value.trim(); 
    const btn = document.getElementById('submit');

    // Validation: Check if all fields are filled
    if (!name || !email || !message) {
        showAlert("All fields are required. Please fill in all fields.", "error");
        return;
    }

    // Validation: Check if the email address is valid
    if (!validateEmail(email)) {
        showAlert("Please enter a valid email address.", "error");
        return;
    }

    // Update the button to indicate sending process
    btn.innerHTML = 'Sending...';
    btn.disabled = true;

    // If validations pass, send the email
    await sendEmail(email, email, message, btn);
});
