
const campusMapLink = document.querySelector(".campus-map-link");
const campusMapViewer = document.getElementById("campusMapViewer");
const closeCampusMapButton = document.getElementById("closeCampusMap");

if (campusMapLink && campusMapViewer && closeCampusMapButton) {
    campusMapLink.addEventListener("click", function (event) {
        event.preventDefault();

        campusMapViewer.classList.add("active");
        document.body.classList.add("campus-map-open");
    });

    closeCampusMapButton.addEventListener("click", function () {
        campusMapViewer.classList.remove("active");
        document.body.classList.remove("campus-map-open");
    });

    campusMapViewer.addEventListener("click", function (event) {
        if (event.target === campusMapViewer) {
            campusMapViewer.classList.remove("active");
            document.body.classList.remove("campus-map-open");
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            campusMapViewer.classList.remove("active");
            document.body.classList.remove("campus-map-open");
        }
    });
}
