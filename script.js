document.addEventListener("DOMContentLoaded", () => {
    initIntro();
    initBrandMenu();
    initTheme();
    initResponsiveMenu();
    initProjectFilters();
    initProjectModal();
    initContactForm();
    initBackToTop();
    initSectionNavigation();
    initIcons();

    const currentYear = document.getElementById("currentYear");
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
});

function initIcons() {
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function initIntro() {
    const introScreen = document.getElementById("introScreen");
    const startButton = document.getElementById("startPortfolio");

    if (!introScreen || !startButton) return;

    startButton.addEventListener("click", () => {
        const homeSection = document.querySelector("main .hero");
        const sections = document.querySelectorAll("main section");
        const navLinks = document.querySelectorAll(
            '.nav-menu a[href^="#"]'
        );

        sections.forEach((section) => {
            section.classList.toggle("is-active", section === homeSection);
        });

        navLinks.forEach((link) => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === "#inicio"
            );
        });

        window.history.replaceState(null, "", "#inicio");
        introScreen.classList.add("hide-intro");
        document.body.classList.remove("intro-locked");
        window.scrollTo({ top: 0, behavior: "auto" });
    });
}

function initBrandMenu() {
    const brandButton = document.getElementById("brandButton");
    const brandMenu = document.querySelector(".brand-menu");
    const exitButton = document.getElementById("exitPortfolio");
    const introScreen = document.getElementById("introScreen");

    if (!brandButton || !brandMenu) return;

    brandButton.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = brandMenu.classList.toggle("open");
        brandButton.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", () => {
        brandMenu.classList.remove("open");
        brandButton.setAttribute("aria-expanded", "false");
    });

    exitButton?.addEventListener("click", (event) => {
        event.stopPropagation();

        if (introScreen) {
            introScreen.classList.remove("hide-intro");
        }

        document.body.classList.add("intro-locked");
        brandMenu.classList.remove("open");
        brandButton.setAttribute("aria-expanded", "false");

        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
    });
}

function initTheme() {
    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "dark") {
        document.documentElement.dataset.theme = "dark";
    } else {
        delete document.documentElement.dataset.theme;
    }

    updateThemeButton();

    themeToggle?.addEventListener("click", () => {
        const isDark = document.documentElement.dataset.theme === "dark";

        if (isDark) {
            delete document.documentElement.dataset.theme;
            localStorage.setItem("portfolio-theme", "light");
        } else {
            document.documentElement.dataset.theme = "dark";
            localStorage.setItem("portfolio-theme", "dark");
        }

        updateThemeButton();
    });
}

function updateThemeButton() {
    const themeToggle = document.getElementById("themeToggle");
    if (!themeToggle) return;

    const isDark = document.documentElement.dataset.theme === "dark";

    themeToggle.innerHTML = `<i data-lucide="${isDark ? "sun" : "moon"}" aria-hidden="true"></i>`;
    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"
    );
    themeToggle.setAttribute(
        "title",
        isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"
    );

    initIcons();
}

function initResponsiveMenu() {
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");

    if (!navToggle || !navMenu) return;

    navToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");

        navToggle.setAttribute("aria-expanded", String(isOpen));
        navToggle.setAttribute(
            "aria-label",
            isOpen ? "Cerrar menú" : "Abrir menú"
        );
    });

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", "Abrir menú");
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            navMenu.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", "Abrir menú");
        }
    });
}

function initProjectFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll("#projectsGrid .project-card");
    const emptyProjects = document.getElementById("emptyProjects");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;
            let visibleProjects = 0;

            filterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");

            projectCards.forEach((card) => {
                const category = card.dataset.category;
                const shouldShow =
                    filter === "all" || category === filter;

                card.classList.toggle("hidden", !shouldShow);

                if (shouldShow) {
                    visibleProjects++;
                }
            });

            if (emptyProjects) {
                emptyProjects.hidden = visibleProjects !== 0;
            }
        });
    });
}

const projectsData = {
    evaluacion: {
        category: "Aplicación web de productividad / gestor de tareas (To-Do List)",
        title: "Control de Tareas",
        description:
            "Es una aplicación web sencilla para registrar actividades diarias, organizarlas visualmente y llevar un control del estado de cada tarea.",
        problem:
            "Muchas personas tienen dificultades para organizar sus pendientes diarios, trabajos escolares o actividades personales.",
        tech: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Ionicons",
            "Diseño web responsive"
        ],
        repo: "https://github.com/Barbozakevin/Proyecto_tecnica_b2.git",
        demo: "https://barbozakevin.github.io/Proyecto_tecnica_b2/"
    },

    agricola: {
        category: "Producción y Ventas",
        title: "Mercado de productos agropecuarios",
        description:
            "El mercado de productos agropecuarios es el espacio (físico o digital) donde se comercializan bienes provenientes de la agricultura",
        problem:
            "Intermediación excesiva e ineficiencia en la cadena de frío.",
        tech: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Bootstrap 5",
            "Carrito de compras",
            "PayPal en modo simulación"
        ],
        repo: "https://github.com/Barbozakevin/AGRONOMIA_mercado_pesquero.git",
        demo: "https://barbozakevin.github.io/AGRONOMIA_mercado_pesquero/"
    },

    juego: {
        category: "Entrentenimiento / Juego",
        title: "Juego de Memoria",
        description:
            "Este proyecto consiste en un juego interactivo de memorama basado en cartas de póker, donde el jugador debe encontrar parejas de símbolos iguales dentro de un tiempo determinado.",
        problem:
            "En muchos juegos de memoria tradicionales, la experiencia suele ser poco dinámica o no ofrece variedad en la forma de jugar.",
        tech: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Lógica de juego",
            "Diseño responsivo",
            "Temporizador de juego",
        ],
        repo: "https://github.com/Barbozakevin/proyecto2_juego_de_memoria.git",
        demo: "https://barbozakevin.github.io/proyecto2_juego_de_memoria/"
    },

    facturacion: {
        category: "Gestión / Administración",
        title: "CRUD de Facturación",
        description:
            "Este proyecto permite gestionar clientes, productos y ventas mediante un sistema de facturación desarrollado con programación orientada a objetos. Las ventas generan facturas con el detalle de productos, subtotal, descuentos, IVA y total; los datos se almacenan en archivos JSON.",
        problem:
            "Llevar el control de clientes, inventario y ventas de forma manual puede provocar errores en los cálculos y dificultar la consulta y actualización de la información.",
        tech: [
            "HTML5",
            "CSS3",
            "JavaScript",   
            "Python",
            "Programación Orientada a Objetos",
            "Operaciones CRUD",
            "Archivos JSON",
            "Validación de datos",
            "Cálculo de facturas, descuentos e IVA",
            "Interfaz de consola",
        ],
        repo: "https://github.com/Barbozakevin/crud_factura.git",
        demo: "https://barbozakevin.github.io/crud_factura/"
    }
};

function initProjectModal() {
    const modal = document.getElementById("projectModal");
    const modalClose = document.getElementById("modalClose");

    if (!modal) return;

    document.querySelectorAll(".project-detail").forEach((button) => {
        button.addEventListener("click", () => {
            const project = projectsData[button.dataset.projectId];

            if (project) {
                openProjectModal(project);
            }
        });
    });

    modalClose?.addEventListener("click", closeProjectModal);

    modal.querySelectorAll("[data-close-modal]").forEach((element) => {
        element.addEventListener("click", closeProjectModal);
    });

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            modal.classList.contains("open")
        ) {
            closeProjectModal();
        }
    });
}

function openProjectModal(project) {
    const modal = document.getElementById("projectModal");

    document.getElementById("modalCategory").textContent =
        project.category;
    document.getElementById("modalTitle").textContent =
        project.title;
    document.getElementById("modalDescription").textContent =
        project.description;
    document.getElementById("modalProblem").textContent =
        project.problem;

    const modalTech = document.getElementById("modalTech");
    modalTech.innerHTML = "";

    project.tech.forEach((technology) => {
        const tag = document.createElement("span");
        tag.textContent = technology;
        modalTech.appendChild(tag);
    });

    document.getElementById("modalRepo").href = project.repo;
    document.getElementById("modalDemo").href = project.demo;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    document.getElementById("modalClose").focus();
}

function closeProjectModal() {
    const modal = document.getElementById("projectModal");

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

function initContactForm() {
    const form = document.getElementById("contactForm");

    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const fields = {
            name: document.getElementById("name"),
            email: document.getElementById("email"),
            subject: document.getElementById("subject"),
            message: document.getElementById("message")
        };

        const errors = {
            name: document.getElementById("nameError"),
            email: document.getElementById("emailError"),
            subject: document.getElementById("subjectError"),
            message: document.getElementById("messageError")
        };

        const success = document.getElementById("formSuccess");

        Object.values(errors).forEach((error) => {
            error.textContent = "";
        });

        Object.values(fields).forEach((field) => {
            field.classList.remove("invalid");
        });

        success.textContent = "";

        let isValid = true;

        if (fields.name.value.trim().length < 2) {
            errors.name.textContent =
                "Ingresa un nombre válido.";
            fields.name.classList.add("invalid");
            isValid = false;
        }

        if (!isValidEmail(fields.email.value.trim())) {
            errors.email.textContent =
                "Ingresa un correo electrónico válido.";
            fields.email.classList.add("invalid");
            isValid = false;
        }

        if (fields.subject.value.trim().length < 3) {
            errors.subject.textContent =
                "El asunto debe tener al menos 3 caracteres.";
            fields.subject.classList.add("invalid");
            isValid = false;
        }

        if (fields.message.value.trim().length < 10) {
            errors.message.textContent =
                "El mensaje debe tener al menos 10 caracteres.";
            fields.message.classList.add("invalid");
            isValid = false;
        }

        if (!isValid) return;

        success.textContent =
            "Formulario validado correctamente. En una versión conectada, aquí se enviaría el mensaje.";

        form.reset();
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function initBackToTop() {
    const backToTop = document.getElementById("backToTop");

    if (!backToTop) return;

    window.addEventListener("scroll", () => {
        backToTop.classList.toggle(
            "visible",
            window.scrollY > 500
        );
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

function initActiveNavigation() {
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(
        '.nav-menu a[href^="#"]'
    );

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                navLinks.forEach((link) => {
                    link.classList.remove("active");
                });

                const activeLink = document.querySelector(
                    `.nav-menu a[href="#${entry.target.id}"]`
                );

                activeLink?.classList.add("active");
            });
        },
        {
            rootMargin: "-30% 0px -60% 0px",
            threshold: 0
        }
    );

    sections.forEach((section) => observer.observe(section));
}

function initSectionNavigation() {
    const main = document.querySelector("main");
    const sections = document.querySelectorAll("main section");
    const navLinks = document.querySelectorAll(
        '.nav-menu a[href^="#"]'
    );

    if (!main || !sections.length) return;

    main.classList.add("section-view");

    const setActiveSection = (section) => {
        sections.forEach((item) => {
            item.classList.toggle("is-active", item === section);
        });

        navLinks.forEach((link) => {
            const linkTarget = link.getAttribute("href");
            const isActive = section.id === "hero"
                ? linkTarget === "#inicio"
                : linkTarget === `#${section.id}`;

            link.classList.toggle("active", isActive);
        });

        window.scrollTo({ top: 0, behavior: "auto" });
    };

    const getSectionFromHash = () => {
        if (window.location.hash === "#inicio" || !window.location.hash) {
            return document.querySelector(".hero");
        }

        return document.querySelector(window.location.hash) || document.querySelector(".hero");
    };

    setActiveSection(getSectionFromHash());

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = targetId === "#inicio"
                ? document.querySelector(".hero")
                : document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();
            setActiveSection(target);
            window.history.replaceState(null, "", targetId);
        });
    });
}
