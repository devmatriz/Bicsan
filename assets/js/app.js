/* ============================================================
   app.js — lógica de la página de inicio (index.html)
   Usa BDIcore para helpers, arrastre y animaciones.
   ============================================================ */
(function () {
  "use strict";

  const C = window.BDIcore;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const esc = C.esc;
  const icon = C.icon;
  const figure = C.figureHTML;
  const chips = (tags) => (tags || []).map((t) => `<span class="chip">#${esc(t)}</span>`).join("");

  /* ---------- Año del footer ---------- */
  $("#year").textContent = new Date().getFullYear();

  /* (El hero del rediseño es tipográfico: sin decoraciones flotantes) */

  /* ---------- Menú móvil ---------- */
  const navToggle = $("#navToggle");
  const mainNav = $("#mainNav");
  navToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  $$("#mainNav a").forEach((a) =>
    a.addEventListener("click", () => {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------- Hoy en BICSAN: destacado, palabra y progreso ---------- */
  const hoyGrid = $("#hoyGrid");
  if (hoyGrid) {
    const dia = Math.floor(Date.now() / 86400000); // cambia cada día, igual para todos
    const tiposDest = ["recetas", "oral", "danzas", "lugares", "tradiciones"];
    const tipoHoy = tiposDest[dia % tiposDest.length];
    const listaHoy = BDI[C.TYPES[tipoHoy].key] || [];
    const dest = listaHoy[dia % listaHoy.length];
    const destHref = `detalle.html?tipo=${tipoHoy}&id=${encodeURIComponent(dest.id)}`;
    const palabra = BDI.diccionario[dia % BDI.diccionario.length];
    const n = C.vistosCount(), total = C.totalFichas();
    const nivel = C.nivelExplorador(n);
    const pct = Math.min(100, Math.round((n / total) * 100));
    const reto = C.getReto();

    // próxima festividad del calendario cultural
    const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const mesActual = new Date().getMonth() + 1;
    const cal = (BDI.calendario || []).slice().sort((a, b) => a.mes - b.mes);
    const prox = cal.find((e) => e.mes === mesActual) || cal.find((e) => e.mes > mesActual) || cal[0];
    const proxEtiqueta = prox ? (prox.mes === mesActual ? "Este mes" : "En " + MESES[prox.mes - 1]) : "";

    hoyGrid.innerHTML = `
      <a class="hoy-card hoy-dest reveal" href="${destHref}">
        <span class="hoy-k">Hoy en BICSAN · ${esc(C.TYPES[tipoHoy].singular)}</span>
        <strong>${esc(dest.nombre || dest.titulo)}</strong>
        <p>${esc((dest.texto || dest.descripcion || "").slice(0, 100))}…</p>
        <span class="hoy-link">Descubrilo →</span>
      </a>
      <a class="hoy-card reveal" href="diccionario.html">
        <span class="hoy-k">Palabra del día · ${esc(palabra.lengua)}</span>
        <strong class="hoy-palabra">${esc(palabra.palabra)}</strong>
        <p>${esc(palabra.significado)}</p>
        <span class="hoy-link">Ver diccionario →</span>
      </a>
      ${prox ? `
      <a class="hoy-card reveal" href="calendario.html">
        <span class="hoy-k">Próxima fiesta · ${esc(proxEtiqueta)}</span>
        <strong>${esc(prox.titulo.split("(")[0].split("—")[0].trim())}</strong>
        <p>${esc(prox.dia)} de ${esc(MESES[prox.mes - 1])}${prox.movil ? " (fecha móvil)" : ""}</p>
        <span class="hoy-link">Ver calendario →</span>
      </a>` : ""}
      <button class="hoy-card hoy-prog reveal" id="hoyProgreso" type="button">
        <span class="hoy-k">Tu recorrido</span>
        <strong>${nivel[0]} ${esc(nivel[1])}</strong>
        <span class="hoy-barra"><span style="width:${pct}%"></span></span>
        <p>${n} de ${total} fichas · ${C.getSaved().length} guardadas${reto.racha > 0 ? ` · 🔥 racha ${reto.racha}` : ""}</p>
        <span class="hoy-link">Ver mis guardados →</span>
      </button>`;

    $("#hoyProgreso").addEventListener("click", () => window.BDIabrirGuardados && window.BDIabrirGuardados());
  }

  /* ---------- Botón «Sorpréndeme» ---------- */
  const btnAzar = $("#btnSorprendeme");
  if (btnAzar) btnAzar.addEventListener("click", () => C.fichaAleatoria());

  /* ---------- Mapa interactivo de Nicaragua (estilizado) ---------- */
  const mapWrap = $("#niMap");
  if (mapWrap && BDI.regiones) {
    const R = {};
    BDI.regiones.forEach((r) => (R[r.id] = r));
    const cortos = { "caribe-norte": "Caribe Norte", "caribe-sur": "Caribe Sur", "pacifico": "Pacífico", "centro": "Centro-Norte" };
    const zona = (id, d, lx, ly) => `
      <a href="region.html?id=${id}" class="map-zone" data-region="${id}">
        <path d="${d}" fill="${R[id].color[0]}"><title>${esc(R[id].nombre)} — clic para explorar</title></path>
        <text x="${lx}" y="${ly}" class="map-label">${esc(cortos[id] || R[id].nombre)}</text>
      </a>`;
    mapWrap.innerHTML = `
    <svg viewBox="0 0 460 360" role="img" aria-label="Mapa de Nicaragua dividido en Costa Caribe Norte, Costa Caribe Sur, Pacífico y Centro-Norte">
      <g>
        ${zona("pacifico", "M60 78 L150 52 L168 140 L178 220 L170 300 L148 310 L118 260 L95 200 L78 150 Z", 100, 116)}
        ${zona("centro", "M150 52 L250 40 L262 42 L270 120 L262 200 L255 300 L170 300 L178 220 L168 140 Z", 213, 172)}
        ${zona("caribe-norte", "M262 42 L350 58 L398 72 L380 130 L392 180 L268 152 L270 120 Z", 322, 112)}
        ${zona("caribe-sur", "M268 152 L392 180 L370 240 L352 290 L330 316 L255 300 L262 200 Z", 314, 244)}
      </g>
      <g class="map-deco" aria-hidden="true">
        <ellipse cx="120" cy="172" rx="24" ry="12" transform="rotate(-24 120 172)"/>
        <ellipse cx="158" cy="237" rx="32" ry="20" transform="rotate(-18 158 237)"/>
        <path d="M150 236 l7 -11 7 11 z M160 238 l5 -8 5 8 z" class="map-isla"/>
        <path d="M96 138 l9 -15 9 15 z M118 206 l8 -13 8 13 z" class="map-volcan"/>
        <text x="436" y="110" class="map-mar" transform="rotate(90 436 110)">MAR CARIBE</text>
        <text x="40" y="250" class="map-mar" transform="rotate(-62 40 250)">OCÉANO PACÍFICO</text>
      </g>
    </svg>
    <p class="map-hint">Seleccioná una región del mapa para explorarla</p>`;
  }

  /* ---------- Bandas de regiones (una sección por región) ---------- */
  const regionNames = { "caribe-norte": "Caribe Norte", "caribe-sur": "Caribe Sur", "pacifico": "Pacífico", "centro": "Centro-Norte" };
  const regionBands = $("#regionBands");
  if (regionBands) {
    regionBands.innerHTML = (BDI.regiones || [])
      .map((r, i) => {
        const pueblos = BDI.comunidades.filter((p) => (p.regiones || []).includes(r.id));
        const lugares = BDI.lugares.filter((l) => C.regionDe(l) === r.id);
        const num = String(i + 1).padStart(2, "0");
        return `
        <article class="region-band reveal" style="--rc:${r.color[0]}">
          <div class="container region-band-grid">
            <div class="rb-head">
              <span class="rb-num">${num} / REGIÓN</span>
              <h3>${esc(r.nombre)}</h3>
              <p class="rb-sub">${esc(r.sub)}</p>
              <ul class="rb-stats">
                <li><strong>${pueblos.length}</strong> pueblos</li>
                <li><strong>${lugares.length}</strong> lugares</li>
              </ul>
            </div>
            <div class="rb-body">
              <p>${esc(r.descripcion)}</p>
              <div class="rb-tags">
                ${pueblos.map((p) => `<a class="rb-tag" href="pueblo.html?id=${p.id}"><span class="rb-dot"></span>${esc(p.nombre)}</a>`).join("")}
              </div>
              <div class="rb-links">
                ${lugares.slice(0, 4).map((l) => `<a href="detalle.html?tipo=lugares&id=${encodeURIComponent(l.id)}">${esc(l.nombre)}</a>`).join("")}
              </div>
              <a class="rb-cta" href="region.html?id=${r.id}">Explorar ${esc(regionNames[r.id] || r.nombre)} →</a>
            </div>
          </div>
        </article>`;
      })
      .join("");
  }

  /* ---------- Pueblos / Comunidades (enlazan a su página-hub) ---------- */
  $("#communitiesGrid").innerHTML = BDI.comunidades
    .map((c) => {
      const regs = (c.regiones || []).map((r) => regionNames[r] || r).join(" · ");
      return `
      <a class="community-card reveal" href="pueblo.html?id=${encodeURIComponent(c.id)}">
        <div class="community-banner" style="background:${c.color[0]}">
          <span class="banner-icon anim-pop">${icon(c.icon)}</span>
        </div>
        <div class="community-body">
          <h3>${esc(c.nombre)}</h3>
          <div class="community-meta">
            <span class="chip region">📍 ${esc(regs)}</span>
            <span class="chip">💬 ${esc(c.idioma)}</span>
          </div>
          <p>${esc(c.descripcion)}</p>
          <span class="card-link">Conocer este pueblo →</span>
        </div>
      </a>`;
    })
    .join("");

  /* ---------- Lugares emblemáticos (enlazan a su detalle) ---------- */
  $("#placesGrid").innerHTML = BDI.lugares
    .map((l) => {
      return `
      <a class="place-card reveal" href="detalle.html?tipo=lugares&id=${encodeURIComponent(l.id)}">
        <div class="place-icon" style="background:${l.color[0]}">${icon(l.icon)}</div>
        <div class="place-body">
          <span class="place-type">${esc(l.tipo)} · ${esc(l.region)}</span>
          <h3>${esc(l.nombre)}</h3>
          <p>${esc(l.descripcion)}</p>
          <span class="card-link">Ver lugar →</span>
        </div>
      </a>`;
    })
    .join("");

  /* ---------- Categorías (enlazan a la colección o a una página propia) ---------- */
  $("#categoriesGrid").innerHTML = BDI.categorias
    .map(
      (c) => `
      <a class="category reveal" href="${c.href ? esc(c.href) : `coleccion.html?tipo=${esc(c.tipo)}`}">
        <span class="ico anim-bounce" aria-hidden="true">${c.ico}</span>
        <span class="name">${esc(c.nombre)}</span>
      </a>`
    )
    .join("");

  /* ---------- Etiquetas ---------- */
  $("#tagCloud").innerHTML = BDI.etiquetas
    .map((t) => `<span class="tag-pill reveal">#${esc(t)}</span>`)
    .join("");

  /* ---------- Línea de tiempo ---------- */
  const tl = $("#timeline");
  if (tl && BDI.hitos) {
    tl.innerHTML = BDI.hitos
      .map(
        (h, i) => `
      <div class="tl-item reveal ${i % 2 ? "tl-right" : "tl-left"}">
        <div class="tl-card">
          <span class="tl-ico" aria-hidden="true">${icon(h.icon)}</span>
          <span class="tl-year">${esc(h.anio)}</span>
          <h3>${esc(h.titulo)}</h3>
          <p>${esc(h.texto)}</p>
        </div>
        <span class="tl-dot" aria-hidden="true"></span>
      </div>`
      )
      .join("");
  }

  /* ---------- Colecciones (tabs + búsqueda; cada tarjeta enlaza al detalle) ---------- */
  const panel = $("#collectionPanel");
  const searchInput = $("#searchInput");
  const searchCount = $("#searchCount");
  const seeAll = $("#seeAll");
  let activeTab = "oral";

  const labels = { oral: "cuentos y leyendas", recetas: "comidas típicas", danzas: "danzas y música", tradiciones: "tradiciones", documentos: "documentos" };

  function cardHTML(it) {
    const sub = {
      oral: `Tradición oral · ${it.origen || ""}`,
      recetas: `Receta · ${it.comunidad || ""}`,
      danzas: `📅 ${it.cuando || ""} · 📍 ${it.lugar || ""}`,
      tradiciones: `📅 ${it.cuando || ""} · 📍 ${it.lugar || ""}`,
      documentos: it.tipo || ""
    }[activeTab];
    return `
      <a class="item-card" href="detalle.html?tipo=${activeTab}&id=${encodeURIComponent(it.id)}">
        <div class="item-illus anim-pop">${icon(it.icon)}</div>
        <div class="item-content">
          <span class="item-num">${esc(sub)}</span>
          <h3>${esc(it.titulo)}</h3>
          <p>${esc(it.texto)}</p>
          <div class="item-tags">${chips(it.tags)}</div>
        </div>
      </a>`;
  }

  function matches(item, q) {
    if (!q) return true;
    const hay = [item.titulo, item.texto, item.comunidad, item.origen, item.tipo,
      item.cuando, item.lugar, (item.tags || []).join(" "),
      (item.ingredientes || []).join(" ")].filter(Boolean).join(" ").toLowerCase();
    return hay.includes(q);
  }

  function renderCollection() {
    const data = BDI[activeTab] || [];
    const q = searchInput.value.trim().toLowerCase();
    const filtered = data.filter((it) => matches(it, q));

    panel.innerHTML = filtered.length
      ? filtered.map(cardHTML).join("")
      : `<p class="empty">No se encontraron resultados para «${esc(q)}».</p>`;
    searchCount.textContent = q ? `${filtered.length} de ${data.length} resultado(s)` : `${data.length} elementos`;
    seeAll.innerHTML = `<a class="btn btn-outline" href="coleccion.html?tipo=${activeTab}">Ver toda la colección de ${labels[activeTab]} →</a>`;
  }

  $$(".tab").forEach((tab) =>
    tab.addEventListener("click", () => {
      $$(".tab").forEach((t) => { t.classList.remove("is-active"); t.setAttribute("aria-selected", "false"); });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      activeTab = tab.dataset.tab;
      searchInput.value = "";
      renderCollection();
    })
  );
  searchInput.addEventListener("input", renderCollection);
  renderCollection();

  /* ---------- Estadísticas reales (calculadas del contenido) ---------- */
  const counts = {
    comunidades: BDI.comunidades.length,
    lenguas: BDI.lenguas.length,
    lugares: BDI.lugares.length,
    recetas: BDI.recetas.length,
    danzas: (BDI.danzas || []).length,
    oral: (BDI.oral || []).length,
    diccionario: (BDI.diccionario || []).length,
    tradiciones: BDI.tradiciones.length,
    documentos: BDI.documentos.length
  };
  $$("#stats .stat-num").forEach((el) => { el.dataset.count = counts[el.dataset.key] ?? 0; });

  function animateCount(el) {
    const target = Number(el.dataset.count || 0);
    const dur = 1200, start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const val = Math.round((1 - Math.pow(1 - p, 3)) * target);
      el.textContent = val >= 1000 ? val.toLocaleString("es-NI") : String(val);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const statsEl = $("#stats");
  if (statsEl && "IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach((e) => { if (e.isIntersecting) { $$(".stat-num", statsEl).forEach(animateCount); o.disconnect(); } });
    }, { threshold: 0.4 });
    obs.observe(statsEl);
  } else if (statsEl) {
    $$(".stat-num", statsEl).forEach((el) => (el.textContent = el.dataset.count));
  }

  /* ---------- Animaciones de aparición ---------- */
  C.initReveal(document);

  /* ---------- Formulario de contribución ---------- */
  const form = $("#contributeForm");
  const note = $("#formNote");
  if (form && note) form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      const invalido = form.querySelector(":invalid");
      note.style.color = "#b5462b";
      note.textContent = invalido && invalido.validationMessage
        ? `${invalido.labels[0]?.textContent || "Campo"}: ${invalido.validationMessage}`
        : "Por favor completa todos los campos.";
      if (invalido) invalido.focus();
      return;
    }
    const name = $("#cName").value.trim();
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    note.style.color = "";
    note.textContent = "Enviando aporte…";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "X-Requested-With": "XMLHttpRequest" }
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) {
        const errores = Object.values(result.errors || {});
        throw new Error(errores.length ? errores.join(" ") : "No fue posible enviar el aporte. Inténtalo nuevamente.");
      }
      note.textContent = `¡Gracias, ${name}! Tu aporte fue recibido. Pronto un gestor cultural lo revisará. 🌿`;
      form.reset();
    } catch (error) {
      note.style.color = "#b5462b";
      note.textContent = error.message || "No fue posible enviar el aporte. Inténtalo nuevamente.";
    } finally {
      button.disabled = false;
    }
  });
})();
