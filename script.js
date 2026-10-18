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


document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector(".contact-form");
  
    if (!contactForm) return;
  
    const params = new URLSearchParams(window.location.search);
  
    if (params.get("success") === "true") {
      let successMessage = document.querySelector(".form-success");
  
      if (!successMessage) {
        successMessage = document.createElement("p");
        successMessage.className = "form-success";
        successMessage.setAttribute("role", "status");
        contactForm.appendChild(successMessage);
      }
  
      successMessage.textContent =
        "Thank you! Your message has been submitted successfully.";
  
      contactForm.reset();
  
      // Remove the success query parameter from the URL.
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname + window.location.hash
      );
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(
      ".about, .skills, .projects, .contact"
    );
  
    // Keep everything visible if animations aren't supported.
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
  
    sections.forEach((section) => {
      section.classList.add("reveal-ready");
    });
  
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );
  
    sections.forEach((section) => observer.observe(section));
  });
<form
  name="contact"
  method="POST"
  action="/success.html"
  data-netlify="true"
  netlify-honeypot="bot-field"
  class="contact-form"
></form>    