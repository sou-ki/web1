"use strict";
// Navigation
const navLinks = document.querySelector('.nav__links');
const nav = document.querySelector('.nav');
const headerSection = document.querySelector('.header');

// Tabbed components - Operations Section
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// Navigation Smooth Scroll
navLinks.addEventListener('click', function (e) {
    e.preventDefault();
    const target = e.target;
    if (e.target && target.classList.contains('nav__link')) {
        const id = target.getAttribute('href');
        const ignoreHref = "./login/login.html";
        if (id === ignoreHref) {
            window.location.href = ignoreHref;
        } else if (id) {
            const element = document.querySelector(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});

// Tabbed Components
tabsContainer.addEventListener('click', function (e) {
    const target = e.target;
    const clicked = target.closest('.operations__tab');
    if (!clicked) return;

    // Remove active classes
    tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
    tabsContent.forEach(tabContent => tabContent.classList.remove('operations__content--active'));

    // Activate tab
    clicked.classList.add('operations__tab--active');

    // Show content
    const clickedTab = clicked.dataset.tab;
    if (clickedTab) {
        const content = document.querySelector(`.operations__content--${clickedTab}`);
        if (content) {
            content.classList.add('operations__content--active');
        }
    }
});

// Hover Effect on Navigation
const handleMenuHover = function (opacity, e) {
    const target = e.target;
    if (target && target.classList.contains('nav__link')) {
        const link = target.closest('.nav');
        const siblings = link.querySelectorAll('.nav__link');
        const logo = link.querySelector('img');
        siblings.forEach(sibling => {
            if (sibling && sibling !== target) {
                sibling.style.opacity = opacity;
            }
        });
        if (logo) {
            logo.style.opacity = opacity;
        }
        target.style.opacity = '1';
    }
};
nav.addEventListener('mouseover', (e) => handleMenuHover('0.5', e));
nav.addEventListener('mouseout', (e) => handleMenuHover('1', e));

// Sticky Navigation
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
};
const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
});
headerObserver.observe(headerSection);

// Reveal Sections
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});
allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
});

// Lazy Load Images
const targetImages = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;

    // Replace src with data-src
    const imgElement = entry.target;
    imgElement.src = imgElement.dataset.src || '';
    imgElement.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '-100px',
});
targetImages.forEach(img => imgObserver.observe(img));

// Slider
const slider = function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const maxSlide = slides.length;
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const dotContainer = document.querySelector('.dots');

    const createDots = function () {
        slides.forEach(function (_, i) {
            dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
        });
    };

    const activeDot = function (slide) {
        document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
        document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
    };

    const goToSlide = function (slide) {
        slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
    };

    const nextSlide = function () {
        currentSlide = (currentSlide === maxSlide - 1) ? 0 : currentSlide + 1;
        goToSlide(currentSlide);
        activeDot(currentSlide);
    };

    const prevSlide = function () {
        currentSlide = (currentSlide === 0) ? maxSlide - 1 : currentSlide - 1;
        goToSlide(currentSlide);
        activeDot(currentSlide);
    };

    createDots();
    goToSlide(0);
    activeDot(0);

    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);
};
slider();