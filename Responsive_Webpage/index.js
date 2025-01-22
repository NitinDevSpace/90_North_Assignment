function adjustPageScale() {
    const width = window.innerWidth;
    let scale = 1;

    if (width > 992 && width <= 1600) {
        scale = 0.9;
    } else if (width >= 700 && width <= 767) {
        scale = 0.8;
    } else if (width >= 600 && width < 700) {
        scale = 0.75;
    } else if (width <= 600) {
        scale = 0.5;
    }else {
        scale = 1;
    }

    const content = document.getElementById('content');
    content.style.transform = `scale(${scale})`;
    content.style.transformOrigin = 'top left';
    content.style.width = `${100 / scale}%`;
    content.style.height = `${100 / scale}vh`;
}

// Call the function on page load and when the window is resized
window.addEventListener('load', adjustPageScale);
window.addEventListener('resize', adjustPageScale);

// Toggle menu functionality
document.getElementById('toggleMenu').addEventListener('click', function() {
    const menu = document.querySelector('.left__menu');
    menu.classList.toggle('show');
});