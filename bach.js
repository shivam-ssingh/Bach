const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array to hold falling images
const images = [];
const imageSources = 
['./assets/IMG_0816.JPG', 
'./assets/IMG_0881.JPG',
'./assets/IMG_3797.GIF',
'./assets/IMG_4326.jpg',
'./assets/IMG_5073.JPG',
'./assets/IMG_5109.JPG',
'./assets/IMG_5148.JPG']; 

// Load images
let imagesLoaded = 0;
imageSources.forEach(src => {
  const image = new Image();
  image.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === imageSources.length) {
      createImages();
      animate();
    }
  };
  image.src = src;
});

// Create falling images
function createImages() {
  const numImages = 5; // Number of falling images
  const imageWidth = 50;
  const imageHeight = 50;

  for (let i = 0; i < numImages; i++) {
    const randomIndex = Math.floor(Math.random() * imageSources.length);
    const image = new Image();
    image.src = imageSources[randomIndex]; // Random image source from the list
    image.style.height = 30; 
    const x = Math.random() * canvas.width;
    const y = -Math.random() * canvas.height; // Start above the canvas
    const speed = Math.random() * 5 + 1; // Random speed
    images.push({ image, x, y, speed });
  }
}

function drawImages() {
  images.forEach(img => {
    ctx.drawImage(img.image, img.x, img.y,100,140);
  });
}

function updateImages() {
  images.forEach(img => {
    img.y += img.speed; 
    if (img.y > canvas.height) {
      img.y = -Math.random() * canvas.height;
      img.x = Math.random() * canvas.width;
    }
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawImages();
  updateImages();
  requestAnimationFrame(animate);
}