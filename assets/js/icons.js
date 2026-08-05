/* ============================================================
   Ilustraciones SVG culturales — Costa Caribe de Nicaragua
   Inspiradas en la guía visual (cayuco, tortuga, langosta,
   casa de tambo, corona del King Pulanka, canasta de tuno...).
   Cada icono usa viewBox 0 0 64 64 y se inyecta como SVG inline.
   ============================================================ */
window.ICONS = {
  corona: `<svg viewBox="0 0 64 64" role="img" aria-hidden="true">
    <path d="M26 30C20 16 26 6 26 6c4 10 4 16 4 24z" fill="#2d8c75"/>
    <path d="M32 30C30 12 34 4 34 4c4 10 2 18 0 26z" fill="#3A86C8"/>
    <path d="M38 30c2-12 8-20 8-20 0 10-2 16-6 22z" fill="#C58B2B"/>
    <path d="M14 34l5 18h26l5-18-10 7-8-11-8 11z" fill="#FFC300" stroke="#9a6b00" stroke-width="1.5" stroke-linejoin="round"/>
    <rect x="19" y="50" width="26" height="6" rx="2" fill="#C58B2B"/>
    <circle cx="32" cy="41" r="2.6" fill="#C0392B"/>
    <circle cx="22" cy="44" r="2" fill="#3A86C8"/>
    <circle cx="42" cy="44" r="2" fill="#2d8c75"/>
  </svg>`,

  cayuco: `<svg viewBox="0 0 64 64" role="img" aria-hidden="true">
    <path d="M4 50q8-4 16 0t16 0 16 0 8 0" fill="none" stroke="#0077B6" stroke-width="2" opacity=".5" stroke-linecap="round"/>
    <path d="M8 36h48l-6 14q-18 6-36 0z" fill="#6F4E37"/>
    <path d="M8 36h48l-2 4H10z" fill="#8a6849"/>
    <circle cx="22" cy="34" r="4" fill="#FFC300"/>
    <circle cx="31" cy="33" r="4" fill="#1E5631"/>
    <circle cx="40" cy="34" r="4" fill="#C0392B"/>
    <path d="M50 18l-2 16" stroke="#6F4E37" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  tortuga: `<svg viewBox="0 0 64 64" role="img" aria-hidden="true">
    <ellipse cx="12" cy="26" rx="6" ry="4" fill="#5a8f3c" transform="rotate(-30 12 26)"/>
    <ellipse cx="52" cy="26" rx="6" ry="4" fill="#5a8f3c" transform="rotate(30 52 26)"/>
    <ellipse cx="14" cy="46" rx="6" ry="4" fill="#5a8f3c" transform="rotate(30 14 46)"/>
    <ellipse cx="50" cy="46" rx="6" ry="4" fill="#5a8f3c" transform="rotate(-30 50 46)"/>
    <circle cx="32" cy="14" r="6" fill="#5a8f3c"/>
    <ellipse cx="32" cy="35" rx="20" ry="16" fill="#6F4E37"/>
    <ellipse cx="32" cy="35" rx="20" ry="16" fill="none" stroke="#3e2d20" stroke-width="1.5"/>
    <path d="M32 21v28M14 35h36M22 25l20 20M42 25L22 45" stroke="#C58B2B" stroke-width="1.2" opacity=".7"/>
    <circle cx="32" cy="35" r="5" fill="#C58B2B"/>
  </svg>`,

  langosta: `<svg viewBox="0 0 64 64" role="img" aria-hidden="true">
    <path d="M30 14C24 6 18 6 14 10M34 14c6-8 12-8 16-4" stroke="#C0392B" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M27 22c-9-2-13 2-11 8 2-4 6-4 10-2M37 22c9-2 13 2 11 8-2-4-6-4-10-2z" fill="#C0392B"/>
    <rect x="27" y="18" width="10" height="30" rx="5" fill="#C0392B"/>
    <path d="M27 26h10M27 32h10M27 38h10" stroke="#8a2419" stroke-width="1.2"/>
    <path d="M27 30l-8 4M27 36l-8 5M37 30l8 4M37 36l8 5" stroke="#C0392B" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M27 46l-5 10h20l-5-10z" fill="#C0392B"/>
  </svg>`,

  casa: `<svg viewBox="0 0 64 64" role="img" aria-hidden="true">
    <path d="M10 29L32 12l22 17z" fill="#6F4E37"/>
    <path d="M14 29L32 15l18 14z" fill="#8a6849"/>
    <rect x="18" y="29" width="28" height="18" fill="#C9A06A"/>
    <rect x="21" y="32" width="5" height="5" fill="#3A86C8"/>
    <rect x="38" y="32" width="5" height="5" fill="#3A86C8"/>
    <rect x="29" y="35" width="6" height="12" fill="#6F4E37"/>
    <rect x="20" y="47" width="3" height="9" fill="#6F4E37"/>
    <rect x="41" y="47" width="3" height="9" fill="#6F4E37"/>
    <path d="M31 47v9M35 47v9M31 50h4M31 53h4" stroke="#6F4E37" stroke-width="1.4"/>
  </svg>`,

  canasta: `<svg viewBox="0 0 64 64" role="img" aria-hidden="true">
    <path d="M20 30C24 18 40 18 44 30" stroke="#8a6849" stroke-width="3" fill="none"/>
    <path d="M14 30h36l-4 22q-14 4-28 0z" fill="#C9A06A"/>
    <path d="M16 36h32M17 42h30M19 48h26" stroke="#8a6849" stroke-width="1.4"/>
    <path d="M22 31v22M32 30v25M42 31v22" stroke="#8a6849" stroke-width="1.2" opacity=".55"/>
    <ellipse cx="32" cy="30" rx="18" ry="5" fill="#b5894f"/>
    <ellipse cx="32" cy="29" rx="18" ry="4" fill="#c9a06a"/>
  </svg>`,

  tambor: `<svg viewBox="0 0 64 64" role="img" aria-hidden="true">
    <path d="M16 18v26q16 8 32 0V18" fill="#8a6849"/>
    <path d="M18 20l6 22M24 19l8 25M32 19l8 25M40 19l6 23" stroke="#C58B2B" stroke-width="1.4"/>
    <path d="M20 31h24" stroke="#C58B2B" stroke-width="1.6"/>
    <ellipse cx="32" cy="18" rx="16" ry="6" fill="#E8D5B0"/>
    <ellipse cx="32" cy="18" rx="16" ry="6" fill="none" stroke="#6F4E37" stroke-width="2"/>
    <path d="M16 18v26q16 8 32 0V18" fill="none" stroke="#6F4E37" stroke-width="2"/>
  </svg>`,

  palmera: `<svg viewBox="0 0 64 64" role="img" aria-hidden="true">
    <path d="M30 56c0-16 1-26 3-32h4c-2 8-2 20-1 32z" fill="#6F4E37"/>
    <g fill="#1E5631">
      <path d="M33 22C20 16 10 20 8 26c10-4 20-2 25 2z"/>
      <path d="M33 22c13-6 23-2 25 4-10-4-20-2-25 2z"/>
      <path d="M33 22C24 10 14 8 8 12c12 0 20 6 25 14z"/>
      <path d="M33 22c9-12 19-14 25-10-12 0-20 6-25 14z"/>
      <path d="M33 22c0-14 0-16 0-18 3 8 3 14 2 22z"/>
    </g>
    <circle cx="31" cy="24" r="2.4" fill="#6F4E37"/>
    <circle cx="36" cy="24" r="2.4" fill="#6F4E37"/>
  </svg>`,

  pez: `<svg viewBox="0 0 64 64" role="img" aria-hidden="true">
    <path d="M8 32C18 18 40 18 50 32 40 46 18 46 8 32z" fill="#3A86C8"/>
    <path d="M50 32l10-10v20z" fill="#235a86"/>
    <path d="M28 24c4 4 4 12 0 16M36 24c4 4 4 12 0 16" stroke="#235a86" stroke-width="1.5" fill="none"/>
    <circle cx="20" cy="30" r="2.5" fill="#fff"/>
  </svg>`,

  cangrejo: `<svg viewBox="0 0 64 64" role="img" aria-hidden="true">
    <path d="M16 32c-8-4-10-10-6-14 0 6 4 6 8 10M48 32c8-4 10-10 6-14 0 6-4 6-8 10z" fill="#C0392B"/>
    <path d="M18 40l-10 4M19 44l-10 7M46 40l10 4M45 44l10 7" stroke="#C0392B" stroke-width="2" stroke-linecap="round"/>
    <ellipse cx="32" cy="36" rx="16" ry="11" fill="#C0392B"/>
    <circle cx="26" cy="31" r="2" fill="#fff"/>
    <circle cx="38" cy="31" r="2" fill="#fff"/>
  </svg>`,

  ola: `<svg viewBox="0 0 64 64" role="img" aria-hidden="true">
    <path d="M4 38q8-10 16 0t16 0 16 0 8 0" fill="none" stroke="#0077B6" stroke-width="3" stroke-linecap="round"/>
    <path d="M4 46q8-10 16 0t16 0 16 0 8 0" fill="none" stroke="#3A86C8" stroke-width="3" opacity=".6" stroke-linecap="round"/>
  </svg>`,

  sol: `<svg viewBox="0 0 64 64" role="img" aria-hidden="true">
    <circle cx="32" cy="32" r="12" fill="#FFC300"/>
    <g stroke="#FFC300" stroke-width="3" stroke-linecap="round">
      <path d="M32 6v8M32 50v8M6 32h8M50 32h8M13 13l6 6M45 45l6 6M51 13l-6 6M19 45l-6 6"/>
    </g>
  </svg>`,

  estrella: `<svg viewBox="0 0 64 64" role="img" aria-hidden="true">
    <path d="M32 6l8 20h20L44 38l6 20-18-12-18 12 6-20L4 26h20z" fill="#C58B2B"/>
    <circle cx="32" cy="30" r="2" fill="#9a6b00"/>
    <circle cx="26" cy="34" r="1.4" fill="#9a6b00"/>
    <circle cx="38" cy="34" r="1.4" fill="#9a6b00"/>
  </svg>`,

  libro: `<svg viewBox="0 0 64 64" role="img" aria-hidden="true">
    <path d="M32 16C24 12 14 12 8 16v32c6-4 16-4 24 0z" fill="#F8F4EA" stroke="#6F4E37" stroke-width="2"/>
    <path d="M32 16c8-4 18-4 24 0v32c-6-4-16-4-24 0z" fill="#fff" stroke="#6F4E37" stroke-width="2"/>
    <path d="M13 22h12M13 28h12M13 34h10M39 22h12M39 28h12M41 34h10" stroke="#C58B2B" stroke-width="1.4"/>
  </svg>`,

  agua: `<svg viewBox="0 0 64 64" role="img" aria-hidden="true">
    <path d="M4 48q8-5 16 0t16 0 16 0 8 0" stroke="#0077B6" stroke-width="2.5" fill="none" opacity=".6" stroke-linecap="round"/>
    <path d="M6 55q8-5 16 0t16 0 14 0" stroke="#3A86C8" stroke-width="2.5" fill="none" opacity=".4" stroke-linecap="round"/>
    <path d="M32 8C26 20 26 32 30 42c-10 6-14 2-12-4 6 4 8 0 6-6 6 4 8-2 6-8-6 2-8-4-4-10 6 4 8-2 8-8z" fill="#1E5631"/>
    <path d="M32 8c6 12 6 24 2 34 10 6 14 2 12-4-6 4-8 0-6-6-6 4-8-2-6-8 6 2 8-4 4-10-6 4-8-2-8-8z" fill="#2d8c75"/>
    <circle cx="32" cy="14" r="2" fill="#C58B2B"/>
  </svg>`,

  maiz: `<svg viewBox="0 0 64 64" role="img" aria-hidden="true">
    <path d="M32 8C22 14 20 34 26 52c8 4 6 4 12 0 6-18 4-38-6-44z" fill="#FFC300"/>
    <path d="M28 16l8 4M27 24l10 4M26 32l12 4M27 40l10 4M28 48l8 3" stroke="#C58B2B" stroke-width="1.4"/>
    <path d="M26 50c-8 2-14-2-14-10 6 2 10 0 14 4M38 50c8 2 14-2 14-10-6 2-10 0-14 4z" fill="#1E5631"/>
  </svg>`,

  pin: `<svg viewBox="0 0 64 64" role="img" aria-hidden="true">
    <path d="M32 6c-10 0-18 8-18 18 0 13 18 34 18 34s18-21 18-34c0-10-8-18-18-18z" fill="#1E5631"/>
    <circle cx="32" cy="24" r="7" fill="#FFC300"/>
  </svg>`,

  volcan: `<svg viewBox="0 0 64 64" role="img" aria-hidden="true">
    <path d="M26 14c2 6-2 8-1 12h14c1-4-3-6-1-12" fill="none"/>
    <path d="M8 54L26 22h12l18 32z" fill="#6F4E37"/>
    <path d="M8 54L26 22h12l6 10c-4 4-8-2-12 2s-8-2-12 2-6 0-8 4z" fill="#8a6849"/>
    <path d="M26 22h12l-2 6c-3 2-5-2-8 0z" fill="#C0392B"/>
    <path d="M30 10c-2 5 1 7 0 12M36 8c2 6-2 8-1 12" stroke="#e07a5f" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <circle cx="24" cy="10" r="3" fill="#b8b2a6" opacity=".8"/>
    <circle cx="40" cy="7" r="4" fill="#cfc9bd" opacity=".8"/>
    <circle cx="32" cy="5" r="3" fill="#b8b2a6" opacity=".7"/>
  </svg>`,

  mascara: `<svg viewBox="0 0 64 64" role="img" aria-hidden="true">
    <path d="M32 6C18 6 14 18 16 34c2 14 8 22 16 24 8-2 14-10 16-24 2-16-2-28-16-28z" fill="#f3d9b8"/>
    <path d="M22 20q5-4 10 0M32 20q5-4 10 0" stroke="#6F4E37" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="26" cy="26" rx="2.6" ry="3" fill="#2D2D2D"/>
    <ellipse cx="38" cy="26" rx="2.6" ry="3" fill="#2D2D2D"/>
    <path d="M27 42q5 5 10 0" stroke="#C0392B" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M24 35c2-1 4-1 6 0M34 35c2-1 4-1 6 0" stroke="#d8a86c" stroke-width="1.6" fill="none"/>
    <path d="M30 26v8l-2 2" stroke="#d8a86c" stroke-width="1.6" fill="none"/>
    <path d="M16 30c-6-2-8-8-4-12 0 4 4 6 6 6M48 30c6-2 8-8 4-12 0 4-4 6-6 6" fill="#C58B2B"/>
    <circle cx="32" cy="8" r="3" fill="#C0392B"/>
    <circle cx="24" cy="9" r="2.4" fill="#3A86C8"/>
    <circle cx="40" cy="9" r="2.4" fill="#FFC300"/>
  </svg>`,

  vasija: `<svg viewBox="0 0 64 64" role="img" aria-hidden="true">
    <path d="M24 12h16l-2 6c8 3 12 9 12 17 0 12-9 19-18 19S14 47 14 35c0-8 4-14 12-17z" fill="#a04e22"/>
    <ellipse cx="32" cy="12" rx="8" ry="3" fill="#7c3a16"/>
    <path d="M15 32h34M16 40h32" stroke="#6F4E37" stroke-width="1.6" opacity=".6"/>
    <path d="M20 33l4 6 4-6 4 6 4-6 4 6 4-6" stroke="#FFC300" stroke-width="2" fill="none"/>
    <circle cx="32" cy="26" r="2.4" fill="#F8F4EA"/>
    <path d="M24 47q8 4 16 0" stroke="#7c3a16" stroke-width="1.6" fill="none" opacity=".7"/>
  </svg>`,

  marimba: `<svg viewBox="0 0 64 64" role="img" aria-hidden="true">
    <path d="M10 22h44l-8 16H18z" fill="#8a6849"/>
    <path d="M14 24h36M16 28h32M18 32h28M20 36h24" stroke="#5c4430" stroke-width="2.4"/>
    <path d="M18 38l-4 18M46 38l4 18" stroke="#6F4E37" stroke-width="3" stroke-linecap="round"/>
    <path d="M26 10l6 10M42 8l-4 12" stroke="#6F4E37" stroke-width="2" stroke-linecap="round"/>
    <circle cx="25" cy="9" r="3.4" fill="#C0392B"/>
    <circle cx="43" cy="7" r="3.4" fill="#FFC300"/>
  </svg>`,

  iglesia: `<svg viewBox="0 0 64 64" role="img" aria-hidden="true">
    <rect x="12" y="34" width="40" height="20" fill="#F4E9D2"/>
    <path d="M8 34h48v-4H8z" fill="#e0cfa8"/>
    <rect x="24" y="14" width="16" height="16" fill="#F4E9D2"/>
    <path d="M22 14h20l-10-8z" fill="#C58B2B"/>
    <path d="M32 2v6M29 5h6" stroke="#6F4E37" stroke-width="2" stroke-linecap="round"/>
    <path d="M28 54v-12a4 4 0 0 1 8 0v12z" fill="#6F4E37"/>
    <rect x="16" y="38" width="6" height="8" rx="3" fill="#3A86C8"/>
    <rect x="42" y="38" width="6" height="8" rx="3" fill="#3A86C8"/>
    <circle cx="32" cy="22" r="3" fill="#C58B2B"/>
  </svg>`
};
