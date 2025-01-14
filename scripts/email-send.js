
//Handling sending email and form script

(function () {
    emailjs.init("");
})();

async function sendEmail(name, from, body, btn) {
    var templateParams = {
        reply_to: from,
        from_name: name,
        message: body
      };
    
      emailjs.send('service_3j57mek', 'template_gxbebhk', templateParams)
        .then(function(response) {
            showAlert('Mail sent successfully', 'success');
            btn.innerHTML = 'Send';
            btn.disabled = false; 
        }, function(error) {
            showAlert('Failed to send email. Check the console for details.', 'error');
            btn.innerHTML = 'Send';
            btn.disabled = false; 
        });
}

document.querySelector('.formcarry-form').addEventListener('submit',async function (event) {
    // Prevent the default form submission
    event.preventDefault();

    // Get form inputs
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const btn = document.getElementById('submit');

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

    btn.innerHTML = 'Sending...';
    btn.disabled = true; 
    // If everything is valid, submit the form
    await sendEmail(email, email, message, btn)


});