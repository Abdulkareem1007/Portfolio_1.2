/* =========================================
   PART 1: DOM LOADED FUNCTIONS
   (These run when the page loads)
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {

    // 1. TYPING EFFECT
    try {
        if(document.querySelector('.typing-text')) {
            var typed = new Typed('.typing-text', {
                strings: ['Frontend Developer', 'Freelancer', 'Tech Enthusiast'],
                typeSpeed: 100,
                backSpeed: 60,
                loop: true
            });
        }
    } catch (error) {
        console.log("Typed.js error:", error);
    }

    // 2. SCROLL REVEAL
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

    // 3. MOBILE MENU
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        document.querySelectorAll('.nav-links li a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // 4. THEME TOGGLE
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme) {
        body.classList.add(currentTheme);
        if (currentTheme === 'light-theme') {
            themeToggle.classList.replace('fa-sun', 'fa-moon');
        }
    }

    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            if (body.classList.contains('light-theme')) {
                themeToggle.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light-theme');
            } else {
                themeToggle.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark-theme');
            }
        });
    }

    // 5. TOAST NOTIFICATION
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('submitted')) {
        const toast = document.getElementById('toast-notification');
        if(toast) {
            toast.textContent = 'Message sent successfully!';
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 5000);
            history.replaceState(null, '', window.location.pathname);
        }
    }

}); 
/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   STOP! THIS IS THE END OF DOMContentLoaded.
   Everything below this line is GLOBAL.
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */


/* =========================================
   PART 2: MODAL FUNCTIONS (GLOBAL)
   (Must be outside the block above)
   ========================================= */

const projectData = {
    project1: [
        "images/project1/dashboard.png", 
        "images/project1/detailForm.png",
        "images/project1/details.png",
        "images/project1/landingPage.png",
        "images/project1/login.png",
        "images/project1/signup.png",
        "images/project1/table.png"
    ],
    project2: [
        "images/project2/dashboard.png", 
        "images/project2/landing.png"
    ],
    project3: [
        "images/project3/landing.png",
        "images/project3/list.png"
    ],
     project4: [
        "images/project4/IMG1.png",
        "images/project4/IMG2.png",
        "images/project4/IMG3.png",
        "images/project4/IMG4.png"
    ]
};

let currentProjectId = null;
let currentImgIndex = 0;

function openModal(projectId) {
    if (!projectData[projectId] || projectData[projectId].length === 0) {
        console.error(`No images found for ${projectId}`);
        return;
    }

    currentProjectId = projectId;
    currentImgIndex = 0;

    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");

    if(modal && modalImg) {
        modal.style.display = "flex";
        modalImg.src = projectData[projectId][currentImgIndex];
        document.body.style.overflow = "hidden";
    } else {
        console.error("Modal elements not found in DOM");
    }
}

function closeModal() {
    const modal = document.getElementById("imageModal");
    if(modal) {
        modal.style.display = "none";
        document.body.style.overflow = ""; 
    }
}

function changeSlide(n) {
    if (!currentProjectId) return;
    const images = projectData[currentProjectId];
    
    currentImgIndex += n;

    if (currentImgIndex >= images.length) {
        currentImgIndex = 0;
    } else if (currentImgIndex < 0) {
        currentImgIndex = images.length - 1;
    }

    const modalImg = document.getElementById("modalImage");
    if(modalImg) {
        modalImg.style.opacity = 0;
        setTimeout(() => {
            modalImg.src = images[currentImgIndex];
            modalImg.style.opacity = 1;
        }, 200);
    }
}

// Global Event Listeners
window.onclick = function(event) {
    const modal = document.getElementById("imageModal");
    if (event.target == modal) {
        closeModal();
    }
}

document.addEventListener('keydown', function(event) {
    const modal = document.getElementById("imageModal");
    if (modal && modal.style.display === "flex") {
        if (event.key === "ArrowLeft") changeSlide(-1);
        if (event.key === "ArrowRight") changeSlide(1);
        if (event.key === "Escape") closeModal();
    }
});