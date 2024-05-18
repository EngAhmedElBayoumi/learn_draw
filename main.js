// main.js
window.onload = function() {
    // Get the input field value and set image opacity on load
    var input = document.getElementById('control').value;
    document.getElementById('main_img').style.opacity = input / 100;

    // Open camera functionality
    open_camera();
};

// Event listener to update image opacity based on range input
document.getElementById('control').addEventListener('input', function() {   
    if (document.getElementById('control').src != '') {
        var input = document.getElementById('control').value;
        document.getElementById('main_img').style.opacity = input / 100;
    }
});

// Event listener to update image source based on file input
document.getElementById('upload_img').addEventListener('change', function() {
    document.getElementById('main_img').src = URL.createObjectURL(this.files[0]);
});

// Function to open the back camera and display the stream
function open_camera() {
    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: { exact: "environment" }
        }
    })
    .then(function(stream) {
        var video = document.createElement('video');
        video.srcObject = stream;
        video.play();
        document.getElementById('main_container').appendChild(video);
        video.style.position = 'absolute';
        video.style.top = '0';
        video.style.left = '0';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        video.style.zIndex = '-1'; // Ensure video is behind the image
    })
    .catch(function(error) {
        console.error('Error accessing camera: ', error);
    });
}
