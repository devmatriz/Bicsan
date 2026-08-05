/* ============================================================
   Datos de contenido — BICSAN
   Biblioteca Intercultural de Cosmovisiones y Saberes
   Ancestrales de Nicaragua · información documentada y real.
   Fotografías reales en assets/img/ (con respaldo en ilustración).
   'detalle' puede ser texto o arreglo de párrafos.
   'galeria' = [{ src, cap, desc }] imágenes comentadas.
   'pueblo' = ids de los pueblos a los que pertenece el elemento.
   Cantidades de las recetas: orientativas.
   ============================================================ */

const BDI = {
  lenguas: ["Español", "Mískitu", "Mayangna", "Rama", "Garífuna", "Creole (criollo inglés)"],

  /* ---------- Regiones culturales de Nicaragua (4) ---------- */
  regiones: [
    {
      id: "caribe-norte", nombre: "Costa Caribe Norte", sub: "RACCN · Bilwi, Wangki y Bosawás",
      icon: "cayuco", color: ["#255E74", "#337D99"],
      descripcion: "Territorio de los pueblos mískitu y mayangna. Bilwi y su muelle histórico, el Río Coco (Wangki), la selva de Bosawás y tradiciones como el King Pulanka y el buceo de langosta definen su identidad.",
      detalle: [
        "La Región Autónoma de la Costa Caribe Norte (RACCN) es el corazón del pueblo mískitu y el hogar selvático de los mayangna. Su eje de vida es el Wangki —el Río Coco, el más largo de Centroamérica— y su capital, Bilwi, mira al mar desde su muelle centenario.",
        "Aquí la lengua mískitu se escucha en mercados, radios y aulas; la Reserva de Biosfera Bosawás (UNESCO, 1997) protege una de las mayores selvas del continente; y celebraciones como el King Pulanka y el Sihkru Tara mantienen viva la memoria del antiguo reino de la Mosquitia."
      ]
    },
    {
      id: "caribe-sur", nombre: "Costa Caribe Sur", sub: "RACCS y Río San Juan · Bluefields y las islas",
      icon: "ola", color: ["#177363", "#219A85"],
      descripcion: "Tierra creole, garífuna y rama. Bluefields y su Palo de Mayo, la Laguna de Perlas, las Islas del Maíz, Rama Cay y las selvas de Indio Maíz y el Río San Juan con su fortaleza de El Castillo.",
      detalle: [
        "La Región Autónoma de la Costa Caribe Sur (RACCS) es la más diversa del país: en Bluefields conviven creoles, mískitus, ramas, garífunas y mestizos. Cada mayo, el Palo de Mayo llena sus calles de tambores; cada agosto, las Islas del Maíz celebran la Emancipación con sopa de cangrejo.",
        "Al sur, la Reserva Indio Maíz y el Río San Juan —con la fortaleza colonial de El Castillo— completan un territorio de lagunas, cayos e islas donde la cocina del coco, la lengua creole y la cultura garífuna (Patrimonio de la Humanidad, UNESCO 2001) son el sello de identidad."
      ]
    },
    {
      id: "pacifico", nombre: "Pacífico", sub: "Volcanes, lagos y ciudades coloniales",
      icon: "volcan", color: ["#B4552D", "#CF7850"],
      descripcion: "Tierra de los pueblos chorotega, nahoa y sutiaba, del Güegüense y de las ciudades coloniales de Granada y León. Sus volcanes, lagunas y mercados concentran gran parte del folclor nacional.",
      detalle: [
        "El Pacífico fue el corazón de las civilizaciones mesoamericanas que llegaron del norte: chorotegas, nahoas y sutiabas dejaron su huella en la cerámica, los topónimos y las comidas de maíz que hoy identifican al país.",
        "Es también la región del Güegüense —Patrimonio de la Humanidad—, de la marimba de Masaya, de la Gritería de León y de la isla de Ometepe, Reserva de Biosfera de la UNESCO."
      ]
    },
    {
      id: "centro", nombre: "Centro-Norte", sub: "Montañas, café y pueblos del norte",
      icon: "maiz", color: ["#8A6A2F", "#A8852F"],
      descripcion: "Región de montañas y café donde viven las comunidades chorotegas de Madriz y Nueva Segovia y el pueblo matagalpa-cacaopera. Cuna de las güirilas, las rosquillas somoteñas y el Cañón de Somoto.",
      detalle: [
        "Las serranías del centro-norte guardan comunidades indígenas vivas —como Mozonte, Totogalpa, San Lucas y la comunidad indígena de Matagalpa— que conservan sus autoridades tradicionales y sus territorios comunales.",
        "Su cocina de maíz tierno, sus toponimias en lengua matagalpa (Estelí, Yalí, Quilalí) y paisajes como el Cañón de Somoto hacen de esta región un puente entre la historia profunda y la Nicaragua campesina actual."
      ]
    }
  ],

  /* ---------- Pueblos reconocidos de la Costa Caribe (Ley 28) ---------- */
  comunidades: [
    {
      id: "miskitu", nombre: "Mískitu",
      region: "RACCN · Bilwi (Puerto Cabezas) y Río Coco (Wangki)",
      idioma: "Mískitu y Español",
      descripcion: "Es el pueblo indígena más numeroso de la Costa Caribe. Vive de la pesca, el buceo de langosta y el cultivo de yuca, plátano y arroz. Su cosmovisión reconoce a los espíritus del agua (liwa) y a la figura del sukya (guía espiritual y sanador).",
      detalle: [
        "El pueblo mískitu se extiende por la costa y las riberas del Río Coco, el más largo de Centroamérica. Su organización comunal, su lengua viva y su relación con el mar y los ríos son la base de su identidad.",
        "El buceo de langosta, las faenas de pesca y el conocimiento de las mareas y las estrellas forman parte de su herencia cotidiana, transmitida de generación en generación. Celebraciones como el King Pulanka reafirman cada año su memoria histórica y su orgullo cultural."
      ],
      datos: [["Región", "RACCN"], ["Idioma", "Mískitu"], ["Actividad", "Pesca y agricultura"]],
      regiones: ["caribe-norte", "caribe-sur"], icon: "cayuco", foto: "assets/img/pueblos/miskitu.jpg",
      galeria: [
        { src: "assets/img/pueblos/miskitu-1.jpg", cap: "Pescador con langostas", desc: "La pesca y el buceo de langosta son el sustento de muchas familias mískitas del litoral." },
        { src: "assets/img/pueblos/miskitu-2.jpg", cap: "Comunidad costera", desc: "La vida mískita se organiza alrededor del mar, los ríos y la familia extensa." }
      ],
      color: ["#0B5D4B", "#2d8c75"]
    },
    {
      id: "mayangna", nombre: "Mayangna (Sumu)",
      region: "Reserva de Biosfera Bosawás · alto Río Coco y Bocay",
      idioma: "Mayangna (twahka, panamahka, ulwa) y Español",
      descripcion: "Guardianes históricos de Bosawás, una de las mayores extensiones de bosque tropical de Centroamérica (Reserva de Biosfera UNESCO, 1997). Poseen un profundo conocimiento de la biodiversidad y de la medicina natural.",
      detalle: [
        "Los mayangna habitan el corazón de la selva de Bosawás, donde practican una agricultura de pequeña escala, la caza y la recolección sostenibles. Su profundo conocimiento de plantas, ríos y fauna es reconocido como patrimonio del país.",
        "Como guardianes del bosque, los mayangna cumplen un papel decisivo en la conservación de una de las mayores reservas de Centroamérica. Su lengua, en sus variantes twahka, panamahka y ulwa, sigue siendo el vínculo que une a sus comunidades."
      ],
      datos: [["Región", "Bosawás"], ["Idioma", "Mayangna"], ["Patrimonio", "Reserva UNESCO 1997"]],
      regiones: ["caribe-norte"], icon: "palmera", foto: "assets/img/pueblos/mayangna.jpg",
      galeria: [
        { src: "assets/img/pueblos/mayangna-1.jpg", cap: "Familia mayangna", desc: "Las familias mayangna transmiten de generación en generación el conocimiento del bosque." },
        { src: "assets/img/pueblos/mayangna-2.jpg", cap: "Comunidad de Bosawás", desc: "Sus comunidades habitan el corazón de la selva tropical mejor conservada del país." }
      ],
      color: ["#1f6f3f", "#3da06a"]
    },
    {
      id: "rama", nombre: "Rama",
      region: "RACCS · Rama Cay y cuenca del Río Indio–Maíz",
      idioma: "Rama (en revitalización), Creole y Español",
      descripcion: "Uno de los pueblos indígenas más pequeños del país, con estrecha relación con los ecosistemas marino-costeros y la selva del sureste. Su lengua, el rama, se encuentra en proceso de revitalización.",
      detalle: [
        "El pueblo rama conserva un vínculo profundo con la selva de Indio–Maíz y con el mar. Es uno de los pueblos indígenas más pequeños del país, asentado sobre todo en la isla de Rama Cay, en la bahía de Bluefields.",
        "Su lengua, hablada por pocas personas, es objeto de programas de revitalización con apoyo comunitario y académico. La construcción de cayucos y la pesca artesanal siguen siendo parte central de su vida diaria."
      ],
      datos: [["Región", "RACCS"], ["Idioma", "Rama"], ["Hogar", "Rama Cay"]],
      regiones: ["caribe-sur"], icon: "tortuga", foto: "assets/img/pueblos/rama.jpg",
      galeria: [
        { src: "assets/img/pueblos/rama-1.jpg", cap: "Comunidad rama", desc: "El pueblo rama mantiene viva su identidad pese a ser uno de los más pequeños del país." },
        { src: "assets/img/pueblos/rama-2.jpg", cap: "Pueblo rama", desc: "Niñez y mayores participan en los esfuerzos por revitalizar la lengua rama." }
      ],
      color: ["#235a86", "#3A86C8"]
    },
    {
      id: "garifuna", nombre: "Garífuna",
      region: "RACCS · Laguna de Perlas (Orinoco, La Fe, San Vicente)",
      idioma: "Garífuna, Creole y Español",
      descripcion: "Pueblo afrodescendiente de ascendencia africana y arahuaca-caribe. Su lengua, danza y música fueron proclamadas por la UNESCO Obra Maestra del Patrimonio Oral e Inmaterial de la Humanidad (2001). Destacan los tambores y la danza punta.",
      detalle: [
        "Los garífunas de Nicaragua descienden de africanos y de pueblos arahuaco-caribe, y se asientan principalmente alrededor de la Laguna de Perlas. Su lengua, danza y música fueron proclamadas por la UNESCO Obra Maestra del Patrimonio Oral e Inmaterial de la Humanidad en 2001.",
        "Su cultura combina la música de tambores, la danza punta y una gastronomía basada en el coco y la yuca (casabe). Cada 19 de noviembre celebran su herencia y la memoria de su llegada a estas costas."
      ],
      datos: [["Región", "Laguna de Perlas"], ["Idioma", "Garífuna"], ["Patrimonio", "UNESCO 2001"]],
      regiones: ["caribe-sur"], icon: "tambor", foto: "assets/img/pueblos/garifuna.jpg",
      galeria: [
        { src: "assets/img/pueblos/garifuna-1.jpeg", cap: "Cultura y danza", desc: "La danza punta y los tambores son el corazón de la cultura garífuna." },
        { src: "assets/img/pueblos/garifuna-2.jpeg", cap: "Herencia garífuna", desc: "Su herencia africana y arahuaca se expresa en la música, la comida y la vestimenta." }
      ],
      color: ["#9a5a16", "#C58B2B"]
    },
    {
      id: "creole", nombre: "Creole",
      region: "RACCS · Bluefields, Islas del Maíz y Laguna de Perlas",
      idioma: "Creole (criollo de base inglesa), Inglés y Español",
      descripcion: "Comunidad afrodescendiente de habla criolla inglesa, núcleo de la cultura del Palo de Mayo. Su gastronomía gira en torno al coco: rondón, rice and beans, pan de coco y pati.",
      detalle: [
        "La comunidad creole es portadora de una rica tradición musical y festiva, encabezada por el Palo de Mayo. Su lengua, el creole, es un criollo de base inglesa con aportes africanos.",
        "Bluefields, su centro cultural, es punto de encuentro de todos los pueblos de la Costa Caribe Sur. Su cocina —rondón, rice and beans, pan de coco y pati— es una de las más reconocidas del país."
      ],
      datos: [["Región", "RACCS"], ["Idioma", "Creole"], ["Cultura", "Palo de Mayo"]],
      regiones: ["caribe-sur"], icon: "ola", foto: "assets/img/pueblos/creole.jpg",
      galeria: [
        { src: "assets/img/pueblos/creole-1.jpg", cap: "Comunidad creole", desc: "La comunidad creole es portadora del Palo de Mayo y de la lengua creole." }
      ],
      color: ["#6b4a86", "#9a7bbf"]
    },
    {
      id: "mestizo", nombre: "Mestizo",
      region: "Presente en toda la Costa Caribe y el resto de Nicaragua",
      idioma: "Español",
      descripcion: "Población de ascendencia mixta indígena y española. La migración interna desde el Pacífico y el centro del país ha llevado a la Costa sus festividades patronales, gastronomía y tradiciones campesinas.",
      detalle: [
        "La población mestiza es mayoritaria a nivel nacional y ha crecido en la Costa por la migración interna desde el Pacífico y el centro del país.",
        "Aporta fiestas patronales, gastronomía y prácticas agrícolas, en un intercambio constante con los pueblos indígenas y afrodescendientes de la región, que enriquece la diversidad del Caribe."
      ],
      datos: [["Ámbito", "Nacional"], ["Idioma", "Español"], ["Aporte", "Tradiciones del Pacífico"]],
      regiones: ["caribe-norte", "caribe-sur", "pacifico", "centro"], icon: "maiz", foto: "assets/img/pueblos/mestizo.jpg",
      galeria: [
        { src: "assets/img/pueblos/mestizo-1.jpeg", cap: "Familias mestizas", desc: "La cultura mestiza aporta a la Costa fiestas patronales y gastronomía del Pacífico." },
        { src: "assets/img/pueblos/mestizo-2.jpg", cap: "Pueblo mestizo", desc: "La población mestiza convive e intercambia saberes con los pueblos del Caribe." }
      ],
      color: ["#b5462b", "#e07a5f"]
    },
    {
      id: "chorotega", nombre: "Chorotega",
      region: "Madriz, Nueva Segovia, Matagalpa y los Pueblos Blancos (Masaya · Carazo)",
      idioma: "Español (la lengua mangue se extinguió; sobrevive en topónimos)",
      descripcion: "El pueblo originario más numeroso del Pacífico y el norte. Llegaron de Mesoamérica hace más de mil años y dejaron una huella profunda en la cerámica, el maíz y los nombres de lugares como Diriamba, Diriá y Diriomo ('diri' = cerro).",
      detalle: [
        "Los chorotegas fueron la gran civilización del Pacífico nicaragüense a la llegada de los españoles. Hoy sus comunidades vivas se concentran en el norte —Mozonte, Totogalpa, San Lucas y Cusmapa, entre otras— donde conservan autoridades tradicionales, territorios comunales y títulos reales coloniales.",
        "Su herencia más visible es la cerámica: en San Juan de Oriente, pueblo alfarero de los Pueblos Blancos, las familias siguen modelando y decorando piezas con técnicas y motivos de raíz precolombina. La lengua mangue se extinguió, pero vive en decenas de topónimos del país."
      ],
      datos: [["Regiones", "Norte y Pacífico"], ["Lengua histórica", "Mangue (chorotega)"], ["Herencia", "Cerámica y topónimos"]],
      regiones: ["centro", "pacifico"], icon: "vasija", foto: "assets/img/pueblos/chorotega.jpg",
      galeria: [],
      color: ["#a04e22", "#d97b46"]
    },
    {
      id: "nahoa", nombre: "Nahoa (Náhuatl-Nicarao)",
      region: "Rivas: Veracruz del Zapotal, Salinas de Nahualapa, Nancimí y Urbaite-Las Pilas (Ometepe)",
      idioma: "Español (el náhuat se extinguió; vive en el vocabulario nicaragüense)",
      descripcion: "Descendientes de los nicaraos, el pueblo de habla náhuat que dominaba el istmo de Rivas a la llegada de los españoles. Del encuentro entre el cacique Nicarao y el conquistador Gil González (1522) la tradición deriva el nombre de Nicaragua.",
      detalle: [
        "Los nahoas o nicaraos formaron parte de las migraciones mesoamericanas que bajaron desde México y se asentaron en el istmo de Rivas y la isla de Ometepe. Su cosmovisión del maíz, el cacao y los volcanes marcó para siempre la cultura del Pacífico sur.",
        "Aunque su lengua se perdió, el español de Nicaragua está lleno de palabras náhuat: chigüín, pinol, jocote, guacal, comal, chilote o nacatamal. Sus comunidades actuales en Rivas mantienen la organización indígena y la memoria de sus territorios."
      ],
      datos: [["Región", "Rivas y Ometepe"], ["Lengua histórica", "Náhuat"], ["Legado", "Vocabulario y gastronomía del maíz"]],
      regiones: ["pacifico"], icon: "volcan", foto: "assets/img/pueblos/nahoa.jpg",
      galeria: [],
      color: ["#C0392B", "#e07a5f"]
    },
    {
      id: "sutiaba", nombre: "Sutiaba (Xiu)",
      region: "León · territorio indígena de Sutiaba",
      idioma: "Español (la lengua sutiaba se extinguió en el siglo XX)",
      descripcion: "Pueblo originario asentado en el actual barrio-territorio de Sutiaba, en León. Mantiene su comunidad indígena organizada, sus cofradías, sus fiestas y una identidad propia dentro de la ciudad colonial.",
      detalle: [
        "Los sutiabas o xiu llegaron al Pacífico en migraciones distintas a las de chorotegas y nahoas; su lengua emparentada con el tlapaneco de México se habló hasta el siglo XX. Su territorio fue reconocido con títulos coloniales que la comunidad aún defiende.",
        "Sutiaba es hoy un corazón cultural de León: sus procesiones de Semana Santa, sus alfombras pasionarias de aserrín, el culto al sol tallado en el techo de su iglesia colonial y sus tradiciones gastronómicas la distinguen como pueblo vivo."
      ],
      datos: [["Región", "León"], ["Lengua histórica", "Sutiaba (familia tlapaneca)"], ["Identidad", "Comunidad indígena urbana"]],
      regiones: ["pacifico"], icon: "sol", foto: "assets/img/pueblos/sutiaba.jpg",
      galeria: [],
      color: ["#9a6b00", "#FFC300"]
    },
    {
      id: "cacaopera", nombre: "Matagalpa-Cacaopera",
      region: "Matagalpa y Jinotega · comunidad indígena de Matagalpa, Sébaco y Muy Muy",
      idioma: "Español (la lengua matagalpa se extinguió; sobrevive en topónimos)",
      descripcion: "Pueblo originario de las montañas del centro-norte. Su lengua matagalpa dejó huella en nombres terminados en 'lí' (agua): Estelí, Yalí, Quilalí. Sus comunidades conservan tierras comunales y autoridades tradicionales.",
      detalle: [
        "El pueblo matagalpa —emparentado con los cacaopera de El Salvador— habitó las serranías centrales mucho antes de las migraciones mesoamericanas. Cultivadores de maíz de altura, resistieron la colonización en sus montañas.",
        "La comunidad indígena de Matagalpa mantiene viva su organización con títulos de tierras comunales. La toponimia de la región —Estelí, Yalí, Quilalí, Jucuapa— es el testimonio más duradero de su lengua, y su cocina del maíz tierno (güirilas, atoles) sigue en cada mesa norteña."
      ],
      datos: [["Región", "Centro-Norte"], ["Lengua histórica", "Matagalpa"], ["Legado", "Topónimos en 'lí' y cocina del maíz"]],
      regiones: ["centro"], icon: "maiz", foto: "assets/img/pueblos/cacaopera.jpg",
      galeria: [],
      color: ["#6F4E37", "#a07850"]
    }
  ],

  /* ---------- Lugares emblemáticos reales de la Costa Caribe ---------- */
  lugares: [
    { id: "bilwi", nombre: "Bilwi (Puerto Cabezas)", tipo: "Ciudad", region: "RACCN", descripcion: "Capital de la Región Autónoma de la Costa Caribe Norte y principal centro urbano y portuario mískitu.",
      detalle: [
        "Bilwi, también conocida como Puerto Cabezas, es el corazón administrativo y cultural de la RACCN. Su histórico muelle de madera se interna en el mar Caribe y es el símbolo más reconocible de la ciudad.",
        "Alrededor del puerto se mueven la pesca, el comercio y la vida cotidiana. Es sede de instituciones autónomas y de educación superior regional, y punto de partida hacia las comunidades mískitas del litoral."
      ],
      datos: [["Tipo", "Ciudad"], ["Región", "RACCN"], ["Rol", "Capital regional"]], icon: "casa", foto: "assets/img/lugares/bilwi.jpg",
      galeria: [
        { src: "assets/img/lugares/bilwi-1.jpg", cap: "Muelle de Bilwi", desc: "El histórico muelle de madera, engalanado con banderas, es símbolo de la ciudad." },
        { src: "assets/img/lugares/bilwi-2.jpg", cap: "Playa de Bilwi", desc: "Sus playas son punto de encuentro y de faena pesquera." }
      ], color: ["#0B5D4B", "#2d8c75"] },
    { id: "bluefields", nombre: "Bluefields", tipo: "Ciudad", region: "RACCS", descripcion: "Capital de la Región Autónoma de la Costa Caribe Sur y cuna del Palo de Mayo. Punto de encuentro de las culturas creole, mískita, mestiza y garífuna.",
      detalle: [
        "Bluefields es la ciudad más diversa del Caribe nicaragüense, donde conviven las culturas creole, mískita, mestiza y garífuna. Cada mayo se llena de música y danza con el festival Mayo Ya!.",
        "Alberga la universidad BICU y es punto de partida hacia Laguna de Perlas, Rama Cay y las Islas del Maíz. Su bahía ha sido durante siglos una puerta de entrada al Caribe."
      ],
      datos: [["Tipo", "Ciudad"], ["Región", "RACCS"], ["Fiesta", "Palo de Mayo"]], icon: "tambor", foto: "assets/img/lugares/bluefields.jpg",
      galeria: [ { src: "assets/img/lugares/bluefields-1.jpg", cap: "Palo de Mayo", desc: "Cada mayo, el Palo de Mayo llena de música y color las calles de Bluefields." } ], color: ["#235a86", "#3A86C8"] },
    { id: "corn-islands", nombre: "Islas del Maíz (Corn Islands)", tipo: "Islas", region: "RACCS · Mar Caribe", descripcion: "Big Corn y Little Corn, destino de playas y arrecifes. Cada 27–28 de agosto celebran el Día de la Emancipación con el Festival del Cangrejo.",
      detalle: [
        "Las Islas del Maíz —Big Corn y Little Corn— son un destino caribeño de aguas turquesa, arrecifes de coral y vida creole. La pesca, el buceo y el turismo sostienen su economía.",
        "Cada 27 y 28 de agosto, el Día de la Emancipación recuerda la abolición de la esclavitud de 1841 con el Festival del Cangrejo, su celebración más identitaria."
      ],
      datos: [["Tipo", "Islas"], ["Mar", "Caribe"], ["Fiesta", "Festival del Cangrejo"]], icon: "cangrejo", foto: "assets/img/lugares/corn-islands.webp",
      galeria: [
        { src: "assets/img/lugares/corn-islands-1.webp", cap: "Playas del Caribe", desc: "Aguas turquesa y arrecifes de coral rodean Big Corn y Little Corn." },
        { src: "assets/img/lugares/corn-islands-2.avif", cap: "Vida isleña", desc: "El turismo, la pesca y el buceo sostienen la vida de las islas." }
      ], color: ["#0077B6", "#37a0d6"] },
    { id: "laguna-de-perlas", nombre: "Laguna de Perlas (Pearl Lagoon)", tipo: "Laguna costera", region: "RACCS", descripcion: "Sistema lagunar rodeado de comunidades garífunas y creoles dedicadas a la pesca artesanal.",
      detalle: [
        "La Laguna de Perlas es la mayor laguna costera del país. A su alrededor se ubican comunidades garífunas y creoles —como Orinoco, La Fe y San Vicente— que mantienen viva su cultura.",
        "La pesca artesanal y una gastronomía basada en el coco y el pescado marcan el ritmo de la vida en la laguna, un paisaje de manglares, canales y pequeños poblados."
      ],
      datos: [["Tipo", "Laguna"], ["Región", "RACCS"], ["Pueblos", "Garífuna y Creole"]], icon: "pez", foto: "assets/img/lugares/laguna-de-perlas.jpg",
      galeria: [ { src: "assets/img/lugares/laguna-de-perlas-1.jpg", cap: "Comunidad de la laguna", desc: "Las comunidades de la laguna viven de la pesca artesanal y de la cultura garífuna y creole." } ], color: ["#1f6f3f", "#3da06a"] },
    { id: "bosawas", nombre: "Reserva de Biosfera Bosawás", tipo: "Área protegida", region: "RACCN · Jinotega", descripcion: "Declarada Reserva de Biosfera por la UNESCO en 1997; una de las mayores reservas de bosque tropical de Centroamérica, territorio mayangna y mískitu.",
      detalle: [
        "Bosawás protege miles de kilómetros cuadrados de selva, ríos y montañas, y es una de las mayores reservas de bosque tropical de Centroamérica. Fue declarada Reserva de Biosfera por la UNESCO en 1997.",
        "Es hogar de los pueblos mayangna y mískitu y refugio de especies como el jaguar, el tigrillo, el mono araña y el perezoso. Su nombre proviene del río Bocay, el cerro Saslaya y el río Waspuk."
      ],
      datos: [["Tipo", "Reserva de Biosfera"], ["Año", "UNESCO 1997"], ["Pueblos", "Mayangna y Mískitu"]], icon: "palmera", foto: "assets/img/lugares/bosawas.jpg",
      galeria: [
        { src: "assets/img/lugares/bosawas-1.jpg", cap: "Perezoso", desc: "El perezoso es uno de los habitantes más emblemáticos del dosel de Bosawás." },
        { src: "assets/img/lugares/bosawas-2.jpg", cap: "Tigrillo (ocelote)", desc: "Uno de los felinos que recorren la reserva en busca de presas." },
        { src: "assets/img/lugares/bosawas-3.jpg", cap: "Mono araña", desc: "Depende de los grandes árboles de la selva para desplazarse entre las copas." }
      ], color: ["#0B5D4B", "#1f6f3f"] },
    { id: "rio-coco", nombre: "Río Coco (Wangki)", tipo: "Río", region: "Frontera con Honduras", descripcion: "El río más largo de Centroamérica y corazón del territorio mískitu, vía histórica de transporte y vida comunitaria.",
      detalle: [
        "El Río Coco o Wangki es el más largo de Centroamérica y marca buena parte de la frontera con Honduras. Es el eje de vida del pueblo mískitu.",
        "A lo largo de sus orillas se asientan decenas de comunidades —como Waspam— que dependen de él para el transporte en cayuco, la pesca y la agricultura de ribera."
      ],
      datos: [["Tipo", "Río"], ["Rasgo", "El más largo de C.A."], ["Pueblo", "Mískitu"]], icon: "cayuco", foto: "assets/img/lugares/rio-coco.jpg",
      galeria: [
        { src: "assets/img/lugares/rio-coco-1.jpg", cap: "Waspam", desc: "Uno de los principales poblados a orillas del Río Coco." },
        { src: "assets/img/lugares/rio-coco-2.jpg", cap: "Vida en el Wangki", desc: "El río es la principal vía de transporte y vida de decenas de comunidades mískitas." }
      ], color: ["#235a86", "#3A86C8"] },
    { id: "rama-cay", nombre: "Rama Cay", tipo: "Isla", region: "RACCS · Bahía de Bluefields", descripcion: "Pequeña isla en la bahía de Bluefields, principal asentamiento del pueblo Rama.",
      detalle: [
        "Rama Cay es una isla diminuta y densamente habitada en la bahía de Bluefields. Es el principal asentamiento del pueblo rama.",
        "En ella se concentran los esfuerzos por preservar la lengua rama y las tradiciones de pesca y construcción de cayucos que definen a este pueblo."
      ],
      datos: [["Tipo", "Isla"], ["Bahía", "Bluefields"], ["Pueblo", "Rama"]], icon: "tortuga", foto: "assets/img/lugares/rama-cay.jpg", galeria: [], color: ["#6b4a86", "#9a7bbf"] },
    { id: "el-rama", nombre: "El Rama", tipo: "Ciudad · puerto fluvial", region: "RACCS · Río Escondido", descripcion: "Importante puerto fluvial sobre el Río Escondido que conecta el Pacífico con el Caribe en la ruta hacia Bluefields.",
      detalle: [
        "El Rama es un nudo de transporte clave del país: se llega por carretera desde Managua y se continúa por río hasta Bluefields. Su puerto, sobre el Río Escondido, mueve carga y pasajeros.",
        "Su parque y su iglesia son el centro de una vibrante cultura mestiza y caribeña, y la ciudad funciona como puerta de enlace entre el Pacífico y el Caribe Sur."
      ],
      datos: [["Tipo", "Puerto fluvial"], ["Río", "Escondido"], ["Región", "RACCS"]], icon: "casa", foto: "assets/img/lugares/el-rama.jpg",
      galeria: [
        { src: "assets/img/lugares/el-rama-1.jpg", cap: "Ciudad de El Rama", desc: "La iglesia y el parque central son el corazón de la vida en El Rama." },
        { src: "assets/img/lugares/el-rama-2.jpg", cap: "Puerto fluvial", desc: "El puerto sobre el Río Escondido conecta el Pacífico con el Caribe." }
      ], color: ["#9a5a16", "#C58B2B"] },
    { id: "indio-maiz", nombre: "Reserva Biológica Indio Maíz", tipo: "Área protegida", region: "Río San Juan · RACCS", descripcion: "Una de las selvas tropicales mejor conservadas del país, en el territorio ancestral rama-creole.",
      detalle: [
        "La Reserva Biológica Indio Maíz es una de las selvas húmedas tropicales mejor conservadas del país, con enorme biodiversidad: garzas, monos, tapires y una gran riqueza de aves.",
        "Forma parte del territorio ancestral rama y creole, y es un corredor biológico clave entre Nicaragua y Costa Rica."
      ],
      datos: [["Tipo", "Reserva biológica"], ["Región", "Sureste"], ["Territorio", "Rama-Creole"]], icon: "estrella", foto: "assets/img/lugares/indio-maiz.jpg",
      galeria: [
        { src: "assets/img/lugares/indio-maiz-1.jpg", cap: "Garza", desc: "Garzas y aves acuáticas abundan en los humedales de Indio Maíz." },
        { src: "assets/img/lugares/indio-maiz-2.jpg", cap: "Monos de la reserva", desc: "Los monos son parte de la rica fauna de esta selva tropical." }
      ], color: ["#1f6f3f", "#3da06a"] },
    { id: "granada", nombre: "Granada", tipo: "Ciudad colonial", region: "Pacífico · Lago Cocibolca",
      descripcion: "Fundada en 1524, es una de las ciudades coloniales más antiguas de tierra firme en América. Sus calles de colores, sus isletas y su vida frente al Gran Lago la convierten en el destino turístico por excelencia.",
      detalle: [
        "Granada fue fundada por Francisco Hernández de Córdoba a orillas del Lago Cocibolca. Su centro histórico —la Catedral, la Calle La Calzada, el Convento San Francisco— conserva siglos de historia colonial, ataques de piratas e incendios de los que siempre renació.",
        "Frente a la ciudad se extienden las Isletas de Granada: más de 300 pequeñas islas formadas por una antigua erupción del volcán Mombacho, hoy habitadas por familias de pescadores y rodeadas de garzas, monos y vegetación tropical."
      ],
      datos: [["Fundación", "1524"], ["Lago", "Cocibolca"], ["Atractivo", "Isletas y centro colonial"]],
      regionId: "pacifico", pueblo: ["mestizo"], icon: "iglesia", foto: "assets/img/lugares/granada.jpg", galeria: [], color: ["#C58B2B", "#e6b75e"] },
    { id: "leon", nombre: "León", tipo: "Ciudad colonial", region: "Pacífico · León",
      descripcion: "Ciudad universitaria y cultural, hogar de la Catedral más grande de Centroamérica (Patrimonio Mundial UNESCO 2011), de la tumba de Rubén Darío y del pueblo indígena de Sutiaba.",
      detalle: [
        "León es la capital cultural e intelectual del país: cuna de poetas, sede de la primera universidad y escenario de la Gritería, la fiesta religiosa más querida de Nicaragua. Su Basílica Catedral de la Asunción, terminada en el siglo XIX, guarda la tumba de Rubén Darío.",
        "Dentro de la ciudad vive el pueblo indígena de Sutiaba, con su propia iglesia colonial —famosa por el sol tallado en su techo—, sus cofradías y sus tradiciones. En diciembre, la Gigantona y el Enano Cabezón recorren sus calles al ritmo de tambores."
      ],
      datos: [["Patrimonio", "Catedral · UNESCO 2011"], ["Personaje", "Rubén Darío"], ["Pueblo indígena", "Sutiaba"]],
      regionId: "pacifico", pueblo: ["mestizo", "sutiaba"], icon: "iglesia", foto: "assets/img/lugares/leon.jpg", galeria: [], color: ["#9a6b00", "#FFC300"] },
    { id: "masaya", nombre: "Masaya y Monimbó", tipo: "Ciudad folclórica", region: "Pacífico · Masaya",
      descripcion: "La 'Cuna del Folclor Nicaragüense': mercado de artesanías, marimbas, hamacas y el barrio indígena de Monimbó, corazón de las fiestas de San Jerónimo y del Toro Venado.",
      detalle: [
        "Masaya concentra como ninguna otra ciudad las artes populares del país: su Mercado Viejo de Artesanías reúne hamacas, cuero, madera, cerámica y bordados de toda Nicaragua, y sus talleres familiares mantienen oficios de generaciones.",
        "El barrio indígena de Monimbó, de raíz chorotega, conserva sus alcaldes de vara y es el alma de las fiestas de San Jerónimo —las más largas del país— con sus bailes de marimba, sus Inditas y el satírico Toro Venado."
      ],
      datos: [["Título", "Cuna del Folclor"], ["Barrio indígena", "Monimbó"], ["Fiesta", "San Jerónimo"]],
      regionId: "pacifico", pueblo: ["mestizo", "chorotega"], icon: "marimba", foto: "assets/img/lugares/masaya.jpg", galeria: [], color: ["#b5462b", "#e07a5f"] },
    { id: "volcan-masaya", nombre: "Parque Nacional Volcán Masaya", tipo: "Volcán · Parque nacional", region: "Pacífico · Masaya",
      descripcion: "El primer parque nacional de Nicaragua (1979). En su cráter Santiago puede verse un lago de lava incandescente; los españoles lo llamaron 'La Boca del Infierno'.",
      detalle: [
        "El Volcán Masaya es uno de los pocos lugares del mundo donde se puede asomar al borde de un cráter activo y ver la lava moverse en su interior. Los chorotegas lo veneraban y le ofrendaban para calmar sus furias; los cronistas españoles lo bautizaron 'La Boca del Infierno' y plantaron una cruz en su borde.",
        "El parque protege un paisaje de lavas, cuevas y túneles volcánicos donde anidan los famosos chocoyos del cráter, pericos que duermen dentro de las paredes del volcán desafiando los gases."
      ],
      datos: [["Creación", "Parque nacional · 1979"], ["Cráter", "Santiago"], ["Fauna", "Chocoyos del cráter"]],
      regionId: "pacifico", pueblo: ["mestizo", "chorotega"], icon: "volcan", foto: "assets/img/lugares/volcan-masaya.jpg", galeria: [], color: ["#C0392B", "#e07a5f"] },
    { id: "ometepe", nombre: "Isla de Ometepe", tipo: "Isla · Reserva de Biosfera", region: "Pacífico · Lago Cocibolca",
      descripcion: "La isla volcánica más grande del mundo dentro de un lago de agua dulce, formada por los volcanes Concepción y Maderas. Reserva de Biosfera UNESCO (2010) y tierra de petroglifos nahoas.",
      detalle: [
        "Ometepe —del náhuat 'ome tepetl', dos cerros— fue tierra sagrada de los nahoas, que dejaron cientos de petroglifos y estatuaria entre sus piedras. La UNESCO la declaró Reserva de Biosfera en 2010.",
        "Sus dos volcanes gemelos, el activo Concepción y el dormido Maderas con su laguna en la cima, sus playas lacustres como Santo Domingo y leyendas como la de Chico Largo en Charco Verde la hacen única en el mundo."
      ],
      datos: [["Significado", "'Ome tepetl' = dos cerros"], ["Patrimonio", "Biosfera UNESCO 2010"], ["Volcanes", "Concepción y Maderas"]],
      regionId: "pacifico", pueblo: ["nahoa", "mestizo"], icon: "volcan", foto: "assets/img/lugares/ometepe.jpg", galeria: [], color: ["#1f6f3f", "#3da06a"] },
    { id: "solentiname", nombre: "Archipiélago de Solentiname", tipo: "Archipiélago", region: "Río San Juan · Lago Cocibolca",
      descripcion: "Un archipiélago de más de 30 islas al sur del Gran Lago, mundialmente famoso por su escuela de pintura primitivista y sus artesanías de madera de balsa.",
      detalle: [
        "En Solentiname, a partir de 1966, la comunidad campesina desarrolló junto al poeta Ernesto Cardenal una escuela de pintura primitivista que retrata la naturaleza y la vida isleña en colores vivos, hoy reconocida internacionalmente.",
        "Las islas son también un santuario natural de aves y un lugar de vida tranquila entre lanchas, talleres de artesanía y bibliotecas comunitarias."
      ],
      datos: [["Islas", "Más de 30"], ["Arte", "Pintura primitivista"], ["Impulso", "Ernesto Cardenal · 1966"]],
      regionId: "caribe-sur", pueblo: ["mestizo"], icon: "cayuco", foto: "assets/img/lugares/solentiname.jpg", galeria: [], color: ["#3A86C8", "#37a0d6"] },
    { id: "canon-somoto", nombre: "Cañón de Somoto", tipo: "Monumento natural", region: "Centro-Norte · Madriz",
      descripcion: "Gargantas de roca de millones de años en territorio chorotega del norte, donde nace el Río Coco. Es Monumento Nacional y uno de los principales destinos de aventura del país.",
      detalle: [
        "El Cañón de Somoto —conocido por las comunidades locales como Namancambre— fue dado a conocer al mundo en 2004 tras el estudio de geólogos checos y nicaragüenses. Sus paredes de roca encajonan las aguas que, al unirse los ríos Comalí y Tapacalí, dan origen al Río Coco, el más largo de Centroamérica.",
        "Se recorre nadando, saltando desde las rocas y caminando entre paredes de hasta decenas de metros. Las comunidades chorotegas de la zona ofrecen guías locales, comida norteña y hospedaje rural."
      ],
      datos: [["Ubicación", "Madriz"], ["Estatus", "Monumento Nacional"], ["Río", "Nacimiento del Río Coco"]],
      regionId: "centro", pueblo: ["chorotega", "mestizo"], icon: "ola", foto: "assets/img/lugares/canon-somoto.jpg", galeria: [], color: ["#235a86", "#3A86C8"] },
    { id: "leon-viejo", nombre: "Ruinas de León Viejo", tipo: "Sitio arqueológico", region: "Pacífico · La Paz Centro, León",
      descripcion: "La primera ciudad de León, fundada en 1524 y abandonada en 1610 tras terremotos y erupciones del Momotombo. Primer sitio de Nicaragua declarado Patrimonio Mundial por la UNESCO (2000).",
      detalle: [
        "León Viejo es una cápsula del tiempo: la ciudad original fundada por Hernández de Córdoba quedó sepultada bajo ceniza tras décadas de sismos y la furia del volcán Momotombo, y sus ruinas se conservaron casi intactas.",
        "Entre sus muros se encontraron los restos del propio Hernández de Córdoba, fundador de Granada y León. La UNESCO lo inscribió como Patrimonio Mundial en el año 2000, el primero del país."
      ],
      datos: [["Fundación", "1524 · abandono 1610"], ["Patrimonio", "UNESCO 2000"], ["Volcán", "Momotombo"]],
      regionId: "pacifico", pueblo: ["mestizo"], icon: "iglesia", foto: "assets/img/lugares/leon-viejo.jpg", galeria: [], color: ["#6F4E37", "#a07850"] },
    { id: "san-juan-de-oriente", nombre: "San Juan de Oriente", tipo: "Pueblo artesano", region: "Pacífico · Masaya (Pueblos Blancos)",
      descripcion: "El pueblo alfarero de Nicaragua: aquí las familias herederas de la tradición chorotega tornean y decoran cerámica reconocida en todo el continente.",
      detalle: [
        "En San Juan de Oriente casi cada casa es un taller. Sus artesanos dominan el torno, los engobes minerales y el grabado fino, reproduciendo motivos precolombinos chorotegas y creando piezas contemporáneas premiadas internacionalmente.",
        "Junto a Catarina y su mirador sobre la Laguna de Apoyo, forma parte de la ruta de los Pueblos Blancos, un recorrido de flores, viveros, talleres y tradición de la meseta de los pueblos."
      ],
      datos: [["Oficio", "Alfarería y cerámica"], ["Raíz", "Tradición chorotega"], ["Ruta", "Pueblos Blancos"]],
      regionId: "pacifico", pueblo: ["chorotega", "mestizo"], icon: "vasija", foto: "assets/img/lugares/san-juan-de-oriente.jpg", galeria: [], color: ["#a04e22", "#d97b46"] },
    { id: "laguna-apoyo", nombre: "Laguna de Apoyo", tipo: "Laguna cratérica · Reserva natural", region: "Pacífico · entre Masaya y Granada",
      descripcion: "Una laguna de cráter de aguas templadas y cristalinas formada hace unos 23 mil años, rodeada de bosque seco tropical lleno de monos congos y aves.",
      detalle: [
        "La Laguna de Apoyo ocupa el cráter de un antiguo volcán y es la laguna cratérica más grande y limpia del país. Sus aguas ligeramente templadas por el calor volcánico invitan al baño todo el año.",
        "Declarada reserva natural, su bosque alberga monos congos y cariblancos, urracas y cientos de especies de aves. Desde el mirador de Catarina se contempla una de las vistas más fotografiadas de Nicaragua."
      ],
      datos: [["Tipo", "Laguna de cráter"], ["Estatus", "Reserva natural"], ["Mirador", "Catarina"]],
      regionId: "pacifico", pueblo: ["mestizo", "chorotega"], icon: "agua", foto: "assets/img/lugares/laguna-apoyo.jpg", galeria: [], color: ["#0077B6", "#37a0d6"] },
    { id: "waspam", nombre: "Waspam", tipo: "Ciudad ribereña", region: "RACCN · Río Coco",
      descripcion: "La capital del Wangki: principal puerto y centro comercial de las comunidades mískitas del Río Coco, puerta de entrada al territorio más extenso del pueblo mískitu.",
      detalle: [
        "Waspam se levanta a orillas del Río Coco y es el corazón administrativo y comercial de más de cien comunidades mískitas ribereñas. Desde su puerto salen y llegan cada día los botes y cayucos que son el transporte de toda la zona.",
        "Es también un centro cultural del Wangki: aquí se escucha el mískitu en cada esquina, se celebran los grandes encuentros del pueblo y se articula la vida entre Nicaragua y las comunidades de la otra orilla."
      ],
      datos: [["Tipo", "Ciudad ribereña"], ["Río", "Coco (Wangki)"], ["Pueblo", "Mískitu"]],
      regionId: "caribe-norte", pueblo: ["miskitu"], icon: "cayuco", foto: "assets/img/lugares/rio-coco-1.jpg", galeria: [], color: ["#255E74", "#337D99"] },
    { id: "pearl-cays", nombre: "Cayos Perlas (Pearl Cays)", tipo: "Cayos e islas", region: "RACCS · Mar Caribe",
      descripcion: "Un rosario de pequeños cayos de arena blanca frente a la Laguna de Perlas, zona de pesca tradicional y de anidación de la tortuga carey.",
      detalle: [
        "Los Cayos Perlas son más de una docena de islotes coralinos frente a la costa de la Laguna de Perlas. Sus aguas poco profundas son zona de pesca ancestral de las comunidades creoles, garífunas y mískitas del litoral.",
        "Son además uno de los sitios de anidación de tortuga carey más importantes del Caribe nicaragüense, donde conviven el aprovechamiento tradicional y los esfuerzos de conservación."
      ],
      datos: [["Tipo", "Cayos"], ["Mar", "Caribe"], ["Fauna", "Tortuga carey"]],
      regionId: "caribe-sur", pueblo: ["creole", "garifuna", "miskitu"], icon: "tortuga", foto: "assets/img/lugares/pearl-cays.jpg", galeria: [], color: ["#177363", "#219A85"] },
    { id: "el-castillo", nombre: "El Castillo (Fortaleza de la Inmaculada)", tipo: "Fortaleza colonial", region: "Río San Juan",
      descripcion: "Fortaleza española de 1675 sobre el Río San Juan, construida para frenar a los piratas. Aquí, en 1762, la joven Rafaela Herrera dirigió la defensa que la hizo heroína nacional.",
      detalle: [
        "La Fortaleza de la Inmaculada Concepción vigila desde un recodo del Río San Juan la antigua ruta entre el Caribe y el Lago Cocibolca, codiciada por piratas e imperios. A sus pies, el pueblito de El Castillo vive del río, la pesca y el turismo.",
        "Su episodio más célebre ocurrió en 1762, cuando Rafaela Herrera —hija del comandante fallecido— dirigió con 19 años la artillería que rechazó el asalto británico. La fortaleza es hoy museo y uno de los conjuntos coloniales mejor conservados del país."
      ],
      datos: [["Construcción", "1675"], ["Heroína", "Rafaela Herrera · 1762"], ["Río", "San Juan"]],
      regionId: "caribe-sur", pueblo: ["mestizo"], icon: "iglesia", foto: "assets/img/lugares/el-castillo.jpg", galeria: [], color: ["#6F4E37", "#a07850"] },
    { id: "cerro-negro", nombre: "Cerro Negro", tipo: "Volcán", region: "Pacífico · León",
      descripcion: "El volcán más joven de Centroamérica (nació en 1850): un cono de arena negra donde se practica el descenso en tabla, único en el mundo.",
      detalle: [
        "El Cerro Negro emergió de la llanura leonesa en 1850 y desde entonces ha crecido con cada erupción. Su cono de gravilla volcánica negra, sin vegetación, parece un paisaje de otro planeta a solo una hora de León.",
        "Es famoso mundialmente por el 'volcano boarding': el descenso en tabla por sus laderas de arena volcánica, que lo convirtió en uno de los destinos de aventura más singulares de América."
      ],
      datos: [["Nacimiento", "1850"], ["Rasgo", "Volcán más joven de C.A."], ["Aventura", "Descenso en tabla"]],
      regionId: "pacifico", pueblo: ["mestizo"], icon: "volcan", foto: "assets/img/lugares/cerro-negro.jpg", galeria: [], color: ["#2D2D2D", "#5a574f"] },
    { id: "mombacho", nombre: "Volcán Mombacho", tipo: "Volcán · Reserva natural", region: "Pacífico · Granada",
      descripcion: "El guardián de Granada: un volcán de cumbre siempre nublada cuyo bosque enano alberga orquídeas, monos y especies únicas. Su antigua erupción formó las Isletas.",
      detalle: [
        "El Mombacho se alza junto a Granada con su cumbre envuelta en nubes. Su cráter apagado sostiene un bosque nuboso enano con cientos de especies de orquídeas, bromelias y la salamandra del Mombacho, que no existe en ningún otro lugar del mundo.",
        "Una erupción antigua de su ladera lanzó al lago los materiales que hoy forman las 365 Isletas de Granada. Sus senderos entre fumarolas y miradores regalan la mejor vista del Gran Lago."
      ],
      datos: [["Tipo", "Volcán apagado"], ["Ecosistema", "Bosque nuboso enano"], ["Herencia", "Isletas de Granada"]],
      regionId: "pacifico", pueblo: ["mestizo"], icon: "volcan", foto: "assets/img/lugares/mombacho.jpg", galeria: [], color: ["#1f6f3f", "#3da06a"] },
    { id: "el-viejo", nombre: "El Viejo y su Basílica", tipo: "Ciudad santuario", region: "Pacífico · Chinandega",
      descripcion: "Hogar de la Virgen del Trono, patrona de Nicaragua. Cada 6 de diciembre, la Lavada de la Plata reúne a miles de devotos en su Basílica menor.",
      detalle: [
        "El Viejo guarda la imagen de la Inmaculada Concepción conocida como la Virgen del Trono, venerada desde el siglo XVI y proclamada patrona de Nicaragua. Su templo, elevado a Basílica menor, es el gran santuario mariano del occidente.",
        "Su tradición más querida es la Lavada de la Plata: cada 6 de diciembre, los devotos limpian pieza a pieza los ornamentos de plata de la Virgen, en una ceremonia que mezcla fe, herencia y comunidad."
      ],
      datos: [["Devoción", "Virgen del Trono"], ["Tradición", "Lavada de la Plata · 6 dic"], ["Templo", "Basílica menor"]],
      regionId: "pacifico", pueblo: ["mestizo"], icon: "iglesia", foto: "assets/img/lugares/el-viejo.jpg", galeria: [], color: ["#9a6b00", "#FFC300"] },
    { id: "matagalpa-ciudad", nombre: "Matagalpa", tipo: "Ciudad de montaña", region: "Centro-Norte · Matagalpa",
      descripcion: "La 'Perla del Septentrión': ciudad cafetalera entre montañas, territorio de la comunidad indígena matagalpa y puerta de las reservas nubladas del norte.",
      detalle: [
        "Matagalpa creció entre cerros cafetaleros y conserva el nombre de su pueblo originario, cuya comunidad indígena mantiene vivas sus tierras comunales. Su catedral de piedra y su clima fresco la hacen inconfundible.",
        "Es la capital nacional del café: desde sus fincas y beneficios sale gran parte del grano del país, y sus reservas de bosque nuboso —como el cerro Apante— invitan a caminar entre neblina, helechos gigantes y quetzales."
      ],
      datos: [["Apodo", "Perla del Septentrión"], ["Cultivo", "Café de altura"], ["Pueblo", "Matagalpa-Cacaopera"]],
      regionId: "centro", pueblo: ["cacaopera", "mestizo"], icon: "maiz", foto: "assets/img/lugares/matagalpa.jpg", galeria: [], color: ["#8A6A2F", "#A8852F"] },
    { id: "esteli", nombre: "Estelí", tipo: "Ciudad · murales y tabaco", region: "Centro-Norte · Estelí",
      descripcion: "El 'Diamante de las Segovias': ciudad de murales, capital mundial del puro y base para las reservas de Miraflor y el paisaje del norte.",
      detalle: [
        "Estelí —cuyo nombre viene de la lengua matagalpa— es famosa por sus murales que cubren la ciudad de historia y color, y por sus fábricas de puros consideradas entre las mejores del mundo, herederas del saber tabacalero.",
        "A sus puertas se abren la reserva de Miraflor, con sus bosques de neblina y orquídeas, y los paisajes del río Estanzuela con su salto de agua: la Nicaragua fresca y campesina del norte."
      ],
      datos: [["Apodo", "Diamante de las Segovias"], ["Oficio", "Tabaco y murales"], ["Reserva", "Miraflor"]],
      regionId: "centro", pueblo: ["cacaopera", "mestizo"], icon: "estrella", foto: "assets/img/lugares/esteli.jpg", galeria: [], color: ["#6b4a86", "#9a7bbf"] }
  ],

  /* ---------- Categorías principales ---------- */
  categorias: [
    { nombre: "Pueblos y Etnias", ico: "👥", tipo: "pueblos" },
    { nombre: "Comidas Típicas", ico: "🍲", tipo: "recetas" },
    { nombre: "Danzas y Música", ico: "💃", tipo: "danzas" },
    { nombre: "Tradiciones y Festividades", ico: "🎉", tipo: "tradiciones" },
    { nombre: "Cuentos y Leyendas", ico: "🗣️", tipo: "oral" },
    { nombre: "Lugares Turísticos", ico: "🗺️", tipo: "lugares" },
    { nombre: "Diccionario Intercultural", ico: "💬", href: "diccionario.html" },
    { nombre: "Trivia Cultural", ico: "🎮", href: "trivia.html" },
    { nombre: "Calendario Cultural", ico: "📅", href: "calendario.html" },
    { nombre: "Modo Presentación", ico: "📽️", href: "exposicion.html" },
    { nombre: "Documentos y Patrimonio", ico: "📄", tipo: "documentos" },
    { nombre: "Medicina Tradicional", ico: "🌿", tipo: "oral" },
    { nombre: "Artesanías", ico: "🧺", tipo: "tradiciones" }
  ],

  etiquetas: [
    "identidad", "autonomía", "oralidad", "tradición", "ancestral", "territorio",
    "naturaleza", "pesca", "agricultura", "medicina", "lengua", "artesanía",
    "familia", "gastronomía", "coco", "maíz", "danza", "música", "historia",
    "memoria", "educación", "leyenda", "volcán", "colonial", "unesco", "folclor"
  ],

  /* ---------- Tradición oral y cosmovisión ---------- */
  oral: [
    { id: 1, n: 1, titulo: "Liwa Mairin — la Sirena / Madre del Agua", origen: "Mískitu", icon: "agua", foto: "assets/img/oral/liwa-mairin.webp",
      texto: "Espíritu femenino del agua que habita ríos, lagunas y mar. En la cosmovisión mískita protege la vida acuática y se asocia a la 'liwa', dolencia provocada por faltar el respeto al agua.",
      detalle: [
        "Se le describe como una mujer de larga cabellera que vive en pozas y arrecifes. Pescadores y buzos transmiten relatos de encuentros con ella, y la tradición aconseja pedir permiso al agua antes de pescar o navegar.",
        "Cuando alguien enferma de 'liwa', es el sukya quien interviene para sanarlo. Liwa Mairin es, a la vez, mito, norma de respeto al agua y enseñanza ecológica que se transmite oralmente."
      ],
      tags: ["oralidad", "naturaleza", "ancestral"], galeria: [] },
    { id: 2, n: 2, titulo: "El Sukya — guía espiritual y sanador", origen: "Mískitu", icon: "palmera", foto: "assets/img/oral/sukya.jpg",
      texto: "Figura tradicional que cura, interpreta los sueños y media con el mundo de los espíritus. Conserva el conocimiento de plantas medicinales y rituales de la comunidad.",
      detalle: [
        "El sukya combina el conocimiento de las plantas, los sueños y los cantos. Su papel es central en momentos de enfermedad, conflicto o duelo, y representa la continuidad del saber espiritual de la comunidad.",
        "Es respetado como autoridad moral y médica tradicional, y su conocimiento convive hoy con la medicina occidental dentro del modelo de salud intercultural de la región."
      ],
      tags: ["medicina", "ritual", "memoria"],
      galeria: [ { src: "assets/img/oral/sukya-1.webp", cap: "Medicina tradicional", desc: "El sukya conserva el conocimiento de plantas medicinales y rituales de sanación." } ] },
    { id: 3, n: 3, titulo: "Isingni — los espíritus de los ancestros", origen: "Mískitu", icon: "estrella", foto: "assets/img/oral/isingni.jpg",
      texto: "Creencia en la presencia de los espíritus de quienes han partido, que acompañan y vigilan a la comunidad. Estructura los ritos funerarios y el respeto a los mayores.",
      detalle: [
        "Los relatos sobre los isingni enseñan a honrar a los mayores y a mantener vivas las historias familiares.",
        "Forman parte de la manera en que las comunidades entienden la vida, la muerte y la memoria colectiva, y de los rituales que acompañan el duelo."
      ],
      tags: ["ancestral", "memoria", "ritual"], galeria: [] },
    { id: 4, n: 4, titulo: "El Duende del monte", origen: "Costa Caribe", icon: "palmera", foto: "assets/img/oral/duende.jpg",
      texto: "Guardián de los animales y del bosque presente en relatos de varias comunidades; castiga la caza y la tala excesivas, transmitiendo un mensaje de respeto a la naturaleza.",
      detalle: [
        "En los relatos, quien abusa del bosque puede perderse o enfermar; quien lo respeta recibe su protección.",
        "Es una forma de transmitir, de generación en generación, normas de cuidado del territorio y de los recursos naturales que sostienen a las comunidades."
      ],
      tags: ["naturaleza", "oralidad", "territorio"],
      galeria: [
        { src: "assets/img/oral/duende-1.jpg", cap: "El duende del monte", desc: "Guardián de los animales, castiga a quien abusa del bosque." },
        { src: "assets/img/oral/duende-2.jpg", cap: "Relatos del bosque", desc: "Los relatos enseñan a respetar la naturaleza y a sus criaturas." }
      ] },
    { id: 5, n: 5, titulo: "El origen del King Pulanka", origen: "Mískitu", icon: "corona", foto: "assets/img/oral/king-pulanka.jpg",
      texto: "Tradición oral y teatral que recuerda la época del 'Reino de la Mosquitia' y su relación con la corona británica, recreada cada año con danza, música y sátira.",
      detalle: [
        "Durante la representación, los participantes asumen papeles como el rey, la reina y los soldados, mezclando memoria histórica, humor y crítica social.",
        "Es una de las expresiones escénicas más singulares del Caribe nicaragüense y un momento de encuentro y orgullo para las comunidades mískitas."
      ],
      tags: ["historia", "danza", "tradición"],
      galeria: [
        { src: "assets/img/oral/king-pulanka-1.jpeg", cap: "Danza y alegría", desc: "La danza del King Pulanka mezcla memoria histórica, música y humor." },
        { src: "assets/img/oral/king-pulanka-2.webp", cap: "Tradición mískita", desc: "Personajes como el rey y la reina recrean la época de la Mosquitia." }
      ] },
    { id: 6, n: 6, titulo: "Relatos de la mar y el cayuco", origen: "Mískitu · Rama", icon: "cayuco", foto: "assets/img/oral/cayuco.jpg",
      texto: "Saberes transmitidos oralmente sobre la navegación guiada por las estrellas, las mareas y el comportamiento de peces y tortugas, base de la pesca artesanal.",
      detalle: [
        "Estos saberes incluyen señales del cielo, el viento y el comportamiento de los animales para predecir el tiempo y encontrar bancos de pesca.",
        "Es conocimiento transmitido de padres a hijos a bordo del cayuco, que une la vida práctica con la cosmovisión de los pueblos costeros."
      ],
      tags: ["pesca", "oralidad", "naturaleza"],
      galeria: [
        { src: "assets/img/oral/cayuco-1.png", cap: "Relatos del mar", desc: "El conocimiento del mar y las estrellas guía la pesca y la navegación." },
        { src: "assets/img/oral/cayuco-2.jpg", cap: "El cayuco", desc: "Medio tradicional para navegar ríos y costa." }
      ] },
    { id: 7, n: 7, titulo: "La Carreta Nagua", origen: "Todo el país", icon: "estrella", foto: "assets/img/oral/carreta-nagua.jpg",
      pueblo: ["mestizo"],
      texto: "Carreta fantasma que recorre las calles a medianoche conducida por la Muerte, con un traqueteo de huesos y cadenas. Donde se detiene, anuncia desgracia.",
      detalle: [
        "Cuentan que en las noches sin luna se escucha el chirrido de una carreta destartalada tirada por bueyes esqueléticos. Nadie debe asomarse a verla: quien la mira queda 'jugado' por el espanto. Su nombre se asocia a las carretas que en tiempos coloniales se llevaban a los indígenas a trabajos forzados, de donde muchos no volvían.",
        "Es una de las leyendas más extendidas de Nicaragua y resume el miedo y la memoria del dolor colonial convertidos en relato popular, transmitido de abuelos a nietos en las noches de los barrios y los pueblos."
      ],
      tags: ["leyenda", "oralidad", "memoria"], galeria: [] },
    { id: 8, n: 8, titulo: "El Cadejo", origen: "Todo el país", icon: "estrella", foto: "assets/img/oral/cadejo.jpg",
      pueblo: ["mestizo"],
      texto: "Dos perros espectrales recorren los caminos de noche: el cadejo blanco protege al caminante; el negro, con ojos de fuego, busca perderlo.",
      detalle: [
        "La leyenda del Cadejo habla de la eterna lucha entre el bien y el mal: el perro blanco acompaña y cuida a quien camina de madrugada —al trabajador, al estudiante, al trasnochador— mientras el negro acecha a los que andan en malos pasos.",
        "Se dice que no hay que llamarlo ni silbarle de noche. Presente en todo el país y en buena parte de Centroamérica, es de los espantos más queridos del imaginario nicaragüense."
      ],
      tags: ["leyenda", "oralidad"], galeria: [] },
    { id: 9, n: 9, titulo: "La Cegua", origen: "Pacífico y centro del país", icon: "estrella", foto: "assets/img/oral/cegua.jpg",
      pueblo: ["mestizo", "chorotega"],
      texto: "Mujer de hermosa figura que aparece de noche a los hombres enamorados; al acercarse revela un rostro de caballo o calavera y los deja 'jugados' del susto.",
      detalle: [
        "La Cegua —del náhuat 'cihuatl', mujer— espera en los caminos solitarios a los mujeriegos y trasnochadores. De lejos es una mujer de cabellera larga y voz dulce; de cerca, su rostro espanta hasta quitar el habla.",
        "Los abuelos enseñan la contraseña para librarse de ella, con granos de mostaza o volteándole la camisa. Como muchas leyendas nicas, es a la vez espanto y lección de conducta contada con humor."
      ],
      tags: ["leyenda", "oralidad"], galeria: [] },
    { id: 10, n: 10, titulo: "La Mocuana", origen: "Sébaco · Matagalpa", icon: "agua", foto: "assets/img/oral/mocuana.jpg",
      pueblo: ["cacaopera", "mestizo"],
      texto: "Hija de un cacique de Sébaco, traicionada por un español que codiciaba el tesoro de su pueblo. Su espíritu vaga por los cerros llamando a los caminantes hacia su cueva.",
      detalle: [
        "La leyenda cuenta que el cacique de Sébaco confió a su hija el secreto del tesoro del pueblo. Un joven español la enamoró para robarlo y la dejó encerrada en una cueva; ella escapó por túneles, pero perdió la razón por la traición.",
        "Desde entonces, en los cerros de Sébaco y La Trinidad se aparece como una mujer que llama con voz dulce a los hombres hacia su cueva, de donde pocos regresan. Es la gran leyenda del norte y memoria del despojo colonial."
      ],
      tags: ["leyenda", "historia", "territorio"], galeria: [] },
    { id: 11, n: 11, titulo: "La Llorona", origen: "Todo el país", icon: "agua", foto: "assets/img/oral/llorona.jpg",
      pueblo: ["mestizo"],
      texto: "Alma en pena que recorre ríos y quebradas gritando por su hijo perdido. Su llanto lejano suena cerca, y cuando suena cerca… está lejos.",
      detalle: [
        "En la versión nicaragüense, una joven madre perdió o ahogó a su hijo en el río y fue condenada a buscarlo por toda la eternidad. Su grito —'¡Mi hijooo!'— eriza la piel de quien lo escucha junto a las corrientes de agua.",
        "Cada pueblo tiene su variante junto a su propio río o poza, y los mayores la usan para alejar a la niñez de las aguas peligrosas: leyenda, advertencia y memoria del dolor convertidas en una sola voz."
      ],
      tags: ["leyenda", "oralidad", "naturaleza"], galeria: [] },
    { id: 12, n: 12, titulo: "Chico Largo y el Charco Verde", origen: "Isla de Ometepe", icon: "volcan", foto: "assets/img/oral/chico-largo.jpg",
      pueblo: ["nahoa", "mestizo"],
      texto: "Brujo guardián de la laguna del Charco Verde, en Ometepe. A quienes hacen tratos con él los convierte en ganado, pagando con su libertad la riqueza fácil.",
      detalle: [
        "Cuentan en Ometepe que Chico Largo, heredero de los poderes del cacique nahoa, cuida el Charco Verde y sus tesoros. Quien quiere riqueza puede pactar con él… pero al morir su alma queda convertida en res, destinada al matadero.",
        "La leyenda protege de hecho un paraje natural sagrado para los isleños y enseña que la codicia se paga. Es la historia más contada de la isla y atrae a visitantes curiosos hasta la reserva del Charco Verde."
      ],
      tags: ["leyenda", "naturaleza", "ancestral"], galeria: [] },
    { id: 13, n: 13, titulo: "El Barco Negro", origen: "Lago Cocibolca", icon: "cayuco", foto: "assets/img/oral/barco-negro.jpg",
      pueblo: ["mestizo"],
      texto: "Un barco fantasma recorre el Gran Lago en las noches de tormenta, tripulado por almas condenadas por no socorrer a los náufragos. Quien lo ve, no vuelve a navegar tranquilo.",
      detalle: [
        "Cuentan los lancheros del Cocibolca que en noches de mal tiempo aparece un barco de velas negras que navega contra el viento. Es la nave de una tripulación que ignoró los gritos de unos náufragos y quedó condenada a vagar por el lago sin puerto.",
        "La leyenda —recogida por la tradición oral y llevada a la literatura por los cuentistas nacionales— es la gran historia de espanto de las aguas dulces de Nicaragua, y una lección sobre la solidaridad que el lago exige."
      ],
      tags: ["leyenda", "naturaleza", "oralidad"], galeria: [] },
    { id: 14, n: 14, titulo: "La Novia de Tola", origen: "Tola · Rivas", icon: "estrella", foto: "assets/img/oral/novia-de-tola.jpg",
      pueblo: ["mestizo", "nahoa"],
      texto: "La novia que quedó vestida y esperando en el altar de Tola. Su historia hizo proverbio: en Nicaragua, a quien dejan plantado 'lo dejaron como la novia de Tola'.",
      detalle: [
        "La tradición cuenta que en el pueblo de Tola, Rivas, una joven llamada Hilaria esperó vestida de novia a un prometido que nunca llegó a la iglesia: el hombre huyó o se casó con otra, según la versión que se cuente.",
        "El pueblo convirtió el desaire en refrán nacional, y la 'Novia de Tola' pasó de chisme de pueblo a figura del folclor: hoy una estatua la recuerda en el parque de Tola, eternamente vestida para una boda que no fue."
      ],
      tags: ["leyenda", "historia", "identidad"], galeria: [] },
    { id: 15, n: 15, titulo: "El Padre sin Cabeza", origen: "León y ciudades coloniales", icon: "iglesia", foto: "assets/img/oral/padre-sin-cabeza.jpg",
      pueblo: ["mestizo"],
      texto: "Un sacerdote decapitado recorre de madrugada las calles cercanas a iglesias y conventos, buscando quien rece por su alma o guardando un secreto que se llevó a la tumba.",
      detalle: [
        "Entre las iglesias coloniales de León —y en tantas otras ciudades— se aparece la figura de un sacerdote con sotana… y sin cabeza. Unos dicen que fue asesinado sin confesión; otros, que paga una culpa o protege un tesoro de su parroquia.",
        "Quien se lo topa queda mudo del susto. Es una de las leyendas coloniales más extendidas del país, hermana de espantos que recorren toda Hispanoamérica, con sello leonés propio."
      ],
      tags: ["leyenda", "colonial", "oralidad"], galeria: [] },
    { id: 16, n: 16, titulo: "El Punche de Oro", origen: "Chinandega · costas del occidente", icon: "cangrejo", foto: "assets/img/oral/punche-de-oro.jpg",
      pueblo: ["mestizo"],
      texto: "Un cangrejo de oro macizo aparece en las playas del occidente en Semana Santa. Persigue a los codiciosos que intentan atraparlo… y los pierde entre los esteros.",
      detalle: [
        "En los esteros y playas de Chinandega se cuenta que, en los días santos, un punche (cangrejo) de oro reluciente sale a caminar sobre la arena. Quien lo persigue por codicia se adentra tras él en el manglar y termina extraviado o embrujado.",
        "Como muchas leyendas de tesoros, enseña que la riqueza fácil encanta y castiga: el punche brilla para todos, pero solo se deja ver de quien no lo persigue."
      ],
      tags: ["leyenda", "naturaleza", "oralidad"], galeria: [] },
    { id: 17, n: 17, titulo: "El espectro de Arrechavala", origen: "León", icon: "estrella", foto: "assets/img/oral/arrechavala.jpg",
      pueblo: ["mestizo"],
      texto: "El coronel realista Joaquín de Arrechavala cabalga de noche por las calles de León: un jinete colonial que no encuentra descanso y espanta a los trasnochadores.",
      detalle: [
        "Joaquín de Arrechavala existió: fue un poderoso militar realista del León colonial. La tradición lo condenó a cabalgar eternamente: de medianoche, se escuchan los cascos de su caballo por los barrios viejos y quien lo ve queda 'jugado' del susto.",
        "Unos dicen que busca sus riquezas enterradas; otros, que paga sus abusos en vida. Es la leyenda leonesa por excelencia, donde la historia real y el espanto cabalgan juntos."
      ],
      tags: ["leyenda", "historia", "colonial"], galeria: [] }
  ],

  /* ---------- Recetas tradicionales (pasos detallados + galería) ---------- */
  recetas: [
    { id: 1, n: 1, titulo: "Rondón (Rundown)", comunidad: "Creole · Mískitu", icon: "pez", foto: "assets/img/recetas/rondon.jpg",
      tiempo: "60 min", porciones: "4–6", dificultad: "Media",
      texto: "Plato emblemático del Caribe: pescado y mariscos cocidos lentamente en leche de coco hasta lograr un caldo espeso y aromático.",
      detalle: "El rondón (del inglés 'run down') es quizás el plato más representativo del Caribe nicaragüense. Reúne lo mejor del mar y de la tierra en una sola olla, cocido pacientemente en leche de coco. Cada familia tiene su propia versión.",
      ingredientes: ["2 lb de pescado fresco y mariscos (camarón, caracol o cangrejo)", "2 cocos grandes (para la leche)", "1 lb de yuca", "2 plátanos verdes", "1 lb de quequisque", "1 cebolla y 3 dientes de ajo", "1 chile panameño (al gusto)", "Sal, pimienta y culantro"],
      pasos: [
        "Parte los cocos, extrae la pulpa y rállala. Exprímela con agua tibia y reserva por separado la primera leche (espesa) y la segunda (más ligera).",
        "Pela y corta en trozos medianos la yuca, el quequisque y los plátanos verdes.",
        "Limpia bien el pescado y los mariscos; sazónalos con sal, pimienta, ajo y un poco de jugo de limón.",
        "En una olla grande vierte la segunda leche de coco y lleva a fuego medio.",
        "Agrega la yuca, el quequisque y el plátano; cocina de 10 a 15 minutos hasta que empiecen a ablandarse.",
        "Incorpora la cebolla, el ajo y el chile panameño entero (aroma sin exceso de picante).",
        "Añade el pescado y los mariscos y cocina de 8 a 10 minutos.",
        "Vierte la primera leche de coco (la espesa) y mueve con suavidad.",
        "Cocina a fuego bajo, sin dejar que hierva fuerte, hasta que el caldo espese y tome color y aroma.",
        "Rectifica la sal, retira el chile y agrega culantro fresco.",
        "Sirve caliente, acompañado de plátano cocido o pan de coco."
      ],
      consejo: "No dejes que la leche de coco hierva fuerte para que no se corte: cocina siempre a fuego suave.",
      galeria: [ { src: "assets/img/recetas/rondon-1.jpg", cap: "Rondón servido", desc: "Se sirve bien caliente, con sus trozos de tubérculos y plátano." } ],
      tags: ["gastronomía", "coco", "pesca"] },
    { id: 2, n: 2, titulo: "Rice and Beans (con coco)", comunidad: "Creole · Caribe", icon: "maiz", foto: "assets/img/recetas/rice-and-beans.jpg",
      tiempo: "45 min", porciones: "4", dificultad: "Fácil",
      texto: "Arroz y frijoles rojos cocidos en leche de coco, base de la mesa caribeña, servido con pollo, pescado o carne.",
      detalle: "El rice and beans es el acompañante por excelencia de la Costa Caribe. A diferencia del gallo pinto del Pacífico, se cocina en leche de coco, lo que le da un sabor y aroma inconfundibles.",
      ingredientes: ["2 tazas de arroz", "1 taza de frijoles rojos", "2 tazas de leche de coco", "1 ramita de tomillo", "½ cebolla y 2 dientes de ajo", "1 chile panameño", "Sal al gusto"],
      pasos: [
        "Remoja los frijoles rojos desde la noche anterior para acortar la cocción.",
        "Cuécelos en abundante agua hasta que estén suaves; reserva los frijoles y su caldo.",
        "Ralla y exprime el coco para obtener la leche.",
        "En una olla, sofríe ligeramente la cebolla y el ajo.",
        "Agrega la leche de coco, el caldo de frijoles, el tomillo y el chile entero.",
        "Incorpora el arroz lavado y los frijoles.",
        "Sazona con sal y mezcla una sola vez.",
        "Tapa y cocina a fuego bajo hasta que el líquido se absorba.",
        "Apaga el fuego y deja reposar 5 minutos tapado.",
        "Esponja con un tenedor y sirve con pollo, pescado o carne."
      ],
      consejo: "Usa una parte de líquido por media de arroz y no destapes durante la cocción para que quede suelto.",
      galeria: [ { src: "assets/img/recetas/rice-and-beans-1.jpg", cap: "Rice and beans", desc: "Acompaña casi cualquier plato de la mesa caribeña." } ],
      tags: ["gastronomía", "coco", "familia"] },
    { id: 3, n: 3, titulo: "Pan de coco", comunidad: "Garífuna · Creole", icon: "palmera", foto: "assets/img/recetas/pan-de-coco.jpg",
      tiempo: "2 h (con leudado)", porciones: "8 panes", dificultad: "Media",
      texto: "Pan suave y ligeramente dulce elaborado con coco rallado y leche de coco; acompaña sopas y bebidas tradicionales.",
      detalle: "El pan de coco es uno de los panes más queridos del Caribe. Su miga suave y su aroma a coco lo hacen perfecto para acompañar el rondón, la sopa de cangrejo o un café.",
      ingredientes: ["4 tazas de harina", "1 taza de coco rallado", "1 taza de leche de coco tibia", "2 cdas de azúcar", "1 sobre de levadura", "1 cdta de sal", "2 cdas de manteca o mantequilla"],
      pasos: [
        "Disuelve la levadura y el azúcar en la leche de coco tibia; deja espumar 10 minutos.",
        "En un bol grande mezcla la harina, la sal y el coco rallado.",
        "Agrega la manteca y la mezcla de levadura.",
        "Amasa de 8 a 10 minutos hasta lograr una masa suave y elástica.",
        "Cubre con un paño y deja leudar en lugar tibio hasta que doble su tamaño (1 hora aprox.).",
        "Desgasifica la masa, divide en porciones y forma los panes.",
        "Colócalos en una bandeja y deja leudar de nuevo 30 minutos.",
        "Pincela con un poco de leche de coco.",
        "Hornea a 180 °C / 350 °F durante 20–25 minutos hasta dorar.",
        "Deja enfriar sobre una rejilla antes de servir."
      ],
      consejo: "Si la masa queda pegajosa, añade harina poco a poco; el aceite del coco la suaviza al hornear.",
      galeria: [ { src: "assets/img/recetas/pan-de-coco-1.jpg", cap: "Pan de coco", desc: "Recién horneado, dorado y aromático." } ],
      tags: ["gastronomía", "coco", "tradición"] },
    { id: 4, n: 4, titulo: "Wabul", comunidad: "Mískitu", icon: "cayuco", foto: "assets/img/recetas/wabul.jpg",
      tiempo: "20 min", porciones: "2–3", dificultad: "Fácil",
      texto: "Plátano o banano maduro machacado y mezclado con leche de coco; bebida-alimento de uso diario muy nutritiva.",
      detalle: "El wabul es un alimento básico del pueblo mískitu. Nutritivo y energético, acompaña la jornada de pesca o de trabajo en el campo desde tiempos ancestrales.",
      ingredientes: ["4 plátanos o bananos maduros", "1½ tazas de leche de coco", "1 taza de agua", "1 pizca de sal"],
      pasos: [
        "Pela los plátanos o bananos maduros.",
        "Cuécelos en agua (o ásalos) hasta que estén muy suaves.",
        "Escúrrelos y colócalos en un recipiente.",
        "Machácalos con un mazo o tenedor hasta obtener un puré liso.",
        "Ralla y exprime el coco para extraer la leche.",
        "Incorpora la leche de coco poco a poco mientras mezclas.",
        "Agrega agua hasta lograr la consistencia de una bebida espesa.",
        "Añade una pizca de sal y mezcla bien.",
        "Sirve tibio, como desayuno o alimento para la jornada."
      ],
      consejo: "Entre más maduro el plátano, más dulce y aromático queda el wabul, sin necesidad de azúcar.",
      galeria: [ { src: "assets/img/recetas/wabul-1.jpg", cap: "Wabul", desc: "Alimento-bebida nutritivo del día a día mískitu." } ],
      tags: ["gastronomía", "coco", "ancestral"] },
    { id: 5, n: 5, titulo: "Sopa de cangrejo (Crab soup)", comunidad: "Creole · Islas del Maíz", icon: "cangrejo", foto: "assets/img/recetas/sopa-de-cangrejo.jpg",
      tiempo: "60 min", porciones: "4", dificultad: "Media",
      texto: "Plato central del Festival del Cangrejo: cangrejo cocido en leche de coco con tubérculos y bolitas de masa (dumplings).",
      detalle: "La sopa de cangrejo es el alma del Festival del Cangrejo de las Islas del Maíz, que se celebra cada agosto en el Día de la Emancipación. Es un plato de fiesta, abundante y lleno de sabor.",
      ingredientes: ["4–6 cangrejos limpios", "3 tazas de leche de coco", "1 lb de yuca y quequisque", "2 plátanos", "1 taza de harina (para los dumplings)", "1 cebolla, 2 dientes de ajo y 1 chile panameño", "Sal y pimienta"],
      pasos: [
        "Limpia y cepilla muy bien los cangrejos bajo agua corriente.",
        "Pela y corta la yuca, el quequisque y los plátanos en trozos.",
        "Prepara los dumplings: mezcla harina, sal y un poco de agua hasta una masa firme; forma bolitas o cilindros.",
        "Ralla y exprime el coco para obtener la leche.",
        "En una olla grande vierte la leche de coco y lleva a hervor suave.",
        "Agrega la yuca, el quequisque y el plátano; cocina 10 minutos.",
        "Incorpora los cangrejos, la cebolla, el ajo y el chile.",
        "Añade los dumplings y cocina de 15 a 20 minutos.",
        "Sazona con sal y pimienta.",
        "Sirve bien caliente; el cangrejo se disfruta con las manos."
      ],
      consejo: "Usa cangrejos frescos del día: es el secreto del sabor en el Festival del Cangrejo de las Islas del Maíz.",
      galeria: [ { src: "assets/img/recetas/sopa-de-cangrejo-1.jpg", cap: "Sopa de cangrejo", desc: "El plato central del Festival del Cangrejo." } ],
      tags: ["gastronomía", "coco", "pesca"] },
    { id: 6, n: 6, titulo: "Pati (Patty)", comunidad: "Creole", icon: "casa", foto: "assets/img/recetas/pati.jpg",
      tiempo: "50 min", porciones: "6", dificultad: "Media",
      texto: "Empanada horneada de masa dorada rellena de carne molida bien condimentada y picante; clásico bocado callejero del Caribe.",
      detalle: "El pati es el bocado callejero por excelencia de la Costa Caribe. Su masa dorada y su relleno picante lo hacen irresistible a cualquier hora del día.",
      ingredientes: ["3 tazas de harina", "¾ taza de manteca o mantequilla", "1 lb de carne molida", "1 cebolla y 1 chile panameño", "1 cdta de achiote/color (opcional)", "Tomillo, pimienta y sal", "Agua fría"],
      pasos: [
        "Mezcla la harina con la sal y la manteca hasta lograr una textura arenosa.",
        "Agrega agua fría poco a poco y forma una masa; deja reposar 20 minutos.",
        "Sofríe la cebolla, agrega la carne molida y cocínala.",
        "Condimenta con chile panameño, especias y un toque de achiote.",
        "Deja que el relleno seque y enfríe un poco.",
        "Estira la masa y corta círculos del tamaño de un plato pequeño.",
        "Coloca relleno en una mitad de cada círculo.",
        "Dobla en media luna y sella los bordes presionando con un tenedor.",
        "Pincela con huevo o leche para que dore.",
        "Hornea a 190 °C / 375 °F durante 20–25 minutos hasta dorar."
      ],
      consejo: "El pati tradicional es picante; ajusta la cantidad de chile panameño a tu gusto.",
      galeria: [
        { src: "assets/img/recetas/pati-1.jpg", cap: "Pati", desc: "Dorado y relleno de carne especiada." },
        { src: "assets/img/recetas/pati-2.jpg", cap: "Bocado callejero", desc: "Un clásico de las calles del Caribe nicaragüense." }
      ],
      tags: ["gastronomía", "tradición"] },
    { id: 7, n: 7, titulo: "Journey Cake (Johnny Cake)", comunidad: "Creole", icon: "canasta", foto: "assets/img/recetas/journey-cake.jpg",
      tiempo: "30 min", porciones: "6", dificultad: "Fácil",
      texto: "Pan plano horneado de harina y coco, firme y versátil; tradicionalmente preparado para los viajes, de ahí su nombre.",
      detalle: "El journey cake (o johnny cake) acompañaba a los viajeros por su firmeza y duración. Hoy es infaltable en el desayuno caribeño junto al café o el queso.",
      ingredientes: ["3 tazas de harina", "½ taza de coco rallado", "1 cda de polvo de hornear", "1 cdta de sal", "3 cdas de manteca", "¾ taza de agua o leche de coco"],
      pasos: [
        "Mezcla la harina, el coco, el polvo de hornear y la sal.",
        "Incorpora la manteca con las yemas de los dedos hasta integrar.",
        "Agrega el agua o la leche de coco poco a poco.",
        "Forma una masa firme pero manejable; no la trabajes en exceso.",
        "Divide en porciones y forma discos planos de 1 cm de grosor.",
        "Pincha la superficie con un tenedor.",
        "Hornea a 200 °C / 400 °F (o cocina en comal) hasta dorar por ambos lados.",
        "Deja enfriar ligeramente.",
        "Sirve con café, queso, mantequilla o como acompañante de sopas."
      ],
      consejo: "Su nombre viene de 'journey' (viaje): se preparaba firme para durar varios días en el camino.",
      galeria: [ { src: "assets/img/recetas/journey-cake-1.jpeg", cap: "Journey cake", desc: "Firme y versátil, ideal para acompañar sopas y café." } ],
      tags: ["gastronomía", "coco", "tradición"] },
    { id: 8, n: 8, titulo: "Tableta de coco", comunidad: "Toda la Costa", icon: "sol", foto: "assets/img/recetas/tableta-de-coco.jpg",
      tiempo: "40 min", porciones: "12", dificultad: "Fácil",
      texto: "Dulce tradicional de coco rallado cocido con dulce de panela y jengibre hasta cuajar en tabletas.",
      detalle: "La tableta de coco es la golosina tradicional del Caribe. Dulce, con un toque de jengibre, se vende en mercados y calles y endulza la infancia de toda la región.",
      ingredientes: ["2 cocos rallados", "2 tazas de dulce de panela (o azúcar morena)", "1 trozo de jengibre rallado", "½ taza de agua"],
      pasos: [
        "Parte los cocos y ralla la pulpa.",
        "En una paila, disuelve la panela con el agua a fuego medio.",
        "Añade el jengibre rallado.",
        "Cuando el almíbar tome punto de hilo, incorpora el coco.",
        "Cocina revolviendo sin parar para que no se pegue.",
        "Continúa hasta que la mezcla espese y se despegue del fondo.",
        "Vierte cucharadas sobre una superficie engrasada o papel encerado.",
        "Da forma de tabletas y deja enfriar.",
        "Despega cuando estén firmes y guarda en recipiente cerrado."
      ],
      consejo: "El punto está listo cuando, al arrastrar la cuchara, se ve el fondo de la paila por un instante.",
      galeria: [
        { src: "assets/img/recetas/tableta-de-coco-1.jpg", cap: "Dulce de coco", desc: "Primo cercano de la tableta, igual de dulce." },
        { src: "assets/img/recetas/tableta-de-coco-2.jpg", cap: "Tabletas de coco", desc: "Listas para disfrutar como golosina tradicional." }
      ],
      tags: ["gastronomía", "coco"] },
    { id: 9, n: 9, titulo: "Bon (pan de jengibre)", comunidad: "Creole", icon: "libro", foto: "assets/img/recetas/bon.jpg",
      tiempo: "75 min", porciones: "1 pan", dificultad: "Media",
      texto: "Pan dulce oscuro especiado con jengibre y frutas, típico de las festividades de fin de año en el Caribe.",
      detalle: "El bon es el pan de las fiestas. Oscuro, especiado y cargado de frutas, perfuma las casas creoles en Navidad y fin de año, acompañado de un buen ginger beer.",
      ingredientes: ["4 tazas de harina", "1 taza de dulce de panela rallada", "2 cdtas de jengibre en polvo", "1 cdta de canela y ½ de clavo", "1 taza de frutas confitadas", "1 sobre de levadura (o polvo de hornear)", "1 taza de líquido tibio (agua o leche de coco)"],
      pasos: [
        "Activa la levadura en el líquido tibio con una cucharada de panela.",
        "Mezcla la harina con el jengibre, la canela y el clavo.",
        "Agrega la panela rallada y las frutas confitadas.",
        "Incorpora la levadura y forma una masa.",
        "Amasa y deja leudar hasta que crezca (1 hora aprox.).",
        "Coloca la masa en un molde engrasado.",
        "Deja reposar 20 minutos más.",
        "Hornea a 180 °C / 350 °F durante 40–45 minutos.",
        "Comprueba con un palillo que salga limpio.",
        "Deja enfriar antes de rebanar."
      ],
      consejo: "El bon se disfruta especialmente en Navidad y fin de año, acompañado de ginger beer.",
      galeria: [ { src: "assets/img/recetas/bon-1.jpg", cap: "Bon", desc: "Pan especiado típico de las fiestas de fin de año." } ],
      tags: ["gastronomía", "tradición", "familia"] },
    { id: 10, n: 10, titulo: "Refresco de jengibre (Ginger beer)", comunidad: "Creole · Garífuna", icon: "ola", foto: "assets/img/recetas/ginger-beer.jpg",
      tiempo: "20 min + reposo", porciones: "6 vasos", dificultad: "Fácil",
      texto: "Bebida refrescante de jengibre, agua y azúcar, fermentada ligeramente; infaltable en las celebraciones.",
      detalle: "El ginger beer es la bebida festiva del Caribe. Picante y refrescante a la vez, acompaña el bon en las fiestas y refresca los días calurosos de la costa.",
      ingredientes: ["1 taza de jengibre fresco rallado", "6 tazas de agua", "1 taza de azúcar (al gusto)", "Jugo de 1–2 limones", "Hielo"],
      pasos: [
        "Pela y ralla (o licúa) el jengibre fresco.",
        "Mézclalo con 2 tazas de agua.",
        "Cuela el líquido con un paño o colador fino para retirar la fibra.",
        "Agrega el resto del agua.",
        "Endulza con azúcar y revuelve hasta disolver.",
        "Añade el jugo de limón al gusto.",
        "Para una versión fermentada, deja reposar tapado a temperatura ambiente 1–2 días.",
        "Refrigera bien.",
        "Sirve con bastante hielo."
      ],
      consejo: "Para más intensidad, deja reposar el jengibre en el agua varias horas antes de colar.",
      galeria: [ { src: "assets/img/recetas/ginger-beer-1.avif", cap: "Refresco de jengibre", desc: "Servido bien frío, infaltable en las celebraciones." } ],
      tags: ["gastronomía", "tradición"] },
    { id: 11, n: 11, titulo: "Nacatamal", comunidad: "Mestizo · herencia nahoa", icon: "maiz", foto: "assets/img/recetas/nacatamal.jpg",
      pueblo: ["mestizo", "nahoa"],
      tiempo: "4–5 h", porciones: "10–12", dificultad: "Alta",
      texto: "El platillo más emblemático de Nicaragua: masa de maíz con cerdo, arroz, papa y hierbabuena, envuelta en hoja de plátano y cocida por horas. Su nombre viene del náhuat: nacatl (carne) + tamalli (tamal).",
      detalle: [
        "El nacatamal es el rey de la mesa nicaragüense y un rito de fin de semana: se prepara el sábado en familia y se desayuna el domingo con café negro y pan. Cada casa guarda su sazón, pero la esencia es la misma desde tiempos precolombinos: el maíz como centro de la vida.",
        "Su preparación reúne a varias manos —moler, lavar hojas, armar, amarrar— y por eso es también un acto comunitario que une generaciones."
      ],
      ingredientes: ["4 lb de masa de maíz", "1 taza de manteca de cerdo", "Jugo de 2 naranjas agrias", "2 lb de carne de cerdo en trozos (con achiote, ajo y sal)", "1 taza de arroz remojado", "2 papas en rodajas", "1 tomate y 1 cebolla en rodajas", "1 chiltoma en tiras", "Ramas de hierbabuena", "Ciruelas o pasas (opcional)", "Hojas de plátano soasadas y cabuya (cordel)"],
      pasos: [
        "Adoba la carne de cerdo con achiote, ajo, sal y naranja agria; deja reposar al menos 1 hora.",
        "Bate la masa de maíz con la manteca, sal y jugo de naranja agria hasta que quede suave y ligeramente ácida.",
        "Soasa las hojas de plátano sobre el fuego para que se vuelvan flexibles y límpialas.",
        "Coloca dos hojas en cruz y pon en el centro una porción generosa de masa.",
        "Sobre la masa acomoda: un trozo de carne, una cucharada de arroz, rodajas de papa, tomate, cebolla, tiras de chiltoma y una ramita de hierbabuena.",
        "Si lo deseas, agrega ciruelas o pasas para el toque dulce tradicional.",
        "Dobla las hojas formando un paquete rectangular bien cerrado y amárralo con cabuya.",
        "Acomoda los nacatamales en una olla grande con agua hasta cubrirlos a la mitad.",
        "Cocina a fuego medio de 3 a 4 horas, reponiendo agua caliente cuando haga falta.",
        "Deja reposar unos minutos antes de desatar.",
        "Sirve caliente en su propia hoja, con café negro y pan simple."
      ],
      consejo: "La hierbabuena es el alma del nacatamal: no la omitas. Y la masa debe quedar suave, casi como puré espeso, porque endurece al cocerse.",
      galeria: [], tags: ["gastronomía", "maíz", "familia", "tradición"] },
    { id: 12, n: 12, titulo: "Vigorón", comunidad: "Granada · Mestizo", icon: "canasta", foto: "assets/img/recetas/vigoron.jpg",
      pueblo: ["mestizo"],
      tiempo: "45 min", porciones: "4", dificultad: "Fácil",
      texto: "Yuca cocida, chicharrón crujiente y ensalada de repollo con tomate servidos sobre hoja de chagüite. Nació en Granada en 1914 y es orgullo de la ciudad.",
      detalle: [
        "El vigorón fue creado en Granada alrededor de 1914 por una vendedora conocida como 'La Loca', que le puso el nombre tomado de un cartel de tónicos. Desde entonces es el plato granadino por excelencia, servido en los kioscos del parque y frente al lago.",
        "Su gracia está en el contraste: la yuca suave y caliente, el chicharrón tronador y el curtido fresco y ácido, todo comido —idealmente con la mano— sobre la hoja verde de chagüite."
      ],
      ingredientes: ["2 lb de yuca", "1 lb de chicharrón con carne", "½ repollo rallado", "2 tomates en cubos", "1 cebolla en plumas", "Vinagre o jugo de limón", "Chile congo o cabro (al gusto)", "Sal", "Hojas de chagüite (plátano) para servir", "Mimbros o mango verde encurtido (opcional)"],
      pasos: [
        "Pela la yuca y cuécela en agua con sal hasta que esté suave pero sin deshacerse (25–30 minutos).",
        "Prepara el curtido: mezcla el repollo rallado con el tomate y la cebolla.",
        "Adereza el curtido con vinagre o limón, sal y chile al gusto; deja reposar 15 minutos.",
        "Si el chicharrón no está recién hecho, caliéntalo hasta que recupere lo crujiente.",
        "Lava las hojas de chagüite y corta rectángulos para usar de plato.",
        "Coloca sobre cada hoja una cama de yuca caliente.",
        "Encima reparte trozos de chicharrón.",
        "Corona con abundante curtido de repollo.",
        "Agrega mimbros o encurtidos si te gusta el toque más ácido.",
        "Sirve de inmediato, tradicionalmente para comer con la mano."
      ],
      consejo: "El secreto está en el chicharrón: debe tronar al morderlo. Cómpralo el mismo día y caliéntalo justo antes de servir.",
      galeria: [], tags: ["gastronomía", "tradición", "colonial"] },
    { id: 13, n: 13, titulo: "Indio Viejo", comunidad: "Mestizo · raíz prehispánica", icon: "maiz", foto: "assets/img/recetas/indio-viejo.jpg",
      pueblo: ["mestizo", "chorotega"],
      tiempo: "90 min", porciones: "6", dificultad: "Media",
      texto: "Guiso espeso de masa de maíz con carne deshilachada, naranja agria, hierbabuena y achiote. Uno de los platos más antiguos del recetario nicaragüense.",
      detalle: [
        "El indio viejo hunde sus raíces en las ollas de maíz precolombinas del Pacífico. La leyenda popular cuenta que unos indígenas, para no compartir su comida con un visitante hambriento, dijeron estar cocinando a 'un indio viejo'… y el nombre quedó para siempre.",
        "Es plato de fritanga, de fiesta patronal y de casa: maíz, carne y cítrico en un guiso dorado por el achiote que sabe a historia."
      ],
      ingredientes: ["1½ lb de carne de res (falda o posta) ", "1 lb de masa de maíz", "Jugo de 3 naranjas agrias", "1 cebolla, 1 chiltoma y 3 dientes de ajo", "2 tomates", "1 cda de achiote", "Ramas de hierbabuena", "Manteca o aceite", "Sal y pimienta", "Caldo de la cocción de la carne"],
      pasos: [
        "Cuece la carne en agua con sal, media cebolla y ajo hasta que esté suave; reserva el caldo.",
        "Deshilacha la carne finamente con las manos o dos tenedores.",
        "Disuelve la masa de maíz en 3–4 tazas del caldo frío, sin grumos.",
        "En una olla amplia, sofríe en manteca la cebolla, la chiltoma, el ajo y el tomate picados.",
        "Agrega la carne deshilachada y el achiote disuelto; sofríe unos minutos.",
        "Vierte la masa disuelta y cocina a fuego medio, moviendo constantemente para que no se pegue.",
        "Añade el jugo de naranja agria y la hierbabuena picada.",
        "Cocina de 20 a 25 minutos hasta que espese y la masa pierda el sabor a crudo.",
        "Rectifica sal y pimienta.",
        "Sirve caliente con arroz, tortilla y tajadas de plátano frito."
      ],
      consejo: "Mueve la olla sin descanso cuando agregues la masa: si se pega al fondo toma sabor a quemado y no hay vuelta atrás.",
      galeria: [], tags: ["gastronomía", "maíz", "ancestral"] },
    { id: 14, n: 14, titulo: "Baho", comunidad: "Mestizo", icon: "canasta", foto: "assets/img/recetas/baho.jpg",
      pueblo: ["mestizo"],
      tiempo: "4 h", porciones: "8–10", dificultad: "Alta",
      texto: "Carne de res salada, plátanos maduros y verdes y yuca, cocidos al vapor por horas sobre un colchón de hojas de plátano. El plato dominguero por excelencia.",
      detalle: [
        "El baho (o vaho) es cocina de paciencia: una olla sellada con hojas de plátano donde la carne salada y los plátanos intercambian jugos y aromas durante horas de vapor. Su origen mezcla técnicas indígenas de cocción al vapor con los sabores del mestizaje.",
        "Se vende los domingos en los mercados y comedores populares, servido con ensalada de repollo encima, y es de esos platos que reúnen a la familia entera alrededor de la mesa."
      ],
      ingredientes: ["3 lb de carne de res salada (cecina o falda)", "4 plátanos maduros", "3 plátanos verdes", "2 lb de yuca", "2 cebollas en rodajas", "3 tomates en rodajas", "1 chiltoma", "Jugo de naranja agria", "Hojas de plátano abundantes", "Para el curtido: repollo, tomate, vinagre y sal"],
      pasos: [
        "Desde la víspera, lava la carne salada y déjala marinando con cebolla, tomate, chiltoma y naranja agria.",
        "Forra una olla grande (idealmente de fondo grueso) con hojas de plátano soasadas, dejando que sobresalgan.",
        "Coloca al fondo los plátanos verdes con cáscara y la yuca pelada en trozos.",
        "Acomoda encima la carne marinada con sus verduras.",
        "Corona con los plátanos maduros con cáscara.",
        "Cubre todo con más hojas de plátano y dobla las que sobresalen para sellar.",
        "Agrega 2–3 tazas de agua por una orilla, sin lavar el sellado.",
        "Tapa y cocina a fuego bajo de 3 a 4 horas: el vapor hace todo el trabajo.",
        "Prepara mientras tanto el curtido de repollo con tomate y vinagre.",
        "Destapa, arma cada plato con yuca, plátanos y carne, y corona con el curtido.",
        "Sirve sobre hoja de plátano para la experiencia completa."
      ],
      consejo: "No abras la olla durante la cocción: cada destapada deja escapar el vapor que es el corazón del baho.",
      galeria: [], tags: ["gastronomía", "familia", "tradición"] },
    { id: 15, n: 15, titulo: "Güirilas con cuajada", comunidad: "Norte · Matagalpa-Cacaopera", icon: "maiz", foto: "assets/img/recetas/guirila.jpg",
      pueblo: ["cacaopera", "mestizo"],
      tiempo: "40 min", porciones: "8 güirilas", dificultad: "Media",
      texto: "Tortilla dulce y suave de maíz tierno (chilote sazón), cocida sobre hoja de plátano y servida con cuajada fresca y crema. El sabor del norte de Nicaragua.",
      detalle: [
        "La güirila es hija del maíz nuevo: cuando las milpas del norte dan sus primeros elotes sazones, las cocinas de Matagalpa, Jinotega y Estelí se llenan de su aroma dulce. Es herencia directa de la cocina indígena del maíz tierno.",
        "Se cuece sobre hoja de plátano en el comal, que le regala su perfume, y se come caliente con cuajada y una taza de café de palo: el desayuno norteño perfecto."
      ],
      ingredientes: ["12 elotes tiernos (maíz nuevo sazón)", "1 pizca de sal", "2–3 cdas de azúcar (opcional, según dulzor del maíz)", "Hojas de plátano en cuadros", "Cuajada fresca y crema para servir"],
      pasos: [
        "Desgrana los elotes tiernos con un cuchillo.",
        "Muele los granos en molino o procesadora hasta obtener una masa húmeda y espesa.",
        "Agrega la pizca de sal (y azúcar solo si el maíz no es dulce).",
        "Calienta el comal o una sartén a fuego medio.",
        "Coloca un cuadro de hoja de plátano sobre el comal.",
        "Vierte un cucharón de masa sobre la hoja y extiéndelo en forma redonda.",
        "Cubre con otra hoja y deja cocer 3–4 minutos.",
        "Voltea la güirila con todo y hojas y cuece el otro lado.",
        "Retira las hojas: la güirila debe quedar dorada por fuera y suave por dentro.",
        "Sirve caliente con cuajada fresca, crema y café."
      ],
      consejo: "Todo está en el punto del maíz: ni tierno lechoso ni duro. El grano debe reventar cremoso al apretarlo con la uña.",
      galeria: [], tags: ["gastronomía", "maíz", "agricultura"] },
    { id: 16, n: 16, titulo: "Rosquillas somoteñas", comunidad: "Somoto · Madriz (zona chorotega)", icon: "canasta", foto: "assets/img/recetas/rosquillas.jpg",
      pueblo: ["chorotega", "mestizo"],
      tiempo: "2 h", porciones: "40 rosquillas", dificultad: "Media",
      texto: "Anillos y hojaldras de maíz y queso horneados en horno de leña hasta quedar dorados y tronadores. Somoto es su capital y las exporta a todo el país.",
      detalle: [
        "Las rosquillas somoteñas son patrimonio del norte: maíz nixtamalizado, queso seco y manteca, horneados tradicionalmente en hornos de barrio que perfuman las calles de Somoto desde la madrugada.",
        "Vienen en dos formas inseparables: la rosquilla (anillo salado) y la hojaldra (disco con dulce de rapadura al centro). Con café negro, son la merienda norteña por excelencia."
      ],
      ingredientes: ["2 lb de maíz nixtamalizado y molido fino", "1 lb de queso seco rallado", "½ taza de manteca de cerdo", "2 huevos", "1 pizca de sal", "Dulce de rapadura rallado (para las hojaldras)", "Agua o suero según necesite la masa"],
      pasos: [
        "Mezcla la masa de maíz con el queso rallado hasta integrar por completo.",
        "Agrega la manteca, los huevos y la sal; amasa hasta obtener una masa fina que no se quiebre.",
        "Si está seca, humedece con un poco de agua o suero.",
        "Para las rosquillas: forma rollitos delgados y une las puntas en anillos pequeños.",
        "Para las hojaldras: forma discos delgados y pon al centro dulce de rapadura rallado.",
        "Coloca las piezas en bandejas engrasadas.",
        "Hornea a 200 °C / 400 °F (o en horno de leña bien caliente) de 20 a 30 minutos.",
        "Las rosquillas están listas cuando suenan huecas al golpearlas suavemente.",
        "Déjalas enfriar por completo para que terminen de endurecer.",
        "Guárdalas en recipiente seco: duran semanas, por eso viajan por todo el país."
      ],
      consejo: "El queso debe ser seco y bien añejo: es lo que da el sabor y el tronido característicos de la rosquilla somoteña.",
      galeria: [], tags: ["gastronomía", "maíz", "artesanía"] },
    { id: 17, n: 17, titulo: "Sopa de mondongo", comunidad: "Masatepe · Masaya", icon: "casa", foto: "assets/img/recetas/mondongo.jpg",
      pueblo: ["mestizo", "chorotega"],
      tiempo: "3 h", porciones: "8", dificultad: "Alta",
      texto: "La sopa insignia de Masatepe: mondongo limpiado con naranja agria, cocido con verduras, elote y hierbas. Plato de domingo y de fiestas familiares.",
      detalle: [
        "En Masatepe, la sopa de mondongo es identidad: la ciudad entera se reconoce en este caldo claro y sustancioso que las familias preparan los fines de semana y los restaurantes sirven a visitantes de todo el país.",
        "El secreto está en la limpieza paciente del mondongo con naranja agria y en el equilibrio de las verduras de la meseta: quequisque, chayote, elote y plátano."
      ],
      ingredientes: ["3 lb de mondongo (panza de res)", "2 patas de res (opcional, para sustancia)", "6 naranjas agrias", "Bicarbonato", "2 elotes en trozos", "1 lb de quequisque", "2 chayotes", "1 plátano verde", "1 cebolla, 1 chiltoma, 4 dientes de ajo", "Culantro, hierbabuena y achiote", "Sal"],
      pasos: [
        "Lava el mondongo restregándolo con naranja agria, sal y una pizca de bicarbonato; repite hasta que esté blanco y sin olor.",
        "Córtalo en cuadritos parejos.",
        "Ponlo a cocer en abundante agua con las patas de res, cebolla, ajo y sal, de 1½ a 2 horas hasta que esté suave.",
        "Espuma el caldo cuando suelte impurezas.",
        "Agrega el achiote disuelto para dar color.",
        "Incorpora el elote y el quequisque; cocina 15 minutos.",
        "Añade el chayote y el plátano verde en trozos; cocina hasta que todo esté tierno.",
        "Sazona con chiltoma, culantro y hierbabuena al final.",
        "Rectifica la sal y deja hervir 5 minutos más.",
        "Sirve bien caliente con arroz, aguacate, tortilla y limón."
      ],
      consejo: "La paciencia en la limpieza lo es todo: un mondongo bien lavado con naranja agria da un caldo limpio, sin olores y lleno de sabor.",
      galeria: [], tags: ["gastronomía", "familia", "tradición"] },
    { id: 18, n: 18, titulo: "Quesillo", comunidad: "La Paz Centro y Nagarote · León", icon: "casa", foto: "assets/img/recetas/quesillo.jpg",
      pueblo: ["mestizo"],
      tiempo: "20 min", porciones: "6", dificultad: "Fácil",
      texto: "Tortilla recién hecha, queso quesillo de hebra, cebolla curtida en vinagre y crema líquida: la merienda de carretera más famosa de Nicaragua.",
      detalle: [
        "Entre León y Managua, los pueblos de La Paz Centro y Nagarote se disputan desde siempre el título del mejor quesillo. La receta es simple, pero exige ingredientes perfectos: queso de hebra fresco del día, tortilla caliente y crema de verdad.",
        "Se sirve enrollado, tradicionalmente en una bolsita plástica para comerlo de camino, acompañado de un tiste bien frío en jícara."
      ],
      ingredientes: ["6 tortillas de maíz recién hechas", "1 lb de quesillo (queso de hebra) en rodajas", "2 cebollas blancas en plumas", "½ taza de vinagre", "1 pizca de sal y orégano", "Crema líquida fresca abundante"],
      pasos: [
        "Prepara la cebolla curtida: pon las plumas de cebolla en vinagre con sal (y orégano si gustas) al menos 30 minutos antes.",
        "Calienta las tortillas en el comal hasta que estén suaves y calientes.",
        "Coloca una rodaja generosa de quesillo sobre cada tortilla caliente: el calor lo suaviza.",
        "Agrega una buena cucharada de cebolla curtida con un poco de su vinagre.",
        "Baña con crema líquida sin miedo.",
        "Espolvorea una pizca de sal.",
        "Enrolla la tortilla con todo dentro.",
        "Sirve de inmediato, con tiste o cacao bien frío."
      ],
      consejo: "El quesillo debe ser del día y la crema, líquida de verdad: si la crema es espesa, el quesillo pierde su gracia jugosa.",
      galeria: [], tags: ["gastronomía", "familia"] },
    { id: 19, n: 19, titulo: "Pinolillo", comunidad: "Todo el país · raíz prehispánica", icon: "sol", foto: "assets/img/recetas/pinolillo.jpg",
      pueblo: ["nahoa", "chorotega", "mestizo"],
      tiempo: "30 min", porciones: "6 vasos", dificultad: "Fácil",
      texto: "La bebida nacional: maíz tostado y molido con cacao, batido en agua o leche. Tan nuestra que los nicaragüenses se llaman a sí mismos 'pinoleros'.",
      detalle: [
        "El pinolillo viene directo de las cocinas prehispánicas, donde el maíz tostado (pinolli en náhuat) y el cacao eran alimento y moneda. Servido en jícara, espeso y con su asiento que se mastica al final, acompaña a Nicaragua desde hace siglos.",
        "Que el gentilicio popular del país sea 'pinolero' dice todo: esta bebida es identidad líquida, presente en cada casa, comedor y fiesta patronal."
      ],
      ingredientes: ["2 tazas de maíz", "½ taza de granos de cacao", "1 raja de canela (opcional)", "Pimienta de chiapa / clavo (opcional)", "Agua o leche", "Azúcar al gusto", "Hielo"],
      pasos: [
        "Tuesta el maíz en comal o sartén seco, moviendo constantemente, hasta que dore y truene.",
        "Tuesta aparte los granos de cacao hasta que la cáscara se desprenda; pélalos.",
        "Si usas canela o especias, tuéstalas ligeramente también.",
        "Muele todo junto hasta obtener un polvo fino: ese es el pinolillo.",
        "Para servir: bate 3–4 cucharadas de pinolillo por vaso en agua o leche fría.",
        "Endulza al gusto.",
        "Sirve con hielo, idealmente en jícara, y revuelve antes de cada trago.",
        "Guarda el polvo restante en un frasco hermético: dura meses."
      ],
      consejo: "El asiento que queda al fondo no se bota: masticarlo es parte del ritual pinolero de toda la vida.",
      galeria: [], tags: ["gastronomía", "maíz", "ancestral", "identidad"] },
    { id: 20, n: 20, titulo: "Gallo pinto", comunidad: "Todo el país", icon: "maiz", foto: "assets/img/recetas/gallo-pinto.jpg",
      pueblo: ["mestizo"],
      tiempo: "25 min", porciones: "4", dificultad: "Fácil",
      texto: "Arroz y frijoles rojos fritos juntos hasta 'pintarse': el desayuno de cada día en Nicaragua y hermano del rice and beans caribeño, que se hace con coco.",
      detalle: [
        "El gallo pinto es el plato que amanece en todas las mesas de Nicaragua: arroz del día anterior y frijoles rojos cocidos, fritos juntos con cebolla hasta que el arroz toma el color del frijol —de ahí lo de 'pinto'.",
        "En el Pacífico se fríe con aceite o manteca; en el Caribe su primo, el rice and beans, se cocina con leche de coco. Dos versiones de una misma identidad que acompaña huevo, cuajada, tortilla y café."
      ],
      ingredientes: ["3 tazas de arroz cocido (mejor del día anterior)", "2 tazas de frijoles rojos cocidos con su caldito", "1 cebolla picada fina", "1 chiltoma picada (opcional)", "3 cdas de aceite o manteca", "Sal al gusto"],
      pasos: [
        "Sofríe la cebolla (y la chiltoma) en el aceite hasta que esté transparente.",
        "Agrega los frijoles cocidos escurridos, con apenas un poco de su caldo.",
        "Fríelos 3–4 minutos hasta que suelten aroma.",
        "Incorpora el arroz y mezcla bien con los frijoles.",
        "Fríe a fuego medio-alto, moviendo cada tanto, hasta que el arroz se 'pinte' de rojo parejo.",
        "Rectifica la sal.",
        "Deja que se dore ligeramente al fondo para el toque tradicional.",
        "Sirve caliente con huevo, cuajada, tajadas o tortilla."
      ],
      consejo: "El secreto es el arroz frío del día anterior: queda suelto y se pinta mejor sin volverse masa.",
      galeria: [], tags: ["gastronomía", "familia", "identidad"] },
    { id: 21, n: 21, titulo: "Sopa de queso", comunidad: "León y occidente", icon: "casa", foto: "assets/img/recetas/sopa-de-queso.jpg",
      pueblo: ["mestizo", "sutiaba"],
      tiempo: "60 min", porciones: "6", dificultad: "Media",
      texto: "La sopa de la Cuaresma leonesa: caldo de achiote con leche donde nadan rosquillas fritas de masa de maíz con queso. Tradición de Semana Santa del occidente del país.",
      detalle: [
        "Cuando llega la Cuaresma y la tradición pide no comer carne, en León y Chinandega las cocinas huelen a sopa de queso: un caldo dorado por el achiote, enriquecido con leche, donde se sirven tortitas fritas de masa con queso.",
        "Es herencia mestiza e indígena del occidente, especialmente querida en Sutiaba, y cada familia discute si las rosquillas van dentro del caldo desde el inicio o se agregan al servir para que no se deshagan."
      ],
      ingredientes: ["2 tazas de masa de maíz", "1 lb de queso seco rallado", "4 tazas de leche", "4 tazas de agua", "1 cda de achiote", "1 cebolla, 1 chiltoma y 2 dientes de ajo", "Hierbabuena", "Huevos (1 por cada taza de masa)", "Aceite para freír", "Sal"],
      pasos: [
        "Mezcla la masa con el queso rallado, los huevos y una pizca de sal hasta integrar.",
        "Forma tortitas o rosquitas pequeñas con la masa.",
        "Fríelas en aceite caliente hasta dorar; escúrrelas y reserva.",
        "En una olla, sofríe cebolla, chiltoma y ajo picados.",
        "Agrega el agua con el achiote disuelto y deja hervir 10 minutos.",
        "Baja el fuego e incorpora la leche poco a poco, sin dejar que hierva fuerte.",
        "Añade la hierbabuena y rectifica la sal.",
        "Al servir, coloca las rosquillas fritas en cada plato y báñalas con el caldo caliente."
      ],
      consejo: "Agrega las rosquillas al momento de servir: así quedan suaves por fuera pero no se desbaratan.",
      galeria: [], tags: ["gastronomía", "tradición", "maíz"] },
    { id: 22, n: 22, titulo: "Tiste", comunidad: "Rivas y Granada · herencia nahoa", icon: "sol", foto: "assets/img/recetas/tiste.jpg",
      pueblo: ["nahoa", "mestizo"],
      tiempo: "30 min", porciones: "6 jícaras", dificultad: "Fácil",
      texto: "Bebida prehispánica de maíz tostado y cacao, servida tradicionalmente en jícara y batida con molinillo. Compañera inseparable del quesillo.",
      detalle: [
        "El tiste viene del náhuat y de las cocinas nicaraos: maíz tostado y cacao molidos, batidos en agua fría. Se distingue del pinolillo por su tueste más suave y porque se disfruta tradicionalmente en jícara, con el asiento girando en el fondo.",
        "En Rivas y Granada sigue siendo la bebida de las tardes y el acompañante obligado del quesillo. Beberlo en jícara con molinillo es probar un sorbo de hace quinientos años."
      ],
      ingredientes: ["2 tazas de maíz", "½ taza de granos de cacao", "1 raja de canela", "Azúcar al gusto", "Agua fría", "Hielo"],
      pasos: [
        "Tuesta el maíz en comal hasta dorarlo suavemente, sin quemarlo.",
        "Tuesta aparte el cacao y pélalo.",
        "Muele el maíz, el cacao y la canela hasta obtener polvo fino.",
        "Bate 3–4 cucharadas del polvo por jícara con agua fría.",
        "Endulza al gusto y bate hasta espumar (con molinillo si tenés).",
        "Sirve con hielo, removiendo el asiento antes de cada trago."
      ],
      consejo: "Tueste suave: si el maíz se quema, el tiste amarga y pierde su color dorado claro.",
      galeria: [], tags: ["gastronomía", "ancestral", "maíz"] },
    { id: 23, n: 23, titulo: "Atol de elote", comunidad: "Norte y todo el país", icon: "maiz", foto: "assets/img/recetas/atol.jpg",
      pueblo: ["cacaopera", "chorotega", "mestizo"],
      tiempo: "45 min", porciones: "6", dificultad: "Fácil",
      texto: "Crema dulce y caliente de maíz tierno molido, con leche y canela. El postre-bebida de las tardes de cosecha, de raíz totalmente prehispánica.",
      detalle: [
        "El atol (del náhuat 'atolli') acompaña a los pueblos del maíz desde antes de la colonia. La versión de elote tierno es la más querida: cuando las milpas dan sus primeros elotes, las abuelas muelen los granos lechosos y los convierten en esta crema perfumada.",
        "Se sirve caliente, espolvoreado con canela, en tardes de lluvia y fiestas de cosecha. En el norte se acompaña de rosquillas; en el Pacífico, de buñuelos."
      ],
      ingredientes: ["8 elotes tiernos", "4 tazas de leche", "½ taza de azúcar (al gusto)", "1 raja de canela", "1 pizca de sal", "Canela en polvo para servir"],
      pasos: [
        "Desgrana los elotes y licúa los granos con 2 tazas de leche.",
        "Cuela la mezcla para retirar los hollejos.",
        "Ponla en una olla con el resto de la leche, el azúcar, la canela y la sal.",
        "Cocina a fuego medio-bajo, moviendo constantemente para que no se pegue.",
        "Cuando espese y nape la cuchara (15–20 minutos), está listo.",
        "Sirve caliente con canela en polvo por encima."
      ],
      consejo: "No dejés de mover: el atol se pega en segundos y un fondo quemado arruina toda la olla.",
      galeria: [], tags: ["gastronomía", "maíz", "familia"] },
    { id: 24, n: 24, titulo: "Buñuelos de yuca", comunidad: "Todo el país", icon: "canasta", foto: "assets/img/recetas/bunuelos.jpg",
      pueblo: ["mestizo"],
      tiempo: "40 min", porciones: "20 buñuelos", dificultad: "Media",
      texto: "Bolitas fritas de yuca rallada con queso, bañadas en miel de rapadura con canela. El dulce infaltable de la Purísima y la Gritería.",
      detalle: [
        "Cuando suena '¿Quién causa tanta alegría?', en algún punto de la casa hay buñuelos friéndose: son el premio clásico que se regala a quienes llegan a cantarle a la Virgen en la Gritería.",
        "La combinación de yuca, queso y miel de rapadura los hace crujientes por fuera, suaves por dentro y absolutamente adictivos."
      ],
      ingredientes: ["2 lb de yuca pelada", "½ lb de queso seco rallado", "1 huevo", "1 pizca de sal", "Aceite para freír", "Para la miel: 1 atado de dulce de rapadura, 1 taza de agua, canela y clavo de olor"],
      pasos: [
        "Ralla la yuca cruda finamente y exprímele el exceso de líquido.",
        "Mézclala con el queso, el huevo y la sal hasta formar una masa.",
        "Forma bolitas del tamaño de un limón pequeño.",
        "Fríelas en aceite caliente hasta que doren parejo; escúrrelas.",
        "Prepara la miel: derrite la rapadura en el agua con canela y clavo hasta que espese en almíbar.",
        "Baña los buñuelos calientes con la miel.",
        "Sirve enseguida, con miel extra para los golosos."
      ],
      consejo: "Exprimí bien la yuca rallada: si queda aguada, los buñuelos absorben aceite y no doran.",
      galeria: [], tags: ["gastronomía", "tradición", "familia"] },
    { id: 25, n: 25, titulo: "Chicha de maíz", comunidad: "Todo el país · raíz prehispánica", icon: "canasta", foto: "assets/img/recetas/chicha.jpg",
      pueblo: ["chorotega", "nahoa", "mestizo"],
      tiempo: "30 min + reposo", porciones: "10 vasos", dificultad: "Fácil",
      texto: "Refresco rosado de maíz cocido y molido, endulzado y perfumado. La bebida de las fiestas patronales, vendida en barriles fríos en cada celebración del país.",
      detalle: [
        "La chicha acompaña las fiestas de Nicaragua desde tiempos prehispánicos. La versión fresca —dulce y rosada— es la que llena los barriles de las vendedoras en las fiestas patronales, la Gritería y las hípicas.",
        "Cada maestra chichera guarda su secreto: el punto del maíz, el toque de colorante rojo tradicional y los días justos de reposo para el saborcito ácido que la distingue."
      ],
      ingredientes: ["2 lb de maíz", "2 atados de dulce de rapadura (o azúcar)", "Agua", "Colorante rojo tradicional (opcional)", "Canela (opcional)", "Hielo"],
      pasos: [
        "Cuece el maíz en abundante agua hasta que reviente y esté suave.",
        "Muélelo o licúalo con parte de su agua de cocción.",
        "Disuelve la rapadura en agua y mezcla con el maíz molido.",
        "Agrega más agua hasta lograr consistencia de refresco espeso.",
        "Añade el colorante y la canela si los usás.",
        "Deja reposar de unas horas a un día: gana su toque característico.",
        "Cuela si la querés más ligera y sirve con bastante hielo."
      ],
      consejo: "Un día de reposo le da el saborcito levemente fermentado de la chicha de fiesta patronal; si la querés dulce nomás, servila el mismo día.",
      galeria: [], tags: ["gastronomía", "maíz", "tradición"] }
  ],

  /* ---------- Danzas y música tradicionales ---------- */
  danzas: [
    { id: 1, n: 1, titulo: "El Güegüense o Macho Ratón", cuando: "17–27 de enero (San Sebastián)", lugar: "Diriamba · Carazo", icon: "mascara", foto: "assets/img/danzas/gueguense.jpg",
      pueblo: ["mestizo", "chorotega"],
      texto: "Teatro-danza satírico en náhuat y español, con máscaras y los célebres machos. Patrimonio Oral e Inmaterial de la Humanidad (UNESCO, 2005) y obra cumbre de la identidad nicaragüense.",
      detalle: [
        "El Güegüense es la obra maestra del mestizaje: una comedia bailada de la época colonial donde un viejo comerciante indígena se burla con astucia y doble sentido de las autoridades españolas. Sus personajes —el Güegüense, sus hijos Don Forsico y Don Ambrosio, el Gobernador Tastuanes y los machos enmascarados— danzan al son de pito y tambor.",
        "Se representa cada enero en las fiestas de San Sebastián de Diriamba. En 2005, la UNESCO la proclamó Obra Maestra del Patrimonio Oral e Inmaterial de la Humanidad: la figura del 'macho ratón' es hoy símbolo nacional de la picardía y la resistencia cultural."
      ],
      tags: ["danza", "folclor", "unesco", "historia"] },
    { id: 2, n: 2, titulo: "Palo de Mayo (danza)", cuando: "Mayo", lugar: "Bluefields · Costa Caribe Sur", icon: "tambor", foto: "assets/img/tradiciones/palo-de-mayo.jpg",
      pueblo: ["creole"],
      texto: "Danza afrocaribeña alrededor del árbol enramado con cintas, de ritmo creciente y movimientos vibrantes, que celebra la llegada de las lluvias y la fertilidad.",
      detalle: [
        "La danza del Palo de Mayo mezcla la antigua tradición europea del maypole con la fuerza rítmica africana: las parejas tejen cintas alrededor del palo mientras los sones —como el clásico 'Tulululu'— suben de intensidad.",
        "Es el corazón del festival Mayo Ya! de Bluefields y una de las expresiones dancísticas más enérgicas y reconocibles de Nicaragua."
      ],
      tags: ["danza", "música", "cultura"] },
    { id: 3, n: 3, titulo: "Punta y Walagallo garífunas", cuando: "19 de noviembre y celebraciones", lugar: "Orinoco · Laguna de Perlas", icon: "tambor", foto: "assets/img/tradiciones/dia-garifuna.jpg",
      pueblo: ["garifuna"],
      texto: "La punta es la danza garífuna de cadera y tambor que celebra la vida; el Walagallo es su ceremonia mayor de sanación, donde tambores, cantos y danza llaman a los ancestros.",
      detalle: [
        "La punta se baila en círculo, con pasos cortos y movimiento de caderas sobre el ritmo de los tambores primera y segunda. Se danza en fiestas y también en velorios: es la afirmación de la vida frente a la muerte.",
        "El Walagallo (o Dügü) es el rito de sanación más profundo del pueblo garífuna: durante días, tambores sagrados, cantos en lengua garífuna y danzas convocan a los espíritus de los ancestros para devolver la salud al enfermo. La música y danza garífunas son Patrimonio de la Humanidad (UNESCO, 2001)."
      ],
      tags: ["danza", "ritual", "ancestral", "unesco"] },
    { id: 4, n: 4, titulo: "El Toro Venado", cuando: "Octubre–noviembre (San Jerónimo)", lugar: "Masaya · Monimbó", icon: "mascara", foto: "assets/img/danzas/toro-venado.jpg",
      pueblo: ["mestizo", "chorotega"],
      texto: "Desfile-danza satírico de Masaya donde el pueblo, enmascarado y disfrazado, se burla de políticos y personajes. Mezcla del toro español y el venado indígena.",
      detalle: [
        "El Toro Venado es la válvula de humor del pueblo: cualquiera puede salir disfrazado para parodiar a poderosos, celebridades o sucesos del año, al amparo de la máscara. Su nombre une los dos mundos: el toro traído por los españoles y el venado sagrado indígena.",
        "Procesiona durante las fiestas de San Jerónimo —las más largas del país— con música de chicheros, y tiene su bastión en el barrio indígena de Monimbó."
      ],
      tags: ["danza", "folclor", "identidad"] },
    { id: 5, n: 5, titulo: "Bailes de marimba: Inditas y Negras", cuando: "Fiestas patronales", lugar: "Masaya y la Meseta de los Pueblos", icon: "marimba", foto: "assets/img/danzas/inditas.jpg",
      pueblo: ["mestizo", "chorotega"],
      texto: "Las danzas de pareja al son de la marimba de arco: el Baile de las Inditas con sus huipiles floreados y el Baile de Negras, donde varones enmascarados danzan con elegancia exquisita.",
      detalle: [
        "La marimba de arco es el instrumento madre del folclor del Pacífico. A su son se bailan las Inditas —parejas con trajes de huipil, trenzas y sombrero— y las Negras, donde dos hombres, uno vestido de mujer con máscara fina de malla, ejecutan la danza más estilizada del repertorio.",
        "Estos bailes se ofrecen como promesa a los santos patronos en Masaya, Monimbó y los pueblos de la meseta, y son escuela viva de músicos y danzantes desde la niñez."
      ],
      tags: ["danza", "música", "folclor", "tradición"] },
    { id: 6, n: 6, titulo: "La Gigantona y el Enano Cabezón", cuando: "Diciembre", lugar: "León", icon: "estrella", foto: "assets/img/danzas/gigantona.jpg",
      pueblo: ["mestizo", "sutiaba"],
      texto: "Figura gigante de una dama española que baila por las calles de León junto al pequeño Enano Cabezón, entre redobles de tambor y coplas picarescas.",
      detalle: [
        "La Gigantona nació como burla del pueblo indígena y mestizo a la mujer española: alta, blanca y emperifollada, baila dando vueltas mientras el Enano Cabezón —cabeza enorme, cuerpo pequeño— representa al indígena ingenioso que la conquista con coplas.",
        "Cada diciembre, decenas de gigantonas recorren los barrios leoneses con sus cuadrillas de tambores y su coplero, en una de las tradiciones callejeras más queridas del país."
      ],
      tags: ["danza", "folclor", "historia"] },
    { id: 7, n: 7, titulo: "Danza del Zompopo", cuando: "Noviembre (San Diego de Alcalá)", lugar: "Altagracia · Isla de Ometepe", icon: "volcan", foto: "assets/img/danzas/zompopo.jpg",
      pueblo: ["nahoa", "mestizo"],
      texto: "Danzantes con ramas en alto desfilan al ritmo del tambor en Altagracia, recordando el día en que los antiguos isleños espantaron una plaga de zompopos con ramas y cantos.",
      detalle: [
        "La tradición cuenta que una plaga de zompopos (hormigas cortadoras) amenazaba las cosechas de la isla, y el pueblo salió a espantarla danzando con ramas, encomendándose a sus protectores. De aquel episodio nació la Danza del Zompopo.",
        "Se baila cada noviembre en las fiestas de San Diego de Alcalá en Altagracia, Ometepe, y es una de las danzas con raíz nahoa más singulares del país: agricultura, fe y memoria en un solo ritmo."
      ],
      tags: ["danza", "agricultura", "ancestral"] },
    { id: 8, n: 8, titulo: "El Toro Huaco", cuando: "17–27 de enero (San Sebastián)", lugar: "Diriamba · Carazo", icon: "mascara", foto: "assets/img/danzas/toro-huaco.jpg",
      pueblo: ["mestizo", "chorotega"],
      texto: "Danza de cuadrilla con sombreros coronados de plumas de pavo real y máscaras sonrientes, que desfila en zigzag al son del pito y el tambor delante de San Sebastián.",
      detalle: [
        "El Toro Huaco es una de las danzas más antiguas del repertorio nicaragüense: una fila de danzantes enmascarados, encabezada por el 'mandador', avanza en culebra luciendo sombreros de castor adornados con espejos y altísimas plumas de pavo real.",
        "Su nombre se asocia al toro de petate que embiste entre los bailantes. Junto al Güegüense y El Viejo y la Vieja, forma la trilogía danzaria de las fiestas de San Sebastián de Diriamba."
      ],
      tags: ["danza", "folclor", "tradición"] },
    { id: 9, n: 9, titulo: "El Viejo y la Vieja", cuando: "Fiestas de enero", lugar: "Diriamba y el Pacífico", icon: "mascara", foto: "assets/img/danzas/viejo-y-vieja.jpg",
      pueblo: ["mestizo"],
      texto: "Pareja burlesca de máscaras arrugadas —un viejo pícaro y una vieja coqueta— que abre paso en los desfiles haciendo reír al público con sus ocurrencias.",
      detalle: [
        "El Viejo y la Vieja (o 'la Vieja y el Viejo') son la pareja cómica del folclor del Pacífico: él con bastón y sombrero, ella con delantal y pañuelo, bailan agachados y coquetos burlándose de la vejez y de los espectadores.",
        "Aparecen en las fiestas patronales de Diriamba y en celebraciones de todo el Pacífico, abriendo los desfiles y recogiendo la 'colaboración' del público entre carcajadas."
      ],
      tags: ["danza", "folclor", "identidad"] },
    { id: 10, n: 10, titulo: "Polkas y mazurcas segovianas", cuando: "Fiestas campesinas", lugar: "Las Segovias y el norte", icon: "marimba", foto: "assets/img/danzas/polka-segoviana.jpg",
      pueblo: ["mestizo", "cacaopera"],
      texto: "Los bailes de salón europeos que el campo norteño hizo suyos: polkas, mazurcas y jamaquellos ejecutados con violín y guitarra en las fiestas campesinas de Las Segovias.",
      detalle: [
        "En las montañas del norte, las polkas y mazurcas llegadas de Europa en el siglo XIX se transformaron en música campesina propia: violín de talalate, guitarra y guitarrilla marcan el compás que las parejas bailan con zapateado corto.",
        "Es la tradición musical mestiza más querida de Las Segovias, transmitida de oído entre generaciones de músicos rurales, y hoy reconocida como parte del patrimonio musical campesino de Nicaragua."
      ],
      tags: ["danza", "música", "memoria"] }
  ],

  /* ---------- Tradiciones y festividades reales ---------- */
  tradiciones: [
    { id: 1, n: 1, titulo: "Palo de Mayo (Mayo Ya!)", cuando: "Mayo", lugar: "Bluefields y Costa Caribe Sur", icon: "tambor", foto: "assets/img/tradiciones/palo-de-mayo.jpg",
      texto: "Festival afrocaribeño de música y danza alrededor del 'maypole'. Celebra la llegada de las lluvias y la fertilidad con raíces africanas y europeas.",
      detalle: [
        "Durante todo el mes de mayo, Bluefields vibra con el festival Mayo Ya!. La danza alrededor del palo enramado, los ritmos de tambor y las comparsas llenan las calles.",
        "Es la fiesta más representativa de la cultura creole de Nicaragua y un símbolo de identidad para toda la Costa Caribe Sur."
      ],
      tags: ["danza", "música", "cultura"] },
    { id: 2, n: 2, titulo: "King Pulanka", cuando: "Enero – febrero", lugar: "Comunidades mískitu (RACCN)", icon: "corona", foto: "assets/img/tradiciones/king-pulanka.jpg",
      texto: "Representación teatral y danzaria que recrea y satiriza la época del reino de la Mosquitia y la corona británica; fortalece la identidad mískita.",
      detalle: [
        "El King Pulanka reúne a la comunidad en torno a una representación con personajes como el rey y la reina, acompañada de música y comida tradicional.",
        "Es a la vez memoria histórica, teatro popular y afirmación de la identidad mískita, transmitida de generación en generación."
      ],
      tags: ["tradición", "danza", "historia"] },
    { id: 3, n: 3, titulo: "Día de la Autonomía", cuando: "30 de octubre", lugar: "RACCN y RACCS", icon: "libro", foto: "assets/img/tradiciones/dia-autonomia.jpg",
      texto: "Aniversario del Estatuto de Autonomía (Ley No. 28, 1987), que reconoce los derechos de los pueblos de la Costa Caribe a gobernarse y preservar su cultura.",
      detalle: [
        "Cada 30 de octubre se conmemora la aprobación de la Ley No. 28, que creó las regiones autónomas.",
        "Es una fecha de afirmación política y cultural para todos los pueblos de la Costa Caribe, celebrada con actos, música y actividades comunitarias."
      ],
      tags: ["autonomía", "historia", "identidad"] },
    { id: 4, n: 4, titulo: "Festival del Cangrejo / Día de la Emancipación", cuando: "27–28 de agosto", lugar: "Islas del Maíz", icon: "cangrejo", foto: "assets/img/tradiciones/festival-cangrejo.jpg",
      texto: "Conmemora la abolición de la esclavitud (1841) con sopa de cangrejo, música y danza; una de las fiestas más identitarias de las islas.",
      detalle: [
        "En las Islas del Maíz, el Día de la Emancipación celebra la libertad con la tradicional sopa de cangrejo, desfiles, música y danza.",
        "Es una de las expresiones más fuertes de la memoria afrocaribeña del país y atrae a visitantes de toda la región."
      ],
      tags: ["gastronomía", "historia", "cultura"] },
    { id: 5, n: 5, titulo: "Día de la Cultura Garífuna", cuando: "19 de noviembre", lugar: "Laguna de Perlas y Caribe", icon: "tambor", foto: "assets/img/tradiciones/dia-garifuna.jpg",
      texto: "Celebración de la herencia garífuna con tambores, danza punta, casabe y vestimenta tradicional, en memoria del asentamiento del pueblo en la región.",
      detalle: [
        "Cada 19 de noviembre, las comunidades garífunas celebran su llegada y su herencia con tambores, danza punta, comida tradicional y rituales.",
        "La fecha reafirma su identidad afro-indígena y su lengua, reconocida por la UNESCO como patrimonio de la humanidad."
      ],
      tags: ["música", "danza", "ancestral"] },
    { id: 6, n: 6, titulo: "Temporada y veda de la langosta", cuando: "Calendario anual", lugar: "Plataforma del Caribe", icon: "langosta", foto: "assets/img/tradiciones/langosta.jpg",
      texto: "El ciclo de pesca y la veda de la langosta marcan la economía y la vida de las comunidades costeras; saber tradicional unido a la sostenibilidad.",
      detalle: [
        "La pesca de la langosta es una de las principales actividades económicas del Caribe.",
        "La veda anual busca proteger la especie y combina la regulación oficial con el conocimiento tradicional de los buzos y pescadores."
      ],
      tags: ["pesca", "naturaleza", "territorio"] },
    { id: 7, n: 7, titulo: "Ceremonias y saberes de cosecha", cuando: "Según el ciclo agrícola", lugar: "Comunidades indígenas", icon: "maiz", foto: "assets/img/tradiciones/cosecha.jpg",
      texto: "Prácticas agrícolas ancestrales en torno a la yuca, el plátano y el arroz, acompañadas de trabajo colectivo y agradecimiento a la tierra.",
      detalle: [
        "La siembra y la cosecha se acompañan de trabajo comunitario y de saberes sobre los ciclos de la luna y la tierra.",
        "Estas prácticas mantienen la seguridad alimentaria y el vínculo espiritual con el territorio."
      ],
      tags: ["agricultura", "ancestral", "ritual"] },
    { id: 8, n: 8, titulo: "Feria de artesanías de tuno y bambú", cuando: "Eventos comunitarios", lugar: "Costa Caribe", icon: "canasta", foto: "assets/img/tradiciones/feria-artesanias.jpg",
      texto: "Muestra de cestería, tejido y trabajo en tuno (corteza vegetal) y bambú que promueve el patrimonio material de la región.",
      detalle: [
        "Las ferias reúnen a artesanas y artesanos que trabajan el tuno, el bambú y otras fibras naturales.",
        "Son espacios de venta, transmisión de oficios y valoración del patrimonio material de la Costa Caribe."
      ],
      tags: ["artesanía", "cultura", "memoria"] },
    { id: 9, n: 9, titulo: "La Purísima y La Gritería", cuando: "7 de diciembre (víspera del 8)", lugar: "León y todo el país", icon: "estrella", foto: "assets/img/tradiciones/griteria.jpg",
      pueblo: ["mestizo", "sutiaba"],
      texto: "La fiesta religiosa más querida de Nicaragua: altares a la Virgen María en puertas y ventanas, y el grito que recorre el país: '¿Quién causa tanta alegría?' — '¡La Concepción de María!'.",
      detalle: [
        "Nacida en León en el siglo XIX, la Gritería convierte la noche del 7 de diciembre en una fiesta de pólvora, cantos y 'gorra': las familias levantan altares y reparten dulces, caña, gofios y juguetes a quienes llegan a cantar a la Virgen.",
        "La Purísima se reza durante nueve días en casas y barrios, y su Gritería se celebra dondequiera que haya nicaragüenses en el mundo: es, junto al Güegüense, la tradición que mejor identifica al país."
      ],
      tags: ["tradición", "identidad", "familia"] },
    { id: 10, n: 10, titulo: "Fiestas de San Jerónimo", cuando: "30 de septiembre (y casi 3 meses)", lugar: "Masaya", icon: "marimba", foto: "assets/img/tradiciones/san-jeronimo.jpg",
      pueblo: ["mestizo", "chorotega"],
      texto: "Las fiestas patronales más largas de Nicaragua: bailes de marimba, promesantes, flores y el satírico Toro Venado en honor al 'doctor de los pobres'.",
      detalle: [
        "San Jerónimo, venerado en Masaya como médico milagroso, recibe casi tres meses de fiesta: desde el 30 de septiembre, su imagen recorre la ciudad entre flores de madroño, música de chicheros y miles de promesantes que pagan sus favores bailando.",
        "Dentro del calendario destacan los domingos del Toro Venado y los bailes de Inditas y de Negras: Masaya entera se convierte en escenario del folclor nacional."
      ],
      tags: ["tradición", "danza", "folclor"] },
    { id: 11, n: 11, titulo: "Santo Domingo de Guadalupe (Minguito)", cuando: "1 al 10 de agosto", lugar: "Managua", icon: "tambor", foto: "assets/img/tradiciones/santo-domingo.jpg",
      pueblo: ["mestizo"],
      texto: "Managua celebra a su santo patrono más popular, 'Minguito', con la traída y llevada de la pequeña imagen entre Las Sierritas y el centro, entre promesantes, carrozas y bailes.",
      detalle: [
        "Cada 1 de agosto, la diminuta imagen de Santo Domingo baja desde su santuario en Las Sierritas acompañada de una multitud: promesantes 'embarrados', mujeres con trajes típicos, toros enflorados, carrozas y música. El 10 de agosto la 'llevada' lo devuelve a casa.",
        "La fiesta mezcla devoción popular y carnaval capitalino, y es la celebración tradicional más grande de Managua."
      ],
      tags: ["tradición", "identidad", "cultura"] },
    { id: 12, n: 12, titulo: "Fiestas de San Sebastián", cuando: "17 al 27 de enero", lugar: "Diriamba · Carazo", icon: "mascara", foto: "assets/img/tradiciones/san-sebastian.jpg",
      pueblo: ["mestizo", "chorotega"],
      texto: "La fiesta donde danza El Güegüense: Diriamba recibe a su patrono con el Toro Huaco, El Viejo y la Vieja y el encuentro de santos de los pueblos vecinos.",
      detalle: [
        "En enero, Diriamba es la capital del folclor: por sus calles desfilan El Güegüense con sus machos, el colorido Toro Huaco con su sombrero de plumas de pavo real, y las danzas de El Viejo y la Vieja, entre pólvora y bandas.",
        "El momento mayor es el 'tope de los santos': San Sebastián de Diriamba se encuentra con Santiago de Jinotepe y San Marcos de San Marcos, sellando la hermandad de los pueblos de la meseta."
      ],
      tags: ["tradición", "danza", "unesco", "folclor"] },
    { id: 13, n: 13, titulo: "Los Agüizotes", cuando: "Último viernes de octubre", lugar: "Masaya", icon: "estrella", foto: "assets/img/tradiciones/aguizotes.jpg",
      pueblo: ["mestizo", "chorotega"],
      texto: "La noche en que los espantos de Nicaragua salen a la calle: la Cegua, el Cadejo, la Carreta Nagua, la Muerte Quirina y la Llorona desfilan entre música y antorchas por Masaya.",
      detalle: [
        "Los Agüizotes (de 'agüizote': agüero, espanto) son el desfile nocturno donde Masaya encarna su propia mitología: cientos de personas con máscaras y disfraces de los espantos de la tradición oral recorren la ciudad alumbrados por velas y al son de los chicheros.",
        "Es la gran noche de las leyendas nicaragüenses, donde el miedo heredado se convierte en arte popular, máscaras de cartón y fiesta colectiva."
      ],
      tags: ["tradición", "leyenda", "folclor", "memoria"] },
    { id: 14, n: 14, titulo: "Fiesta de San Lázaro", cuando: "Domingo antes de Ramos", lugar: "Masaya · Monimbó", icon: "estrella", foto: "assets/img/tradiciones/san-lazaro.jpg",
      pueblo: ["mestizo", "chorotega"],
      texto: "La fiesta más tierna de Nicaragua: los perros de Monimbó llegan disfrazados a la iglesia de Santa María Magdalena para agradecer a San Lázaro la salud de sus amos.",
      detalle: [
        "Cada año, el domingo anterior al Domingo de Ramos, los monimboseños visten a sus perros con trajes, sombreros y disfraces y los llevan en procesión ante San Lázaro, cumpliendo promesas por la salud recibida.",
        "La tradición une la devoción popular con el cariño por los animales y se ha vuelto una de las celebraciones más fotografiadas y queridas del calendario masaya."
      ],
      tags: ["tradición", "familia", "folclor"] },
    { id: 15, n: 15, titulo: "La Lavada de la Plata", cuando: "6 de diciembre", lugar: "El Viejo · Chinandega", icon: "sol", foto: "assets/img/tradiciones/lavada-plata.jpg",
      pueblo: ["mestizo"],
      texto: "Miles de devotos limpian pieza por pieza los ornamentos de plata de la Virgen del Trono, patrona de Nicaragua, en la Basílica de El Viejo.",
      detalle: [
        "Un día después de la víspera de la Purísima, la Basílica de El Viejo celebra su rito más antiguo: la Lavada de la Plata. Con paños y devoción, los fieles limpian las lámparas, coronas y andas de plata de la venerada imagen de la Inmaculada.",
        "Participar en la lavada es un honor que se hereda en las familias viejanas, y la ceremonia marca el inicio de las grandes fiestas marianas del occidente."
      ],
      tags: ["tradición", "identidad", "memoria"] },
    { id: 16, n: 16, titulo: "Alfombras pasionarias de Sutiaba", cuando: "Viernes Santo", lugar: "León · Sutiaba", icon: "sol", foto: "assets/img/tradiciones/alfombras-sutiaba.jpg",
      pueblo: ["sutiaba", "mestizo"],
      texto: "Las calles del pueblo indígena de Sutiaba se cubren de alfombras de aserrín teñido: cuadros efímeros de arte popular sobre los que pasa la procesión del Santo Entierro.",
      detalle: [
        "Desde la madrugada del Viernes Santo, las familias sutiabas dibujan sobre el pavimento alfombras de aserrín de colores con escenas religiosas, flores y símbolos indígenas, terminadas justo antes de que la procesión las deshaga a su paso.",
        "El arte efímero de las alfombras —heredado de generación en generación— es una de las expresiones más hermosas de la Semana Santa nicaragüense y un orgullo del pueblo sutiaba."
      ],
      tags: ["tradición", "artesanía", "identidad"] },
    { id: 17, n: 17, titulo: "Sihkru Tara", cuando: "Encuentros del pueblo mískitu", lugar: "Río Coco (Wangki) · RACCN", icon: "corona", foto: "assets/img/tradiciones/sihkru-tara.jpg",
      pueblo: ["miskitu"],
      texto: "El gran encuentro espiritual y cultural del pueblo mískitu del Wangki: comunidades de ambas orillas del Río Coco se reúnen con cantos, danzas y ceremonias en honor a los ancestros.",
      detalle: [
        "El Sihkru Tara retoma la antigua ceremonia mískita de despedida y comunión con los espíritus de los difuntos, transformada hoy en un gran festival binacional que reúne a comunidades de Nicaragua y Honduras unidas por el Wangki.",
        "Durante días hay danzas tradicionales, música, comidas como el wabul, juegos ancestrales y ceremonias de los sukias: una afirmación viva de que el río no divide al pueblo mískitu, sino que lo une."
      ],
      tags: ["tradición", "ancestral", "ritual", "memoria"] }
  ],

  /* ---------- Documentos, marco legal y patrimonio ---------- */
  documentos: [
    { id: 1, n: 1, titulo: "Ley No. 28 — Estatuto de Autonomía", tipo: "Marco legal · 1987", icon: "libro", foto: "assets/img/documentos/ley-28.jpg",
      texto: "Crea las Regiones Autónomas de la Costa Caribe (RACCN y RACCS) y reconoce los derechos políticos, culturales y lingüísticos de sus pueblos.",
      detalle: [
        "Aprobada en 1987, la Ley No. 28 fue pionera en América Latina al reconocer el derecho de los pueblos de la Costa Caribe a la autonomía regional.",
        "Garantiza el uso de sus lenguas y la administración de sus asuntos locales, y dio origen a las regiones autónomas RACCN y RACCS."
      ],
      tags: ["autonomía", "historia", "territorio"] },
    { id: 2, n: 2, titulo: "Ley No. 445 — Régimen de Propiedad Comunal", tipo: "Marco legal · 2003", icon: "libro", foto: "assets/img/documentos/ley-445.jpg",
      texto: "Regula la propiedad comunal de los pueblos indígenas y comunidades étnicas y ordena la demarcación y titulación de sus territorios.",
      detalle: "Esta ley estableció el procedimiento para demarcar y titular los territorios comunales, garantizando el derecho colectivo de los pueblos sobre sus tierras ancestrales.",
      tags: ["territorio", "identidad"] },
    { id: 3, n: 3, titulo: "Ley No. 162 — Uso Oficial de las Lenguas", tipo: "Marco legal", icon: "libro", foto: "assets/img/documentos/ley-162.jpg",
      texto: "Reconoce el uso oficial de las lenguas de las comunidades de la Costa Caribe en educación, justicia y administración.",
      detalle: "La ley promueve la educación intercultural bilingüe y el uso de las lenguas mískita, mayangna, rama, garífuna y creole en los servicios públicos de las regiones autónomas.",
      tags: ["lengua", "educación"] },
    { id: 4, n: 4, titulo: "Reserva de Biosfera Bosawás (UNESCO)", tipo: "Patrimonio natural · 1997", icon: "palmera", foto: "assets/img/documentos/bosawas.jpg",
      texto: "Declaratoria internacional que protege uno de los mayores bosques tropicales de Centroamérica, territorio mayangna y mískitu.",
      detalle: "En 1997, la UNESCO incorporó Bosawás a su red mundial de reservas de biosfera, reconociendo su valor ecológico y el papel de los pueblos indígenas en su conservación.",
      tags: ["naturaleza", "territorio"] },
    { id: 5, n: 5, titulo: "Lengua y cultura garífuna (UNESCO)", tipo: "Patrimonio inmaterial · 2001", icon: "tambor", foto: "assets/img/documentos/garifuna-unesco.jpg",
      texto: "Proclamación de la lengua, la danza y la música garífunas como Obra Maestra del Patrimonio Oral e Inmaterial de la Humanidad.",
      detalle: "El reconocimiento de la UNESCO (2001) abarca a la cultura garífuna de Centroamérica y el Caribe, incluida la presente en Nicaragua, y destaca su lengua, su música de tambores y su tradición oral.",
      tags: ["música", "lengua", "ancestral"] },
    { id: 6, n: 6, titulo: "BICU — universidad comunitaria", tipo: "Institución", icon: "casa", foto: "assets/img/documentos/universidades.jpg",
      texto: "Universidad intercultural de la Costa Caribe que investiga, documenta y enseña en las lenguas y saberes propios de la región.",
      detalle: "La BICU forma profesionales de la región y produce investigación y publicaciones sobre sus lenguas, su historia y su cultura. Su biblioteca es una fuente clave de libros y monografías sobre la Costa Caribe.",
      tags: ["educación", "memoria"] },
    { id: 7, n: 7, titulo: "Reconocimiento constitucional", tipo: "Constitución de Nicaragua", icon: "libro", foto: "assets/img/documentos/constitucion.jpg",
      texto: "La Constitución reconoce la naturaleza multiétnica del país y los derechos de todos los pueblos indígenas y afrodescendientes —del Caribe, del Pacífico y del Centro-Norte— (arts. 5, 89–91 y 180–181).",
      detalle: "La Constitución Política consagra el carácter multiétnico de Nicaragua y garantiza a los pueblos originarios y afrodescendientes el derecho a preservar su identidad, sus lenguas, su arte y su cultura, así como sus formas propias de organización social y la administración de sus asuntos locales.",
      tags: ["identidad", "autonomía"] },
    { id: 8, n: 8, titulo: "Medicina tradicional comunitaria", tipo: "Patrimonio del conocimiento", icon: "palmera", foto: "assets/img/documentos/medicina.jpg",
      texto: "Acervo de conocimientos sobre plantas medicinales y prácticas de sanación, transmitido por sukyas, parteras y curanderas en todo el país.",
      detalle: "La medicina tradicional articula plantas, rituales y conocimiento heredado. La Ley No. 759 (2011) reconoce el derecho de los pueblos indígenas y afrodescendientes a su medicina ancestral, que convive con la medicina occidental en el modelo de salud intercultural.",
      tags: ["medicina", "naturaleza", "memoria"] },
    { id: 9, n: 9, titulo: "El Güegüense — Patrimonio de la Humanidad", tipo: "Patrimonio inmaterial · UNESCO 2005", icon: "mascara", foto: "assets/img/documentos/gueguense-unesco.jpg",
      texto: "La UNESCO proclamó en 2005 a El Güegüense Obra Maestra del Patrimonio Oral e Inmaterial de la Humanidad, primera expresión nicaragüense en recibir este reconocimiento.",
      detalle: "El teatro-danza de El Güegüense, representado en las fiestas de San Sebastián de Diriamba, fue proclamado por la UNESCO en 2005 e inscrito en 2008 en la Lista Representativa del Patrimonio Cultural Inmaterial. El reconocimiento destaca su valor como síntesis del mestizaje cultural y de la resistencia indígena expresada con sátira, máscaras, música y danza.",
      tags: ["unesco", "danza", "historia", "identidad"] },
    { id: 10, n: 10, titulo: "Ruinas de León Viejo (UNESCO)", tipo: "Patrimonio Mundial · 2000", icon: "iglesia", foto: "assets/img/documentos/leon-viejo-unesco.jpg",
      texto: "Primer sitio de Nicaragua inscrito en la lista del Patrimonio Mundial: los vestigios de una de las ciudades coloniales más antiguas de América, sepultada por el Momotombo.",
      detalle: "En el año 2000, la UNESCO inscribió las Ruinas de León Viejo como Patrimonio Mundial por ser testimonio excepcional de los primeros asentamientos coloniales españoles del siglo XVI, conservado sin alteraciones posteriores bajo la ceniza volcánica.",
      tags: ["unesco", "historia", "colonial"] },
    { id: 11, n: 11, titulo: "Catedral de León (UNESCO)", tipo: "Patrimonio Mundial · 2011", icon: "iglesia", foto: "assets/img/documentos/catedral-leon-unesco.jpg",
      texto: "La Basílica Catedral de la Asunción de León, la mayor de Centroamérica, fue inscrita como Patrimonio Mundial por su singular arquitectura y su valor cultural.",
      detalle: "Construida entre 1747 y el siglo XIX, la Catedral de León mezcla barroco y neoclásico en una arquitectura adaptada al clima y los sismos de la región. Guarda la tumba del poeta Rubén Darío y fue inscrita por la UNESCO en 2011.",
      tags: ["unesco", "colonial", "historia"] },
    { id: 12, n: 12, titulo: "Isla de Ometepe — Reserva de Biosfera", tipo: "Patrimonio natural · UNESCO 2010", icon: "volcan", foto: "assets/img/documentos/ometepe-unesco.jpg",
      texto: "La UNESCO declaró a Ometepe Reserva de Biosfera en 2010, reconociendo el valor natural y cultural de la isla volcánica más grande del mundo en un lago de agua dulce.",
      detalle: "La declaratoria abarca los volcanes Concepción y Maderas, sus bosques y humedales, y reconoce la convivencia histórica de sus habitantes con el ecosistema insular, incluida la herencia arqueológica nahoa de petroglifos y estatuaria.",
      tags: ["unesco", "naturaleza", "volcán"] },
    { id: 13, n: 13, titulo: "Ley No. 759 — Medicina Tradicional Ancestral", tipo: "Marco legal · 2011", icon: "libro", foto: "assets/img/documentos/ley-759.jpg",
      texto: "Reconoce el derecho de los pueblos indígenas y afrodescendientes de Nicaragua a ejercer y proteger su medicina tradicional ancestral, sus conocimientos y sus prácticas.",
      detalle: "Aprobada en 2011, la Ley de Medicina Tradicional Ancestral protege los conocimientos, usos del ecosistema, métodos y prácticas de salud de los pueblos originarios y afrodescendientes, y promueve su integración respetuosa con el sistema nacional de salud.",
      tags: ["medicina", "lengua", "identidad"] }
  ],

  /* ---------- Diccionario intercultural (palabras clave) ---------- */
  diccionario: [
    { palabra: "Naksa", lengua: "Mískitu", pueblo: "miskitu", significado: "Hola, ¿cómo estás? El saludo cotidiano mískitu.", nota: "Se responde: 'pain' (bien)." },
    { palabra: "Tingki", lengua: "Mískitu", pueblo: "miskitu", significado: "Gracias.", nota: "Préstamo adaptado del inglés 'thank you', muestra del contacto histórico con los británicos." },
    { palabra: "Li", lengua: "Mískitu", pueblo: "miskitu", significado: "Agua.", nota: "Palabra esencial de un pueblo de ríos, lagunas y mar." },
    { palabra: "Tasba", lengua: "Mískitu", pueblo: "miskitu", significado: "Tierra, territorio.", nota: "'Yapti Tasba' = Madre Tierra, concepto central de la cosmovisión." },
    { palabra: "Yapti", lengua: "Mískitu", pueblo: "miskitu", significado: "Madre.", nota: "" },
    { palabra: "Kuka", lengua: "Mískitu", pueblo: "miskitu", significado: "Abuela.", nota: "Las kuka son las grandes contadoras de historias de la comunidad." },
    { palabra: "Dama", lengua: "Mískitu", pueblo: "miskitu", significado: "Abuelo, anciano respetado.", nota: "" },
    { palabra: "Sukya", lengua: "Mískitu", pueblo: "miskitu", significado: "Sanador y guía espiritual tradicional.", nota: "Media entre la comunidad y el mundo de los espíritus." },
    { palabra: "Liwa", lengua: "Mískitu", pueblo: "miskitu", significado: "Espíritu del agua.", nota: "'Liwa Mairin' es la sirena madre del agua de la tradición oral." },
    { palabra: "Wangki", lengua: "Mískitu", pueblo: "miskitu", significado: "Nombre mískitu del Río Coco.", nota: "El río más largo de Centroamérica y eje de la vida mískita." },
    { palabra: "Pulanka", lengua: "Mískitu", pueblo: "miskitu", significado: "Juego, fiesta, representación.", nota: "'King Pulanka' = el juego del Rey, la gran fiesta teatral mískita." },
    { palabra: "Was", lengua: "Mayangna", pueblo: "mayangna", significado: "Agua, río.", nota: "Aparece en muchos nombres de lugares del territorio mayangna." },
    { palabra: "Sauni", lengua: "Mayangna", pueblo: "mayangna", significado: "Tierra, territorio.", nota: "'Mayangna Sauni As' = Territorio Mayangna Uno, en Bosawás." },
    { palabra: "Mayangna", lengua: "Mayangna", pueblo: "mayangna", significado: "'Nosotros', la autodenominación del pueblo.", nota: "Reivindica su nombre propio frente al término externo 'sumu'." },
    { palabra: "Tunu", lengua: "Mayangna", pueblo: "mayangna", significado: "Árbol cuya corteza se trabaja como tela tradicional (tuno).", nota: "Con el tuno se elaboran tapices, vestimenta y artesanías." },
    { palabra: "Panamahka", lengua: "Mayangna", pueblo: "mayangna", significado: "Una de las variantes de la lengua mayangna, junto al twahka y el ulwa.", nota: "" },
    { palabra: "Buiti binafi", lengua: "Garífuna", pueblo: "garifuna", significado: "Buenos días.", nota: "" },
    { palabra: "Seremein", lengua: "Garífuna", pueblo: "garifuna", significado: "Gracias.", nota: "" },
    { palabra: "Garinagu", lengua: "Garífuna", pueblo: "garifuna", significado: "El pueblo garífuna (plural de garífuna).", nota: "" },
    { palabra: "Ereba", lengua: "Garífuna", pueblo: "garifuna", significado: "Casabe: tortilla delgada y crujiente de yuca.", nota: "Alimento ancestral de la herencia arahuaca." },
    { palabra: "Walagallo", lengua: "Garífuna", pueblo: "garifuna", significado: "Ceremonia mayor de sanación con tambores, cantos y danza.", nota: "También llamado Dügü; convoca a los ancestros." },
    { palabra: "Wapin", lengua: "Creole", pueblo: "creole", significado: "¡Hola! ¿Qué pasó? (saludo).", nota: "Del inglés 'what happen': el saludo de Bluefields." },
    { palabra: "Pikni", lengua: "Creole", pueblo: "creole", significado: "Niño, niña.", nota: "" },
    { palabra: "Dori", lengua: "Creole", pueblo: "creole", significado: "Bote pequeño, cayuco.", nota: "Del inglés 'dory'; transporte de cada día en lagunas y ríos." },
    { palabra: "Rondón", lengua: "Creole", pueblo: "creole", significado: "Guiso de pescado y tubérculos cocido en leche de coco.", nota: "Del inglés 'run down'. El plato insignia del Caribe." },
    { palabra: "Chigüín", lengua: "Náhuat", pueblo: "nahoa", significado: "Niño pequeño, hijo.", nota: "Una de las palabras náhuat más vivas del habla nicaragüense." },
    { palabra: "Pinol", lengua: "Náhuat", pueblo: "nahoa", significado: "Harina de maíz tostado (de 'pinolli').", nota: "Da nombre al pinolillo y al gentilicio 'pinolero'." },
    { palabra: "Jocote", lengua: "Náhuat", pueblo: "nahoa", significado: "Fruta agridulce (de 'xocotl', fruta agria).", nota: "" },
    { palabra: "Guacal", lengua: "Náhuat", pueblo: "nahoa", significado: "Recipiente hecho del fruto del jícaro (de 'huacalli').", nota: "En guacal se sirve el pinolillo y el tiste." },
    { palabra: "Comal", lengua: "Náhuat", pueblo: "nahoa", significado: "Disco de barro o metal para cocer tortillas (de 'comalli').", nota: "" },
    { palabra: "Chilote", lengua: "Náhuat", pueblo: "nahoa", significado: "Mazorca tierna de maíz (de 'xilotl').", nota: "Protagonista de sopas y güises de la cocina nica." },
    { palabra: "Nacatamal", lengua: "Náhuat", pueblo: "nahoa", significado: "Tamal de carne (de 'nacatl' carne + 'tamalli' tamal).", nota: "El platillo nacional lleva su nombre en náhuat." },
    { palabra: "Diri", lengua: "Mangue (chorotega)", pueblo: "chorotega", significado: "Cerro, colina.", nota: "Vive en los topónimos Diriamba, Diriá y Diriomo." },
    { palabra: "Lí", lengua: "Matagalpa", pueblo: "cacaopera", significado: "Agua, río.", nota: "Presente en Estelí, Yalí, Quilalí y otros nombres del norte." },
    { palabra: "Galpa", lengua: "Matagalpa", pueblo: "cacaopera", significado: "Terminación asociada a 'lugar habitado'.", nota: "Se reconoce en nombres como Matagalpa y Juigalpa." },
    { palabra: "Pana pana", lengua: "Mískitu", pueblo: "miskitu", significado: "Ayuda mutua, mano vuelta: trabajar hoy por vos, mañana por mí.", nota: "Principio de reciprocidad que organiza la vida comunitaria mískita." },
    { palabra: "Bip", lengua: "Mískitu", pueblo: "miskitu", significado: "Vaca, res.", nota: "Adaptación del inglés 'beef'; muestra del contacto con los británicos." },
    { palabra: "Aal rait", lengua: "Creole", pueblo: "creole", significado: "'Está bien', 'todo bien' (saludo y despedida).", nota: "Del inglés 'all right'; se escucha en cada esquina de Bluefields." },
    { palabra: "Bredda", lengua: "Creole", pueblo: "creole", significado: "Hermano, amigo cercano.", nota: "Del inglés 'brother'." },
    { palabra: "Jícara", lengua: "Náhuat", pueblo: "nahoa", significado: "Vaso hecho del fruto del jícaro (de 'xicalli').", nota: "En jícara se sirven el tiste y el pinolillo tradicionales." },
    { palabra: "Ayote", lengua: "Náhuat", pueblo: "nahoa", significado: "Calabaza (de 'ayotli').", nota: "En miel de rapadura, el 'ayote en miel' es dulce de Cuaresma." },
    { palabra: "Chayote", lengua: "Náhuat", pueblo: "nahoa", significado: "Fruto verde de enredadera (de 'chayotli'), clásico de las sopas.", nota: "" },
    { palabra: "Pipián", lengua: "Náhuat", pueblo: "nahoa", significado: "Ayote tierno que se come en guisos y con cuajada.", nota: "El 'guiso de pipián' es plato típico de la meseta." },
    { palabra: "Tiste", lengua: "Náhuat", pueblo: "nahoa", significado: "Bebida de maíz tostado y cacao (de 'textli', masa molida).", nota: "Compañero histórico del quesillo, servido en jícara." },
    { palabra: "Cacao", lengua: "Náhuat", pueblo: "nahoa", significado: "Semilla sagrada mesoamericana (de 'cacahuatl').", nota: "Fue moneda y bebida ritual de chorotegas y nicaraos." }
  ],

  /* ---------- Línea de tiempo: memoria documentada ---------- */
  hitos: [
    { anio: "1524", titulo: "Fundación de Granada y León", texto: "Francisco Hernández de Córdoba funda las dos ciudades coloniales más antiguas del país, sobre territorios chorotegas y nahoas.", icon: "iglesia" },
    { anio: "1610", titulo: "Abandono de León Viejo", texto: "Tras los sismos y la furia del volcán Momotombo, León se traslada a su sitio actual. Las ruinas quedan sepultadas casi intactas.", icon: "volcan" },
    { anio: "1675", titulo: "Se levanta El Castillo", texto: "España construye la Fortaleza de la Inmaculada sobre el Río San Juan para frenar a los piratas. En 1762, la joven Rafaela Herrera dirigirá desde sus muros la defensa que la hizo heroína.", icon: "iglesia" },
    { anio: "1841", titulo: "Emancipación en la Mosquitia", texto: "Se proclama la abolición de la esclavitud en la costa Caribe; cada agosto las Islas del Maíz lo celebran con el Festival del Cangrejo.", icon: "cangrejo" },
    { anio: "1894", titulo: "La Mosquitia se integra a Nicaragua", texto: "El territorio de la antigua Mosquitia se incorpora al Estado nicaragüense, un hecho que marca la historia de los pueblos costeños.", icon: "libro" },
    { anio: "1979", titulo: "Primer parque nacional", texto: "El Volcán Masaya, venerado por los chorotegas, se convierte en el primer parque nacional de Nicaragua.", icon: "volcan" },
    { anio: "1987", titulo: "Ley No. 28 — Autonomía", texto: "El Estatuto de Autonomía reconoce el derecho de los pueblos de la Costa Caribe a gobernarse y preservar sus lenguas y culturas.", icon: "corona" },
    { anio: "1993", titulo: "Ley No. 162 — Lenguas", texto: "Se reconoce el uso oficial de las lenguas mískitu, mayangna, rama, garífuna y creole en las regiones autónomas.", icon: "libro" },
    { anio: "1997", titulo: "Bosawás, Reserva de Biosfera", texto: "La UNESCO reconoce la gran selva de los pueblos mayangna y mískitu como Reserva de Biosfera.", icon: "palmera" },
    { anio: "2000", titulo: "León Viejo, Patrimonio Mundial", texto: "Las ruinas de León Viejo se convierten en el primer sitio de Nicaragua inscrito por la UNESCO.", icon: "iglesia" },
    { anio: "2001", titulo: "La cultura garífuna, Patrimonio de la Humanidad", texto: "La lengua, danza y música garífunas son proclamadas Obra Maestra del Patrimonio Oral e Inmaterial.", icon: "tambor" },
    { anio: "2003", titulo: "Ley No. 445 — Territorios comunales", texto: "Se ordena la demarcación y titulación de los territorios de los pueblos indígenas y afrodescendientes.", icon: "pin" },
    { anio: "2005", titulo: "El Güegüense, Patrimonio de la Humanidad", texto: "La obra cumbre del mestizaje nicaragüense es proclamada por la UNESCO; el macho ratón se vuelve símbolo nacional.", icon: "mascara" },
    { anio: "2010", titulo: "Ometepe, Reserva de Biosfera", texto: "La isla sagrada de los nahoas, con sus dos volcanes y sus petroglifos, entra a la red mundial de biosferas.", icon: "volcan" },
    { anio: "2011", titulo: "Catedral de León y medicina ancestral", texto: "La Catedral de León es inscrita como Patrimonio Mundial y la Ley 759 protege la medicina tradicional de los pueblos.", icon: "sol" }
  ],

  /* ---------- Calendario cultural (fiestas reales por mes) ---------- */
  calendario: [
    { mes: 1, dia: "17–27", titulo: "Fiestas de San Sebastián (El Güegüense y el Toro Huaco)", tipo: "tradiciones", id: 12 },
    { mes: 1, dia: "Enero–febrero", titulo: "King Pulanka en las comunidades mískitas", tipo: "tradiciones", id: 2 },
    { mes: 3, dia: "Domingo antes de Ramos", movil: true, titulo: "Fiesta de San Lázaro — los perritos de Monimbó", tipo: "tradiciones", id: 14 },
    { mes: 3, dia: "Viernes Santo", movil: true, titulo: "Alfombras pasionarias de Sutiaba", tipo: "tradiciones", id: 16 },
    { mes: 5, dia: "Todo el mes", titulo: "Palo de Mayo (Mayo Ya!) en Bluefields", tipo: "tradiciones", id: 1 },
    { mes: 8, dia: "1 al 10", titulo: "Santo Domingo de Guadalupe (Minguito) en Managua", tipo: "tradiciones", id: 11 },
    { mes: 8, dia: "27–28", titulo: "Festival del Cangrejo · Día de la Emancipación (Islas del Maíz)", tipo: "tradiciones", id: 4 },
    { mes: 9, dia: "Desde el 30", titulo: "Fiestas de San Jerónimo en Masaya (las más largas del país)", tipo: "tradiciones", id: 10 },
    { mes: 10, dia: "Último viernes", titulo: "Los Agüizotes — la noche de los espantos (Masaya)", tipo: "tradiciones", id: 13 },
    { mes: 10, dia: "30", titulo: "Día de la Autonomía de la Costa Caribe", tipo: "tradiciones", id: 3 },
    { mes: 11, dia: "Mediados de mes", titulo: "Danza del Zompopo · San Diego de Alcalá (Ometepe)", tipo: "danzas", id: 7 },
    { mes: 11, dia: "19", titulo: "Día de la Cultura Garífuna (Laguna de Perlas)", tipo: "tradiciones", id: 5 },
    { mes: 12, dia: "6", titulo: "La Lavada de la Plata en El Viejo", tipo: "tradiciones", id: 15 },
    { mes: 12, dia: "7", titulo: "La Purísima y La Gritería — «¿Quién causa tanta alegría?»", tipo: "tradiciones", id: 9 },
    { mes: 12, dia: "Todo el mes", titulo: "La Gigantona y el Enano Cabezón recorren León", tipo: "danzas", id: 6 }
  ],

  /* ---------- ¿Cómo se dice…? Frases comparadas entre lenguas ---------- */
  frases: [
    { es: "Agua", tr: { "Mískitu": "Li", "Mayangna": "Was", "Garífuna": "—", "Creole": "—", "Náhuat": "—", "Matagalpa": "Lí" } },
    { es: "Tierra / territorio", tr: { "Mískitu": "Tasba", "Mayangna": "Sauni", "Garífuna": "—", "Creole": "—", "Náhuat": "—", "Matagalpa": "—" } },
    { es: "Gracias", tr: { "Mískitu": "Tingki", "Mayangna": "—", "Garífuna": "Seremein", "Creole": "Tenki", "Náhuat": "—", "Matagalpa": "—" } },
    { es: "Hola / saludo", tr: { "Mískitu": "Naksa", "Mayangna": "—", "Garífuna": "Buiti binafi (buenos días)", "Creole": "Wapin / Aal rait", "Náhuat": "—", "Matagalpa": "—" } },
    { es: "Madre", tr: { "Mískitu": "Yapti", "Mayangna": "—", "Garífuna": "—", "Creole": "—", "Náhuat": "—", "Matagalpa": "—" } },
    { es: "Niño, niña", tr: { "Mískitu": "—", "Mayangna": "—", "Garífuna": "—", "Creole": "Pikni", "Náhuat": "Chigüín*", "Matagalpa": "—" } },
    { es: "Vaca / res", tr: { "Mískitu": "Bip", "Mayangna": "—", "Garífuna": "—", "Creole": "—", "Náhuat": "—", "Matagalpa": "—" } },
    { es: "Cerro", tr: { "Mískitu": "—", "Mayangna": "—", "Garífuna": "—", "Creole": "—", "Náhuat": "—", "Matagalpa": "—", "Mangue": "Diri" } }
  ],

  /* ---------- Atribución de contenido existente a pueblos / regiones ----------
     Mapea elementos que no traen el campo 'pueblo' o 'regionId' propio. */
  atribucion: {
    recetas: { 1: ["creole", "miskitu"], 2: ["creole"], 3: ["garifuna", "creole"], 4: ["miskitu"], 5: ["creole"], 6: ["creole"], 7: ["creole"], 8: ["creole", "garifuna", "miskitu"], 9: ["creole"], 10: ["creole", "garifuna"] },
    oral: { 1: ["miskitu"], 2: ["miskitu"], 3: ["miskitu"], 4: ["miskitu", "mayangna"], 5: ["miskitu"], 6: ["miskitu", "rama"] },
    tradiciones: { 1: ["creole"], 2: ["miskitu"], 3: ["miskitu", "mayangna", "rama", "garifuna", "creole"], 4: ["creole"], 5: ["garifuna"], 6: ["miskitu", "creole"], 7: ["miskitu", "mayangna", "rama"], 8: ["mayangna", "miskitu"] },
    lugares: { "bilwi": ["miskitu"], "bluefields": ["creole"], "corn-islands": ["creole"], "laguna-de-perlas": ["garifuna", "creole"], "bosawas": ["mayangna", "miskitu"], "rio-coco": ["miskitu"], "rama-cay": ["rama"], "el-rama": ["mestizo"], "indio-maiz": ["rama"] },
    regionLugares: { "bilwi": "caribe-norte", "bluefields": "caribe-sur", "corn-islands": "caribe-sur", "laguna-de-perlas": "caribe-sur", "bosawas": "caribe-norte", "rio-coco": "caribe-norte", "rama-cay": "caribe-sur", "el-rama": "caribe-sur", "indio-maiz": "caribe-sur" }
  }
};

window.BDI = BDI;
