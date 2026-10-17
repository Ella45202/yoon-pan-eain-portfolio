// Simple welcome message in developer console
console.log("Welcome to Yoon Pan Eain's Portfolio Website!");

// Optional: Smooth scroll or active menu highlight logic can be added here
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.15
});


sections.forEach(section => {

    section.classList.add("hidden");

    observer.observe(section);

});

// Ensure to include the CSS file in your HTML for styles to apply