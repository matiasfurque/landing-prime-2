const faqItems = document.querySelectorAll(".faq-item");
const intro = document.querySelector("[data-intro]");
const benefitDrawer = document.querySelector("[data-benefit-drawer]");

const benefitDetails = {
  "jumbo-mas": {
    eyebrow: "Puntos",
    title: "Doble acumulación Jumbo Más",
    description:
      "Sumá más puntos en tus compras online y aprovechá beneficios exclusivos para miembros activos de Jumbo Prime.",
    logos: [{ src: "assets/logo-jumbo-mas.png", alt: "Jumbo Más" }],
    items: ["Doble puntaje en compras online elegibles.", "Canjeá puntos por beneficios.", "Acumulación asociada a tu cuenta Jumbo Más."],
  },
  shell: {
    eyebrow: "Aliados Prime",
    title: "Doble acumulación Shell Box",
    description:
      "Aprovechá beneficios exclusivos en carga de combustible Shell V-Power durante los días comunicados.",
    logos: [{ src: "assets/logo-shell-box.png", alt: "Shell Box" }],
    items: ["Beneficio exclusivo los jueves.", "Disponible en cargas participantes.", "Acumulación asociada a Shell Box."],
  },
  smiles: {
    eyebrow: "Millas",
    title: "Millas bonus Smiles",
    description:
      "Canjeá tus puntos Jumbo Más por más millas durante semanas bonus y promociones especiales comunicadas.",
    logos: [{ src: "assets/logo-smiles.png", alt: "Smiles" }],
    items: ["Semanas bonus comunicadas previamente.", "Canje desde Jumbo Más.", "Beneficio ideal para sumar millas más rápido."],
  },
  atencion: {
    eyebrow: "Atención Prime",
    title: "Canal exclusivo de atención",
    description:
      "Contá con un canal de atención pensado para acompañarte cuando necesitás resolver una consulta sobre tu membresía.",
    logos: [{ text: "Prime", className: "drawer-wordmark--prime" }],
    items: ["Atención para consultas sobre tu membresía.", "Información sobre beneficios vigentes.", "Canales disponibles según las condiciones comunicadas."],
  },
  cabify: {
    eyebrow: "Movilidad",
    title: "Beneficios Cabify",
    description:
      "Accedé a beneficios especiales en viajes seleccionados, según las condiciones vigentes de la alianza.",
    logos: [{ text: "cabify", className: "drawer-wordmark--cabify" }],
    items: ["Descuentos sujetos a campañas vigentes.", "Aplicable en viajes y zonas participantes.", "Consultá las condiciones de cada beneficio."],
  },
  365: {
    eyebrow: "Experiencias",
    title: "Beneficios 365",
    description:
      "Disfrutá beneficios exclusivos en experiencias seleccionadas, de acuerdo con las condiciones de la alianza.",
    logos: [{ text: "365", className: "drawer-wordmark--365" }],
    items: ["Experiencias y propuestas seleccionadas.", "Beneficios sujetos a vigencia.", "Consultá las condiciones antes de usarlo."],
  },
};

if (intro) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const introDuration = prefersReducedMotion ? 350 : 2200;

  window.setTimeout(() => {
    intro.classList.add("is-hidden");
  }, introDuration);
}

if (benefitDrawer) {
  const drawerLogo = benefitDrawer.querySelector("[data-drawer-logo]");
  const drawerEyebrow = benefitDrawer.querySelector("[data-drawer-eyebrow]");
  const drawerTitle = benefitDrawer.querySelector("[data-drawer-title]");
  const drawerDescription = benefitDrawer.querySelector("[data-drawer-description]");
  const drawerList = benefitDrawer.querySelector("[data-drawer-list]");
  const closeButtons = benefitDrawer.querySelectorAll("[data-benefit-close]");
  let lastFocusedElement = null;

  const closeBenefitDrawer = () => {
    benefitDrawer.classList.remove("is-open");
    benefitDrawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("drawer-open");
    lastFocusedElement?.focus();
  };

  const openBenefitDrawer = (benefitKey) => {
    const detail = benefitDetails[benefitKey];

    if (!detail) return;

    lastFocusedElement = document.activeElement;
    drawerEyebrow.textContent = detail.eyebrow;
    drawerTitle.textContent = detail.title;
    drawerDescription.textContent = detail.description;
    drawerLogo.classList.toggle("is-row", detail.logos.length > 1);
    drawerLogo.replaceChildren(
      ...detail.logos.map((logo) => {
        if (logo.text) {
          const wordmark = document.createElement("span");
          wordmark.className = `drawer-wordmark ${logo.className ?? ""}`.trim();
          wordmark.textContent = logo.text;
          return wordmark;
        }

        const image = document.createElement("img");
        image.src = logo.src;
        image.alt = logo.alt;
        return image;
      })
    );
    drawerList.replaceChildren(
      ...detail.items.map((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        return listItem;
      })
    );

    benefitDrawer.classList.add("is-open");
    benefitDrawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("drawer-open");
    benefitDrawer.querySelector(".drawer-close")?.focus();
  };

  document.querySelectorAll("[data-benefit-open]").forEach((button) => {
    button.addEventListener("click", () => openBenefitDrawer(button.dataset.benefitOpen));
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeBenefitDrawer);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && benefitDrawer.classList.contains("is-open")) {
      closeBenefitDrawer();
    }
  });
}

const primeBenefits = document.querySelector("[data-prime-benefits]");

if (primeBenefits) {
  const slides = Array.from(primeBenefits.querySelectorAll("[data-prime-benefit-slide]"));
  const progress = primeBenefits.querySelector("[data-prime-benefit-progress]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rotationDuration = 5000;
  let activeIndex = 0;

  const renderPrimeBenefit = () => {
    slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    if (progress && !prefersReducedMotion) {
      progress.classList.remove("is-running");
      void progress.offsetWidth;
      progress.classList.add("is-running");
    }
  };

  renderPrimeBenefit();

  if (!prefersReducedMotion && slides.length > 1) {
    window.setInterval(() => {
      activeIndex = (activeIndex + 1) % slides.length;
      renderPrimeBenefit();
    }, rotationDuration);
  }
}

faqItems.forEach((item) => {
  item.addEventListener("click", () => {
    const isOpen = item.getAttribute("aria-expanded") === "true";

    faqItems.forEach((otherItem) => {
      otherItem.setAttribute("aria-expanded", "false");
      otherItem.lastElementChild.textContent = "+";
    });

    item.setAttribute("aria-expanded", String(!isOpen));
    item.lastElementChild.textContent = isOpen ? "+" : "−";
  });
});

const carousel = document.querySelector("[data-carousel]");

if (carousel) {
  const slides = Array.from(carousel.querySelectorAll("[data-slide]"));
  const dots = Array.from(carousel.querySelectorAll(".dot"));
  const previous = carousel.querySelector(".carousel-prev");
  const next = carousel.querySelector(".carousel-next");
  let activeIndex = 0;
  let autoplayPaused = false;

  const renderCarousel = () => {
    slides.forEach((slide, index) => {
      const previousIndex = (activeIndex - 1 + slides.length) % slides.length;
      const nextIndex = (activeIndex + 1) % slides.length;

      slide.classList.toggle("is-active", index === activeIndex);
      slide.classList.toggle("is-prev", index === previousIndex);
      slide.classList.toggle("is-next", index === nextIndex);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === activeIndex);
      dot.classList.remove("is-loading");
    });

    if (!autoplayPaused) {
      window.requestAnimationFrame(() => {
        dots[activeIndex]?.classList.add("is-loading");
      });
    }
  };

  const goToSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    renderCarousel();
  };

  const stopAutoplay = () => {
    autoplayPaused = true;
    dots[activeIndex]?.classList.remove("is-loading");
  };

  const startAutoplay = () => {
    autoplayPaused = false;
    renderCarousel();
  };

  const interact = (callback) => {
    callback();
    startAutoplay();
  };

  previous.addEventListener("click", () => interact(() => goToSlide(activeIndex - 1)));
  next.addEventListener("click", () => interact(() => goToSlide(activeIndex + 1)));

  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);
  carousel.addEventListener("focusin", stopAutoplay);
  carousel.addEventListener("focusout", startAutoplay);

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => interact(() => goToSlide(index)));
    dot.addEventListener("animationend", (event) => {
      if (event.animationName === "carousel-progress" && index === activeIndex && !autoplayPaused) {
        goToSlide(activeIndex + 1);
      }
    });
  });

  renderCarousel();
}
