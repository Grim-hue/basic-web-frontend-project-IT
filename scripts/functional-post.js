
const existingPosts = JSON.parse(localStorage.getItem('newpost')) || [];
const addedPost = document.getElementById('added-post'); // Container for posts

// Handle image and video preview
document.getElementById('photoUpload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const previewContainer = document.getElementById('previewContainerPhoto');

    // Clear any previous previews
    previewContainer.innerHTML = '';

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = function () {
            const img = document.createElement('img');
            img.src = reader.result;

            // Wait for the image to load to check its dimensions
            img.onload = function () {
                if (img.width > 600 && img.height > 600) {
                    // Image is bigger than 600x600px, so show the preview
                    previewContainer.appendChild(document.createElement('hr'));
                    previewContainer.appendChild(img);
                } else {
                    // If the image is too small, you can show a message or take any action
                    showAlert('Image is too small. Please upload an image larger than 600x600px', 'info');
                    document.getElementById('photoUpload').value = '';
                }
            };
        };
        reader.readAsDataURL(file); // Read the image file as base64
    }
});

document.getElementById('videoUpload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const previewContainer = document.getElementById('previewContainerVideo');

    // Clear any previous previews
    previewContainer.innerHTML = '';

    if (file && file.type.startsWith('video/')) {
        const video = document.createElement('video');
        video.src = URL.createObjectURL(file);
        video.controls = true; // Add controls for video (play/pause, etc.)
        previewContainer.appendChild(document.createElement('hr'));
        previewContainer.appendChild(video);
    }
});


function addPostToFeed(postData) {
    // Create the new post's inner HTML
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
                <img src="${user.pic}" alt="Your's profile picture">
                <div class="circle" aria-hidden="true"></div>
                <div class="comment-search">
                    <input type="text" placeholder="Write a comment..." aria-label="Write a comment">
                </div>
            </div>
        </section>
    `;

    // Append the new post to the added-post container
    addedPost.insertAdjacentHTML('afterbegin', newPostHTML);
}

// Add event listeners for "clickAddPhoto" and "vid" to trigger file input dialogs
document.getElementById('clickAddPhoto').addEventListener('click', () => {
    document.getElementById('photoUpload').click();
});

document.getElementById('vid').addEventListener('click', () => {
    document.getElementById('videoUpload').click();
});

document.getElementById('postClick').addEventListener('click', () => {
    const textInput = document.getElementById('echos').value;
    const photoInput = document.getElementById('photoUpload').files[0];
    const videoInput = document.getElementById('videoUpload').files[0];

    // Clear the preview container
    document.getElementById('previewContainerPhoto').innerHTML = '';
    document.getElementById('previewContainerVideo').innerHTML = '';
    
    // Initialize variables for photo and video data
    let photoData = null;
    let videoData = null;

    // Check if there's a photo input, then read it using FileReader
    if (photoInput) {
        const photoReader = new FileReader();
        photoReader.onloadend = function () {
            photoData = photoReader.result;  // Base64 data URL for the image
            if (videoInput) {
                const videoReader = new FileReader();
                videoReader.onloadend = function () {
                    videoData = videoReader.result;  // Base64 data URL for the video
                    savePost();  
                };
                videoReader.readAsDataURL(videoInput);  // Convert video to base64
            } else {
                savePost();  
            }
        };
        photoReader.readAsDataURL(photoInput);  // Convert photo to base64
    } else {
        // No photo input, just check for video
        if (videoInput) {
            const videoReader = new FileReader();
            videoReader.onloadend = function () {
                videoData = videoReader.result;  // Base64 data URL for the video
                savePost();  // Save the post after the video is loaded
            };
            videoReader.readAsDataURL(videoInput);  // Convert video to base64
        } else {
            savePost();  // No photo or video, just save text
        }
    }

    // Function to save the post data
    function savePost() {
        const postData = {
            ownerName: user.name,
            ownerPic: user.pic,
            text: textInput || null,
            photo: photoData,  // Base64-encoded photo or null
            video: videoData,  // Base64-encoded video or null
            timestamp: new Date().toISOString()
        };

        existingPosts.push(postData);

        // Add the post to the feed
        addPostToFeed(postData);

        // Save the updated array back to localStorage
        localStorage.setItem('newpost', JSON.stringify(existingPosts));

        // Optional: Clear inputs after saving
        document.getElementById('echos').value = '';
        document.getElementById('photoUpload').value = '';
        document.getElementById('videoUpload').value = '';
    }
});


// Loop through each post and add it to the feed
existingPosts.forEach((post) => {
    addPostToFeed(post);
});