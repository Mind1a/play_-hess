// Swiper sliders
const swiper_for_img = new Swiper(".swiper-for-img", {
  speed: 400,
  spaceBetween: 10,
  slidesPerView: 1,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const swiper = new Swiper(".swiper-workers-section", {
  speed: 400,
  spaceBetween: 10,
  slidesPerView: "auto",
  on: {
    reachEnd: function () {
      this.allowSlideNext = false;
    },
    reachBeginning: function () {
      this.allowSlideNext = true;
    },
    slideChange: function () {
      this.allowSlidePrev = !this.isBeginning;
      this.allowSlideNext = !this.isEnd;
    },
  },
});

// Global variable to keep track of the active page
let activePage = 1;

// Function to update active class
function updateActiveClass() {
  const updateClass = (selector, className) => {
    document.querySelectorAll(selector).forEach((button, index) => {
      button.classList.toggle(className, index === activePage - 1);
    });
  };

  updateClass(".navbtn", "active");
  updateClass(".navbtn-popup", "active-popup");
}

// Function to switch pages
function switchPage(pageNumber) {
  const page1 = document.getElementById("page1");
  const page2 = document.getElementById("page2");
  const video = document.getElementById("video1");

  page1.style.display = pageNumber === 1 ? "block" : "none";
  page2.style.display = pageNumber === 2 ? "block" : "none";

  if (pageNumber === 1) {
    video.pause();
  }

  activePage = pageNumber;
  updateActiveClass();
}

// Function to handle burger menu button click event
const burgerMenu = document.querySelector(".popup-conteiner");
const overlay = document.querySelector(".overlay");
const body = document.querySelector("body");
function handleBurgerMenuClick() {
  burgerMenu.style.display = "flex";
  // burgerMenu.classList.toggle("active");
  overlay.style.display = "block";
  burgerMenu.classList.toggle("active");
  body.classList.toggle("no-scroll");
}

// Function to handle pop up close event
function handlePopUpClose() {
  burgerMenu.style.display = "none";
  overlay.style.display = "none";
  body.classList.remove("no-scroll");
}

// Add event listeners
document
  .querySelector("#menuIcon")
  .addEventListener("click", handleBurgerMenuClick);
document
  .querySelector(".close_button")
  .addEventListener("click", handlePopUpClose);
window.addEventListener("resize", updateActiveClass);
overlay.addEventListener("click", handlePopUpClose);

// Add event listeners for page navigation
[".navbtn", ".navbtn-popup"].forEach((selector) => {
  document.querySelectorAll(selector).forEach((button, index) => {
    button.addEventListener("click", () => {
      switchPage(index + 1);
      handlePopUpClose();
    });
  });
});

// ---------- see more -----------
document.addEventListener("DOMContentLoaded", function () {
  const secondPart = document.getElementById("second-part");
  const button = document.getElementById("see-more-button");

  function resetText() {
    secondPart.classList.add("hidden");
    button.textContent = "ვრცლად";
  }

  function toggleText() {
    if (secondPart.classList.contains("hidden")) {
      secondPart.classList.remove("hidden");
      secondPart.classList.add("visible");
      button.textContent = "აკეცვა";
      setTimeout(() => {
        // Scroll to the expanded section smoothly
        secondPart.scrollIntoView({ behavior: "smooth" });
      }, 10); // Slight delay to ensure the element is fully visible before scrolling
    } else {
      secondPart.classList.remove("visible");
      secondPart.classList.add("hidden");
      button.textContent = "ვრცლად";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 481) {
      resetText();
    }
  });

  resetText();

  button.addEventListener("click", function () {
    toggleText();
  });
});

// Updates the footer text and hides the download-app-page2 and download-app sections based on the user's operating system.
if (navigator.userAgent.indexOf("Windows") === -1) {
  const downloadSection = document.querySelector(".windows");
  const downloadAppPage2 = document.querySelector(".download-app-page2");
  const downloadApp = document.querySelector(".download-app");

  // Update footer text for non-Windows users
  downloadSection.innerHTML = `<h3>აპლიკაციის ჩამოტვირთვა შესაძლებელია<span> მხოლოდ Windows კომპიუტერებზე</span></h3>`;

  // Hide download-app-page2 section
  if (downloadAppPage2) {
    downloadAppPage2.style.display = "none";
  }

  // Hide download-app section
  if (downloadApp) {
    downloadApp.style.display = "none";
  }
}
