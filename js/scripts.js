let addCard = document.getElementById('addCard');
let displayCard = document.getElementById('displayCard');
let loadingCard = document.getElementById('loadingCard');
let downloadCard = document.getElementById('downloadCard');
let fileInput = document.getElementById('fileInput');
let imageBefore = document.getElementById('display-img');
let startBtn = document.getElementById('startBtn');
let imageAfter = document.querySelector('.image-after');
let uploadAnother = document.getElementById('uploadAnother');
let downloadHref = document.getElementById('downloadHref');


const formData = new FormData();
const reader = new FileReader();
let file = null;

const API_URL = 'https://api.remove.bg/v1.0/removebg';
const API_KEY = 'kBEEb4zJvT4F4mBM1eDjjYCz';

// Active Screen Show 
const activeScreen = (screen) => {
    addCard.style.display = 'none';
    displayCard.style.display = 'none';
    loadingCard.style.display = 'none';
    downloadCard.style.display = 'none';
    screen.style.display = 'flex';
};
activeScreen(addCard);

// Image Upload display
fileInput.addEventListener('input', () => {
    file = fileInput.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        imageBefore.src = reader.result;
    }
    activeScreen(displayCard);
})

// Send Data To api
startBtn.addEventListener('click', () => {
    formData.append('image_file', file,);
    activeScreen(loadingCard);
    fetch(API_URL, {

        method: 'POST',
        headers: {
            'X-Api-Key': API_KEY,
        },
        body: formData,
    })
        .then((res) => res.blob())
        .then((blob) => {
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                imageAfter.src = reader.result;
                downloadHref.setAttribute('href', reader.result);
            }
            activeScreen(downloadCard);
        })
})

uploadAnother.addEventListener('click', () => {
    window.location.reload();
})