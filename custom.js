// Custom JavaScript for interactive elements

document.addEventListener("DOMContentLoaded", () => {
  // Search toggle
  const searchIcon = document.getElementById("searchIcon");
  const searchContainer = document.getElementById("searchContainer");
  const searchInput = document.getElementById("searchInput");

  if (searchIcon && searchContainer) {
    searchIcon.addEventListener("click", () => {
      searchContainer.classList.toggle("active");
      if (searchContainer.classList.contains("active")) {
        searchInput.focus();
      }
    });
  }

  // Sidebar toggle
  const hamburger = document.querySelector(".header-hamburger");
  const sidebar = document.getElementById("sidebarMenu");
  const sidebarClose = document.getElementById("sidebarClose");
  const sidebarOverlay = document.getElementById("sidebarOverlay");

  if (hamburger && sidebar && sidebarClose && sidebarOverlay) {
    hamburger.addEventListener("click", () => {
      sidebar.classList.add("active");
      sidebarOverlay.classList.add("active");
    });

    sidebarClose.addEventListener("click", () => {
      sidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
    });

    sidebarOverlay.addEventListener("click", () => {
      sidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
    });
  }

  // International Patients Tab Switching
  const ipMenuLinks = document.querySelectorAll(".ip-menu-list li");
  const ipCards = document.querySelectorAll(".ip-card-item");

  ipMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      ipMenuLinks.forEach((l) => l.classList.remove("active"));
      ipCards.forEach((c) => c.classList.remove("active"));

      link.classList.add("active");
      const targetId = link.getAttribute("data-target");
      document.getElementById(targetId).classList.add("active");
    });
  });
  // Team Carousel Logic
  const teamTrack = document.getElementById("teamTrack");
  const teamPrev = document.getElementById("teamPrev");
  const teamNext = document.getElementById("teamNext");

  if (teamTrack && teamPrev && teamNext) {
    teamPrev.addEventListener("click", () => {
      const itemWidth = teamTrack.firstElementChild.offsetWidth + 20; // item width + gap
      teamTrack.scrollBy({ left: -itemWidth, behavior: "smooth" });
    });

    teamNext.addEventListener("click", () => {
      const itemWidth = teamTrack.firstElementChild.offsetWidth + 20;
      teamTrack.scrollBy({ left: itemWidth, behavior: "smooth" });
    });
  }

  // Super Specialities Carousel Logic
  const spTrack = document.getElementById("spTrack");
  const spPrev = document.getElementById("spPrev");
  const spNext = document.getElementById("spNext");
  const spCurrentIndex = document.getElementById("spCurrentIndex");

  if (spTrack && spPrev && spNext && spCurrentIndex) {
    let currentItem = 1;
    const totalItems = 12;

    const updateCounter = () => {
      spCurrentIndex.textContent = currentItem;
    };

    spPrev.addEventListener("click", () => {
      if (currentItem > 1) {
        currentItem--;
      } else {
        currentItem = 1;
      }
      updateCounter();
      const itemWidth = spTrack.firstElementChild.offsetWidth + 50; // item width + gap
      spTrack.scrollBy({ left: -itemWidth, behavior: "smooth" });
    });

    spNext.addEventListener("click", () => {
      if (currentItem < totalItems) {
        currentItem++;
      } else {
        currentItem = totalItems;
      }
      updateCounter();
      const itemWidth = spTrack.firstElementChild.offsetWidth + 50;
      spTrack.scrollBy({ left: itemWidth, behavior: "smooth" });
    });

    // Optional: Update counter on manual scroll
    spTrack.addEventListener("scroll", () => {
      const itemWidth = spTrack.firstElementChild.offsetWidth + 50;
      const scrollLeft = spTrack.scrollLeft;
      const newIndex = Math.round(scrollLeft / itemWidth) + 1;
      if (newIndex >= 1 && newIndex <= totalItems) {
        currentItem = newIndex;
        updateCounter();
      }
    });

    // Update active card on hover
    const spCards = spTrack.querySelectorAll(".speciality-card");
    spCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        spCards.forEach((c) => c.classList.remove("active"));
        card.classList.add("active");
      });
    });
  }

  // Patient's Speak Carousel
  const psTrack = document.getElementById("psCarouselTrack");
  const psPrev = document.getElementById("psNavPrev");
  const psNext = document.getElementById("psNavNext");

  if (psTrack && psPrev && psNext) {
    let currentSlide = 0;
    const totalSlides = psTrack.children.length;

    psPrev.addEventListener("click", () => {
      currentSlide = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
      psTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    });

    psNext.addEventListener("click", () => {
      currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
      psTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    });
  }
});