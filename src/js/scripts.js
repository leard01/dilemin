const users = {
    Zemerini: 'test',
    Dilemini: '231123'
};

function showPasswordField() {
    const selectedUser = document.getElementById('user-select').value;
    const passwordContainer = document.getElementById('password-container');
    if (selectedUser) {
        passwordContainer.style.display = 'block';
        passwordContainer.style.opacity = 0;
        setTimeout(() => {
            passwordContainer.style.transition = 'opacity 0.5s';
            passwordContainer.style.opacity = 1;
        }, 10);
    } else {
        passwordContainer.style.display = 'none';
    }
}

function validateLogin() {
    const selectedUser = document.getElementById('user-select').value;
    const password = document.getElementById('password').value;
    const messageContainer = document.getElementById('message-container');
    if (users[selectedUser] === password) {
        messageContainer.textContent = 'Yallah habibi, du bist eingeloggt!';
        messageContainer.style.color = '#228B22';
        localStorage.setItem('loggedInUser', selectedUser); // Speichere den Benutzernamen
        setTimeout(() => {
            window.location.href = 'main.html'; // Redirect to main.html
        }, 1000);
    } else {
        messageContainer.textContent = 'Falsches Passwort, du Opfer!';
        messageContainer.style.color = 'red';
        messageContainer.style.textShadow = 'none';
    }
}

let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-images img');
    if (slides.length === 0) return; // Exit if no slides are found

    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    const offset = -currentSlide * 100;
    document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

document.addEventListener('DOMContentLoaded', () => {
    const userSelect = document.getElementById('user-select');
    if (userSelect) {
        userSelect.addEventListener('change', showPasswordField);
        showPasswordField(); // Initial call to handle default selection
    }

    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser && loggedInUser !== 'null') {
        const userInfoElement = document.getElementById('user-info');
        if (userInfoElement) {
            userInfoElement.textContent = `Angemeldet als: ${loggedInUser}.`;
        }
        const titleElement = document.getElementById('page-title');
        if (titleElement) {
            titleElement.textContent = `Hey, ${loggedInUser}.`;
        }
        const profilePicture = document.getElementById('profile-picture');
        if (profilePicture) {
            if (loggedInUser === 'Zemerini') {
                profilePicture.src = '../images/profil-zemerini.jpeg';
            } else if (loggedInUser === 'Dilemini') {
                profilePicture.src = '../images/profil-dilemini.jpeg';
            }
            profilePicture.style.display = 'block';
        }
    }

    const carouselImages = document.querySelectorAll('.carousel-images img');
    if (carouselImages.length > 0) {
        showSlide(currentSlide); // Initial call to show the first slide
    }
});