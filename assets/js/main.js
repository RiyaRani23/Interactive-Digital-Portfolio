/*===== TYPED TEXT EFFECT =====*/
const typedTextSpan = document.getElementById("typed-text");
const roles = ["Front-End Developer", "Tech Enthusiast", "Problem Solver","Lifelong Learner","Debugger"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100; // ms per character
const deletingSpeed = 50; // ms per character
const delayBetweenRoles = 1500; // ms

function typeText() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    // Typing: Add one character
    typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeText, delayBetweenRoles);
    } else {
      setTimeout(typeText, typingSpeed);
    }
  } else {
    // Deleting: Remove one character
    typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeText, 500); // Short pause before starting next role
    } else {
      setTimeout(typeText, deletingSpeed);
    }
  }
}

// Start the typing animation
typeText();

/*===== MENU SHOW =====*/ 
const blob = document.querySelector(".home__img");

// Floating animation
let homePos = 0; 
let homeDirection = 1; 


function floatBlob() {
  if(homePos > 15) homeDirection = -1;
  if(homePos < 0) homeDirection = 1;
  homePos += homeDirection * 0.3;
  blob.style.transform = `translateY(-${homePos}px)`;
  requestAnimationFrame(floatBlob);
}

floatBlob();

// Float animation for About image
const aboutImg = document.querySelector(".about__img img");


let aboutPos = 0;
let aboutDirection = 1; 

function floatAbout() {
  if(aboutPos > 10) aboutDirection = -1;
  if(aboutPos < 0) aboutDirection = 1;
  aboutPos += aboutDirection * 0.2;
  aboutImg.style.transform = `translateY(-${aboutPos}px) scale(1.05)`;
  requestAnimationFrame(floatAbout);
}

floatAbout();


const buttons = document.querySelectorAll(".button");

buttons.forEach(button => {
  button.addEventListener("click", function(e) {
    const circle = document.createElement("span");
    circle.classList.add("button-ripple");
    
    // Get button position and size
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    circle.style.width = circle.style.height = size + "px";
    circle.style.left = e.clientX - rect.left - size/2 + "px";
    circle.style.top = e.clientY - rect.top - size/2 + "px";

    button.appendChild(circle);

    
    circle.addEventListener("animationend", () => {
      circle.remove();
    });
  });
});


const nameText = document.getElementById("riya-name");
const colors = ["#1e6bf0ff", "#e09431ff", "#ec10b2ff", "#4ccd50ff", "#7519a3ff", "#de1310ff"]; 
let colorIndex = 0;

function changeColor() {
  nameText.style.color = colors[colorIndex];
  colorIndex = (colorIndex + 1) % colors.length;
  setTimeout(changeColor, 2000); 
}

changeColor();

// Skills 

// Animate skill bars when they become visible on the screen
const skillsBars = document.querySelectorAll(".skills__bar");

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5 
};
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillBar = entry.target;
      const skillLevel = skillBar.getAttribute("data-skill-level");
      skillBar.style.width = skillLevel + "%";
      observer.unobserve(skillBar);
    }
  });
}, observerOptions);
skillsBars.forEach(bar => {
  observer.observe(bar);
});

// Contact

document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const formBtn = form.querySelector('.submit-btn');
    const statusMessage = document.getElementById('form-status'); 

    // Basic validation
    if (!form.checkValidity()) {
        if(statusMessage) {
            statusMessage.textContent = 'Please fill out all fields.';
            statusMessage.style.color = 'red';
        } else {
            alert('Please fill out all fields.');
        }
        return;
    }

    formBtn.textContent = 'Sending...';
    formBtn.disabled = true;
    if(statusMessage) statusMessage.textContent = '';

    try {
        
        const response = await fetch('https://formspree.io/f/your_form_id', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            if(statusMessage) {
                statusMessage.textContent = 'Your message has been sent successfully! Thank you.';
                statusMessage.style.color = 'green';
            } else {
                alert('Your message has been sent successfully!');
            }
            form.reset();
        } else {
            if(statusMessage) {
                statusMessage.textContent = 'Oops! There was a problem sending your message. Please try again later.';
                statusMessage.style.color = 'red';
            } else {
                alert('Oops! There was a problem sending your message. Please try again later.');
            }
        }
    } catch (error) {
        console.error('Submission error:', error);
        if(statusMessage) {
            statusMessage.textContent = 'An unexpected error occurred. Please check your console.';
            statusMessage.style.color = 'red';
        } else {
            alert('An unexpected error occurred. Please try again.');
        }
     } finally {
        formBtn.textContent = 'Send Message';
        formBtn.disabled = false;
        if(statusMessage) {
           setTimeout(() => statusMessage.textContent = '', 5000); 
        }
    }
});





const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 