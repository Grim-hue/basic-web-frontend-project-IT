// Retrieve existing posts from localStorage, or initialize with an empty array if none exists
const existingPosts = JSON.parse(localStorage.getItem('newpost')) || [];
const addedPost = document.getElementById('added-post'); // Container where posts will be appended

// Handle image preview when the user selects a photo
document.getElementById('photoUpload').addEventListener('change', function (event) {
    const file = event.target.files[0]; // Get the selected file
    const previewContainer = document.getElementById('previewContainerPhoto'); // Container for image preview

    // Clear any previous previews
    previewContainer.innerHTML = '';

    // Check if the file is an image
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader(); // Read the file as base64 data
        reader.onloadend = function () {
            const img = document.createElement('img');
            img.src = reader.result; // Set the image source to the loaded file

            // Wait for the image to load and check its dimensions
            img.onload = function () {
                if (img.width > 600 && img.height > 600) {
                    // Only show image if its dimensions are larger than 600x600px
                    previewContainer.appendChild(document.createElement('hr')); // Add a horizontal rule
                    previewContainer.appendChild(img); // Append the image to the preview container
                } else {
                    // Alert the user if the image is too small
                    showAlert('Image is too small. Please upload an image larger than 600x600px', 'info');
                    document.getElementById('photoUpload').value = ''; // Reset the file input
                }
            };
        };
        reader.readAsDataURL(file); // Convert the image to base64 and trigger the reader
    }
});

// Handle video preview when the user selects a video
document.getElementById('videoUpload').addEventListener('change', function (event) {
    const file = event.target.files[0]; // Get the selected video file
    const previewContainer = document.getElementById('previewContainerVideo'); // Container for video preview

    // Clear any previous previews
    previewContainer.innerHTML = '';

    // Check if the file is a video
    if (file && file.type.startsWith('video/')) {
        const video = document.createElement('video');
        video.src = URL.createObjectURL(file); // Set the video source to the selected file
        video.controls = true; // Add controls 
        previewContainer.appendChild(document.createElement('hr')); // Add a horizontal rule
        previewContainer.appendChild(video); // Append the video to the preview container
    }
});

// Function to add a new post to the feed
function addPostToFeed(postData) {
    // Create HTML structure for the new post
    const newPostHTML = `
        <section class="friend-post">
            <div class="friend-post-top">
                <article class="img-name">
                    <img src="${postData.ownerPic}" alt="${postData.ownerName}'s profile picture">
                    <div class="friends-title">
                        <header>
                            <p class="friends-name">${postData.ownerName}</p>
                        </header>
                        <article><span>${postData.text || ''}</span></article>
                    </div>
                </article>
                <div class="menu" aria-label="More options for this post">
                    <i class="bx bx-dots-vertical-rounded"></i>
                </div>
            </div>
            <div class="post-content" style="overflow-x: clip;">
                ${postData.photo
                    ? `<img src="${postData.photo}" alt="Uploaded photo by ${postData.ownerName}">`
                    : ''
                }
                ${postData.video
                    ? `<video controls>
                        <source src="${postData.video}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>`
                    : ''
                }
            </div>
            <hr>
            <div class="post-bottom">
                <div class="post-icon" aria-label="Like this post">
                    <i class="bx bxs-like"></i>
                    <p>Like</p>
                </div>
                <div class="post-icon" aria-label="Comment on this post">
                    <i class="bx bxs-chat"></i>
                    <p>Comments</p>
                </div>
                <div class="post-icon" aria-label="Share this post">
                    <i class="bx bxs-share-alt"></i>
                    <p>Share</p>
                </div>
            </div>
            <hr>
            <div class="comment-wrapper">
                <img src="${user.pic}" alt="Your profile picture">
                <div class="circle" aria-hidden="true"></div>
                <div class="comment-search">
                    <input type="text" placeholder="Write a comment..." aria-label="Write a comment">
                </div>
            </div>
        </section>
    `;

    // Add the new post HTML to the container at the beginning (latest post first)
    addedPost.insertAdjacentHTML('afterbegin', newPostHTML);
}

// Trigger file input dialogs when the user clicks the "Add Photo" or "Add Video" buttons
document.getElementById('clickAddPhoto').addEventListener('click', () => {
    document.getElementById('photoUpload').click(); // Trigger file input for photo
});

document.getElementById('vid').addEventListener('click', () => {
    document.getElementById('videoUpload').click(); // Trigger file input for video
});

// Handle the "Post" button click to create and save the new post
document.getElementById('postClick').addEventListener('click', () => {
    const textInput = document.getElementById('echos').value; // Get the text input from the user
    const photoInput = document.getElementById('photoUpload').files[0]; // Get the photo input
    const videoInput = document.getElementById('videoUpload').files[0]; // Get the video input

    // Clear the preview containers
    document.getElementById('previewContainerPhoto').innerHTML = '';
    document.getElementById('previewContainerVideo').innerHTML = '';

    // Initialize variables for photo and video data
    let photoData = null;
    let videoData = null;

    // If a photo is provided, read it as base64 data
    if (photoInput) {
        const photoReader = new FileReader();
        photoReader.onloadend = function () {
            photoData = photoReader.result; // Base64 data URL for the photo
            if (videoInput) {
                const videoReader = new FileReader();
                videoReader.onloadend = function () {
                    videoData = videoReader.result; // Base64 data URL for the video
                    savePost();  // Proceed to save the post once both files are ready
                };
                videoReader.readAsDataURL(videoInput);  // Convert video to base64
            } else {
                savePost();  // If no video, save the post with the photo
            }
        };
        photoReader.readAsDataURL(photoInput);  // Convert photo to base64
    } else {
        // If no photo, check if there's a video
        if (videoInput) {
            const videoReader = new FileReader();
            videoReader.onloadend = function () {
                videoData = videoReader.result; // Base64 data URL for the video
                savePost();  // Save the post after the video is loaded
            };
            videoReader.readAsDataURL(videoInput);  // Convert video to base64
        } else {
            savePost();  // No photo or video, just save the text
        }
    }

    // Function to save the post data
    function savePost() {
        const postData = {
            ownerName: user.name, // Owner's name (to be retrieved from user object)
            ownerPic: user.pic,   // Owner's profile picture (to be retrieved from user object)
            text: textInput || null,  // Post text or null if empty
            photo: photoData,  
            video: videoData, 
        };

        // Add the new post to the existing posts array
        existingPosts.push(postData);

        // Add the new post to the feed
        addPostToFeed(postData);

        // Save the updated posts array to localStorage
        localStorage.setItem('newpost', JSON.stringify(existingPosts));

        // Clear input fields after posting
        document.getElementById('echos').value = ''; // Clear text input
        document.getElementById('photoUpload').value = ''; // Clear photo input
        document.getElementById('videoUpload').value = ''; // Clear video input
    }
});

// Loop through each post in the existing posts array and add them to the feed
existingPosts.forEach((post) => {
    addPostToFeed(post); // Add each existing post to the feed
});
