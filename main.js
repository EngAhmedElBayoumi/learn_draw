// main.js
window.onload = function() {
    // Initialize controls
    updateOpacity();
    updateRotation();
    updateSize();

    // Open camera functionality
    open_camera();
};

// Event listener to update image opacity based on range input
document.getElementById('control_opacity').addEventListener('input', function() {   
    updateOpacity();
});

// Event listener to update image rotation based on range input
document.getElementById('control_rotation').addEventListener('input', function() {
    updateRotation();
});

// Event listener to update image size based on range input
document.getElementById('control_resize').addEventListener('input', function() {
    updateSize();
});

// Event listener to update image source based on file input
document.getElementById('upload_img').addEventListener('change', function() {
    document.getElementById('main_img').src = URL.createObjectURL(this.files[0]);
});

// Function to update image opacity
function updateOpacity() {
    var input = document.getElementById('control_opacity').value;
    document.getElementById('main_img').style.opacity = input / 100;
}

// Function to update image rotation
function updateRotation() {
    var input = document.getElementById('control_rotation').value;
    document.getElementById('main_img').style.transform = 'rotate(' + input + 'deg)';
}

// Function to update image size
function updateSize() {
    var input = document.getElementById('control_resize').value;
    document.getElementById('main_img').style.width = input + '%';
}

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
