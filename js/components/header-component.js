(function () {
    const targets = document.querySelectorAll("[data-pokemon-header]");

    if (!targets.length) {
        return;
    }

    const currentScript = document.currentScript;
    const headerPath = currentScript?.dataset.headerSrc || "pages/header.html";
    const cssPath = currentScript?.dataset.headerCss || "assets/css/header-style.css";
    const homeUrl = currentScript?.dataset.homeUrl || "index.html";
    const contactUrl = currentScript?.dataset.contactUrl || "pages/contact.html";

    function loadHeaderStyles() {
        const existingLink = document.querySelector(`link[href="${cssPath}"]`);

        if (existingLink) {
            return;
        }

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = cssPath;
        document.head.appendChild(link);
    }

    async function renderHeader() {
        loadHeaderStyles();

        try {
            const response = await fetch(headerPath);

            if (!response.ok) {
                throw new Error("No se pudo cargar el header");
            }

            const headerHtml = await response.text();

            targets.forEach((target) => {
                target.innerHTML = headerHtml;
                target.querySelectorAll("[data-header-home]").forEach((link) => {
                    link.href = homeUrl;
                });
                target.querySelector("[data-header-search]")?.setAttribute("href", `${homeUrl}#resultado`);
                target.querySelector("[data-header-favorites]")?.setAttribute("href", `${homeUrl}#favoritos`);
                target.querySelector("[data-header-capture]")?.setAttribute("href", `${homeUrl}#pokemonInput`);
                target.querySelector("[data-header-contact]")?.setAttribute("href", contactUrl);
            });
        } catch (error) {
            console.error(error);
        }
    }

    renderHeader();
})();
