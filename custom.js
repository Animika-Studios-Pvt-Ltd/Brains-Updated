// Custom JavaScript for interactive elements

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. Search Toggle
  // ==========================================
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

  // ==========================================
  // 2. Hero Carousel Logic
  // ==========================================
  const heroSlides = document.querySelectorAll(".hero-slide");
  const heroPrev = document.getElementById("heroPrev");
  const heroNext = document.getElementById("heroNext");
  if (heroSlides.length > 0 && heroPrev && heroNext) {
    let currentHero = 0;
    
    const showHeroSlide = (index) => {
      heroSlides.forEach((slide, i) => {
        slide.style.display = i === index ? "block" : "none";
        if(i === index) {
            slide.classList.add("active");
        } else {
            slide.classList.remove("active");
        }
      });
      
      // Disable or enable previous button
      if (index === 0) {
        heroPrev.disabled = true;
        heroPrev.style.opacity = "0.4";
        heroPrev.style.cursor = "default";
      } else {
        heroPrev.disabled = false;
        heroPrev.style.opacity = "1";
        heroPrev.style.cursor = "pointer";
      }
      
      // Disable or enable next button
      if (index === heroSlides.length - 1) {
        heroNext.disabled = true;
        heroNext.style.opacity = "0.4";
        heroNext.style.cursor = "default";
      } else {
        heroNext.disabled = false;
        heroNext.style.opacity = "1";
        heroNext.style.cursor = "pointer";
      }
    };

    // Initialize button states on load
    showHeroSlide(currentHero);

    heroPrev.addEventListener("click", () => {
      if (currentHero > 0) {
        currentHero--;
        showHeroSlide(currentHero);
      }
    });

    heroNext.addEventListener("click", () => {
      if (currentHero < heroSlides.length - 1) {
        currentHero++;
        showHeroSlide(currentHero);
      }
    });
  }

  // ==========================================
  // 3. Sidebar Toggle
  // ==========================================
  const hamburger = document.querySelector(".header-hamburger");
  const sidebar = document.getElementById("sidebarMenu");
  const sidebarClose = document.getElementById("sidebarClose");
  const sidebarOverlay = document.getElementById("sidebarOverlay");

  const sidebarDropdowns = document.querySelectorAll(".header-sidebar-nav-list .header-has-dropdown > a");

  if (hamburger && sidebar && sidebarClose && sidebarOverlay) {
    const closeSidebar = () => {
      sidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
      
      // Close all open dropdowns inside the sidebar
      sidebarDropdowns.forEach(link => {
        const parentLi = link.parentElement;
        if (parentLi.classList.contains("active")) {
          parentLi.classList.remove("active");
          const icon = link.querySelector("i");
          if (icon) {
            icon.style.transform = "rotate(0deg)";
          }
        }
      });
    };

    hamburger.addEventListener("click", () => {
      sidebar.classList.add("active");
      sidebarOverlay.classList.add("active");
    });

    sidebarClose.addEventListener("click", closeSidebar);
    sidebarOverlay.addEventListener("click", closeSidebar);

    window.addEventListener("scroll", () => {
      if (sidebar.classList.contains("active")) {
        closeSidebar();
      }
    });
  }

  // Sidebar Dropdown Toggle
  sidebarDropdowns.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const parentLi = link.parentElement;
      
      // Close all other open dropdowns
      sidebarDropdowns.forEach(otherLink => {
        if (otherLink !== link) {
          const otherParent = otherLink.parentElement;
          if (otherParent.classList.contains("active")) {
            otherParent.classList.remove("active");
            const otherIcon = otherLink.querySelector("i");
            if (otherIcon) {
              otherIcon.style.transform = "rotate(0deg)";
            }
          }
        }
      });

      parentLi.classList.toggle("active");
      
      const icon = link.querySelector("i");
      if (icon) {
        icon.style.transition = "transform 0.3s ease";
        icon.style.transform = parentLi.classList.contains("active") ? "rotate(180deg)" : "rotate(0deg)";
      }
    });
  });

  // ==========================================
  // 4. International Patients Tab Switching
  // ==========================================
  const ipMenuLinks = document.querySelectorAll(".ip-menu-list li");
  const ipCards = document.querySelectorAll(".ip-card-item");

  ipMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      ipMenuLinks.forEach((l) => l.classList.remove("active"));
      ipCards.forEach((c) => c.classList.remove("active"));

      link.classList.add("active");
      const targetId = link.getAttribute("data-target");
      document.getElementById(targetId).classList.add("active");

      const allLinks = Array.from(ipMenuLinks);
      const index = allLinks.indexOf(link);
      const wrapper = document.querySelector(".ip-card-wrapper");
      if (wrapper) {
        wrapper.setAttribute("data-active-col", index % 2 === 0 ? "left" : "right");
      }
    });
  });
  // ==========================================
  // 5. Team Carousel Logic
  // ==========================================
  const teamTrack = document.getElementById("teamTrack");
  const teamPrev = document.getElementById("teamPrev");
  const teamNext = document.getElementById("teamNext");

  if (teamTrack && teamPrev && teamNext) {
    const updateTeamNav = () => {
      // Prev button
      if (teamTrack.scrollLeft <= 0) {
        teamPrev.disabled = true;
        teamPrev.style.opacity = "0.4";
        teamPrev.style.cursor = "default";
      } else {
        teamPrev.disabled = false;
        teamPrev.style.opacity = "1";
        teamPrev.style.cursor = "pointer";
      }

      // Next button
      if (teamTrack.scrollLeft + teamTrack.clientWidth >= teamTrack.scrollWidth - 5) {
        teamNext.disabled = true;
        teamNext.style.opacity = "0.4";
        teamNext.style.cursor = "default";
      } else {
        teamNext.disabled = false;
        teamNext.style.opacity = "1";
        teamNext.style.cursor = "pointer";
      }
    };

    // Initialize button states
    setTimeout(updateTeamNav, 100);
    window.addEventListener("resize", updateTeamNav);
    teamTrack.addEventListener("scroll", updateTeamNav);

    teamPrev.addEventListener("click", () => {
      if(!teamPrev.disabled) {
        const itemWidth = teamTrack.firstElementChild.offsetWidth + 20; // item width + gap
        teamTrack.scrollBy({ left: -itemWidth, behavior: "smooth" });
      }
    });

    teamNext.addEventListener("click", () => {
      if(!teamNext.disabled) {
        const itemWidth = teamTrack.firstElementChild.offsetWidth + 20;
        teamTrack.scrollBy({ left: itemWidth, behavior: "smooth" });
      }
    });
  }

  // ==========================================
  // 6. Super Specialities Carousel Logic
  // ==========================================
  const spTrack = document.getElementById("spTrack");
  const spPrev = document.getElementById("spPrev");
  const spNext = document.getElementById("spNext");
  const spCurrentIndex = document.getElementById("spCurrentIndex");

  if (spTrack && spPrev && spNext && spCurrentIndex) {
    let currentItem = 1;
    const totalItems = spTrack.children.length;

    const updateCounter = () => {
      spCurrentIndex.textContent = currentItem;
    };
    
    const updateSpNav = () => {
      // Prev button
      if (spTrack.scrollLeft <= 0) {
        spPrev.disabled = true;
        spPrev.style.opacity = "0.4";
        spPrev.style.cursor = "default";
      } else {
        spPrev.disabled = false;
        spPrev.style.opacity = "1";
        spPrev.style.cursor = "pointer";
      }

      // Next button
      if (spTrack.scrollLeft + spTrack.clientWidth >= spTrack.scrollWidth - 5) {
        spNext.disabled = true;
        spNext.style.opacity = "0.4";
        spNext.style.cursor = "default";
      } else {
        spNext.disabled = false;
        spNext.style.opacity = "1";
        spNext.style.cursor = "pointer";
      }
    };

    // Initialize states
    setTimeout(updateSpNav, 100);
    window.addEventListener("resize", updateSpNav);

    spPrev.addEventListener("click", () => {
      if (!spPrev.disabled) {
        if (currentItem > 1) {
          currentItem--;
        } else {
          currentItem = 1;
        }
        updateCounter();
        const itemWidth = spTrack.firstElementChild.offsetWidth + 50; // item width + gap
        spTrack.scrollBy({ left: -itemWidth, behavior: "smooth" });
      }
    });

    spNext.addEventListener("click", () => {
      if (!spNext.disabled) {
        if (currentItem < totalItems) {
          currentItem++;
        } else {
          currentItem = totalItems;
        }
        updateCounter();
        const itemWidth = spTrack.firstElementChild.offsetWidth + 50;
        spTrack.scrollBy({ left: itemWidth, behavior: "smooth" });
      }
    });

    // Optional: Update counter on manual scroll
    spTrack.addEventListener("scroll", () => {
      updateSpNav();
      const itemWidth = spTrack.firstElementChild.offsetWidth + 50;
      const scrollLeft = spTrack.scrollLeft;
      const newIndex = Math.round(scrollLeft / itemWidth) + 1;
      if (newIndex >= 1 && newIndex <= totalItems) {
        currentItem = newIndex;
        updateCounter();
      }
    });

    // Update active card on hover or click
    const spCards = spTrack.querySelectorAll(".speciality-card");
    spCards.forEach((card) => {
      const activateCard = () => {
        spCards.forEach((c) => c.classList.remove("active"));
        card.classList.add("active");
        // Update carousel counter based on active card
        const index = Array.from(spCards).indexOf(card) + 1;
        currentItem = index;
        updateCounter();
      };
      card.addEventListener("mouseenter", activateCard);
      card.addEventListener("click", activateCard);
    });
  }

  // ==========================================
  // 7. Patient's Speak Carousel
  // ==========================================
  const psTrack = document.getElementById("psCarouselTrack");
  const psPrev = document.getElementById("psNavPrev");
  const psNext = document.getElementById("psNavNext");
  const psTextElement = document.querySelector(".ps-circle-text p");
  const psCaptionElement = document.querySelector(".ps-caption");

  const patientStories = [
    { text: "70 year old Muthukumar, a resident of Bangalore, a heart patient, noticed sudden weakness on the right side of his body. He guessed it to be a symptom of a stroke...", caption: "Stroke is reversible. Time is key." },
    { text: "Another inspiring story of a patient recovering from a complex spine surgery. With proper care and timely intervention, mobility was restored in record time.", caption: "Spine Care Excellence." },
    { text: "A successful neurosurgery transformed the life of a young athlete, bringing them back to the field stronger than ever.", caption: "Neurosurgery Success." },
    { text: "Advanced rehabilitation and dedicated neuro care helped our patient regain speech and cognitive abilities after a severe trauma.", caption: "Rehabilitation and Care." },
    { text: "Pioneering brain tumor treatment provided new hope and a second chance at life for a mother of two.", caption: "Fighting Brain Tumors." },
    { text: "State-of-the-art diagnostics and prompt treatment averted a life-threatening aneurysm rupture.", caption: "Advanced Diagnostics." }
  ];

  if (psTrack && psPrev && psNext) {
    let currentSlide = 0;
    const totalSlides = psTrack.children.length;

    if (psTextElement) psTextElement.style.transition = "opacity 0.3s ease";
    if (psCaptionElement) psCaptionElement.style.transition = "opacity 0.3s ease";

    const updatePsContent = () => {
      if (psTextElement && psCaptionElement && patientStories[currentSlide]) {
        psTextElement.style.opacity = "0";
        psCaptionElement.style.opacity = "0";
        setTimeout(() => {
          psTextElement.textContent = patientStories[currentSlide].text;
          psCaptionElement.textContent = patientStories[currentSlide].caption;
          psTextElement.style.opacity = "1";
          psCaptionElement.style.opacity = "1";
        }, 300);
      }
    };

    const updatePsNav = () => {
      // Prev button
      if (currentSlide === 0) {
        psPrev.disabled = true;
        psPrev.style.opacity = "0.4";
        psPrev.style.cursor = "default";
      } else {
        psPrev.disabled = false;
        psPrev.style.opacity = "1";
        psPrev.style.cursor = "pointer";
      }

      // Next button
      if (currentSlide === totalSlides - 1) {
        psNext.disabled = true;
        psNext.style.opacity = "0.4";
        psNext.style.cursor = "default";
      } else {
        psNext.disabled = false;
        psNext.style.opacity = "1";
        psNext.style.cursor = "pointer";
      }
    };

    updatePsNav();

    psPrev.addEventListener("click", () => {
      if (currentSlide > 0) {
        currentSlide--;
        psTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        updatePsNav();
        updatePsContent();
      }
    });

    psNext.addEventListener("click", () => {
      if (currentSlide < totalSlides - 1) {
        currentSlide++;
        psTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        updatePsNav();
        updatePsContent();
      }
    });

    // Move Heading outside circle on Mobile
    const psHeading = document.querySelector(".ps-circle-text h2");
    const psInnerContent = document.querySelector(".ps-inner-content");
    const psCircleBox = document.querySelector(".ps-circle-box");
    const psCircleText = document.querySelector(".ps-circle-text");
    const psParagraph = document.querySelector(".ps-circle-text p");

    if (psHeading && psInnerContent && psCircleBox && psCircleText) {
      const handlePsHeading = () => {
        if (window.innerWidth < 767) {
          if (psHeading.parentNode !== psInnerContent) {
            psInnerContent.insertBefore(psHeading, psCircleBox);
            psHeading.style.color = "#144e97";
            psHeading.style.marginBottom = "0px";
            psHeading.style.width = "100%";
          }
        } else {
          if (psHeading.parentNode !== psCircleText) {
            psCircleText.insertBefore(psHeading, psParagraph);
            psHeading.style.color = "white";
            psHeading.style.marginBottom = "25px";
            psHeading.style.width = "auto";
          }
        }
      };
      window.addEventListener("resize", handlePsHeading);
      handlePsHeading();
    }
  }
});