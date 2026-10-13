/* =========================================================
   ADF2027 - A DAY WITH THE FOXES
   Main JavaScript
   ========================================================= */


/* =========================
   1. EVENT CONFIGURATION
   ========================= */

const CONFIG = {
    EVENT_DATE: "2027-02-23T09:00:00+08:00",
    YT_VIDEO_ID: "ZnlP-tYRBmo"
};


/* =========================
   2. ORGANIZATION DATA
   ========================= */

const ORGS = [
    {
        key: "council",
        logo: "csc.png",
        name: "HAU School of Computing Student Council",
        tagline: "Rooted in Code, Driven by Purpose.",
        category: "Highest governing body of the School of Computing",
        adviser: "Mr. Kahil Makisig Yu",
        coAdviser: "Mr. Chris Almocera",
        facebook: "https://www.facebook.com/haucscsoc"
    },
    {
        key: "codegeeks",
        logo: "cg.png",
        name: "Code Geeks",
        tagline: "We Are The Future",
        category: "Organization for Web Development",
        adviser: "Dr. Alma Theresa Manaloto",
        coAdviser: "",
        facebook: "https://www.facebook.com/TheCodeGeeks"
    },
    {
        key: "lop",
        logo: "loop.png",
        name: "League of Outstanding Programmers",
        tagline: "Where Outstanding Begins",
        category: "Organization for Computer Science",
        adviser: "Mr. Tjakoen Stolk",
        coAdviser: "",
        facebook: "https://www.facebook.com/hausoc.loop"
    },
    {
        key: "maia",
        logo: "mafia.png",
        name: "Multimedia Aficionados for Interested Artists - HAU",
        tagline: "Delve to Create",
        category: "Organization for Entertainment and Multimedia Computing",
        adviser: "Mr. Leonardo Calma Jr.",
        coAdviser: "",
        facebook: "https://www.facebook.com/mafia.org.hau"
    },
    {
        key: "cyber",
        logo: "csia.png",
        name: "Cybersecurity Intelligence Alliance",
        tagline: "Same Mission, Stronger Alliance.",
        category: "Organization for Cybersecurity",
        adviser: "Dr. Raymond Cabrera",
        coAdviser: "",
        facebook: "https://www.facebook.com/csia.hausoc"
    },
    {
        key: "aws",
        logo: "aws.png",
        name: "AWS Student Builder Group - HAU",
        tagline: "Cloud Computing powers modern tech, with AWS leading the way.",
        category: "Organization for Cloud Computing",
        adviser: "Mr. Chris Almocera",
        coAdviser: "",
        facebook: "https://www.facebook.com/awssbghau"
    },
    {
        key: "gdg",
        logo: "gdg.png",
        name: "Google Developer Groups on Campus - HAU",
        tagline: "Build. Lead. Transform",
        category: "University Wide Organization",
        adviser: "Ms. Louella Manarang Salenga",
        coAdviser: "",
        facebook: "https://www.facebook.com/gdsc.hau"
    },
    {
        key: "access",
        logo: "ap.png",
        name: "The Access Point",
        tagline: "Compiling News, Interpreting Views.",
        category: "Student Publication of the School of Computing",
        adviser: "Dr. Mary Jane Rabena",
        coAdviser: "",
        facebook: "https://www.facebook.com/theaccesspointhau"
    }
];


/* =========================
   3. SHARED HEADER
   ========================= */

function mountHeader() {
    const header = document.getElementById("site-header");

    if (!header) return;

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    const links = [
        { label: "Home", href: "/index.html" },
        { label: "Features", href: "/features.html" },
        { label: "Services", href: "/services.html" },
        { label: "Contact", href: "/contact.html" }
    ];

    header.innerHTML = `
        <header class="site">
            <div class="container nav">

                <a class="brand" href="/index.html" aria-label="ADF2027 Home">
                    <img
                        class="brand-logo"
                        src="/images/soc.png"
                        alt="HAU School of Computing Logo"
                    >

                    <span class="brand-text">
                        <strong>ADF2027</strong>
                        <small>A DAY WITH THE FOXES</small>
                    </span>
                </a>

                <button
                    class="burger"
                    type="button"
                    aria-label="Toggle navigation"
                    aria-expanded="false"
                    aria-controls="main-navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav
                    class="nav-links"
                    id="main-navigation"
                    aria-label="Main navigation"
                >
                    ${links.map(link => {
                        const isActive =
                            currentPage === link.href.split("/").pop();

                        return `
                            <a
                                href="${link.href}"
                                class="${isActive ? "active" : ""}"
                                ${isActive ? 'aria-current="page"' : ""}
                            >
                                ${link.label}
                            </a>
                        `;
                    }).join("")}
                </nav>

            </div>
        </header>
    `;

    const burger = header.querySelector(".burger");
    const nav = header.querySelector(".nav-links");

    if (!burger || !nav) return;

    burger.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");

        burger.classList.toggle("open", isOpen);
        burger.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
            burger.classList.remove("open");
            burger.setAttribute("aria-expanded", "false");
        });
    });
}


/* =========================
   4. EVENT COUNTDOWN
   ========================= */

function initializeCountdown() {
    const daysEl = document.getElementById("countdown-days");
    const hoursEl = document.getElementById("countdown-hours");
    const minutesEl = document.getElementById("countdown-minutes");
    const secondsEl = document.getElementById("countdown-seconds");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    const eventStart = new Date(CONFIG.EVENT_DATE).getTime();

    function updateCountdown() {
        const difference = eventStart - Date.now();

        if (difference <= 0) {
            daysEl.textContent = "000";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            return;
        }

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) /
            (1000 * 60)
        );

        const seconds = Math.floor(
            (difference % (1000 * 60)) / 1000
        );

        daysEl.textContent = String(days).padStart(3, "0");
        hoursEl.textContent = String(hours).padStart(2, "0");
        minutesEl.textContent = String(minutes).padStart(2, "0");
        secondsEl.textContent = String(seconds).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}


/* =========================
   5. SHARED FOOTER
   ========================= */

function mountFooter() {
    const footer = document.getElementById("site-footer");

    if (!footer) return;

    footer.innerHTML = `
        <footer class="footer">

            <div class="container footer-grid">

                <!-- FOOTER BRAND -->
                <div class="footer-brand">

                    <a class="brand" href="/index.html">
                        <img
                            class="brand-icon"
                            src="/images/favicon.png"
                            alt="ADF2027 Logo"
                        >

                        <span class="brand-text">
                            <strong>ADF2027</strong>
                            <small>A DAY WITH THE FOXES</small>
                        </span>
                    </a>

                    <p>
                        Experience Campus Life.
                        Discover the Fox Spirit.
                    </p>

                </div>


                <!-- QUICK LINKS -->
                <div class="footer-links">

                    <h3>Quick Links</h3>

                    <a href="/index.html">Home</a>
                    <a href="/features.html">Features</a>
                    <a href="/services.html">Services</a>
                    <a href="/contact.html">Contact</a>

                </div>


                <!-- EXPLORE MORE -->
                <div class="footer-links">

                    <h3>Explore More</h3>

                    <a href="/features.html#event-gallery">
                        Event Gallery
                    </a>

                    <a href="/features.html#promotional-materials">
                        Promotional Materials
                    </a>

                    <a href="/api.html">
                        Data Integration
                    </a>

                    <a
                        href="https://github.com/kylleraphaelsunga-raphael/a-day-with-the-foxes"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub Repository
                    </a>

                </div>


                <!-- SOCIAL MEDIA -->
                <div class="footer-links footer-social">

                    <h3>Social Media</h3>

                    <p class="social-group-title">
                        Holy Angel University Social Media
                    </p>

                    <div class="social-icons">

                        <a
                            href="https://www.facebook.com/holyangel1933"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Holy Angel University Facebook"
                        >
                            <img
                                src="/images/fb.png"
                                alt="Facebook"
                            >
                        </a>

                        <a
                            href="https://www.instagram.com/holyangel1933"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Holy Angel University Instagram"
                        >
                            <img
                                src="/images/ig.png"
                                alt="Instagram"
                            >
                        </a>

                    </div>


                    <p class="social-group-title">
                        School of Computing Social Media
                    </p>

                    <div class="social-icons">

                        <a
                            href="https://www.facebook.com/haucictofficial"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="School of Computing Facebook"
                        >
                            <img
                                src="/images/fb.png"
                                alt="Facebook"
                            >
                        </a>

                        <a
                            href="https://www.instagram.com/haucscsoc/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="School of Computing Instagram"
                        >
                            <img
                                src="/images/ig.png"
                                alt="Instagram"
                            >
                        </a>

                    </div>

                </div>

            </div>


            <!-- COPYRIGHT -->
            <div class="container footer-bottom">

                <p>
                    &copy; ${new Date().getFullYear()}
                    ADF2027 - A Day with the Foxes.
                    All rights reserved.
                </p>

            </div>

        </footer>
    `;
}


/* =========================
   6. HERO IMAGES
   ========================= */

function loadHeroImages() {
    const placeholders = document.querySelectorAll(
        ".hero-imgs [data-src]"
    );

    placeholders.forEach(placeholder => {
        const imagePath = placeholder.dataset.src;
        const imageLabel =
            placeholder.dataset.ph || "ADF2027 campus life";

        if (!imagePath) return;

        placeholder.classList.add("ph", "hero-image");

        const image = document.createElement("img");

        image.src = imagePath;
        image.alt = imageLabel;
        image.loading = "eager";

        const caption = document.createElement("span");

        caption.className = "image-caption";
        caption.textContent = imageLabel;

        image.addEventListener("error", () => {
            placeholder.classList.add("image-missing");
            image.remove();
        });

        placeholder.replaceChildren(image, caption);
    });
}


function initHeroImageSlider() {
    const heroImages = document.querySelector(".hero-imgs");

    if (!heroImages) return;

    function updateSlider() {
        if (window.innerWidth <= 700) {
            heroImages.style.display = "flex";
            heroImages.style.overflowX = "auto";
            heroImages.style.overflowY = "hidden";
            heroImages.style.scrollSnapType = "x mandatory";
            heroImages.style.gap = "14px";

            [...heroImages.children].forEach(image => {
                image.style.display = "block";
                image.style.flex = "0 0 78%";
                image.style.width = "78%";
                heroImages.style.scrollbarWidth = "none";
                heroImages.style.msOverflowStyle = "none";
                image.style.height = "220px";
                image.style.scrollSnapAlign = "center";
            });
        } else {
            heroImages.removeAttribute("style");

            [...heroImages.children].forEach(image => {
                image.removeAttribute("style");
            });
        }
    }

    updateSlider();
    window.addEventListener("resize", updateSlider);
}



/* =========================
   7. ORGANIZATION CARDS
   ========================= */

function renderOrganizationCards() {
    const container = document.getElementById("org-cards");

    if (!container) return;

    container.innerHTML = ORGS.map(org => `
        <article class="paper org org-card" data-org="${org.key}">

            <div class="org-logo">

                <img
                    src="/images/${org.logo}"
                    alt="${org.name} logo"
                    loading="lazy"
                >

            </div>

            <div class="org-content">

                <p class="org-category">
                    ${org.category}
                </p>

                <h3>${org.name}</h3>

                <p class="org-tagline">
                    “${org.tagline}”
                </p>

                <div class="org-advisers">

                    <p>
                        <strong>Adviser:</strong>
                        ${org.adviser}
                    </p>

                    ${org.coAdviser ? `
                        <p>
                            <strong>Co-Adviser:</strong>
                            ${org.coAdviser}
                        </p>
                    ` : ""}

                </div>

                <a
                    class="btn btn-outline org-link"
                    href="${org.facebook}"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit the Facebook page of ${org.name}"
                >
                    Learn More
                </a>

            </div>

        </article>
    `).join("");

    container.querySelectorAll(".org-logo img").forEach(image => {
        const logoWrapper = image.closest(".org-logo");

        image.addEventListener("error", () => {
            if (logoWrapper) {
                logoWrapper.classList.add("logo-missing");
            }

            image.hidden = true;
        });

        image.addEventListener("load", () => {
            if (logoWrapper) {
                logoWrapper.classList.remove("logo-missing");
            }
        });
    });
}


/* =========================
   8. PROMOTIONAL VIDEO
   ========================= */

function loadPromotionalVideo() {
    const videoContainer = document.getElementById("video");
    const videoStats = document.getElementById("vstats");

    if (videoContainer) {
        const videoId = CONFIG.YT_VIDEO_ID;

        const iframe = document.createElement("iframe");

        iframe.src =
            `https://www.youtube.com/embed/${videoId}`;

        iframe.title = "ADF2027 Promotional Video";

        iframe.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

        iframe.referrerPolicy = "strict-origin-when-cross-origin";
        iframe.allowFullscreen = true;
        iframe.loading = "lazy";

        videoContainer.replaceChildren(iframe);
    }

    if (videoStats) {
        videoStats.textContent =
            "Discover the organizations, activities, and experiences waiting for you at ADF2027.";
    }
}


/* =========================
   9. SCROLL REVEAL
   ========================= */

function initializeScrollReveal() {
    const elements = document.querySelectorAll(".rv");

    if (!elements.length) return;

    if (!("IntersectionObserver" in window)) {
        elements.forEach(element => {
            element.classList.add("visible");
        });

        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}


/* =========================
   10. IMAGE LIGHTBOX
   ========================= */

function initializeImageLightbox() {
    const lightbox = document.getElementById("image-lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const caption = document.getElementById("lightbox-caption");
    const closeButton = document.getElementById("lightbox-close");
    const prevButton = document.getElementById("lightbox-prev");
    const nextButton = document.getElementById("lightbox-next");

    // Some pages may not contain a lightbox.
    if (
        !lightbox ||
        !lightboxImage ||
        !caption ||
        !closeButton ||
        !prevButton ||
        !nextButton
    ) {
        return;
    }

    const images = Array.from(document.querySelectorAll(
        ".material-card > img, .brochure-preview img, .event-gallery-grid img"
    ));

    if (!images.length) return;

    let currentIndex = 0;
    let previouslyFocusedElement = null;

    function showImage(index) {
        currentIndex = (index + images.length) % images.length;

        const selectedImage = images[currentIndex];

        lightboxImage.src = selectedImage.currentSrc || selectedImage.src;

        lightboxImage.alt =
            selectedImage.alt || "Enlarged ADF2027 image";

        caption.textContent =
            `${selectedImage.alt || "ADF2027 image"} (${currentIndex + 1} of ${images.length})`;

        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");

        lightboxImage.src = "";
        document.body.style.overflow = "";

        if (previouslyFocusedElement) {
            previouslyFocusedElement.focus();
            previouslyFocusedElement = null;
        }
    }

    images.forEach((image, index) => {
        image.style.cursor = "pointer";
        image.setAttribute("tabindex", "0");
        image.setAttribute("role", "button");

        image.addEventListener("click", () => {
            previouslyFocusedElement = image;
            showImage(index);
            closeButton.focus();
        });

        image.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();

                previouslyFocusedElement = image;
                showImage(index);
                closeButton.focus();
            }
        });
    });

    closeButton.addEventListener("click", closeLightbox);

    prevButton.addEventListener("click", () => {
        showImage(currentIndex - 1);
    });

    nextButton.addEventListener("click", () => {
        showImage(currentIndex + 1);
    });

    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", event => {
        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowLeft") {
            showImage(currentIndex - 1);
        }

        if (event.key === "ArrowRight") {
            showImage(currentIndex + 1);
        }
    });
}


/* =========================
   11. INITIALIZE WEBSITE
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
    mountHeader();
    mountFooter();
    loadHeroImages();
    initHeroImageSlider();
    renderOrganizationCards();
    loadPromotionalVideo();
    initializeScrollReveal();
    initializeCountdown();
    initializeImageLightbox();
});

    // Some pages may not contain a lightbox.
