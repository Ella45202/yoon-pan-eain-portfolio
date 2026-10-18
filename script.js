
document.addEventListener("DOMContentLoaded", () => {
    console.log("Welcome to Yoon Pan Eain's Portfolio Website!");
  
    // Smooth section reveal animation
    const sections = document.querySelectorAll("main section");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  
    if ("IntersectionObserver" in window && !prefersReducedMotion) {
      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show");
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
  
      sections.forEach((section) => {
        section.classList.add("hidden", "reveal-ready");
        observer.observe(section);
      });
    }
  
    // Contact form
    const form = document.querySelector('form[name="contact"]');
  
    if (!form) return;
  
    const successMessage = document.getElementById("form-success");
    const errorMessage = document.getElementById("form-error");
    const submitButton = form.querySelector('button[type="submit"]');
  
    if (!successMessage || !errorMessage || !submitButton) {
      console.error("Contact form success/error messages are missing.");
      return;
    }
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      if (!form.reportValidity()) return;
  
      successMessage.hidden = true;
      errorMessage.hidden = true;
  
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
  
      try {
        const formData = new FormData(form);
  
        // Ensure Netlify receives the form name
        formData.set("form-name", "contact");
  
        const encodedData = new URLSearchParams();
  
        for (const [key, value] of formData.entries()) {
          if (typeof value === "string") {
            encodedData.append(key, value);
          }
        }
  
        const response = await fetch("/", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: encodedData.toString()
        });
  
        if (!response.ok) {
          throw new Error("The server rejected the submission.");
        }
  
        form.reset();
        successMessage.hidden = false;
        successMessage.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "center"
        });
  
      } catch (error) {
        console.error("Contact form submission failed:", error);
  
        errorMessage.hidden = false;
        errorMessage.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "center"
        });
  
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML =
          'Send Message <span aria-hidden="true">↗</span>';
      }
    });
  });
  