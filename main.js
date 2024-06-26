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

// fetching project working group data from json file
document.addEventListener("DOMContentLoaded", function () {
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("worker-container");
      data.forEach((worker) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide swiper-slide-workers-card";

        const name = document.createElement("p");
        name.className = "worker-name";
        name.textContent = worker.name;

        const position = document.createElement("p");
        position.textContent = worker.position;

        const linkedin = document.createElement("p");
        linkedin.textContent = worker.linkedin;

        slide.appendChild(name);
        slide.appendChild(position);
        slide.appendChild(linkedin);

        container.appendChild(slide);
      });

      // addomg swiper after fetching data
      const swiper = new Swiper(".swiper-workers-section", {
        direction: "horizontal",
        speed: 400,
        spaceBetween: 10,
        loop: true,
        slidesPerView: 1,

        navigation: {
          nextEl: ".button-next",
          prevEl: ".button-prev",
        },

        breakpoints: {
          600: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1025: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
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
  burgerMenu.style.visibility = "visible";
  overlay.style.display = "block";
  burgerMenu.classList.toggle("active");
  body.classList.toggle("no-scroll");
}

// Function to handle pop up close event
function handlePopUpClose() {
  burgerMenu.style.visibility = "hidden";
  burgerMenu.classList.toggle("active");
  overlay.style.display = "none";
  body.classList.remove("no-scroll");
}

// handle overlay disappearing on screen size change
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    overlay.style.display = "none";
  } else if (burgerMenu.style.visibility == "visible") {
    overlay.style.display = "block";
  }
});

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
      toggleText();
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
  const videoPageDownload = document.querySelector(".video-page-download");
  const downloadApp = document.querySelector(".download-app");

  // Update footer text for non-Windows users
  downloadSection.innerHTML = `<h3>აპლიკაციის ჩამოტვირთვა შესაძლებელია<span> მხოლოდ Windows კომპიუტერებზე</span></h3>`;

  // Hide download-app-page2 section
  if (window.innerWidth <= 1280) {
    if (videoPageDownload) {
      videoPageDownload.style.display = "none";
    }
  }

  // Hide download-app section
  if (downloadApp) {
    downloadApp.style.display = "none";
  }
}
