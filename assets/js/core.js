/* ============================================================
   core.js — utilidades compartidas por todas las páginas
   BICSAN · Biblioteca Intercultural de Cosmovisiones y
   Saberes Ancestrales de Nicaragua
   ============================================================ */
(function () {
  "use strict";

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const icon = (key) => (window.ICONS && window.ICONS[key]) || "";
  const chips = (tags) => (tags || []).map((t) =>
    `<a class="chip" href="coleccion.html?tipo=oral&q=${encodeURIComponent(t)}">#${esc(t)}</a>`).join("");
  const param = (name) => new URLSearchParams(location.search).get(name);

  /* Metadatos de cada tipo de colección: cómo se titula y de dónde
     salen los datos. 'key' apunta al arreglo en BDI. */
  const TYPES = {
    oral:        { key: "oral",        titulo: "Cuentos y Leyendas",         singular: "Relato",    icon: "agua",     accent: "#3A86C8", kicker: "Memoria viva", desc: "Leyendas, espantos y cosmovisión de todos los pueblos de Nicaragua: de Liwa Mairin a la Carreta Nagua." },
    recetas:     { key: "recetas",     titulo: "Comidas Típicas",            singular: "Receta",    icon: "maiz",     accent: "#C58B2B", kicker: "Sabores de Nicaragua", desc: "Platos y bebidas tradicionales del Caribe, el Pacífico y el Norte, con ingredientes y preparación paso a paso." },
    danzas:      { key: "danzas",      titulo: "Danzas y Música",            singular: "Danza",     icon: "marimba",  accent: "#8e3b8e", kicker: "El país que baila", desc: "Del Güegüense al Palo de Mayo: las danzas, bailes y músicas que cuentan la historia de Nicaragua." },
    tradiciones: { key: "tradiciones", titulo: "Tradiciones y Festividades", singular: "Tradición", icon: "tambor",   accent: "#0B5D4B", kicker: "Fiesta e identidad", desc: "Celebraciones reales con sus fechas y lugares, de la Gritería al King Pulanka." },
    documentos:  { key: "documentos",  titulo: "Documentos y Patrimonio",    singular: "Documento", icon: "libro",    accent: "#6F4E37", kicker: "Marco legal y patrimonio", desc: "Leyes, declaratorias de la UNESCO e instituciones que sustentan los derechos y la cultura de los pueblos." },
    pueblos:     { key: "comunidades", titulo: "Pueblos y Etnias",           singular: "Pueblo",    icon: "casa",     accent: "#0B5D4B", kicker: "Pueblos y territorios", desc: "Los pueblos originarios, afrodescendientes y mestizos que forman la Nicaragua multiétnica." },
    lugares:     { key: "lugares",     titulo: "Lugares Turísticos",         singular: "Lugar",     icon: "pin",      accent: "#3A86C8", kicker: "Geografía e identidad", desc: "Ciudades coloniales, islas, volcanes, ríos y reservas que forman el paisaje cultural de Nicaragua." }
  };

  const typeMeta = (tipo) => TYPES[tipo] || null;
  const itemsOf = (tipo) => {
    const m = TYPES[tipo];
    return (m && BDI[m.key]) || [];
  };
  const findItem = (tipo, id) => {
    const list = itemsOf(tipo);
    return list.find((it) => String(it.id) === String(id)) || null;
  };

  /* ---------- Pueblos y regiones ---------- */
  const findPueblo = (id) => BDI.comunidades.find((p) => p.id === id) || null;
  const findRegion = (id) => (BDI.regiones || []).find((r) => r.id === id) || null;

  // Pueblos a los que pertenece un elemento (campo propio o mapa de atribución)
  const pueblosDe = (tipo, it) => {
    if (it.pueblo && it.pueblo.length) return it.pueblo;
    const mapa = (BDI.atribucion && BDI.atribucion[tipo]) || {};
    return mapa[it.id] || [];
  };
  // Región de un lugar
  const regionDe = (lugar) =>
    lugar.regionId || ((BDI.atribucion && BDI.atribucion.regionLugares) || {})[lugar.id] || null;

  // Todos los elementos de un tipo que pertenecen a un pueblo
  const itemsForPueblo = (tipo, puebloId) =>
    itemsOf(tipo).filter((it) => pueblosDe(tipo, it).includes(puebloId));

  // Palabras del diccionario de un pueblo
  const palabrasDe = (puebloId) =>
    (BDI.diccionario || []).filter((w) => w.pueblo === puebloId);

  /* ---------- Imagen con respaldo en ilustración SVG ---------- */
  // Si la foto no existe (404), se reemplaza por el icono SVG del elemento.
  window.BDIimgFallback = function (img, iconKey) {
    const wrap = img.parentElement;
    if (wrap) {
      wrap.classList.add("is-illus");
      wrap.innerHTML = icon(iconKey);
    }
  };
  const figureHTML = (foto, iconKey, extraClass) =>
    `<div class="media ${extraClass || ""}">
       <img src="${esc(foto)}" alt="" loading="lazy"
            onerror="BDIimgFallback(this,'${esc(iconKey)}')">
     </div>`;

  /* ---------- Logo BICSAN ---------- */
  const logoSVG = (size) => `
    <svg viewBox="0 0 100 100" width="${size}" height="${size}">
      <defs><linearGradient id="lgh${size}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0B5D4B"/><stop offset="1" stop-color="#0e7a63"/>
      </linearGradient></defs>
      <rect width="100" height="100" rx="24" fill="url(#lgh${size})"/>
      <circle cx="50" cy="34" r="9" fill="#FFC300"/>
      <path d="M28 62L42 38l8 12 6-9 16 21z" fill="#C0392B" opacity=".92"/>
      <path d="M22 74c12-9 44-9 56 0" fill="none" stroke="#3A86C8" stroke-width="6" stroke-linecap="round"/>
      <path d="M30 34a20 20 0 0 1 40 0" fill="none" stroke="#C58B2B" stroke-width="3.5" opacity=".55"/>
    </svg>`;

  /* ---------- Encabezado y pie compartidos ---------- */
  function headerHTML(activeTipo) {
    const link = (tipo, label) =>
      `<a href="coleccion.html?tipo=${tipo}"${activeTipo === tipo ? ' class="active"' : ""}>${label}</a>`;
    return `
    <div class="container nav-inner">
      <a href="index.html" class="brand" aria-label="BICSAN - inicio">
        <span class="brand-logo" aria-hidden="true">${logoSVG(40)}</span>
        <span class="brand-text"><strong>BICSAN</strong><em>Saberes Ancestrales de Nicaragua</em></span>
      </a>
      <nav class="main-nav" id="mainNav" aria-label="Navegación principal">
        <a href="index.html">Inicio</a>
        ${link("pueblos", "Pueblos")}
        ${link("lugares", "Lugares")}
        ${link("recetas", "Comidas")}
        ${link("danzas", "Danzas")}
        <a href="calendario.html"${activeTipo === "calendario" ? ' class="active"' : ""}>Calendario</a>
        <a href="diccionario.html"${activeTipo === "diccionario" ? ' class="active"' : ""}>Diccionario</a>
        <a href="trivia.html"${activeTipo === "trivia" ? ' class="active"' : ""}>Trivia</a>
        <a href="index.html#contribuir" class="nav-cta">Compartir</a>
        <a href="/cuenta/">Mi cuenta</a>
      </nav>
      <button class="nav-toggle" id="navToggle" aria-label="Abrir menú" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>`;
  }

  function footerHTML() {
    const y = new Date().getFullYear();
    return `
    <div class="container footer-grid">
      <div class="footer-brand">
        <span class="brand-text"><strong>BICSAN</strong>
        <em>Biblioteca Intercultural de Cosmovisiones y Saberes Ancestrales de Nicaragua</em></span>
        <p>Preservando la memoria, fortaleciendo la identidad de todos los pueblos de Nicaragua.</p>
      </div>
      <nav class="footer-nav" aria-label="Explorar">
        <h4>Explorar</h4>
        <a href="coleccion.html?tipo=pueblos">Pueblos y Etnias</a>
        <a href="coleccion.html?tipo=lugares">Lugares Turísticos</a>
        <a href="coleccion.html?tipo=recetas">Comidas Típicas</a>
        <a href="coleccion.html?tipo=danzas">Danzas y Música</a>
      </nav>
      <nav class="footer-nav" aria-label="Más">
        <h4>Más</h4>
        <a href="coleccion.html?tipo=oral">Cuentos y Leyendas</a>
        <a href="coleccion.html?tipo=tradiciones">Tradiciones</a>
        <a href="diccionario.html">Diccionario</a>
        <a href="calendario.html">Calendario Cultural</a>
        <a href="trivia.html">Trivia Cultural</a>
        <a href="exposicion.html">Modo Presentación</a>
        <a href="coleccion.html?tipo=documentos">Documentos</a>
        <a href="acerca.html">Fuentes y créditos</a>
      </nav>
    </div>
    <div class="container footer-bottom">
      <p>© ${y} BICSAN · Biblioteca Intercultural de Cosmovisiones y Saberes Ancestrales de Nicaragua</p>
      <p><a href="privacidad.html">Privacidad</a> · <a href="terminos.html">Términos</a></p>
    </div>`;
  }

  /* ---------- Menú móvil ---------- */
  function initMobileNav() {
    const navToggle = document.getElementById("navToggle");
    const mainNav = document.getElementById("mainNav");
    if (!navToggle || !mainNav) return;
    navToggle.addEventListener("click", () => {
      const open = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }

  /* ---------- Animaciones de aparición ---------- */
  function initReveal(root) {
    const els = (root || document).querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver((entries, o) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); o.unobserve(e.target); } });
      }, { threshold: 0.12 });
      els.forEach((el) => obs.observe(el));
    } else {
      els.forEach((el) => el.classList.add("in"));
    }
  }

  /* ---------- Arrastre con mouse / táctil ---------- */
  // Mueve el elemento dentro de su contenedor posicionado. Doble clic = reset.
  function makeDraggable(el) {
    if (!el) return;
    el.classList.add("draggable");
    const home = { left: el.style.left, top: el.style.top, right: el.style.right, bottom: el.style.bottom };
    let dragging = false, sx = 0, sy = 0, ox = 0, oy = 0;

    const onDown = (e) => {
      dragging = true;
      el.classList.add("dragging");
      el.setPointerCapture && e.pointerId != null && el.setPointerCapture(e.pointerId);
      const p = point(e);
      sx = p.x; sy = p.y;
      const r = el.getBoundingClientRect();
      const pr = el.offsetParent ? el.offsetParent.getBoundingClientRect() : { left: 0, top: 0 };
      ox = r.left - pr.left; oy = r.top - pr.top;
      // pasar a posicionamiento por left/top para mover libremente
      el.style.right = "auto"; el.style.bottom = "auto";
      el.style.left = ox + "px"; el.style.top = oy + "px";
      e.preventDefault();
    };
    const onMove = (e) => {
      if (!dragging) return;
      const p = point(e);
      el.style.left = (ox + (p.x - sx)) + "px";
      el.style.top = (oy + (p.y - sy)) + "px";
    };
    const onUp = (e) => {
      if (!dragging) return;
      dragging = false;
      el.classList.remove("dragging");
      el.setPointerCapture && e && e.pointerId != null && el.releasePointerCapture(e.pointerId);
    };
    const point = (e) => (e.touches && e.touches[0]) ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : { x: e.clientX, y: e.clientY };

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("dblclick", () => {
      el.style.left = home.left; el.style.top = home.top;
      el.style.right = home.right; el.style.bottom = home.bottom;
    });
    el.title = "Arrástrame ✋ (doble clic para devolverme)";
  }

  /* ---------- Inicialización de cabecera/pie en páginas internas ---------- */
  function mountShell(activeTipo) {
    const h = document.getElementById("site-header");
    const f = document.getElementById("site-footer");
    if (h) h.innerHTML = headerHTML(activeTipo);
    if (f) f.innerHTML = footerHTML();
    initMobileNav();
  }

  /* ============================================================
     GUARDADOS, PROGRESO, COMPARTIR Y AVISOS (localStorage)
     ============================================================ */
  const LS_SAVED = "bicsan-guardados";
  const LS_VISTO = "bicsan-vistos";

  const getSaved = () => { try { return JSON.parse(localStorage.getItem(LS_SAVED)) || []; } catch (e) { return []; } };
  const isSaved = (k) => getSaved().indexOf(k) >= 0;
  function toggleSaved(k) {
    const s = getSaved();
    const i = s.indexOf(k);
    if (i >= 0) s.splice(i, 1); else s.push(k);
    localStorage.setItem(LS_SAVED, JSON.stringify(s));
    updateSavedBadge();
    return i < 0;
  }
  function marcarVisto(k) {
    try {
      const v = JSON.parse(localStorage.getItem(LS_VISTO)) || [];
      if (v.indexOf(k) < 0) { v.push(k); localStorage.setItem(LS_VISTO, JSON.stringify(v)); }
    } catch (e) { /* sin almacenamiento */ }
  }
  const vistosCount = () => { try { return (JSON.parse(localStorage.getItem(LS_VISTO)) || []).length; } catch (e) { return 0; } };
  const totalFichas = () => Object.keys(TYPES).reduce((n, t) => n + itemsOf(t).length, 0);
  function nivelExplorador(n) {
    if (n >= 60) return ["🏆", "Guardián de Saberes"];
    if (n >= 30) return ["📜", "Cronista"];
    if (n >= 10) return ["🧭", "Viajero Cultural"];
    return ["🌱", "Curioso"];
  }

  /* Aviso breve (toast) */
  function toast(msg) {
    let t = document.getElementById("bicsanToast");
    if (!t) {
      t = document.createElement("div");
      t.id = "bicsanToast";
      t.className = "toast";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(t._t);
    t._t = setTimeout(() => t.classList.remove("show"), 2400);
  }

  /* Compartir la página actual (nativo en el teléfono, portapapeles en PC) */
  function compartir(titulo, texto) {
    const data = { title: (titulo || "BICSAN") + " · BICSAN", text: texto || "", url: location.href };
    if (navigator.share) {
      navigator.share(data).catch(() => {});
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(location.href)
        .then(() => toast("Enlace copiado al portapapeles ✓"))
        .catch(() => toast("Copiá el enlace desde la barra del navegador"));
    } else {
      toast("Copiá el enlace desde la barra del navegador");
    }
  }

  /* ---------- Ficha aleatoria («Sorpréndeme») ---------- */
  function fichaAleatoria() {
    const pool = [];
    Object.keys(TYPES).forEach((t) => itemsOf(t).forEach((it) => pool.push([t, it])));
    const [t, it] = pool[Math.floor(Math.random() * pool.length)];
    location.href = t === "pueblos"
      ? `pueblo.html?id=${encodeURIComponent(it.id)}`
      : `detalle.html?tipo=${t}&id=${encodeURIComponent(it.id)}`;
  }

  /* ---------- Reto del día y racha 🔥 ---------- */
  const LS_RETO = "bicsan-reto";
  const fechaISO = (d) => {
    const x = d || new Date();
    return x.getFullYear() + "-" + String(x.getMonth() + 1).padStart(2, "0") + "-" + String(x.getDate()).padStart(2, "0");
  };
  function getReto() {
    try {
      const r = JSON.parse(localStorage.getItem(LS_RETO)) || {};
      const hoy = fechaISO();
      const ayer = fechaISO(new Date(Date.now() - 86400000));
      const racha = (r.ultimo === hoy || r.ultimo === ayer) ? (r.racha || 0) : 0;
      return { hechoHoy: r.ultimo === hoy, racha, puntos: r.puntos || 0 };
    } catch (e) { return { hechoHoy: false, racha: 0, puntos: 0 }; }
  }
  function registrarReto(puntos) {
    const hoy = fechaISO(), ayer = fechaISO(new Date(Date.now() - 86400000));
    let r; try { r = JSON.parse(localStorage.getItem(LS_RETO)) || {}; } catch (e) { r = {}; }
    if (r.ultimo !== hoy) {
      r.racha = (r.ultimo === ayer) ? (r.racha || 0) + 1 : 1;
      r.ultimo = hoy;
      r.puntos = puntos;
      localStorage.setItem(LS_RETO, JSON.stringify(r));
    }
    return getReto();
  }

  /* ============================================================
     BÚSQUEDA GLOBAL (Ctrl+K) — paleta de comandos
     ============================================================ */
  function indiceGlobal() {
    const out = [];
    Object.keys(TYPES).forEach((tipo) => {
      itemsOf(tipo).forEach((it) => {
        out.push({
          tipo,
          etiqueta: TYPES[tipo].singular,
          titulo: it.nombre || it.titulo,
          sub: it.comunidad || it.origen || it.lugar || it.region || it.tipo || "",
          cuerpo: norm([it.texto, it.descripcion, (it.tags || []).join(" ")].filter(Boolean).join(" ")),
          href: tipo === "pueblos" ? `pueblo.html?id=${encodeURIComponent(it.id)}` : `detalle.html?tipo=${tipo}&id=${encodeURIComponent(it.id)}`,
          icono: it.icon || TYPES[tipo].icon
        });
      });
    });
    (BDI.diccionario || []).forEach((w) => {
      out.push({
        tipo: "palabra", etiqueta: "Palabra · " + w.lengua, titulo: w.palabra,
        sub: w.significado, cuerpo: norm(w.significado + " " + (w.nota || "")),
        href: "diccionario.html", icono: "libro"
      });
    });
    return out;
  }

  function buscarGlobal(indice, q, max) {
    const nq = norm(q);
    const words = nq.split(/\s+/).filter((w) => w.length > 1);
    if (!words.length) return [];
    const res = [];
    indice.forEach((e) => {
      let score = 0;
      const nt = norm(e.titulo);
      words.forEach((w) => {
        if (nt.startsWith(w)) score += 6;
        else if (nt.indexOf(w) >= 0) score += 4;
        if (norm(e.sub).indexOf(w) >= 0) score += 2;
        if (e.cuerpo.indexOf(w) >= 0) score += 1;
      });
      if (score > 0) res.push({ e, score });
    });
    res.sort((a, b) => b.score - a.score);
    return res.slice(0, max || 9).map((r) => r.e);
  }

  function initBuscador() {
    if (document.getElementById("cmdk")) return;
    const ov = document.createElement("div");
    ov.id = "cmdk";
    ov.className = "cmdk";
    ov.hidden = true;
    ov.innerHTML = `
      <div class="cmdk-panel" role="dialog" aria-label="Búsqueda global">
        <div class="cmdk-top">
          <span class="cmdk-lupa" aria-hidden="true">⌕</span>
          <input id="cmdkInput" type="text" placeholder="Buscar en toda la biblioteca…"
                 autocomplete="off" aria-label="Buscar en toda la biblioteca" />
          <kbd>ESC</kbd>
        </div>
        <div class="cmdk-res" id="cmdkRes" role="listbox"></div>
        <div class="cmdk-pie">↑↓ navegar · Enter abrir · ${totalFichas()} fichas y ${(BDI.diccionario || []).length} palabras indexadas</div>
      </div>`;
    document.body.appendChild(ov);

    const input = ov.querySelector("#cmdkInput");
    const res = ov.querySelector("#cmdkRes");
    let indice = null;
    let sel = 0;

    const LS_BUSQ = "bicsan-busquedas";
    const getRecientes = () => { try { return JSON.parse(localStorage.getItem(LS_BUSQ)) || []; } catch (e) { return []; } };
    function guardarBusqueda(q) {
      q = q.trim();
      if (q.length < 2) return;
      const r = getRecientes().filter((x) => x.toLowerCase() !== q.toLowerCase());
      r.unshift(q);
      localStorage.setItem(LS_BUSQ, JSON.stringify(r.slice(0, 6)));
    }

    function abrir() {
      if (!indice) indice = indiceGlobal();
      ov.hidden = false;
      input.value = "";
      pintar([]);
      setTimeout(() => input.focus(), 40);
      document.body.style.overflow = "hidden";
    }
    function cerrar() {
      ov.hidden = true;
      document.body.style.overflow = "";
    }
    function pintar(items) {
      sel = 0;
      if (!input.value.trim()) {
        const rec = getRecientes();
        res.innerHTML = `<div class="cmdk-vacio">Escribí para buscar pueblos, recetas, danzas, leyendas, lugares o palabras.<br>
          <span>Probá: «nacatamal», «güegüense», «tasba», «volcán»…</span>
          ${rec.length ? `<div class="cmdk-chips">${rec.map((q) =>
            `<button class="cmdk-chip" data-q="${esc(q)}">🕘 ${esc(q)}</button>`).join("")}</div>` : ""}</div>`;
        res.querySelectorAll(".cmdk-chip").forEach((b) =>
          b.addEventListener("click", () => {
            input.value = b.dataset.q;
            pintar(buscarGlobal(indice, input.value, 9));
            input.focus();
          }));
        return;
      }
      res.innerHTML = items.length
        ? items.map((e, i) => `
          <a class="cmdk-item${i === 0 ? " sel" : ""}" href="${e.href}" data-i="${i}" role="option">
            <span class="cmdk-ico">${icon(e.icono)}</span>
            <span class="cmdk-tx"><strong>${esc(e.titulo)}</strong><span>${esc(e.sub)}</span></span>
            <span class="cmdk-tag">${esc(e.etiqueta)}</span>
          </a>`).join("")
        : `<div class="cmdk-vacio">Nada con «${esc(input.value)}» 🤔 — probá con otra palabra.</div>`;
    }
    function mover(d) {
      const items = res.querySelectorAll(".cmdk-item");
      if (!items.length) return;
      sel = (sel + d + items.length) % items.length;
      items.forEach((x, i) => x.classList.toggle("sel", i === sel));
      items[sel].scrollIntoView({ block: "nearest" });
    }

    input.addEventListener("input", () => pintar(buscarGlobal(indice, input.value, 9)));
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); mover(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); mover(-1); }
      else if (e.key === "Enter") {
        const it = res.querySelectorAll(".cmdk-item")[sel];
        if (it) { guardarBusqueda(input.value); location.href = it.getAttribute("href"); }
      }
    });
    res.addEventListener("click", (e) => {
      if (e.target.closest(".cmdk-item")) guardarBusqueda(input.value);
    });
    ov.addEventListener("click", (e) => { if (e.target === ov) cerrar(); });
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); ov.hidden ? abrir() : cerrar(); }
      else if (e.key === "Escape" && !ov.hidden) cerrar();
    });

    window.BDIabrirBuscador = abrir;
  }

  /* ============================================================
     PANEL DE GUARDADOS + BOTONES DEL ENCABEZADO
     ============================================================ */
  function updateSavedBadge() {
    const b = document.getElementById("savedBadge");
    if (!b) return;
    const n = getSaved().length;
    b.textContent = n;
    b.hidden = n === 0;
  }

  function resolverGuardado(key) {
    const i = key.indexOf(":");
    const tipo = key.slice(0, i), id = key.slice(i + 1);
    const it = findItem(tipo, id);
    if (!it) return null;
    return {
      key, tipo,
      titulo: it.nombre || it.titulo,
      etiqueta: (TYPES[tipo] || {}).singular || tipo,
      icono: it.icon || (TYPES[tipo] || {}).icon || "estrella",
      href: tipo === "pueblos" ? `pueblo.html?id=${encodeURIComponent(it.id)}` : `detalle.html?tipo=${tipo}&id=${encodeURIComponent(it.id)}`
    };
  }

  function initGuardadosPanel() {
    if (document.getElementById("savedPanel")) return;
    const ov = document.createElement("div");
    ov.id = "savedPanel";
    ov.className = "cmdk";
    ov.hidden = true;
    ov.innerHTML = `
      <div class="cmdk-panel" role="dialog" aria-label="Mis guardados">
        <div class="cmdk-top"><span class="cmdk-lupa" aria-hidden="true">★</span>
          <strong class="saved-title">Mis guardados</strong>
          <button class="cmdk-chip" id="savedCopiar" title="Copiar la lista al portapapeles">⎘ Copiar lista</button>
          <kbd>ESC</kbd></div>
        <div class="cmdk-res" id="savedList"></div>
        <div class="cmdk-pie" id="savedPie"></div>
      </div>`;
    document.body.appendChild(ov);

    function pintar() {
      const list = ov.querySelector("#savedList");
      const items = getSaved().map(resolverGuardado).filter(Boolean);
      list.innerHTML = items.length
        ? items.map((g) => `
          <div class="cmdk-item saved-item">
            <span class="cmdk-ico">${icon(g.icono)}</span>
            <a class="cmdk-tx" href="${g.href}"><strong>${esc(g.titulo)}</strong><span>${esc(g.etiqueta)}</span></a>
            <button class="saved-quitar" data-key="${esc(g.key)}" aria-label="Quitar de guardados">✕</button>
          </div>`).join("")
        : `<div class="cmdk-vacio">Aún no guardaste nada.<br><span>Entrá a cualquier ficha y tocá «☆ Guardar» para armar tu colección personal.</span></div>`;
      const n = vistosCount(), t = totalFichas();
      const niv = nivelExplorador(n);
      ov.querySelector("#savedPie").innerHTML =
        `${niv[0]} Nivel: <strong>${niv[1]}</strong> · has explorado ${n} de ${t} fichas`;
      list.querySelectorAll(".saved-quitar").forEach((b) =>
        b.addEventListener("click", () => { toggleSaved(b.dataset.key); pintar(); }));
    }

    ov.querySelector("#savedCopiar").addEventListener("click", () => {
      const items = getSaved().map(resolverGuardado).filter(Boolean);
      if (!items.length) { toast("Aún no tenés guardados"); return; }
      const texto = "★ Mis guardados en BICSAN:\n" +
        items.map((g) => `• ${g.titulo} (${g.etiqueta})`).join("\n");
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto)
          .then(() => toast("Lista copiada al portapapeles ✓"))
          .catch(() => toast("No se pudo copiar la lista"));
      } else toast("Tu navegador no permite copiar automáticamente");
    });

    ov.addEventListener("click", (e) => { if (e.target === ov) ov.hidden = true; });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") ov.hidden = true; });
    window.BDIabrirGuardados = () => { pintar(); ov.hidden = false; };
  }

  function initHeaderTools() {
    const inner = document.querySelector(".nav-inner");
    if (!inner || document.getElementById("searchBtn")) return;
    const box = document.querySelector(".ui-toggles");
    const cont = document.createElement("span");
    cont.style.cssText = "display:inline-flex;gap:6px;align-items:center";
    cont.innerHTML = `
      <button class="ui-toggle search-btn" id="searchBtn" aria-label="Buscar en toda la biblioteca" title="Buscar (Ctrl+K)">⌕</button>
      <button class="ui-toggle saved-btn" id="savedBtn" aria-label="Mis guardados" title="Mis guardados">★<span class="saved-badge" id="savedBadge" hidden>0</span></button>`;
    if (box) box.insertBefore(cont, box.firstChild);
    else inner.insertBefore(cont, inner.querySelector(".nav-toggle"));
    document.getElementById("searchBtn").addEventListener("click", () => window.BDIabrirBuscador && window.BDIabrirBuscador());
    document.getElementById("savedBtn").addEventListener("click", () => window.BDIabrirGuardados && window.BDIabrirGuardados());
    updateSavedBadge();
  }

  /* ---------- Extras visuales: barra de progreso + volver arriba ---------- */
  function initExtras() {
    if (document.getElementById("scrollProgress")) return;
    const bar = document.createElement("div");
    bar.id = "scrollProgress";
    bar.className = "scroll-progress";
    document.body.appendChild(bar);

    const top = document.createElement("button");
    top.className = "to-top";
    top.innerHTML = "↑";
    top.setAttribute("aria-label", "Volver arriba");
    top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    document.body.appendChild(top);

    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / ((h.scrollHeight - h.clientHeight) || 1);
      bar.style.transform = `scaleX(${p})`;
      top.classList.toggle("show", h.scrollTop > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Modo oscuro ---------- */
  function applyTheme(t) {
    document.documentElement.dataset.theme = t;
    const b = document.getElementById("themeToggle");
    if (b) { b.textContent = t === "dark" ? "☀️" : "🌙"; b.title = t === "dark" ? "Modo claro" : "Modo oscuro"; }
  }

  /* ---------- Idioma de la interfaz (ES/EN) ----------
     Traduce la "cáscara" del sitio; el contenido cultural permanece en español. */
  const I18N_EN = [
    ['.main-nav a[href="index.html"]', "Home"],
    ['.main-nav a[href="#regiones"]', "Regions"],
    ['.main-nav a[href="#comunidades"]', "Peoples"],
    ['.main-nav a[href="#lugares"]', "Places"],
    ['.main-nav a[href="#colecciones"]', "Collections"],
    ['.main-nav a[href="coleccion.html?tipo=pueblos"]', "Peoples"],
    ['.main-nav a[href="coleccion.html?tipo=lugares"]', "Places"],
    ['.main-nav a[href="coleccion.html?tipo=recetas"]', "Food"],
    ['.main-nav a[href="coleccion.html?tipo=danzas"]', "Dances"],
    ['.main-nav a[href="diccionario.html"]', "Dictionary"],
    ['.main-nav a[href="index.html#contribuir"]', "Share"],
    ['.main-nav a[href="#contribuir"]', "Share"],
    [".hero .eyebrow", "Living heritage of Nicaragua"],
    [".hero-tagline", "“Preserving memory, strengthening identity.”"],
    [".hero-sub", "The cultural archive of Nicaragua's four regions: the peoples, foods, dances, legends, places and languages of the North Caribbean, South Caribbean, Pacific and Central-North — documented, in one place."],
    ['.hero-actions a[href="#regiones"]', "Explore by region"],
    ['.hero-actions a[href="#contribuir"]', "Share knowledge"],
    ['#stats li:nth-child(1) .stat-label', "Peoples"],
    ['#stats li:nth-child(2) .stat-label', "Places"],
    ['#stats li:nth-child(3) .stat-label', "Recipes"],
    ['#stats li:nth-child(4) .stat-label', "Dances"],
    ['#stats li:nth-child(5) .stat-label', "Legends"],
    ['#stats li:nth-child(6) .stat-label', "Words"],
    ["#proposito .kicker", "Our purpose"],
    ["#proposito .section-title", "The living memory of Nicaragua's peoples"],
    ["#regiones .kicker", "One country, four regions"],
    ["#regiones .section-title", "Explore Nicaragua by region"],
    ["#regiones .section-desc", "North Caribbean Coast, South Caribbean Coast, Pacific and Central-North: each with its own peoples, languages, flavors and landscapes."],
    [".map-hint", "Select a region on the map to explore it"],
    ["#comunidades .kicker", "Peoples and territories"],
    ["#comunidades .section-title", "Peoples and ethnic groups of Nicaragua"],
    ["#comunidades .section-desc", "The Indigenous, Afro-descendant and mestizo peoples recognized by the Constitution: each with its foods, dances, legends and words."],
    ["#lugares .kicker", "Geography and identity"],
    ["#lugares .section-title", "Touristic and emblematic places"],
    ["#lugares .section-desc", "Colonial cities, islands, volcanoes, rivers and reserves that shape Nicaragua's cultural landscape."],
    ["#categorias .kicker", "How to browse"],
    ["#categorias .section-title", "Main categories"],
    ["#categorias .section-desc", "Browse the archive by type of knowledge."],
    ["#colecciones .kicker", "Digital archive"],
    ["#colecciones .section-title", "Collections"],
    ["#colecciones .section-desc", "Legends, recipes, dances, festivities and real documents from the whole country."],
    ['.tab[data-tab="oral"]', "Tales & Legends"],
    ['.tab[data-tab="recetas"]', "Typical Food"],
    ['.tab[data-tab="danzas"]', "Dance & Music"],
    ['.tab[data-tab="tradiciones"]', "Traditions"],
    ['.tab[data-tab="documentos"]', "Documents"],
    ["#etiquetas .kicker", "Discover by topic"],
    ["#etiquetas .section-title", "Tags"],
    ["#historia .kicker", "Memory through time"],
    ["#historia .section-title", "Timeline of our peoples"],
    ["#historia .section-desc", "From colonial cities to UNESCO recognitions: the documented milestones of Nicaragua's cultural history."],
    ["#contribuir .section-title", "Share your knowledge"],
    ["#contribuir .section-desc", "Do you have a story, a recipe, a photograph or a piece of knowledge you want to preserve? Your contribution keeps your community's memory alive."],
    ['#contributeForm button[type="submit"]', "Send contribution"],
    ['.footer-nav[aria-label="Explorar"] h4', "Explore"],
    ['.footer-nav[aria-label="Institucional"] h4', "Project"],
    ['.footer-nav[aria-label="Más"] h4', "More"]
  ];

  function applyLang(lang) {
    I18N_EN.forEach(([sel, en]) => {
      document.querySelectorAll(sel).forEach((el) => {
        if (el.dataset.i18nEs == null) el.dataset.i18nEs = el.textContent;
        el.textContent = lang === "en" ? en : el.dataset.i18nEs;
      });
    });
    document.documentElement.lang = lang === "en" ? "en" : "es";
    const b = document.getElementById("langToggle");
    if (b) b.textContent = lang === "en" ? "ES" : "EN";
  }

  /* ---------- Tamaño de letra (accesibilidad) ---------- */
  function applyFuente(n) {
    document.documentElement.dataset.fuente = String(n);
    const b = document.getElementById("fontToggle");
    if (b) b.title = ["Letra normal", "Letra grande", "Letra extragrande"][n] + " · clic para cambiar";
  }

  /* ---------- Botones de tema, idioma y letra en el encabezado ---------- */
  function initToggles() {
    const inner = document.querySelector(".nav-inner");
    if (!inner || document.getElementById("themeToggle")) return;
    const box = document.createElement("div");
    box.className = "ui-toggles";
    box.innerHTML = `
      <button class="ui-toggle" id="fontToggle" aria-label="Cambiar tamaño de letra">Aa</button>
      <button class="ui-toggle" id="themeToggle" aria-label="Cambiar tema">🌙</button>
      <button class="ui-toggle" id="langToggle" aria-label="Switch interface language"
              title="Traduce la interfaz · el contenido cultural permanece en español">EN</button>`;
    const burger = inner.querySelector(".nav-toggle");
    inner.insertBefore(box, burger);

    applyTheme(localStorage.getItem("bicsan-theme") || "light");
    applyLang(localStorage.getItem("bicsan-lang") || "es");
    applyFuente(Number(localStorage.getItem("bicsan-fuente") || 0));

    document.getElementById("themeToggle").addEventListener("click", () => {
      const t = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem("bicsan-theme", t);
      applyTheme(t);
    });
    document.getElementById("langToggle").addEventListener("click", () => {
      const l = (localStorage.getItem("bicsan-lang") || "es") === "en" ? "es" : "en";
      localStorage.setItem("bicsan-lang", l);
      applyLang(l);
    });
    document.getElementById("fontToggle").addEventListener("click", () => {
      const n = (Number(localStorage.getItem("bicsan-fuente") || 0) + 1) % 3;
      localStorage.setItem("bicsan-fuente", String(n));
      applyFuente(n);
      toast(["Letra normal", "Letra grande", "Letra extragrande"][n]);
    });
  }

  /* Inicialización compartida en todas las páginas */
  function initGlobal() {
    initExtras(); initToggles();
    initBuscador(); initGuardadosPanel(); initHeaderTools();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGlobal);
  } else {
    initGlobal();
  }

  /* Exponer API compartida */
  window.BDIcore = {
    esc, icon, chips, param, TYPES, typeMeta, itemsOf, findItem,
    findPueblo, findRegion, pueblosDe, regionDe, itemsForPueblo, palabrasDe,
    figureHTML, headerHTML, footerHTML, logoSVG, initMobileNav, initReveal,
    makeDraggable, mountShell,
    isSaved, toggleSaved, marcarVisto, vistosCount, totalFichas, nivelExplorador,
    toast, compartir, getSaved, fichaAleatoria, getReto, registrarReto
  };
})();
