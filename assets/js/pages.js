/* ============================================================
   pages.js — renderiza listados, detalles, regiones, pueblos
   y diccionario. Usa BDIcore. El <body> declara data-page.
   ============================================================ */
(function () {
  "use strict";
  const C = window.BDIcore;
  const { esc, icon, param, typeMeta, itemsOf, findItem, figureHTML,
          findPueblo, findRegion, pueblosDe, regionDe, itemsForPueblo, palabrasDe } = C;

  const page = document.body.dataset.page; // listing | detail | region | pueblo | diccionario
  const main = document.getElementById("main");

  /* ===================== Utilidades comunes ===================== */
  function subtitleFor(tipo, it) {
    if (tipo === "recetas") return `${it.comunidad || ""}`.trim();
    if (tipo === "tradiciones" || tipo === "danzas") return `${it.cuando || ""} · ${it.lugar || ""}`.replace(/^ · | · $/g, "");
    if (tipo === "oral") return `Tradición oral · ${it.origen || ""}`;
    if (tipo === "documentos") return it.tipo || "";
    if (tipo === "pueblos") return it.region || "";
    if (tipo === "lugares") return `${it.tipo || ""} · ${it.region || ""}`.replace(/^ · | · $/g, "");
    return "";
  }

  function matches(it, q) {
    if (!q) return true;
    const hay = [it.nombre, it.titulo, it.texto, it.descripcion, it.detalle, it.comunidad,
      it.origen, it.tipo, it.cuando, it.lugar, it.region, it.idioma,
      (it.tags || []).join(" "), (it.ingredientes || []).join(" "),
      (it.pasos || []).join(" ")].filter(Boolean).join(" ").toLowerCase();
    return hay.includes(q);
  }

  function secondIcon(tipo) {
    return ({ recetas: "palmera", tradiciones: "corona", oral: "tortuga",
      documentos: "estrella", pueblos: "cayuco", lugares: "volcan", danzas: "mascara" })[tipo] || "estrella";
  }

  /* Íconos flotantes arrastrables del hero */
  function initFloaties() {
    document.querySelectorAll(".floatie").forEach((el) => {
      el.innerHTML = icon(el.dataset.icon);
      C.makeDraggable(el);
    });
  }

  /* ---------- Pronunciación aproximada (síntesis de voz) ---------- */
  const hayVoz = "speechSynthesis" in window;
  function audioBtnHTML(palabra) {
    return hayVoz
      ? `<button class="word-audio" data-word="${esc(palabra)}" title="Escuchar pronunciación aproximada" aria-label="Escuchar ${esc(palabra)}">🔊</button>`
      : "";
  }
  function initSpeak(root) {
    if (!hayVoz) return;
    (root || document).addEventListener("click", (e) => {
      const b = e.target.closest(".word-audio");
      if (!b) return;
      e.preventDefault();
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(b.dataset.word);
      u.lang = "es-NI";
      u.rate = 0.8;
      const voz = speechSynthesis.getVoices().find((v) => v.lang.startsWith("es"));
      if (voz) u.voice = voz;
      b.classList.add("speaking");
      u.onend = () => b.classList.remove("speaking");
      speechSynthesis.speak(u);
    });
  }

  /* ---------- Barajar (Fisher–Yates, con RNG opcional) ---------- */
  function shuffle(arr, rng) {
    const rnd = rng || Math.random;
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  /* RNG determinista (mulberry32) — mismo reto para todos cada día */
  function mulberry32(seed) {
    let s = seed >>> 0;
    return function () {
      s = (s + 0x6D2B79F5) >>> 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function itemHref(tipo, it) {
    return tipo === "pueblos"
      ? `pueblo.html?id=${encodeURIComponent(it.id)}`
      : `detalle.html?tipo=${tipo}&id=${encodeURIComponent(it.id)}`;
  }

  function cardHTML(tipo, it, meta) {
    const titulo = it.nombre || it.titulo;
    const sub = subtitleFor(tipo, it);
    const text = it.texto || it.descripcion || "";
    return `
    <a class="listing-card reveal" href="${itemHref(tipo, it)}">
      ${figureHTML(it.foto, it.icon, "listing-media")}
      <div class="listing-body">
        ${sub ? `<span class="listing-sub">${esc(sub)}</span>` : ""}
        <h3>${esc(titulo)}</h3>
        <p>${esc(text)}</p>
        <span class="listing-link">Ver ${meta.singular.toLowerCase()} →</span>
      </div>
    </a>`;
  }

  /* ===================== LISTADO ===================== */
  function renderListing(tipo, meta) {
    const puebloId = param("pueblo");
    const pueblo = puebloId ? findPueblo(puebloId) : null;
    const list = pueblo ? itemsForPueblo(tipo, puebloId) : itemsOf(tipo);
    const startQ = param("q") || "";

    main.innerHTML = `
      <section class="page-hero" style="--accent:${meta.accent}">
        <span class="page-hero-deco floatie" data-icon="${meta.icon}" aria-hidden="true"></span>
        <span class="page-hero-deco floatie second" data-icon="${secondIcon(tipo)}" aria-hidden="true"></span>
        <div class="container">
          <nav class="crumbs"><a href="index.html">Inicio</a> <span>›</span> ${esc(meta.titulo)}</nav>
          <p class="eyebrow">${esc(meta.kicker)}</p>
          <h1>${esc(meta.titulo)}${pueblo ? ` · ${esc(pueblo.nombre)}` : ""}</h1>
          <p class="page-hero-sub">${esc(pueblo ? `Elementos de la colección vinculados al pueblo ${pueblo.nombre}.` : meta.desc)}</p>
          ${pueblo ? `<p class="crumbs"><a href="coleccion.html?tipo=${tipo}">← Ver toda la colección</a> · <a href="pueblo.html?id=${esc(puebloId)}">Página del pueblo ${esc(pueblo.nombre)} →</a></p>` : ""}
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="search-row">
            <input type="search" id="searchInput" class="search-input"
                   placeholder="Buscar en ${esc(meta.titulo.toLowerCase())}…" value="${esc(startQ)}"
                   aria-label="Buscar">
            <span class="search-count" id="searchCount"></span>
          </div>
          ${tipo === "recetas" ? `
          <div class="ing-chips" id="ingChips" aria-label="Filtrar por ingrediente">
            <span class="ing-chips-lbl">Por ingrediente:</span>
            ${["coco", "maíz", "yuca", "plátano", "pescado", "queso", "cacao", "jengibre", "cerdo"]
              .map((i) => `<button class="ing-chip" data-ing="${i}">${i}</button>`).join("")}
          </div>` : ""}
          <div class="listing-grid" id="listingGrid"></div>
        </div>
      </section>`;

    const grid = document.getElementById("listingGrid");
    const input = document.getElementById("searchInput");
    const countEl = document.getElementById("searchCount");

    const chipsBox = document.getElementById("ingChips");
    if (chipsBox) {
      chipsBox.addEventListener("click", (e) => {
        const b = e.target.closest(".ing-chip");
        if (!b) return;
        const activo = b.classList.contains("on");
        chipsBox.querySelectorAll(".ing-chip").forEach((x) => x.classList.remove("on"));
        input.value = activo ? "" : b.dataset.ing;
        if (!activo) b.classList.add("on");
        input.dispatchEvent(new Event("input"));
      });
    }

    function draw() {
      const q = input.value.trim().toLowerCase();
      const filtered = list.filter((it) => matches(it, q));
      grid.innerHTML = filtered.length
        ? filtered.map((it) => cardHTML(tipo, it, meta)).join("")
        : `<p class="empty">No se encontraron resultados para «${esc(q)}».</p>`;
      countEl.textContent = q ? `${filtered.length} de ${list.length}` : `${list.length} elementos`;
      C.initReveal(grid);
    }

    input.addEventListener("input", draw);
    draw();
    initFloaties();
  }

  /* ===================== DETALLE ===================== */
  function renderDetail(tipo, meta) {
    const id = param("id");
    const it = findItem(tipo, id);
    if (!it) {
      main.innerHTML = `<div class="container section"><p class="empty">Elemento no encontrado.</p>
        <p><a class="btn btn-primary" href="coleccion.html?tipo=${tipo}">Ver ${esc(meta.titulo)}</a></p></div>`;
      return;
    }
    const titulo = it.nombre || it.titulo;
    document.title = titulo + " · BICSAN";
    const clave = `${tipo}:${it.id}`;
    C.marcarVisto(clave);

    main.innerHTML = `
      <section class="detail-hero" style="--accent:${meta.accent}">
        ${figureHTML(it.foto, it.icon, "detail-media")}
        <div class="container detail-hero-inner">
          <nav class="crumbs">
            <a href="index.html">Inicio</a> <span>›</span>
            <a href="coleccion.html?tipo=${tipo}">${esc(meta.titulo)}</a> <span>›</span>
            ${esc(titulo)}
          </nav>
          ${subtitleFor(tipo, it) ? `<p class="eyebrow">${esc(subtitleFor(tipo, it))}</p>` : ""}
          <h1>${esc(titulo)}</h1>
          <p class="detail-lead">${esc(it.texto || it.descripcion || "")}</p>
          ${tagsRow(it)}
        </div>
      </section>

      <section class="section">
        <div class="container detail-body">
          ${detailContent(tipo, it)}
          <aside class="detail-aside">
            ${asideContent(tipo, it)}
            ${puebloAside(tipo, it)}
            ${accionesHTML(clave, tipo)}
            ${navColeccionHTML(tipo, it, meta)}
            <a class="btn btn-ghost-dark" href="coleccion.html?tipo=${tipo}">← Volver a ${esc(meta.titulo)}</a>
          </aside>
        </div>
      </section>
      ${relacionadosHTML(tipo, it)}`;

    C.initReveal(main);
    initLightbox();
    initAcciones(titulo, it.texto || it.descripcion || "", meta.singular);
    inyectarSchema(tipo, it, titulo);
  }

  /* ---------- Datos estructurados (SEO): schema.org/Recipe ---------- */
  function inyectarSchema(tipo, it, titulo) {
    const viejo = document.getElementById("ldjson");
    if (viejo) viejo.remove();
    if (tipo !== "recetas") return;
    const datos = {
      "@context": "https://schema.org",
      "@type": "Recipe",
      "name": titulo,
      "description": it.texto || "",
      "recipeCuisine": "Nicaragüense",
      "recipeYield": it.porciones || undefined,
      "recipeIngredient": it.ingredientes || [],
      "recipeInstructions": (it.pasos || []).map((p) => ({ "@type": "HowToStep", "text": p })),
      "keywords": (it.tags || []).join(", ")
    };
    const s = document.createElement("script");
    s.id = "ldjson";
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(datos);
    document.head.appendChild(s);
  }

  /* ---------- Acciones de ficha: guardar, compartir, citar, imprimir ---------- */
  function accionesHTML(clave, tipo) {
    return `<div class="ficha-acciones">
      <button class="btn btn-ghost-dark accion-guardar" data-key="${esc(clave)}">
        ${C.isSaved(clave) ? "★ Guardado" : "☆ Guardar"}</button>
      <button class="btn btn-ghost-dark accion-compartir">Compartir</button>
      <button class="btn btn-ghost-dark accion-citar" title="Copiar cita para trabajos escolares">Citar esta ficha</button>
      ${tipo === "recetas" ? `<button class="btn btn-ghost-dark accion-imprimir">🖨 Imprimir receta</button>` : ""}
    </div>`;
  }
  function initAcciones(titulo, texto, tipoEtiqueta) {
    const g = document.querySelector(".accion-guardar");
    if (g) g.addEventListener("click", () => {
      const ahora = C.toggleSaved(g.dataset.key);
      g.textContent = ahora ? "★ Guardado" : "☆ Guardar";
      C.toast(ahora ? "Agregado a tus guardados ★" : "Quitado de tus guardados");
    });
    const s = document.querySelector(".accion-compartir");
    if (s) s.addEventListener("click", () => C.compartir(titulo, texto));
    const p = document.querySelector(".accion-imprimir");
    if (p) p.addEventListener("click", () => window.print());
    const c = document.querySelector(".accion-citar");
    if (c) c.addEventListener("click", () => {
      const f = new Date();
      const MES = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
      const cita = `«${titulo}» (${tipoEtiqueta || "ficha"}). BICSAN — Biblioteca Intercultural de Cosmovisiones y Saberes Ancestrales de Nicaragua. Recuperado el ${f.getDate()} de ${MES[f.getMonth()]} de ${f.getFullYear()}.`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(cita)
          .then(() => C.toast("Cita copiada — lista para pegar en tu trabajo 📋"))
          .catch(() => C.toast("No se pudo copiar; seleccioná y copiá manualmente"));
      } else C.toast("Tu navegador no permite copiar automáticamente");
    });
  }

  /* ---------- Anterior / siguiente dentro de la colección ---------- */
  function navColeccionHTML(tipo, it, meta) {
    const lista = itemsOf(tipo);
    const i = lista.findIndex((x) => String(x.id) === String(it.id));
    if (i < 0 || lista.length < 2) return "";
    const prev = lista[(i - 1 + lista.length) % lista.length];
    const next = lista[(i + 1) % lista.length];
    const href = (x) => `detalle.html?tipo=${tipo}&id=${encodeURIComponent(x.id)}`;
    const nom = (x) => esc((x.nombre || x.titulo).slice(0, 26));
    return `<div class="det-nav">
      <a class="det-nav-a" href="${href(prev)}" title="${esc(prev.nombre || prev.titulo)}">
        <span>← Anterior</span><strong>${nom(prev)}</strong></a>
      <a class="det-nav-a det-nav-next" href="${href(next)}" title="${esc(next.nombre || next.titulo)}">
        <span>Siguiente →</span><strong>${nom(next)}</strong></a>
    </div>`;
  }

  /* ---------- «Seguí explorando»: contenido relacionado ---------- */
  function relacionadosHTML(tipo, it) {
    const misPueblos = pueblosDe(tipo, it);
    const pool = [];
    Object.keys(C.TYPES).forEach((t) => {
      itemsOf(t).forEach((x) => {
        if (t === tipo && String(x.id) === String(it.id)) return;
        const suyos = pueblosDe(t, x);
        if (misPueblos.length && suyos.some((p) => misPueblos.includes(p))) pool.push([t, x]);
      });
    });
    let picks = shuffle(pool).slice(0, 3);
    if (picks.length < 3) {
      const extra = shuffle(itemsOf(tipo).filter((x) => String(x.id) !== String(it.id)))
        .slice(0, 3 - picks.length).map((x) => [tipo, x]);
      picks = picks.concat(extra);
    }
    if (!picks.length) return "";
    return `
      <section class="section section-alt relacionados-sec">
        <div class="container">
          <h2 class="block-title">Seguí explorando</h2>
          <div class="listing-grid">
            ${picks.map(([t, x]) => cardHTML(t, x, typeMeta(t))).join("")}
          </div>
        </div>
      </section>`;
  }

  /* ---------- Bloques de contenido del detalle ---------- */
  function detailContent(tipo, it) {
    let html = "";
    if (it.detalle) {
      const paras = Array.isArray(it.detalle) ? it.detalle : [it.detalle];
      html += paras.map((p) => `<p class="detail-text">${esc(p)}</p>`).join("");
    }

    if (tipo === "recetas") {
      if (it.ingredientes && it.ingredientes.length) {
        html += `<h2 class="block-title">Ingredientes</h2>
          <ul class="ingredients">${it.ingredientes.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
      }
      if (it.pasos && it.pasos.length) {
        html += `<h2 class="block-title">Preparación paso a paso</h2>
          <ol class="steps">${it.pasos.map((p) => `<li><span class="step-text">${esc(p)}</span></li>`).join("")}</ol>`;
      }
      if (it.consejo) {
        html += `<div class="tip"><span class="tip-ico" aria-hidden="true">💡</span>
          <div><strong>Consejo</strong><p>${esc(it.consejo)}</p></div></div>`;
      }
    }

    html += galleryHTML(tipo, it);
    return `<div class="detail-main">${html || "<p class=\"detail-text\">Más información próximamente.</p>"}</div>`;
  }

  function galTitle(t) {
    return ({
      recetas: "Más imágenes del plato", lugares: "Galería · naturaleza y paisajes",
      pueblos: "Vida y cultura", oral: "Imágenes y representaciones",
      tradiciones: "Imágenes", documentos: "Imágenes", danzas: "Imágenes de la danza"
    })[t] || "Galería";
  }

  function galleryHTML(tipo, it) {
    if (!it.galeria || !it.galeria.length) return "";
    const cards = it.galeria.map((g, i) =>
      `<figure class="media-card reveal" style="--i:${i}">
         <div class="media-card-img">
           <img src="${esc(g.src)}" alt="${esc(g.cap || "")}" loading="lazy"
                onerror="this.closest('.media-card').remove()">
         </div>
         <figcaption>
           ${g.cap ? `<strong>${esc(g.cap)}</strong>` : ""}
           ${g.desc ? `<span>${esc(g.desc)}</span>` : ""}
         </figcaption>
       </figure>`).join("");
    return `<h2 class="block-title">${esc(galTitle(tipo))}</h2><div class="media-cards">${cards}</div>`;
  }

  /* Visor de imágenes (lightbox) */
  function initLightbox() {
    let ov = document.getElementById("lightbox");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "lightbox";
      ov.className = "lightbox";
      ov.innerHTML = `<button class="lightbox-close" aria-label="Cerrar">×</button>
        <figure><img alt=""><figcaption class="lightbox-cap"></figcaption></figure>`;
      document.body.appendChild(ov);
      ov.addEventListener("click", (e) => {
        if (e.target === ov || e.target.classList.contains("lightbox-close")) ov.classList.remove("open");
      });
      document.addEventListener("keydown", (e) => { if (e.key === "Escape") ov.classList.remove("open"); });
    }
    const img = ov.querySelector("img");
    const cap = ov.querySelector(".lightbox-cap");
    document.querySelectorAll(".media-card img, .detail-media img, .pueblo-media img").forEach((im) => {
      im.style.cursor = "zoom-in";
      im.addEventListener("click", (e) => {
        e.preventDefault();
        img.src = im.src; cap.textContent = im.alt || "";
        ov.classList.add("open");
      });
    });
  }

  function asideContent(tipo, it) {
    const rows = [];
    if (tipo === "recetas") {
      if (it.comunidad) rows.push(["Comunidad", it.comunidad]);
      if (it.tiempo) rows.push(["Tiempo", it.tiempo]);
      if (it.porciones) rows.push(["Porciones", it.porciones]);
      if (it.dificultad) rows.push(["Dificultad", it.dificultad]);
    } else if (tipo === "tradiciones" || tipo === "danzas") {
      if (it.cuando) rows.push(["Cuándo", it.cuando]);
      if (it.lugar) rows.push(["Dónde", it.lugar]);
    } else if (tipo === "oral") {
      if (it.origen) rows.push(["Origen", it.origen]);
    } else if (tipo === "documentos") {
      if (it.tipo) rows.push(["Tipo", it.tipo]);
    } else if (tipo === "pueblos") {
      if (it.region) rows.push(["Región", it.region]);
      if (it.idioma) rows.push(["Idioma", it.idioma]);
    } else if (tipo === "lugares") {
      if (it.tipo) rows.push(["Tipo", it.tipo]);
      if (it.region) rows.push(["Región", it.region]);
    }
    if (it.datos) it.datos.forEach((d) => rows.push(d));

    // Evitar etiquetas repetidas (p. ej. "Región" del campo largo y del resumen)
    const seen = new Set();
    const unique = rows.filter((r) => {
      const k = String(r[0]).toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });

    const facts = unique.map((r) =>
      `<div class="fact"><dt>${esc(r[0])}</dt><dd>${esc(r[1])}</dd></div>`).join("");
    return facts ? `<div class="fact-card"><h3>Ficha</h3><dl>${facts}</dl></div>` : "";
  }

  /* Tarjeta lateral: pueblos vinculados al elemento */
  function puebloAside(tipo, it) {
    const ids = pueblosDe(tipo, it);
    if (!ids.length) return "";
    const links = ids.map((id) => {
      const p = findPueblo(id);
      if (!p) return "";
      return `<a class="pueblo-mini" href="pueblo.html?id=${id}">
        <span class="pueblo-mini-ico" style="background:${p.color[0]}">${icon(p.icon)}</span>
        <span>${esc(p.nombre)}</span><span class="go">→</span></a>`;
    }).join("");
    return `<div class="fact-card"><h3>Pueblos relacionados</h3><div class="pueblo-minis">${links}</div></div>`;
  }

  function tagsRow(it) {
    return it.tags && it.tags.length
      ? `<div class="detail-tags">${(it.tags).map((t) => `<span class="chip">#${esc(t)}</span>`).join("")}</div>`
      : "";
  }

  /* ===================== REGIÓN ===================== */
  function renderRegion() {
    // alias de compatibilidad: el antiguo "caribe" ahora es Caribe Norte
    const alias = { caribe: "caribe-norte" };
    let id = param("id") || "caribe-norte";
    id = alias[id] || id;
    const reg = findRegion(id);
    if (!reg) {
      main.innerHTML = `<div class="container section"><p class="empty">Región no encontrada.</p>
        <p><a class="btn btn-primary" href="index.html#regiones">Ver regiones</a></p></div>`;
      return;
    }
    document.title = reg.nombre + " · BICSAN";
    const pueblos = BDI.comunidades.filter((p) => (p.regiones || []).includes(id));
    const lugares = BDI.lugares.filter((l) => regionDe(l) === id);

    main.innerHTML = `
      <section class="page-hero region-hero" style="--accent:${reg.color[0]};--c1:${reg.color[0]};--c2:${reg.color[1]}">
        <span class="page-hero-deco floatie" data-icon="${reg.icon}" aria-hidden="true"></span>
        <span class="page-hero-deco floatie second" data-icon="estrella" aria-hidden="true"></span>
        <div class="container">
          <nav class="crumbs"><a href="index.html">Inicio</a> <span>›</span> <a href="index.html#regiones">Regiones</a> <span>›</span> ${esc(reg.nombre)}</nav>
          <p class="eyebrow">${esc(reg.sub)}</p>
          <h1>${esc(reg.nombre)}</h1>
          <p class="page-hero-sub">${esc(reg.descripcion)}</p>
          <ul class="hero-stats region-stats">
            <li><span class="stat-num">${pueblos.length}</span><span class="stat-label">Pueblos</span></li>
            <li><span class="stat-num">${lugares.length}</span><span class="stat-label">Lugares</span></li>
          </ul>
        </div>
      </section>

      <section class="section">
        <div class="container">
          ${(reg.detalle || []).map((p) => `<p class="detail-text region-text reveal">${esc(p)}</p>`).join("")}
        </div>
      </section>

      <section class="section section-alt pattern-tuno">
        <div class="container">
          <header class="section-head">
            <p class="kicker">Quiénes habitan esta región</p>
            <h2 class="section-title">Pueblos de ${esc(reg.nombre)}</h2>
            <p class="section-desc">Entrá a cada pueblo para conocer sus comidas, danzas, leyendas, lugares y palabras.</p>
          </header>
          <div class="cards-grid">
            ${pueblos.map((p) => `
              <a class="community-card reveal" href="pueblo.html?id=${p.id}">
                <div class="community-banner" style="background:${p.color[0]}">
                  <span class="banner-icon">${icon(p.icon)}</span>
                </div>
                <div class="community-body">
                  <h3>${esc(p.nombre)}</h3>
                  <div class="community-meta">
                    <span class="chip region">📍 ${esc(p.region)}</span>
                  </div>
                  <p>${esc(p.descripcion)}</p>
                  <span class="card-link">Conocer este pueblo →</span>
                </div>
              </a>`).join("")}
          </div>
        </div>
      </section>

      ${lugares.length ? `
      <section class="section">
        <div class="container">
          <header class="section-head">
            <p class="kicker">Geografía e identidad</p>
            <h2 class="section-title">Lugares de ${esc(reg.nombre)}</h2>
          </header>
          <div class="listing-grid">
            ${lugares.map((l) => cardHTML("lugares", l, typeMeta("lugares"))).join("")}
          </div>
        </div>
      </section>` : ""}`;

    C.initReveal(main);
    initFloaties();
  }

  /* ===================== PUEBLO (hub con secciones) ===================== */
  function renderPueblo() {
    const id = param("id");
    const p = findPueblo(id);
    if (!p) {
      main.innerHTML = `<div class="container section"><p class="empty">Pueblo no encontrado.</p>
        <p><a class="btn btn-primary" href="coleccion.html?tipo=pueblos">Ver pueblos</a></p></div>`;
      return;
    }
    document.title = p.nombre + " · BICSAN";
    const clave = `pueblos:${p.id}`;
    C.marcarVisto(clave);

    const secciones = [
      { id: "recetas", tipo: "recetas", titulo: "Comidas típicas", icono: "🍲", desc: "Recetas con ingredientes y preparación paso a paso." },
      { id: "danzas", tipo: "danzas", titulo: "Danzas y música", icono: "💃", desc: "Bailes, ritmos y expresiones escénicas." },
      { id: "tradiciones", tipo: "tradiciones", titulo: "Tradiciones y festividades", icono: "🎉", desc: "Celebraciones con sus fechas y lugares." },
      { id: "oral", tipo: "oral", titulo: "Cuentos y leyendas", icono: "🗣️", desc: "Relatos, espantos y cosmovisión." },
      { id: "lugares", tipo: "lugares", titulo: "Lugares", icono: "🗺️", desc: "Territorios y sitios emblemáticos." }
    ].map((s) => Object.assign({}, s, { items: itemsForPueblo(s.tipo, id) })).filter((s) => s.items.length);

    const palabras = palabrasDe(id);
    const navItems = secciones.map((s) => `<a href="#sec-${s.id}">${s.icono} ${esc(s.titulo)}</a>`).join("")
      + (palabras.length ? `<a href="#sec-palabras">💬 Palabras clave</a>` : "")
      + (p.galeria && p.galeria.length ? `<a href="#sec-galeria">📷 Galería</a>` : "");

    main.innerHTML = `
      <section class="pueblo-hero" style="--c1:${p.color[0]};--c2:${p.color[1]}">
        <div class="container pueblo-hero-grid">
          <div class="pueblo-hero-txt">
            <nav class="crumbs"><a href="index.html">Inicio</a> <span>›</span>
              <a href="coleccion.html?tipo=pueblos">Pueblos y Etnias</a> <span>›</span> ${esc(p.nombre)}</nav>
            <p class="eyebrow">${esc(p.region)}</p>
            <h1>${esc(p.nombre)}</h1>
            <p class="detail-lead">${esc(p.descripcion)}</p>
            <div class="community-meta">
              <span class="chip">💬 ${esc(p.idioma)}</span>
            </div>
          </div>
          <div class="pueblo-hero-media">
            ${figureHTML(p.foto, p.icon, "pueblo-media")}
            <span class="pueblo-hero-ico anim-bob" id="puebloIco" aria-hidden="true">${icon(p.icon)}</span>
          </div>
        </div>
        <nav class="pueblo-nav" aria-label="Secciones del pueblo">
          <div class="container pueblo-nav-inner">${navItems}</div>
        </nav>
      </section>

      <section class="section">
        <div class="container detail-body">
          <div class="detail-main">
            ${(Array.isArray(p.detalle) ? p.detalle : [p.detalle]).filter(Boolean)
              .map((t) => `<p class="detail-text">${esc(t)}</p>`).join("")}
          </div>
          <aside class="detail-aside">
            ${asideContent("pueblos", p)}
            ${accionesHTML(clave, "pueblos")}
          </aside>
        </div>
      </section>

      ${secciones.map((s, i) => `
      <section class="section hub-section ${i % 2 ? "" : "section-alt"}" id="sec-${s.id}">
        <div class="container">
          <header class="section-head">
            <p class="kicker">${s.icono} ${esc(p.nombre)}</p>
            <h2 class="section-title">${esc(s.titulo)}</h2>
            <p class="section-desc">${esc(s.desc)}</p>
          </header>
          <div class="listing-grid">
            ${s.items.slice(0, 6).map((it) => cardHTML(s.tipo, it, typeMeta(s.tipo))).join("")}
          </div>
          ${s.items.length > 6 ? `<div class="see-all"><a class="btn btn-outline" href="coleccion.html?tipo=${s.tipo}&pueblo=${id}">Ver los ${s.items.length} elementos →</a></div>` : ""}
        </div>
      </section>`).join("")}

      ${palabras.length ? `
      <section class="section hub-section" id="sec-palabras">
        <div class="container">
          <header class="section-head">
            <p class="kicker">💬 Lengua viva</p>
            <h2 class="section-title">Palabras clave</h2>
            <p class="section-desc">Un vistazo a la lengua y al vocabulario heredado de este pueblo.
            La escritura puede variar entre comunidades.</p>
          </header>
          <div class="word-grid">
            ${palabras.map((w, i) => `
              <article class="word-card reveal" style="--i:${i % 8}">
                ${audioBtnHTML(w.palabra)}
                <h3>${esc(w.palabra)}</h3>
                <span class="word-lang">${esc(w.lengua)}</span>
                <p>${esc(w.significado)}</p>
                ${w.nota ? `<small>${esc(w.nota)}</small>` : ""}
              </article>`).join("")}
          </div>
          <div class="see-all"><a class="btn btn-outline" href="diccionario.html">Ver el diccionario completo →</a></div>
        </div>
      </section>` : ""}

      ${p.galeria && p.galeria.length ? `
      <section class="section section-alt hub-section" id="sec-galeria">
        <div class="container">
          <header class="section-head">
            <p class="kicker">📷 Memoria visual</p>
            <h2 class="section-title">Vida y cultura</h2>
          </header>
          <div class="media-cards">
            ${p.galeria.map((g, i) => `
              <figure class="media-card reveal" style="--i:${i}">
                <div class="media-card-img">
                  <img src="${esc(g.src)}" alt="${esc(g.cap || "")}" loading="lazy"
                       onerror="this.closest('.media-card').remove()">
                </div>
                <figcaption>
                  ${g.cap ? `<strong>${esc(g.cap)}</strong>` : ""}
                  ${g.desc ? `<span>${esc(g.desc)}</span>` : ""}
                </figcaption>
              </figure>`).join("")}
          </div>
        </div>
      </section>` : ""}`;

    C.initReveal(main);
    initLightbox();
    C.makeDraggable(document.getElementById("puebloIco"));
    initAcciones(p.nombre, p.descripcion, "Pueblo");
  }

  /* ===================== DICCIONARIO ===================== */
  function renderDiccionario() {
    document.title = "Diccionario Intercultural · BICSAN";
    const words = BDI.diccionario || [];
    const lenguas = [...new Set(words.map((w) => w.lengua))];

    main.innerHTML = `
      <section class="page-hero" style="--accent:#8e3b8e">
        <span class="page-hero-deco floatie" data-icon="libro" aria-hidden="true"></span>
        <span class="page-hero-deco floatie second" data-icon="estrella" aria-hidden="true"></span>
        <div class="container">
          <nav class="crumbs"><a href="index.html">Inicio</a> <span>›</span> Diccionario</nav>
          <p class="eyebrow">Lenguas de Nicaragua</p>
          <h1>Diccionario Intercultural</h1>
          <p class="page-hero-sub">${words.length} palabras de las lenguas vivas del Caribe y del legado de las
          lenguas históricas del Pacífico y el Norte: mískitu, mayangna, garífuna, creole, náhuat, mangue y matagalpa.</p>
          <p class="dict-note">📌 Vocabulario de referencia con fines educativos: la escritura y la pronunciación
          pueden variar entre comunidades y hablantes. Si conocés una corrección, compartila con nosotros.</p>
        </div>
      </section>

      ${frasesHTML()}

      <section class="section">
        <div class="container">
          <div class="search-row">
            <input type="search" id="dictSearch" class="search-input"
                   placeholder="Buscar una palabra o significado…" aria-label="Buscar palabra">
            <span class="search-count" id="dictCount"></span>
          </div>
          <div class="dict-filters" id="dictFilters">
            <button class="dict-filter is-active" data-lengua="">Todas</button>
            ${lenguas.map((l) => `<button class="dict-filter" data-lengua="${esc(l)}">${esc(l)}</button>`).join("")}
          </div>
          <div class="word-grid" id="dictGrid"></div>
        </div>
      </section>`;

    const grid = document.getElementById("dictGrid");
    const input = document.getElementById("dictSearch");
    const count = document.getElementById("dictCount");
    const filters = document.getElementById("dictFilters");
    let lengua = "";

    function draw() {
      const q = input.value.trim().toLowerCase();
      const filtered = words.filter((w) =>
        (!lengua || w.lengua === lengua) &&
        (!q || (w.palabra + " " + w.significado + " " + (w.nota || "")).toLowerCase().includes(q)));
      grid.innerHTML = filtered.length
        ? filtered.map((w, i) => {
            const p = findPueblo(w.pueblo);
            return `
            <article class="word-card reveal" style="--i:${i % 8}">
              ${audioBtnHTML(w.palabra)}
              <h3>${esc(w.palabra)}</h3>
              <span class="word-lang">${esc(w.lengua)}</span>
              <p>${esc(w.significado)}</p>
              ${w.nota ? `<small>${esc(w.nota)}</small>` : ""}
              ${p ? `<a class="word-pueblo" href="pueblo.html?id=${p.id}">Pueblo ${esc(p.nombre)} →</a>` : ""}
            </article>`;
          }).join("")
        : `<p class="empty">No se encontraron palabras para «${esc(q)}».</p>`;
      count.textContent = `${filtered.length} de ${words.length} palabras`;
      C.initReveal(grid);
    }

    filters.addEventListener("click", (e) => {
      const b = e.target.closest(".dict-filter");
      if (!b) return;
      filters.querySelectorAll(".dict-filter").forEach((x) => x.classList.remove("is-active"));
      b.classList.add("is-active");
      lengua = b.dataset.lengua;
      draw();
    });
    input.addEventListener("input", draw);
    draw();
    initFloaties();
  }

  /* ---------- Tabla «¿Cómo se dice…?» (frases comparadas) ---------- */
  function frasesHTML() {
    const frases = BDI.frases || [];
    if (!frases.length) return "";
    const lenguas = [];
    frases.forEach((f) => Object.keys(f.tr).forEach((l) => { if (!lenguas.includes(l)) lenguas.push(l); }));
    return `
      <section class="section section-alt">
        <div class="container">
          <p class="kicker">Una palabra, muchas voces</p>
          <h2 class="section-title" style="font-size:1.6rem">¿Cómo se dice…?</h2>
          <div class="frases-wrap">
            <table class="frases-table">
              <thead><tr><th>Español</th>${lenguas.map((l) => `<th>${esc(l)}</th>`).join("")}</tr></thead>
              <tbody>
                ${frases.map((f) => `<tr><th>${esc(f.es)}</th>
                  ${lenguas.map((l) => {
                    const v = f.tr[l] || "—";
                    return `<td class="${v === "—" ? "sin" : ""}">${esc(v)}</td>`;
                  }).join("")}</tr>`).join("")}
              </tbody>
            </table>
          </div>
          <p class="dict-note dict-note-clara">* «Chigüín» es palabra de origen náhuat viva en el español nicaragüense ·
          «—» significa que aún no está registrada en esta biblioteca. Ayudanos a completarla.</p>
        </div>
      </section>`;
  }

  /* ===================== CALENDARIO CULTURAL ===================== */
  const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  function renderCalendario() {
    document.title = "Calendario Cultural · BICSAN";
    const cal = (BDI.calendario || []).slice().sort((a, b) => a.mes - b.mes);
    const mesActual = new Date().getMonth() + 1;

    // próximas: desde el mes actual, dando la vuelta al año
    const proximas = cal.filter((e) => e.mes >= mesActual).concat(cal.filter((e) => e.mes < mesActual)).slice(0, 4);

    const itemHTML = (e) => {
      const it = findItem(e.tipo, e.id);
      const href = it ? `detalle.html?tipo=${e.tipo}&id=${encodeURIComponent(e.id)}` : "#";
      return `<a class="cal-item" href="${href}">
        <span class="cal-dia">${esc(e.dia)}${e.movil ? " ·" : ""}</span>
        <span class="cal-tit">${esc(e.titulo)}</span><span class="go">→</span></a>`;
    };

    main.innerHTML = `
      <section class="page-hero" style="--accent:#B4552D">
        <div class="container">
          <nav class="crumbs"><a href="index.html">Inicio</a> <span>›</span> Calendario Cultural</nav>
          <p class="eyebrow">Un año de fiestas</p>
          <h1>Calendario Cultural</h1>
          <p class="page-hero-sub">Las festividades documentadas de Nicaragua, mes a mes: del King Pulanka de enero
          a la Gritería de diciembre. Las fechas marcadas con «·» son móviles (cambian cada año).</p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <p class="kicker">A partir de hoy</p>
          <h2 class="section-title" style="font-size:1.6rem">Próximas festividades</h2>
          <div class="prox-list">${proximas.map(itemHTML).join("")}</div>
        </div>
      </section>

      <section class="section section-alt">
        <div class="container">
          <p class="kicker">Todo el año</p>
          <h2 class="section-title" style="font-size:1.6rem">Mes a mes</h2>
          <div class="cal-grid">
            ${MESES.map((nombre, i) => {
              const mes = i + 1;
              const fiestas = cal.filter((e) => e.mes === mes);
              return `
              <article class="cal-mes${mes === mesActual ? " actual" : ""}">
                <h3>${nombre}${mes === mesActual ? '<span class="cal-hoy">Estamos aquí</span>' : ""}</h3>
                ${fiestas.length ? fiestas.map(itemHTML).join("")
                  : '<p class="cal-vacio">Sin festividades registradas.</p>'}
              </article>`;
            }).join("")}
          </div>
        </div>
      </section>`;

    C.initReveal(main);
  }

  /* ===================== TRIVIA CULTURAL ===================== */
  function preguntasTrivia(rng, cuantas) {
    const qs = [];
    const dicc = BDI.diccionario || [];

    // ¿Qué significa la palabra X?
    shuffle(dicc, rng).slice(0, 10).forEach((w) => {
      const distractores = shuffle(dicc.filter((x) => x.palabra !== w.palabra), rng)
        .slice(0, 3).map((x) => x.significado);
      qs.push({
        q: `¿Qué significa «${w.palabra}» (${w.lengua})?`,
        ok: w.significado,
        ops: shuffle([w.significado, ...distractores], rng),
        exp: w.nota || `«${w.palabra}» es una palabra de la lengua ${w.lengua}.`
      });
    });

    // ¿Con qué pueblo se asocia esta danza / receta?
    ["danzas", "recetas"].forEach((tipo) => {
      itemsOf(tipo).forEach((it) => {
        const ids = pueblosDe(tipo, it);
        if (!ids.length) return;
        const p = findPueblo(ids[0]);
        if (!p) return;
        const otros = shuffle(BDI.comunidades.filter((c) => !ids.includes(c.id)), rng)
          .slice(0, 3).map((c) => c.nombre);
        qs.push({
          q: `¿Con qué pueblo se asocia ${tipo === "danzas" ? "la danza" : "la comida típica"} «${it.titulo}»?`,
          ok: p.nombre,
          ops: shuffle([p.nombre, ...otros], rng),
          exp: it.texto.slice(0, 140) + "…"
        });
      });
    });

    // ¿Dónde se celebra X?
    const celebraciones = [...(BDI.tradiciones || []), ...(BDI.danzas || [])].filter((t) => t.lugar);
    const lugaresTodos = [...new Set(celebraciones.map((t) => t.lugar))];
    celebraciones.forEach((t) => {
      const otros = shuffle(lugaresTodos.filter((l) => l !== t.lugar), rng).slice(0, 3);
      if (otros.length < 3) return;
      qs.push({
        q: `¿Dónde se celebra «${t.titulo}»?`,
        ok: t.lugar,
        ops: shuffle([t.lugar, ...otros], rng),
        exp: t.cuando ? `Se celebra: ${t.cuando}.` : ""
      });
    });

    // ¿En qué año fue el reconocimiento X?
    (BDI.documentos || []).forEach((d) => {
      const m = String(d.tipo).match(/(19|20)\d{2}/);
      if (!m) return;
      const y = Number(m[0]);
      qs.push({
        q: `¿De qué año es «${d.titulo}»?`,
        ok: String(y),
        ops: shuffle([y, y - 3, y + 4, y - 9].map(String), rng),
        exp: d.texto.slice(0, 140) + "…"
      });
    });

    return shuffle(qs, rng).slice(0, cuantas || 10);
  }

  function lanzarConfeti() {
    const cont = document.createElement("div");
    cont.className = "confetti";
    const colores = ["#0B5D4B", "#C58B2B", "#3A86C8", "#C0392B", "#FFC300", "#2d8c75"];
    for (let i = 0; i < 90; i++) {
      const p = document.createElement("i");
      p.style.left = Math.random() * 100 + "vw";
      p.style.background = colores[i % colores.length];
      p.style.animationDelay = (Math.random() * 0.8) + "s";
      p.style.animationDuration = (2.2 + Math.random() * 1.8) + "s";
      p.style.transform = `rotate(${Math.random() * 360}deg)`;
      cont.appendChild(p);
    }
    document.body.appendChild(cont);
    setTimeout(() => cont.remove(), 4500);
  }

  function renderTrivia() {
    document.title = "Trivia Cultural · BICSAN";
    let preguntas = [];
    let idx = 0, puntos = 0, respondida = false, modo = "libre";

    main.innerHTML = `
      <section class="page-hero" style="--accent:#b5462b">
        <span class="page-hero-deco floatie" data-icon="mascara" aria-hidden="true"></span>
        <span class="page-hero-deco floatie second" data-icon="estrella" aria-hidden="true"></span>
        <div class="container">
          <nav class="crumbs"><a href="index.html">Inicio</a> <span>›</span> Trivia Cultural</nav>
          <p class="eyebrow">¿Cuánto sabés de Nicaragua?</p>
          <h1>Trivia Cultural</h1>
          <p class="page-hero-sub">Preguntas generadas con los saberes de la biblioteca: palabras, danzas,
          comidas, fiestas y patrimonio. ¡A jugar!</p>
        </div>
      </section>
      <section class="section">
        <div class="container trivia-wrap" id="triviaWrap"></div>
      </section>`;

    const wrap = document.getElementById("triviaWrap");

    function pintarInicio() {
      const reto = C.getReto();
      wrap.innerHTML = `
        <div class="trivia-card trivia-final reveal in">
          <span class="trivia-medal">🎭</span>
          <h2>Elegí tu modo de juego</h2>
          <p>${reto.racha > 0 ? `🔥 Racha actual: <strong>${reto.racha} día${reto.racha > 1 ? "s" : ""}</strong> seguido${reto.racha > 1 ? "s" : ""} completando el reto.` : "Completá el reto cada día para encender tu racha 🔥."}</p>
          <div class="trivia-final-acciones">
            <button class="btn btn-primary" id="modoLibre">🎲 Trivia libre · 10 preguntas</button>
            <button class="btn btn-outline" id="modoReto" ${reto.hechoHoy ? "disabled" : ""}>
              ${reto.hechoHoy ? "✓ Reto de hoy completado" : "🔥 Reto del día · 5 preguntas"}</button>
          </div>
          ${reto.hechoHoy ? '<p class="trivia-exp" style="margin-top:14px">Ya jugaste el reto de hoy. Volvé mañana para mantener la racha, o seguí con la trivia libre.</p>' : '<p class="trivia-exp" style="margin-top:14px">El reto del día es igual para todo el mundo y cuenta para tu racha.</p>'}
        </div>`;
      document.getElementById("modoLibre").addEventListener("click", () => {
        modo = "libre"; preguntas = preguntasTrivia(null, 10); idx = 0; puntos = 0; pintarPregunta();
      });
      const btnReto = document.getElementById("modoReto");
      if (!reto.hechoHoy) btnReto.addEventListener("click", () => {
        modo = "reto";
        const dia = Math.floor(Date.now() / 86400000);
        preguntas = preguntasTrivia(mulberry32(dia), 5);
        idx = 0; puntos = 0; pintarPregunta();
      });
    }

    function pintarPregunta() {
      respondida = false;
      const p = preguntas[idx];
      wrap.innerHTML = `
        <div class="trivia-card reveal in">
          <div class="trivia-top">
            <span class="trivia-num">Pregunta ${idx + 1} de ${preguntas.length}</span>
            <span class="trivia-score">⭐ ${puntos} pts</span>
          </div>
          <div class="trivia-progress"><span style="width:${(idx / preguntas.length) * 100}%"></span></div>
          <h2 class="trivia-q">${esc(p.q)}</h2>
          <div class="trivia-ops">
            ${p.ops.map((o) => `<button class="trivia-op" data-ok="${o === p.ok ? "1" : "0"}">${esc(o)}</button>`).join("")}
          </div>
          <p class="trivia-exp" id="triviaExp" hidden></p>
          <button class="btn btn-primary trivia-next" id="triviaNext" hidden>Siguiente →</button>
        </div>`;

      wrap.querySelectorAll(".trivia-op").forEach((b) =>
        b.addEventListener("click", () => {
          if (respondida) return;
          respondida = true;
          const acierto = b.dataset.ok === "1";
          if (acierto) {
            puntos += 10;
            wrap.querySelector(".trivia-score").textContent = `⭐ ${puntos} pts`;
          }
          b.classList.add(acierto ? "is-ok" : "is-bad");
          wrap.querySelectorAll('.trivia-op[data-ok="1"]').forEach((x) => x.classList.add("is-ok"));
          wrap.querySelectorAll(".trivia-op").forEach((x) => (x.disabled = true));
          const exp = document.getElementById("triviaExp");
          exp.hidden = false;
          exp.innerHTML = (acierto ? "✅ ¡Correcto! " : "❌ Casi… ") + esc(preguntas[idx].exp || "");
          const next = document.getElementById("triviaNext");
          next.hidden = false;
          next.textContent = idx + 1 < preguntas.length ? "Siguiente →" : "Ver resultado 🏆";
          next.addEventListener("click", () => {
            idx++;
            if (idx < preguntas.length) pintarPregunta();
            else pintarFinal();
          });
        })
      );
    }

    function pintarFinal() {
      const total = preguntas.length * 10;
      const pct = puntos / total;
      const nivel = pct === 1 ? ["🏆", "¡Perfecto! Sos guardián de los saberes de Nicaragua."]
        : pct >= 0.7 ? ["🥇", "¡Excelente! Conocés muy bien tu cultura."]
        : pct >= 0.4 ? ["🥈", "¡Bien! Seguí explorando la biblioteca para dominar la trivia."]
        : ["🌱", "¡Buen comienzo! Recorré los pueblos y volvé a intentarlo."];
      if (pct >= 0.7) lanzarConfeti();

      let rachaHTML = "";
      if (modo === "reto") {
        const r = C.registrarReto(puntos);
        rachaHTML = `<p class="trivia-racha">🔥 Reto del día completado — racha:
          <strong>${r.racha} día${r.racha > 1 ? "s" : ""}</strong>. ¡Volvé mañana para mantenerla!</p>`;
      }

      wrap.innerHTML = `
        <div class="trivia-card trivia-final reveal in">
          <span class="trivia-medal">${nivel[0]}</span>
          <h2>${puntos} de ${total} puntos</h2>
          <p>${esc(nivel[1])}</p>
          ${rachaHTML}
          <div class="trivia-final-acciones">
            <button class="btn btn-primary" id="triviaRetry">Volver a jugar 🔄</button>
            <a class="btn btn-outline" href="diccionario.html">Estudiar el diccionario 💬</a>
            <a class="btn btn-outline" href="index.html#regiones">Explorar regiones 🗺️</a>
          </div>
        </div>`;
      document.getElementById("triviaRetry").addEventListener("click", pintarInicio);
    }

    pintarInicio();
    initFloaties();
  }

  /* ===================== Arranque ===================== */
  if (page === "region") {
    C.mountShell();
    renderRegion();
  } else if (page === "pueblo") {
    C.mountShell("pueblos");
    renderPueblo();
  } else if (page === "diccionario") {
    C.mountShell("diccionario");
    renderDiccionario();
  } else if (page === "trivia") {
    C.mountShell("trivia");
    renderTrivia();
  } else if (page === "calendario") {
    C.mountShell("calendario");
    renderCalendario();
  } else {
    const tipo = document.body.dataset.tipo || param("tipo") || "recetas";
    const meta = typeMeta(tipo);
    if (!meta) {
      main.innerHTML = `<div class="container section"><p class="empty">Colección no encontrada.</p>
        <p><a class="btn btn-primary" href="index.html">Volver al inicio</a></p></div>`;
      C.mountShell();
    } else {
      C.mountShell(tipo);
      document.title = (page === "detail" ? meta.singular : meta.titulo) + " · BICSAN";
      if (page === "detail") renderDetail(tipo, meta);
      else renderListing(tipo, meta);
    }
  }
  initSpeak(document);
})();
