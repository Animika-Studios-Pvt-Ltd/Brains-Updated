// Custom JavaScript for interactive elements

document.addEventListener('DOMContentLoaded', () => {
    // Search toggle
    const searchIcon = document.getElementById('searchIcon');
    const searchContainer = document.getElementById('searchContainer');
    const searchInput = document.getElementById('searchInput');

    if (searchIcon && searchContainer) {
        searchIcon.addEventListener('click', () => {
            searchContainer.classList.toggle('active');
            if (searchContainer.classList.contains('active')) {
                searchInput.focus();
            }
        });
    }

    // Sidebar toggle
    const hamburger = document.querySelector('.header-hamburger');
    const sidebar = document.getElementById('sidebarMenu');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (hamburger && sidebar && sidebarClose && sidebarOverlay) {
        hamburger.addEventListener('click', () => {
            sidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
        });

        sidebarClose.addEventListener('click', () => {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });

        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });
    }

    // International Patients Tab Switching
    const ipMenuLinks = document.querySelectorAll('.ip-menu-list li');
    const ipCards = document.querySelectorAll('.ip-card-item');

    ipMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            ipMenuLinks.forEach(l => l.classList.remove('active'));
            ipCards.forEach(c => c.classList.remove('active'));
            
            link.classList.add('active');
            const targetId = link.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });
    // Team Carousel Logic
    const teamTrack = document.getElementById('teamTrack');
    const teamPrev = document.getElementById('teamPrev');
    const teamNext = document.getElementById('teamNext');

    if (teamTrack && teamPrev && teamNext) {
        teamPrev.addEventListener('click', () => {
            const itemWidth = teamTrack.firstElementChild.offsetWidth + 20; // item width + gap
            teamTrack.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        });

        teamNext.addEventListener('click', () => {
            const itemWidth = teamTrack.firstElementChild.offsetWidth + 20;
            teamTrack.scrollBy({ left: itemWidth, behavior: 'smooth' });
        });
    }
});
