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
        logo: "CSC.png",
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

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    const links = [
        { label: "Home", href: "/index.html" },
        { label: "Features", href: "/features.html" },
        { label: "Services", href: "/services.html" },
        { label: "Contact", href: "/contact.html" }
    ];

    header.innerHTML = `
        <header class="site">
            <div class="container nav">
                <a class="brand" href="index.html" aria-label="ADF2027 Home">
                    <img
                        class="brand-logo"
                        src="public/images/SOC.png"
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

                <nav class="nav-links" id="main-navigation" aria-label="Main navigation">
                    ${links.map(link => `
                        <a
                            href="${link.href}"
                            class="${currentPage === link.href ? "active" : ""}"
                            ${currentPage === link.href ? 'aria-current="page"' : ""}
                        >
                            ${link.label}
                        </a>
                    `).join("")}
                </nav>
            </div>
        </header>
    `;

    const burger = header.querySelector(".burger");
    const nav = header.querySelector(".nav-links");

    if (burger && nav) {
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
}


/* =========================
   ADF2027 COUNTDOWN
   ========================= */

function initializeCountdown() {
    const daysEl = document.getElementById("countdown-days");
    const hoursEl = document.getElementById("countdown-hours");
    const minutesEl = document.getElementById("countdown-minutes");
    const secondsEl = document.getElementById("countdown-seconds");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    // February 23, 2027, at 12:00 AM Philippine time (UTC+8)
    const eventStart = new Date("2027-02-23T00:00:00+08:00").getTime();

    function updateCountdown() {
        const now = Date.now();
        const difference = eventStart - now;

        if (difference <= 0) {
            daysEl.textContent = "000";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
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
   4. SHARED FOOTER
   ========================= */

function mountFooter() {
    const footer = document.getElementById("site-footer");

    if (!footer) return;

    footer.innerHTML = `
        <footer class="footer">
            <div class="container footer-grid">

                <!-- FOOTER BRAND -->
                <div class="footer-brand">
                    <a class="brand" href="index.html">
                        <span class="brand-icon" aria-hidden="true">🦊</span>
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
                    <a href="index.html">Home</a>
                    <a href="features.html">Features</a>
                    <a href="services.html">Services</a>
                    <a href="contact.html">Contact</a>
                </div>

                <!-- EXPLORE MORE -->
                <div class="footer-links">
                    <h3>Explore More</h3>
                    <a href="features.html#event-gallery">Event Gallery</a>
                    <a href="features.html#promotional-materials">Promotional Materials</a>
                    <a href="api.html">Data Integration</a>
                </div>

                <!-- SOCIAL MEDIA -->
                <div class="footer-links footer-social">
                    <h3>Social Media</h3>

                    <!-- HOLY ANGEL UNIVERSITY -->
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
                                src="https://european-experiences.com/wp-content/uploads/2024/01/Facebook_Logo_Primary.png"
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
                                src="https://tse1.mm.bing.net/th/id/OIP.pYHsG5OTS9o560bpL93jvgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                                alt="Instagram"
                            >
                        </a>
                    </div>

                    <!-- SCHOOL OF COMPUTING -->
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
                                src="https://european-experiences.com/wp-content/uploads/2024/01/Facebook_Logo_Primary.png"
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
                                src="https://tse1.mm.bing.net/th/id/OIP.pYHsG5OTS9o560bpL93jvgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
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
   5. HERO IMAGES
   ========================= */

function loadHeroImages() {
    const placeholders = document.querySelectorAll(".hero-imgs [data-src]");

    placeholders.forEach(placeholder => {
        const imagePath = placeholder.dataset.src;
        const imageLabel = placeholder.dataset.ph || "ADF2027 campus life";

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

/* =========================
   6. ORGANIZATION CARDS
   ========================= */

function renderOrganizationCards() {
    const container = document.getElementById("org-cards");

    if (!container) return;

    container.innerHTML = ORGS.map(org => `
        <article class="paper org org-card" data-org="${org.key}">
            <div class="org-logo">
                <img
                    src="public/images/${org.logo}"
                    alt="${org.name} logo"
                    loading="lazy"
                >
            </div>

            <div class="org-content">
                <p class="org-category">${org.category}</p>

                <h3>${org.name}</h3>

                <p class="org-tagline">“${org.tagline}”</p>

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

    // Handle organization logo loading errors.
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
   7. PROMOTIONAL VIDEO
   ========================= */

function loadPromotionalVideo() {
    const videoContainer = document.getElementById("video");
    const videoStats = document.getElementById("vstats");

    if (videoContainer) {
        const videoId = CONFIG.YT_VIDEO_ID;

        videoContainer.innerHTML = `
            <iframe
                src="https://www.youtube.com/embed/${videoId}?origin=${window.location.origin}"
                title="ADF2027 Promotional Video"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen>
            </iframe>
        `;
    }

    if (videoStats) {
        videoStats.textContent =
            "Discover the organizations, activities, and experiences waiting for you at ADF2027.";
    }
}

/* =========================
   8. SCROLL REVEAL
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


/* ADF2027 IMAGE LIGHTBOX */
document.addEventListener("DOMContentLoaded", function () {
    const lightbox = document.getElementById("image-lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const caption = document.getElementById("lightbox-caption");
    const closeButton = document.getElementById("lightbox-close");
    const prevButton = document.getElementById("lightbox-prev");
    const nextButton = document.getElementById("lightbox-next");

    const images = Array.from(document.querySelectorAll(
        ".material-card > img, .brochure-preview img, .event-gallery-grid img"
    ));

    let currentIndex = 0;

    function showImage(index) {
        if (!images.length) return;

        currentIndex = (index + images.length) % images.length;

        const selectedImage = images[currentIndex];

        lightboxImage.src = selectedImage.src;
        lightboxImage.alt = selectedImage.alt || "Enlarged image";
        caption.textContent =
            selectedImage.alt || `Image ${currentIndex + 1} of ${images.length}`;

        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        lightboxImage.src = "";
        document.body.style.overflow = "";
    }

    images.forEach(function (img, index) {
        img.addEventListener("click", function () {
            showImage(index);
        });
    });

    closeButton.addEventListener("click", closeLightbox);

    prevButton.addEventListener("click", function () {
        showImage(currentIndex - 1);
    });

    nextButton.addEventListener("click", function () {
        showImage(currentIndex + 1);
    });

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    lightboxImage.addEventListener("click", closeLightbox);

    document.addEventListener("keydown", function (event) {
        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowLeft") showImage(currentIndex - 1);
        if (event.key === "ArrowRight") showImage(currentIndex + 1);
    });
});



/* =========================
   9. INITIALIZE HOMEPAGE
   ========================= */


document.addEventListener("DOMContentLoaded", () => {
    mountHeader();
    mountFooter();
    loadHeroImages();
    renderOrganizationCards();
    loadPromotionalVideo();
    initializeScrollReveal();
    initializeCountdown();
});
