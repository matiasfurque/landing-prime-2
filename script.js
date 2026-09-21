const faqItems = document.querySelectorAll(".faq-item");
const intro = document.querySelector("[data-intro]");
const benefitDrawer = document.querySelector("[data-benefit-drawer]");

const benefitDetails = {
  "jumbo-mas": {
    eyebrow: "Puntos",
    title: "Doble acumulación Jumbo Más",
    description:
      "Sumá más puntos en tus compras online y aprovechá beneficios exclusivos para miembros activos de Jumbo Prime.",
    image: { src: "assets/alliances-prime-placeholder-two.png", position: "top" },
    items: ["Doble puntaje en compras online elegibles.", "Canjeá puntos por beneficios.", "Acumulación asociada a tu cuenta Jumbo Más."],
  },
  shell: {
    eyebrow: "Aliados Prime",
    title: "Doble acumulación Shell Box",
    description:
      "Aprovechá beneficios exclusivos en carga de combustible Shell V-Power durante los días comunicados.",
    image: { src: "assets/alliances-prime-placeholder-one.png", position: "center" },
    items: ["Beneficio exclusivo los jueves.", "Disponible en cargas participantes.", "Acumulación asociada a Shell Box."],
  },
  smiles: {
    eyebrow: "Millas",
    title: "Millas bonus Smiles",
    description:
      "Canjeá tus puntos Jumbo Más por más millas durante semanas bonus y promociones especiales comunicadas.",
    image: { src: "assets/alliances-prime-placeholder-one.png", position: "top" },
    items: ["Semanas bonus comunicadas previamente.", "Canje desde Jumbo Más.", "Beneficio ideal para sumar millas más rápido."],
  },
  atencion: {
    eyebrow: "Atención Prime",
    title: "Canal exclusivo de atención",
    description:
      "Contá con un canal de atención pensado para acompañarte cuando necesitás resolver una consulta sobre tu membresía.",
    image: { src: "assets/alliances-prime-placeholder-two.png", position: "center" },
    items: ["Atención para consultas sobre tu membresía.", "Información sobre beneficios vigentes.", "Canales disponibles según las condiciones comunicadas."],
  },
  365: {
    eyebrow: "Experiencias",
    title: "Beneficios 365",
    description:
      "Disfrutá beneficios exclusivos en experiencias seleccionadas, de acuerdo con las condiciones de la alianza.",
    image: { src: "assets/alliances-prime-placeholder-one.png", position: "bottom" },
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
    const drawerImage = document.createElement("span");
    drawerImage.className = `drawer-image drawer-image--${detail.image.position}`;
    drawerImage.style.backgroundImage = `url("${detail.image.src}")`;
    drawerLogo.replaceChildren(drawerImage);
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
  const previous = primeBenefits.querySelector("[data-prime-benefit-previous]");
  const next = primeBenefits.querySelector("[data-prime-benefit-next]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rotationDuration = 5000;
  let activeIndex = 0;
  let rotationTimer;
  let isPrimeBenefitPaused = false;

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

  const scheduleRotation = () => {
    if (prefersReducedMotion || slides.length < 2) return;

    window.clearTimeout(rotationTimer);
    rotationTimer = window.setTimeout(() => {
      activeIndex = (activeIndex + 1) % slides.length;
      renderPrimeBenefit();
      scheduleRotation();
    }, rotationDuration);
  };

  const goToPrimeBenefit = (nextIndex) => {
    activeIndex = (nextIndex + slides.length) % slides.length;
    renderPrimeBenefit();
    if (!isPrimeBenefitPaused) scheduleRotation();
  };

  const pausePrimeBenefits = () => {
    isPrimeBenefitPaused = true;
    window.clearTimeout(rotationTimer);
    progress?.classList.add("is-paused");
  };

  const resumePrimeBenefits = () => {
    if (prefersReducedMotion) return;

    isPrimeBenefitPaused = false;
    progress?.classList.remove("is-paused");
    renderPrimeBenefit();
    scheduleRotation();
  };

  renderPrimeBenefit();

  previous?.addEventListener("click", () => goToPrimeBenefit(activeIndex - 1));
  next?.addEventListener("click", () => goToPrimeBenefit(activeIndex + 1));

  if (!prefersReducedMotion && slides.length > 1) {
    scheduleRotation();
    primeBenefits.addEventListener("mouseenter", pausePrimeBenefits);
    primeBenefits.addEventListener("mouseleave", resumePrimeBenefits);
    primeBenefits.addEventListener("focusin", pausePrimeBenefits);
    primeBenefits.addEventListener("focusout", (event) => {
      if (!primeBenefits.contains(event.relatedTarget)) resumePrimeBenefits();
    });
  }
}

const scrollRevealGroups = [
  ".benefits-section .section-heading, .prime-benefit-carousel",
  ".offers-section .section-heading, .prime-carousel",
  ".monthly-heading, .monthly-card",
  ".alliances-heading, .alliance-card",
  ".faq-inner",
  ".site-footer",
];

scrollRevealGroups.forEach((selector) => {
  document.querySelectorAll(selector).forEach((item, index) => {
    item.setAttribute("data-scroll-reveal", "");

    if (!item.dataset.revealDelay && index > 0) {
      item.dataset.revealDelay = String(Math.min(index, 3));
    }
  });
});

const scrollRevealItems = document.querySelectorAll("[data-scroll-reveal]");

if (scrollRevealItems.length) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    document.documentElement.classList.add("reveal-ready");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-revealed");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8%" }
    );

    scrollRevealItems.forEach((item) => revealObserver.observe(item));
  } else {
    scrollRevealItems.forEach((item) => item.classList.add("is-revealed"));
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
