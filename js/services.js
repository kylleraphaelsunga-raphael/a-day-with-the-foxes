document.addEventListener("DOMContentLoaded", () => {
    // ========================================
    // ACTIVITIES SECTION
    // ========================================

    const servicesGrid = document.getElementById("services-grid");

    // ========================================
    // DATASET SECTION
    // ========================================

    const servicesButton = document.getElementById("show-services-dataset");
    const customersButton = document.getElementById("show-customers-dataset");

    const feedback = document.getElementById("dataset-feedback");
    const results = document.getElementById("dataset-results");
    const title = document.getElementById("dataset-title");
    const description = document.getElementById("dataset-description");
    const table = document.getElementById("dataset-table");

    let activeDataset = null;

    // ========================================
    // HELPER: CREATE ELEMENTS SAFELY
    // ========================================

    function createElement(tag, className, text) {
        const element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        if (text !== undefined && text !== null) {
            element.textContent = String(text);
        }

        return element;
    }

    // ========================================
    // LOAD AND DISPLAY ACTIVITY CARDS
    // ========================================

    async function loadActivities() {
        if (!servicesGrid) return;

        try {
            const response = await fetch("/api/services");

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const result = await response.json();

            const activities = Array.isArray(result)
                ? result
                : Array.isArray(result.data)
                    ? result.data
                    : [];

            servicesGrid.replaceChildren();

            if (activities.length === 0) {
                servicesGrid.appendChild(
                    createElement(
                        "p",
                        "services-loading",
                        "No activities are currently available."
                    )
                );
                return;
            }

            activities.forEach((activity) => {
                const card = createElement(
                    "article",
                    "paper services-service-card"
                );

                const category = createElement(
                    "span",
                    "services-service-category",
                    activity.category || "ADF2027 Activity"
                );

                const heading = createElement(
                    "h3",
                    "",
                    activity.name || "ADF2027 Activity"
                );

                const details = createElement(
                    "p",
                    "",
                    activity.description ||
                    "Discover more about this ADF2027 experience."
                );

                const availability = createElement(
                    "p",
                    "services-service-availability",
                    `Availability: ${activity.availability || "Not specified"}`
                );

                card.append(category, heading, details, availability);

                if (
                    typeof activity.link === "string" &&
                    activity.link.trim() !== "" &&
                    !/^\s*javascript:/i.test(activity.link)
                ) {
                    const button = createElement(
                        "a",
                        "btn dark",
                        activity.cta || "Learn More"
                    );

                    button.href = activity.link;

                    if (/^https?:\/\//i.test(activity.link)) {
                        button.target = "_blank";
                        button.rel = "noopener noreferrer";
                    }

                    card.appendChild(button);
                }

                servicesGrid.appendChild(card);
            });
        } catch (error) {
            console.error("Activity loading error:", error);

            servicesGrid.replaceChildren(
                createElement(
                    "p",
                    "services-loading",
                    "Activities could not be loaded. Please check the server and try again."
                )
            );
        }
    }

    // Poster lightbox
    const posterImageButton = document.getElementById("open-poster");
    const posterTextButton = document.getElementById("open-poster-button");
    const posterLightbox = document.getElementById("poster-lightbox");
    const closePosterButton = document.getElementById("close-poster");

    function openPoster() {
        posterLightbox.hidden = false;
        document.body.style.overflow = "hidden";
    }

    function closePoster() {
        posterLightbox.hidden = true;
        document.body.style.overflow = "";
    }

    if (posterLightbox && closePosterButton) {
        posterImageButton?.addEventListener("click", openPoster);
        posterTextButton?.addEventListener("click", openPoster);

        closePosterButton.addEventListener("click", closePoster);

        posterLightbox.addEventListener("click", (event) => {
            if (event.target === posterLightbox) {
                closePoster();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && !posterLightbox.hidden) {
                closePoster();
            }
        });
    }

    // ========================================
    // SHOW OR HIDE DATASETS
    // ========================================

    async function showDataset(type) {
        if (!results || !table || !feedback) return;

        // Clicking the active button hides the dataset.
        if (activeDataset === type) {
            results.hidden = true;
            activeDataset = null;
            feedback.textContent =
                "Dataset information is hidden. Choose a dataset to view it again.";
            return;
        }

        const isServices = type === "services";
        const endpoint = isServices ? "/api/services" : "/api/customers";

        title.textContent = isServices
            ? "ADF2027 Services Dataset"
            : "ADF2027 Development Team Dataset";

        description.textContent = isServices
            ? "Activities and experiences available for ADF2027."
            : "Group members participating in the ADF2027 website development project.";

        feedback.textContent = "Retrieving dataset information...";
        results.hidden = false;

        const tableHead = table.querySelector("thead");
        const tableBody = table.querySelector("tbody");

        tableHead.replaceChildren();
        tableBody.replaceChildren();

        try {
            const response = await fetch(endpoint);

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const result = await response.json();

            const records = Array.isArray(result)
                ? result
                : Array.isArray(result.data)
                    ? result.data
                    : [];

            if (records.length === 0) {
                feedback.textContent = "No records were found in this dataset.";
                activeDataset = type;
                return;
            }

            // Generate table headings.
            const columns = Object.keys(records[0]);
            const headerRow = document.createElement("tr");

            columns.forEach((column) => {
                const heading = createElement(
                    "th",
                    "",
                    column
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (character) => character.toUpperCase())
                );

                headerRow.appendChild(heading);
            });

            tableHead.appendChild(headerRow);

            // Generate table rows.
            records.forEach((record) => {
                const row = document.createElement("tr");

                columns.forEach((column) => {
                    const value = record[column];

                    const cell = createElement(
                        "td",
                        "",
                        value === null || value === undefined
                            ? "Not specified"
                            : typeof value === "object"
                                ? JSON.stringify(value)
                                : String(value)
                    );

                    row.appendChild(cell);
                });

                tableBody.appendChild(row);
            });

            activeDataset = type;
            feedback.textContent =
                `Successfully retrieved ${records.length} record(s).`;
        } catch (error) {
            console.error("Dataset retrieval error:", error);

            feedback.textContent =
                "Unable to load the dataset. Please check that the server is running.";

            activeDataset = null;
        }
    }

    // ========================================
    // BUTTON EVENTS
    // ========================================

    if (servicesButton) {
        servicesButton.addEventListener("click", () => {
            showDataset("services");
        });
    }

    if (customersButton) {
        customersButton.addEventListener("click", () => {
            showDataset("customers");
        });
    }

    // ========================================
    // INITIALIZE PAGE
    // ========================================

    loadActivities();
});