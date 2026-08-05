(function () {
  "use strict";

  const items = {
    tortuga: {
      title: "Tortuga marina verde",
      badge: "Costa Caribe Norte",
      model: "assets/models/costa-caribe/pieza-01.glb",
      image: "assets/infografias/costa-caribe/tortuga-marina-verde.png",
      alt: "Infografía de tortuga marina verde",
      text: "La tortuga verde conecta territorio, biodiversidad y memoria costera. Su presencia en playas del Caribe Norte abre una conversación comunitaria sobre anidación, turismo responsable, protección de ecosistemas marinos y respeto a los ciclos de vida.",
      infoTitle: "Lámina: Tortuga marina verde",
      infoCaption: "Hábitat, alimentación, ciclo de vida, amenazas y acciones comunitarias de protección.",
      facts: [
        ["Clave cultural", "Respeto al mar y a los ciclos de vida."],
        ["Lectura visual", "Conservación, territorio, playa y comunidad."]
      ]
    },
    pescado: {
      title: "Pescado al coco",
      badge: "Sabores del Caribe",
      model: "assets/models/costa-caribe/pieza-04.glb",
      image: "assets/infografias/costa-caribe/pescado-al-coco.png",
      alt: "Infografía de pescado al coco",
      text: "El pescado cocinado con leche de coco resume una cocina nacida del litoral: pesca artesanal, coco, hierbas locales y técnicas familiares. Es un plato cotidiano y festivo que habla de intercambio cultural entre comunidades mískitas, creoles y afrodescendientes.",
      infoTitle: "Lámina: Pescado al coco",
      infoCaption: "Ingredientes, acompañamientos, beneficios nutricionales y sentido cultural del plato.",
      facts: [
        ["Clave cultural", "Cocina transmitida por familia y comunidad."],
        ["Lectura visual", "Ingredientes, acompañamientos y lugares donde se consume."]
      ]
    },
    casa: {
      title: "Casa tradicional miskita",
      badge: "Arquitectura del territorio",
      model: "assets/models/costa-caribe/pieza-02.glb",
      image: "assets/infografias/costa-caribe/casa-tradicional-miskita.png",
      alt: "Infografía de casa tradicional miskita",
      text: "La casa tradicional sobre pilotes responde al clima húmedo, los ríos, lagunas y la vida familiar comunitaria. Sus materiales naturales y su ventilación muestran una arquitectura pensada desde el territorio, no impuesta sobre él.",
      infoTitle: "Lámina: Casa tradicional miskita",
      infoCaption: "Materiales, estructura, características, importancia cultural y datos de construcción.",
      facts: [
        ["Clave cultural", "Vivienda, familia, clima y relación con el agua."],
        ["Lectura visual", "Materiales naturales, espacios y estructura elevada."]
      ]
    },
    canoa: {
      title: "Canoa miskita",
      badge: "Movilidad y oficio",
      model: "assets/models/costa-caribe/pieza-03.glb",
      image: "assets/infografias/costa-caribe/canoa-miskita.png",
      alt: "Infografía de canoa miskita",
      text: "La canoa miskita es herramienta, transporte y símbolo. Une comunidades, facilita la pesca y conserva conocimientos de selección de madera, tallado, secado y navegación que pasan de generación en generación.",
      infoTitle: "Lámina: Canoa miskita",
      infoCaption: "Características, usos, proceso de elaboración, partes principales y valor cultural.",
      facts: [
        ["Clave cultural", "Movilidad, pesca y conexión entre comunidades."],
        ["Lectura visual", "Proceso artesanal, beneficios y partes de la canoa."]
      ]
    }
  };

  const $ = (sel) => document.querySelector(sel);
  const tabs = Array.from(document.querySelectorAll(".caribe-tab"));
  const model = $("#caribeModel");
  const img = $("#caribeInfoImg");
  const title = $("#caribeTitle");
  const text = $("#caribeText");
  const badge = $("#caribeBadge");
  const facts = $("#caribeFacts");
  const infoTitle = $("#caribeInfoTitle");
  const infoCaption = $("#caribeInfoCaption");
  const infoFigure = $("#caribeInfoFigure");
  const infoToggle = $("#caribeInfoToggle");
  const stage = $("#caribeStage");

  if (!tabs.length || !model || !img) return;

  // Al abrir el sitio con doble clic (file://) el navegador bloquea los modelos 3D;
  // y sin internet, la librería del visor no puede descargarse. En ambos casos
  // mostramos la lámina infográfica en su lugar.
  let sinServidor = location.protocol === "file:";
  const modelCard = document.querySelector(".model-card");
  function mostrarAviso() {
    sinServidor = true;
    if (modelCard) {
      modelCard.innerHTML = '<div class="model-aviso">🧊 <strong>Visor 3D no disponible en este modo.</strong><br>' +
        'El 3D funciona al abrir el sitio desde internet o un servidor local.<br>' +
        'Mientras tanto, aquí tenés la lámina infográfica 👇</div>';
    }
    setInfoVisible(true);
  }
  if (!sinServidor && window.customElements && customElements.whenDefined) {
    // si en 8 s la librería del visor no cargó (p. ej. sin internet), pasamos a láminas
    const guardia = setTimeout(() => {
      if (!customElements.get("model-viewer")) mostrarAviso();
    }, 8000);
    customElements.whenDefined("model-viewer").then(() => clearTimeout(guardia)).catch(() => {});
  }

  function setInfoVisible(visible) {
    if (!infoFigure || !infoToggle) return;
    infoFigure.hidden = !visible;
    infoToggle.setAttribute("aria-expanded", String(visible));
    infoToggle.textContent = visible ? "Ocultar infografía" : "Ver infografía";
  }

  function render(key) {
    const item = items[key] || items.tortuga;
    tabs.forEach((tab) => {
      const active = tab.dataset.caribe === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.setAttribute("tabindex", active ? "0" : "-1");
      if (active && stage) stage.setAttribute("aria-labelledby", tab.id);
    });
    if (!sinServidor) {
      model.setAttribute("src", item.model);
      model.removeAttribute("poster");
      model.setAttribute("alt", "Modelo 3D de " + item.title);
    }
    img.src = item.image;
    img.alt = item.alt;
    title.textContent = item.title;
    text.textContent = item.text;
    badge.textContent = item.badge;
    infoTitle.textContent = item.infoTitle;
    infoCaption.textContent = item.infoCaption;
    facts.innerHTML = item.facts.map(([dt, dd]) => `<div><dt>${dt}</dt><dd>${dd}</dd></div>`).join("");
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => render(tab.dataset.caribe));
    tab.addEventListener("keydown", (event) => {
      const last = tabs.length - 1;
      let next = index;
      if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
      else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = last;
      else return;
      event.preventDefault();
      tabs[next].focus();
      render(tabs[next].dataset.caribe);
    });
  });

  render("tortuga");
  if (sinServidor) mostrarAviso(); else setInfoVisible(false);

  if (infoToggle) {
    infoToggle.addEventListener("click", () => {
      setInfoVisible(infoToggle.getAttribute("aria-expanded") !== "true");
    });
  }

  if (stage && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    stage.addEventListener("pointermove", (event) => {
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      stage.style.setProperty("--rx", (-y * 3).toFixed(2) + "deg");
      stage.style.setProperty("--ry", (x * 4).toFixed(2) + "deg");
    });
    stage.addEventListener("pointerleave", () => {
      stage.style.setProperty("--rx", "0deg");
      stage.style.setProperty("--ry", "0deg");
    });
  }
})();
