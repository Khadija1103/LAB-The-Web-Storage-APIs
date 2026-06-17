(function () {
    const storageKey = "pokemonContacts";
    const selectors = {
        form: "#contactForm",
        list: "#contactsList",
        empty: "#contactsEmpty",
        clear: "#clearContacts"
    };

    const elements = {
        form: document.querySelector(selectors.form),
        list: document.querySelector(selectors.list),
        empty: document.querySelector(selectors.empty),
        clear: document.querySelector(selectors.clear)
    };

    if (!elements.form || !elements.list || !elements.empty || !elements.clear) {
        return;
    }

    function createElement(tag, className, textContent) {
        const element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        if (textContent) {
            element.textContent = textContent;
        }

        return element;
    }

    function getContacts() {
        return JSON.parse(localStorage.getItem(storageKey)) || [];
    }

    function saveContacts(contacts) {
        localStorage.setItem(storageKey, JSON.stringify(contacts));
    }

    function clearContacts() {
        localStorage.removeItem(storageKey);
    }

    function getInputValue(formData, fieldName) {
        return formData.get(fieldName).trim();
    }

    function buildContact(formData) {
        return {
            name: getInputValue(formData, "name"),
            phone: getInputValue(formData, "phone"),
            email: getInputValue(formData, "email"),
            message: getInputValue(formData, "message"),
            date: new Date().toLocaleDateString("es-CO")
        };
    }

    function createContactCard(contact) {
        const card = createElement("article", "contact-card bg-white p-3");
        const header = createElement("div", "d-flex flex-column flex-sm-row justify-content-between gap-2");
        const info = createElement("div");
        const name = createElement("h3", "h5 contact-card__name mb-1", contact.name);
        const details = createElement("p", "small text-muted mb-0", `${contact.email} | ${contact.phone}`);
        const date = createElement("span", "badge text-bg-light align-self-start", contact.date);
        const message = createElement("p", "contact-card__message mb-0 mt-3", contact.message);

        info.append(name, details);
        header.append(info, date);
        card.append(header, message);

        return card;
    }

    function renderContacts() {
        const contacts = getContacts();
        const hasContacts = contacts.length > 0;

        elements.list.innerHTML = "";
        elements.empty.classList.toggle("d-none", hasContacts);
        elements.clear.disabled = !hasContacts;

        contacts.forEach((contact) => {
            elements.list.appendChild(createContactCard(contact));
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!elements.form.checkValidity()) {
            elements.form.classList.add("was-validated");
            return;
        }

        const contact = buildContact(new FormData(elements.form));
        const updatedContacts = [contact, ...getContacts()];

        saveContacts(updatedContacts);
        elements.form.reset();
        elements.form.classList.remove("was-validated");
        renderContacts();
    }

    function handleClear() {
        clearContacts();
        renderContacts();
    }

    elements.form.addEventListener("submit", handleSubmit);
    elements.clear.addEventListener("click", handleClear);

    renderContacts();
})();