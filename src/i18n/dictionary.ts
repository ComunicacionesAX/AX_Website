export type Lang = "es" | "en";

const es = {
  nav: {
    products: "Productos",
    saber: "El poder del saber",
    quote: "Cotizar",
    login: "Login",
    goHome: "Ir al inicio",
    home: "Inicio",
    menu: "Menú",
    skipToContent: "Saltar al contenido",
    productItems: [
      { name: "PigVision", desc: "Cámara para pesar cerdos en ceba", href: "/pigvision", img: "/images/home_render_pigvision-768x536.webp" },
      { name: "Insylo", desc: "Control del alimento y consumo", href: "/insylo", img: "/images/home_render_insylo-1-768x1131.webp" },
      { name: "Sensores Ambientales", desc: "Ambiente bajo control", href: "/nodos", img: "/images/home_render_nodos-768x536.webp" },
    ],
  },
  hero: {
    title1: "Nunca más",
    title2: "decidas sin datos",
    subtitle: "Monitoreo inteligente para\ngranjas porcinas y avícolas",
    cta: "Evaluar mi granja",
    pill: "Cámaras inteligentes, sensores y análisis que convierten los datos de tu granja en la certeza de decidir bien.",
  },
  problems: {
    title: "Lo que pasa cuando decides sin datos",
    items: [
      {
        title: "No controlas el alimento",
        text: "Sin saber el nivel real del alimento, pedir más o dejar de pedir te cuesta.",
      },
      {
        title: "Decides con estimaciones",
        text: "Al no conocer el peso real del lote, puedes retrasar o adelantar salidas y afectar la rentabilidad.",
      },
      {
        title: "Alteras la conversión",
        text: "Si no detectas a tiempo cambios en las condiciones ambientales, impactas la eficiencia productiva.",
      },
      {
        title: "Impactas la ganancia de peso",
        text: "Al perder de vista el estado real del alimento, terminas desperdiciando recursos.",
      },
    ],
  },
  solutions: {
    title: "Así lo soluciona Asimetrix",
    precision: "de precisión",
    seeHow: "Ver cómo funciona",
    see: "Ver",
    prev: "Producto anterior",
    next: "Siguiente producto",
    items: [
      { name: "PigVision", text: "Conoce el peso preciso de tus lotes sin estresar a los cerdos." },
      { name: "Insylo", text: "Conoce el nivel real de tus silos y evita faltantes de alimento." },
      { name: "Sensores ambientales", text: "Monitoreo continuo de temperatura, humedad, CO₂ y amoníaco." },
    ],
  },
  audience: {
    title1: "¿Para quién",
    title2: "es Asimetrix?",
    segments: [
      { title: "Productores", text: "que buscan más control, rentabilidad\ny decisiones respaldadas por datos." },
      { title: "Galponeros y técnicos", text: "que necesitan datos confiables\ny simplicidad en su día a día." },
      { title: "Líderes", text: "que toman decisiones estratégicas\ncon datos, no con intuición." },
    ],
  },
  videoSection: {
    title: "Tecnología que funciona en el campo",
  },
  midCta: {
    title: "¿Quieres ver cómo funcionaría en tu granja?",
    cta: "Hablemos sobre tu granja",
  },
  ecosystem: {
    title1: "Somos parte de un",
    title2: "ecosistema global",
    title3: "de innovación",
    copy: [
      "Impulsados por el propósito de diseñar nutrición para mejorar vidas.",
      "Integramos ciencia, tecnología y conocimiento para enfrentar los desafíos reales de la producción animal.",
      "En Asimetrix convertimos ese propósito en datos que ayudan a decidir mejor, granja por granja.",
    ],
    stat1Value: "+1000 personas",
    stat1Label: "alineadas bajo un mismo propósito.",
    stat2Value: "+ 600 millones",
    stat2Label: "de vidas diarias impactadas",
  },
  research: {
    pre: "Nos situamos en",
    title: "el Research Triangle,",
    post: "Carolina del Norte",
    p1: "Uno de los epicentros de innovación, investigación y ciencias de la vida.",
    p2: "Un entorno que impulsa nuestro desarrollo tecnológico y fortalece nuestra capacidad para transformar conocimiento en soluciones reales para la producción animal.",
    imageAlt: "Research Triangle, Carolina del Norte",
  },
  cta: {
    title: "Empieza a tomar decisiones con datos reales",
    cta: "Hablemos sobre tu granja",
  },
  footer: {
    colProducts: {
      title: "Productos",
      links: [
        { label: "PigVision", href: "/pigvision" },
        { label: "Insylo", href: "/insylo" },
        { label: "Sensores Ambientales", href: "/nodos" },
      ],
    },
    colSaber: {
      title: "El poder del saber",
      links: [
        {
          label: "Ciencias de la innovación",
          href: "https://39682324.fs1.hubspotusercontent-na1.net/hubfs/39682324/14+Innovacion+Agropecuaria.pdf",
          external: true,
        },
        {
          label: "Revista digital: BM Editores",
          href: "https://bmeditores.mx/porcicultura/asimetrix-marca-la-diferencia-en-control-de-crecimiento-porcino/",
          external: true,
        },
        {
          label: "Revista digital: Pig Progress",
          href: "https://www.pigprogress.net/market-trends-analysis-the-industrymarkets/wrapping-up-february-whats-new-in-the-world-of-pigs-7/",
          external: true,
        },
      ],
    },
    quoteTitle: "Cotizar",
    quoteText: "Escríbenos y te contactaremos.",
    faq: "Preguntas frecuentes",
    login: "Login",
    legal: "Asimetrix · Desbloquea el poder de tus datos. Diseñando nutrición, mejorando vidas. 1307 Person St, Durham, North Carolina. +57 6041500. © 2026 Iluma Alliance",
    logoAlt: "Asimetrix · Desbloquea el poder de tus datos.",
  },
  onix: {
    label: "Habla con Onix",
    title: "¡Soy Onix!",
    subtitle: "Hablemos",
    close: "Cerrar Onix",
    reopen: "Volver a abrir Onix",
  },
  common: {
    scheduleDemo: "Agendar demostración",
    talkFarm: "Hablemos sobre tu granja",
    startDeciding: "Empieza a tomar decisiones con datos reales",
    theProblem: "El problema",
    theSolution: "La solución",
    whatMakesDifference: "Lo que marca la diferencia",
    precision: "de precisión",
    connectsWith: "se conecta",
    connectsWithRest: "con aplicaciones del ecosistema Asimetrix",
    relatedTitle: "Otros productos que se complementan",
    relatedSubtitle: "Explora las demás soluciones del ecosistema Asimetrix.",
    discoverTitle: "Conoce nuestros productos",
    discoverSubtitle: "Soluciones que trabajan juntas para transformar tu granja en datos.",
    seeProduct: "Conocer",
    productTaglinePigVision: "Conoce el peso de tus lotes,\nsin estresar a los cerdos.",
    productTaglineInsylo: "Nivel real de tu silo,\nsin quedarte sin alimento.",
    productTaglineNodos: "Monitoreo continuo de temperatura,\nhumedad y CO₂ en tu granja.",
  },
  pigvision: {
    pageLabel: "PigVision",
    subtitle: "Cámara inteligente para\npesar cerdos en ceba",
    range: "de 30Kg a 150Kg",
    problemTitle: "El problema de pensar de forma tradicional",
    problemImgAlt: "Cerdos en granja",
    problems: [
      { bold: "Pesajes manuales", rest: "que estresan a los cerdos" },
      { bold: "Datos poco frecuentes", rest: "o inestables" },
      { bold: "Decisiones tardías sobre", rest: "crecimiento y venta" },
    ],
    solutionSubtitle: "datos claros para soluciones productivas",
    solutionImgAltPigs: "Cerdos monitoreados",
    solutionImgAltRender: "PigVision plataforma de monitoreo",
    highlightTitle1: "Medición",
    highlightTitle2: "sin contacto",
    highlightText: "Calcula el peso sin tocar ni estresar a los animales.",
    features: [
      { title: "Detección de anomalías en el crecimiento", text: "Identifica desviaciones en el desempeño del lote para intervenir a tiempo." },
      { title: "Plataforma de monitoreo", text: "Visualiza el historial productivo del lote en una sola plataforma." },
      { title: "Proyección de peso y crecimiento", text: "Anticipa el peso futuro de tus animales y mejora la planificación de salida." },
    ],
    diffImgAlt: "Granja porcina",
    diffBadge1: "ROI productivo de hasta 8:1",
    diffBadge2: "Diagnóstico remoto",
    diffSlides: [
      {
        img: "/images/pigvision/pv_diff_01.jpg",
        title: "ROI productivo de hasta 8:1",
        text: "Convierte datos de peso en decisiones que impactan directamente la rentabilidad.",
      },
      {
        img: "/images/pigvision/pv_diff_02.jpg",
        title: "Diagnóstico remoto",
        text: "Permite visualizar posibles lesiones en los animales y aseo en los corrales.",
      },
      {
        img: "/images/pigvision/pv_diff_03.jpg",
        title: "Detección temprana de desviaciones",
        text: "Comprende el crecimiento por fases para ajustes oportunos.",
      },
    ],
    comparison: {
      rows: ["Función principal", "Cómo utiliza los datos de PigVision", "Tipo de dato utilizado"],
      columns: [
        {
          title: "OPTIMARKET",
          cells: [
            "Optimiza el calendario de salida para maximizar rentabilidad.",
            "Toma el peso actual calculado por las cámaras y simula matemáticamente la curva de distribución de tamaños del lote para planear entregas escalonadas.",
            "Peso promedio del lote proyectado matemáticamente hacia el futuro.",
          ],
        },
        {
          title: "DASHBOARD DE PIGVISION",
          cells: [
            "Es la plataforma central que consolida el rendimiento del lote y grafica el crecimiento de los animales en el tiempo.",
            "Traza curvas de crecimiento cruzando la edad de los animales con su peso, comparando automáticamente estos resultados frente a la meta de la guía genética.",
            "Pesos promedios y datos de ganancia diaria.",
          ],
        },
      ],
    },
  },
  insylo: {
    pageLabel: "Insylo",
    subtitle: "Sensor 3D para monitoreo de alimento en silos",
    range: "de hasta 12 metros.",
    problemTitle: "El problema del monitoreo manual del silo",
    problemImgAlt: "Silo metálico en paisaje montañoso",
    problems: [
      { bold: "Medición imprecisa", rest: "de alimento dentro del silo" },
      { bold: "Desabastecimiento", rest: "inesperado" },
      { bold: "Visibilidad limitada", rest: "del silo" },
    ],
    solutionSubtitle: "Monitoreo continuo del alimento en silo",
    solutionImgAltLeft: "Sensor Insylo instalado",
    solutionImgAltCenter: "Medición de grano en silo industrial",
    highlightTitle: "Alertas configurables",
    highlightText: "Recibe alertas cuando el nivel de alimento baja del umbral definido.",
    features: [
      { title: "Medición automática", text: "Mide el nivel de alimento sin inspecciones manuales." },
      { title: "Datos en tiempo real", text: "Consulta el estado del silo en tiempo real, desde cualquier lugar." },
      { title: "Historial y consumo", text: "Analiza el consumo de alimento a lo largo del tiempo desde la plataforma." },
    ],
    diffImgAlt: "Silo lleno de alimento animal",
    diffBadge1: "Monitoreo ambiental del silo",
    diffBlockTitle: "Topografía 3D del alimento",
    diffBlockText: "Visualiza cómo se distribuye realmente el alimento dentro del silo.",
    diffBadge2: "Proyección de consumo",
    diffSlides: [
      {
        img: "/images/insylo/is_diff_01.jpg",
        title: "Topografía 3D del alimento",
        text: "Visualiza cómo se distribuye realmente el alimento dentro del silo.",
      },
      {
        img: "/images/insylo/is_diff_02.jpg",
        title: "Monitoreo ambiental del silo",
        text: "Revisa temperatura y humedad para proteger la calidad del alimento.",
      },
      {
        img: "/images/insylo/is_diff_03.jpg",
        title: "Proyección de consumo del silo",
        text: "Anticipa cuándo será necesario reabastecer según el comportamiento del alimento.",
      },
    ],
    comparison: {
      rows: ["Función principal", "Cómo utiliza los datos de Insylo", "Tipo de dato utilizado"],
      columns: [
        {
          title: "ECONOMETRIX",
          cells: [
            "Simulador predictivo que genera estados de resultados financieros.",
            "Cruza el dato exacto del consumo de alimento de la granja con los costos operativos para modelar matemáticamente cómo esto impacta en el margen de rentabilidad.",
            "Niveles de llenado del silo.",
          ],
        },
        {
          title: "DASHBOARD DE INSYLO",
          cells: [
            "Es la interfaz gráfica para que el productor visualice y controle el inventario de alimento en su granja.",
            "Presenta gráficamente las mediciones de volumen de alimento para que el usuario vigile el abastecimiento y el consumo en tiempo real.",
            "Niveles exactos de llenado de los silos capturados por el sensor.",
          ],
        },
      ],
    },
  },
  nodos: {
    pageLabel: "Sensores ambientales",
    title1: "Nodos",
    title2: "ambientales",
    subtitle: "Sensores para monitorear\nel ambiente de la granja",
    tagline: "Temperatura, humedad, CO₂ y luz bajo control.",
    problemTitle: "El problema del monitoreo ambiental manual",
    problemImgAlt: "Galpón avícola",
    problems: [
      { bold: "Datos medioambientales", rest: "subestimados" },
      { bold: "Cambios ambientales", rest: "que pasan desapercibidos" },
      { bold: "Intervenciones", rest: "tardías" },
    ],
    solutionSubtitle: "Monitoreo continuo de las condiciones ambientales",
    solutionImgAltLeft: "Nodo ambiental instalado",
    solutionImgAltCenter: "Nodos ambientales",
    highlightTitle1: "Plataforma",
    highlightTitle2: "de análisis",
    highlightText: "Visualiza cambios, identifica patrones y entiende la evolución del ambiente a través de datos centralizados en una sola plataforma.",
    features: [
      { title: "Monitoreo continuo", text: "Monitorea temperatura, humedad y gases dentro del galpón durante todo el día." },
      { title: "Alertas configurables", text: "Recibe alertas cuando una condición ambiental sale del rango definido." },
      { title: "Ambiente más seguro para el trabajo", text: "Supervisa la calidad del aire y mantén condiciones adecuadas para animales dentro del galpón." },
    ],
    diffImgAlt: "Galpón con nodos ambientales",
    diffBadge1: "Lecturas distribuidas en el galpón",
    diffBlockTitle: "Sensores configurables según la necesidad",
    diffBlockText: "Adapta la medición de variables ambientales según las necesidades específicas de cada granja.",
    diffBadge2: "Proyección de consumo",
    diffSlides: [
      {
        img: "/images/nodos/nd_diff_01.jpg",
        title: "Sensores configurables según la necesidad",
        text: "Adapta la medición de variables ambientales según las necesidades específicas de cada granja.",
      },
      {
        img: "/images/nodos/nd_diff_02.jpg",
        title: "Lecturas distribuidas en el galpón",
        text: "Permite monitorear condiciones en diferentes puntos para entender mejor lo que ocurre dentro del ambiente productivo.",
      },
      {
        img: "/images/nodos/nd_diff_03.jpg",
        title: "Arquitectura escalable por granja",
        text: "Instala múltiples sensores según el tamaño del galpón y el nivel de monitoreo que necesitas.",
      },
    ],
    comparison: {
      rows: ["Función principal", "Cómo utiliza los datos de Nodos", "Tipo de dato utilizado"],
      columns: [
        {
          title: "DASHBOARD DE GRANJA",
          cells: [
            "Es un panel de control diseñado para visualizar el comportamiento climático del galpón cada 15 minutos.",
            "Recibe la información mediante una conexión de streaming continuo en la nube para graficar las variables y permitir la detección precisa de picos máximos y mínimos.",
            "Variables medioambientales.",
          ],
        },
      ],
    },
  },
  saber: {
    title: "El poder del saber",
    subtitle: "Información técnica, análisis y datos\nque explican cómo el monitoreo continuo\nmejora la rentabilidad en granja.",
    featureTitle1: "Ciencias",
    featureTitle2: "de la innovación",
    featureAlt: "Ciencias de la innovación",
    featureText: "Estudio sobre la implementación de PigVision en granjas porcinas y su impacto en la toma de decisiones. Presenta resultados reales de productividad y eficiencia basados en datos.",
    featureDate: "Diciembre 2025",
    revistas: [
      {
        title: "Revista digital: BM Editores",
        text: "Cómo PigVision mejora el control del crecimiento porcino con datos en granja.",
        date: "Febrero 2025",
        url: "https://bmeditores.mx/porcicultura/asimetrix-marca-la-diferencia-en-control-de-crecimiento-porcino/",
      },
      {
        title: "Revista digital: Pig progress",
        text: "Actualización de tendencias globales en porcicultura y dinámica del mercado.",
        date: "Marzo 2025",
        url: "https://www.pigprogress.net/market-trends-analysis-the-industrymarkets/wrapping-up-february-whats-new-in-the-world-of-pigs-7/",
      },
    ],
    ncsuTitle: "Estudio realizado por NCSU\nsobre el funcionamiento de PigVision",
    ncsuRenderAlt: "PigVision",
    ncsuLogoAlt: "NC State University",
    ncsuText: "Evaluación precisa y rápida del peso en cerdos de engorde, validada frente a métodos tradicionales en granja.",
  },
  // Hub de preguntas frecuentes (`/preguntas-frecuentes`). Contenido aprobado
  // en `FAQ-PROPUESTA.md`.
  //
  // Forma unificada a propósito: TODO grupo tiene `sections`, y toda sección
  // tiene `title` — vacío cuando el grupo no se subdivide. Igual con
  // `productName`/`productHref`, vacíos en los grupos que no son de producto.
  // Mantener la forma uniforme evita ramificar el render y evita que `en`
  // (tipado como `typeof es`) tenga que resolver un tipo unión.
  //
  // Las tres preguntas marcadas `[PENDIENTE]` en la propuesta (§7.1 modelo
  // de suscripción, fin de contrato; §7.6 tiempo de respuesta de soporte) NO
  // están aquí: publicarlas sin respuesta definida sería marcar en schema una
  // afirmación que el negocio todavía no tomó.
  faqPage: {
    pageLabel: "Preguntas frecuentes",
    title: "Preguntas frecuentes",
    subtitle: "Lo que más nos preguntan productores, técnicos y equipos de granja antes de empezar.",
    navLabel: "Categorías",
    // Eyebrow que distingue las categorías de producto (PigVision, Insylo,
    // sensores) de las transversales (Generales, Inversión, Datos, Respaldo).
    productEyebrow: "Producto",
    groups: [
      {
        id: "generales",
        title: "Generales",
        productName: "",
        productHref: "",
        sections: [
          {
            title: "",
            items: [
              {
                q: "¿Qué hace Asimetrix exactamente?",
                a: "Medimos lo que pasa en tu granja —peso, alimento, ambiente— y lo convertimos en información que sirve para decidir. Lo hacemos con cámaras inteligentes, sensores y análisis de datos para producción porcina y avícola. El punto de partida no es la tecnología: es la decisión que tienes que tomar mañana.",
              },
              {
                q: "¿Para qué tipo de producción sirve?",
                a: "Hoy trabajamos con porcicultura, avicultura de engorde y ponedoras. Si tu operación es de otra especie, escríbenos y te decimos con franqueza si podemos ayudarte o no.",
              },
              {
                q: "¿Esto reemplaza el criterio de mi galponero o mi técnico?",
                a: "No, y no queremos que lo haga. Tus ojos y los años que llevas en esto van a saber cosas que ninguna cámara ve. Lo que hacemos es respaldar con números lo que ya percibes, para que cuando digas “algo no anda bien” tengas con qué demostrarlo.",
              },
              {
                q: "Ya intenté con otra tecnología y no funcionó. ¿Por qué esta sí?",
                a: "Es la duda más justa que nos hacen. La mayoría de esas soluciones falla por lo mismo: funcionan en el demo y no en el galpón. Por eso instalamos, configuramos y acompañamos después, y por eso empezamos con un galpón antes de que inviertas en toda la granja.",
              },
              {
                q: "¿Funciona si mi granja es pequeña?",
                a: "Sí. La cantidad de cámaras y sensores se ajusta al tamaño de la operación. Un productor con un galpón necesita menos equipos, no un producto distinto.",
              },
              {
                q: "¿Tengo que comprar todo el ecosistema?",
                a: "No. Cada producto funciona solo y resuelve un problema concreto. Lo que sí pasa es que juntos valen más: el peso del lote se explica mejor cuando también sabes qué pasó con el alimento y con el ambiente. La mayoría empieza por un producto y suma después.",
              },
              {
                q: "¿En qué países están?",
                a: "Estamos en el Research Triangle, en Durham, Carolina del Norte, y operamos en América Latina. Somos parte de Iluma Alliance. Cuéntanos dónde está tu granja y te confirmamos la cobertura.",
              },
              {
                q: "¿Qué es Internet of Animals™?",
                a: "Es la idea que ordena todo lo que construimos: que la granja pueda hablar con datos. Cada sensor, cada cámara y cada análisis es un punto de esa red. El resultado es un campo donde nadie tiene que adivinar, ni el galponero ni el director.",
              },
            ],
          },
        ],
      },
      {
        id: "inversion",
        title: "Inversión y modelo comercial",
        productName: "",
        productHref: "",
        sections: [
          {
            title: "",
            items: [
              {
                q: "¿Cuánto cuesta?",
                a: "No publicamos precios porque el número depende del tamaño de la granja, la cantidad de galpones y qué quieras medir. En la cotización te damos la cifra y, junto con ella, el cálculo de cuánto estás perdiendo hoy por no tener el dato. Preferimos que compares las dos cosas.",
              },
              {
                q: "¿En cuánto tiempo se paga?",
                a: "Depende del producto y de tu operación. En PigVision hemos visto un retorno productivo de hasta 8 a 1. En Insylo, el ahorro aparece cuando dejas de pagar entregas de urgencia y de sobrepedir. Lo que sí podemos hacer es calcularlo con tus números antes de que decidas.",
              },
              {
                q: "¿Puedo hacer una prueba antes de comprar todo?",
                a: "Sí. Lo normal es empezar con un galpón y un lote para que veas los resultados en tu propia granja antes de escalar. Escríbenos y armamos el piloto.",
              },
              {
                q: "¿Puedo comprar solo el sensor, sin la plataforma?",
                a: "El sensor sin la plataforma es un número sin contexto, y un número sin contexto no sirve para decidir. Lo que medimos solo tiene valor cuando puedes verlo en el tiempo, compararlo y recibir la alerta. Por eso van juntos.",
              },
            ],
          },
        ],
      },
      {
        id: "pigvision",
        title: "PigVision",
        productName: "PigVision",
        productHref: "/pigvision",
        sections: [
          {
            title: "Tecnología y precisión",
            items: [
              {
                q: "¿Cómo pesa los cerdos sin tocarlos?",
                a: "Una cámara inteligente instalada sobre el corral estima el peso a partir de las imágenes de los animales. Llega al 97% de precisión en cerdos de 30 a 150 kilos, sin manipulación y sin báscula. El peso aparece en el panel de monitoreo y en tu celular.",
              },
              {
                q: "¿Pesa cada cerdo individualmente?",
                a: "No. Trabaja por muestreo repetido: mide muchos animales muchas veces al día y calcula el peso promedio del corral y del lote. Para decidir cuándo sacar un lote, ese promedio y su distribución es justamente el dato que necesitas.",
              },
              {
                q: "¿Cómo sé que la cámara pesa bien?",
                a: "Porque no lo decimos solo nosotros. NC State University evaluó PigVision frente a los métodos tradicionales de pesaje en granja, y el estudio completo está publicado en El poder del saber. También puedes comprobarlo tú: pesa un lote en la báscula y compáralo con lo que reporta la cámara.",
              },
              {
                q: "¿Detecta algo más además del peso?",
                a: "Sí. Detecta desviaciones en la ganancia de peso antes de que se vean a simple vista, y permite revisar de forma remota el estado de los animales y el aseo del corral. También proyecta el peso futuro del lote para planear la salida.",
              },
            ],
          },
          {
            title: "Instalación",
            items: [
              {
                q: "¿Qué necesito tener en el galpón?",
                a: "Una toma eléctrica de 120 o 220 voltios por cámara y wifi en el galpón. Nada más. La cámara se cuelga, se conecta y empieza a reportar.",
              },
              {
                q: "¿Cuántas cámaras necesito?",
                a: "La configuración sugerida es 6 cámaras en 6 corrales distintos por galpón, que es la que alcanza el 97% de precisión. Cada cámara cubre alrededor de 3 metros cuadrados. Según el tamaño del galpón y el detalle que busques, la cantidad se ajusta.",
              },
              {
                // Desambiguada respecto a la misma pregunta en Insylo: en la
                // página el H2 del grupo da el contexto, pero en el FAQPage
                // schema se pierde y quedarían dos respuestas distintas a una
                // pregunta idéntica.
                q: "¿Cuánto se demora la instalación de las cámaras?",
                a: "Se instala el mismo día. No hay obra y no hay que parar la producción.",
              },
            ],
          },
          {
            title: "Uso y mantenimiento",
            items: [
              {
                q: "¿Cuánto mantenimiento pide?",
                a: "Limpieza del lente, y protegerla cuando se lava el galpón. No tiene partes móviles ni consumibles.",
              },
              {
                q: "¿Y si se daña la cámara?",
                a: "Tiene un año de garantía. Si falla, la reemplazamos sin costo.",
              },
            ],
          },
        ],
      },
      {
        id: "insylo",
        title: "Insylo",
        productName: "Insylo",
        productHref: "/insylo",
        sections: [
          {
            title: "Tecnología y precisión",
            items: [
              {
                q: "¿Cómo mide el alimento sin que nadie suba al silo?",
                a: "Un sensor de cámara 3D instalado en la parte superior del silo captura más de 15.000 puntos de medición. De ahí calcula volumen y peso del alimento con hasta 97% de precisión, comparable a la de las celdas de carga. Nadie tiene que subirse a mirar.",
              },
              {
                q: "¿Qué más mide además del nivel?",
                a: "Temperatura y humedad dentro del silo, para que el alimento no pierda calidad, y una fotografía a color que muestra deterioro, higiene y posibles fallas del silo. Son cosas que solo se ven cuando alguien abre la tapa, y para entonces ya pasaron.",
              },
              {
                q: "¿Cada cuánto mide?",
                a: "Hasta 24 lecturas al día. En inviernos de latitudes altas baja a 10, porque el panel solar recibe menos luz. Recibes una alerta cuando el nivel pasa por debajo del umbral que definas.",
              },
            ],
          },
          {
            title: "Instalación",
            items: [
              {
                q: "¿Cuánto se demora la instalación del sensor en el silo?",
                a: "15 minutos. Y la precisión es inmediata: no hay que esperar a que el silo se vacíe para calibrar. Empieza a reportar el mismo día.",
              },
              {
                q: "¿Hay que modificar o perforar el silo?",
                a: "No. El sensor se instala sin comprometer la estructura del silo y sin interrumpir la operación.",
              },
              {
                q: "¿Necesito electricidad o internet en el silo?",
                a: "No. Funciona con panel solar y trae su propia conectividad, así que no depende del wifi de la granja ni de la red eléctrica. Solo los silos interiores requieren cable de electricidad.",
              },
              {
                q: "¿Sirve para cualquier silo?",
                a: "Sirve para todo tipo de silo hasta 12 metros de altura. La única excepción son los silos bolsa. Si tus silos son más altos, cuéntanos y revisamos el caso.",
              },
            ],
          },
          {
            title: "Uso y mantenimiento",
            items: [
              {
                q: "¿Qué mantenimiento necesita?",
                a: "Está diseñado para cero mantenimiento. Tiene un mecanismo de autolimpieza con cepillo, la batería no se reemplaza, y la calibración y las actualizaciones se hacen de forma remota. Menos del 3% de los silos llega a necesitar una limpieza ocasional del lente.",
              },
              {
                q: "Ya llevo el control en un Excel. ¿Qué me cambia?",
                a: "Que no tienes que acordarte de actualizarlo. El Excel te dice lo que anotaste la última vez; Insylo te dice lo que hay ahora y cuándo vas a necesitar pedir. El dato llega solo, y llega también cuando no estás en la granja.",
              },
            ],
          },
        ],
      },
      {
        id: "sensores",
        title: "Sensores ambientales",
        productName: "Sensores ambientales",
        productHref: "/nodos",
        sections: [
          {
            title: "Tecnología y precisión",
            items: [
              {
                q: "¿Qué miden?",
                a: "Temperatura, humedad, CO₂, amoníaco y luz dentro del galpón, con más del 99% de precisión. Son las variables que mueven la conversión de alimento y la salud animal, y las que más fácil pasan desapercibidas: el amoníaco no se huele a tiempo y la humedad no se ve.",
              },
              {
                q: "¿Cada cuánto reportan?",
                a: "Cada 15 minutos al panel de la granja. Eso permite ver los picos máximos y mínimos del día, que es donde normalmente está el problema y donde una lectura puntual no alcanza a mostrarlo.",
              },
              {
                q: "Yo ya siento cuándo hace calor o frío. ¿Para qué un sensor?",
                a: "Y seguramente lo sientes mejor que nadie en tu galpón. Lo que pasa es que hay cosas que no se sienten, y hay horas en las que no estás ahí. El sensor está en el galpón uno mientras tú revisas el tres, de noche y de madrugada.",
              },
            ],
          },
          {
            title: "Instalación",
            items: [
              {
                q: "¿Cuántos sensores necesito por galpón?",
                a: "Se recomiendan 2 por galpón, en puntos distintos, para entender qué pasa en cada zona. La arquitectura es escalable: puedes empezar con lo básico y sumar sensores según el tamaño del galpón y el nivel de monitoreo que busques.",
              },
              {
                q: "¿Necesitan electricidad?",
                a: "Los sensores de luz, temperatura y humedad son autónomos con pilas AA de hasta 6 meses. Los de CO₂ y amoníaco requieren fuente de alimentación. La transmisión se hace por gateway y router.",
              },
            ],
          },
          {
            title: "Uso y mantenimiento",
            items: [
              {
                q: "¿Qué alertas voy a recibir?",
                a: "Una notificación cuando una condición sale del rango que definiste: un pico de CO₂, amoníaco alto, una variación de temperatura. La alerta llega con contexto y con la acción sugerida, no solo con el número.",
              },
              {
                q: "¿Qué mantenimiento necesitan?",
                a: "Mínimo. Solo calibraciones periódicas para mantener la precisión.",
              },
              {
                q: "¿Tienen garantía?",
                a: "Sí, un año. Si un equipo falla, lo reemplazamos sin costo.",
              },
            ],
          },
        ],
      },
      {
        id: "datos",
        title: "Datos e integración",
        productName: "",
        productHref: "",
        sections: [
          {
            title: "",
            items: [
              {
                q: "¿Se integra con el sistema que ya uso?",
                a: "Sí. PigVision e Insylo tienen API, así que se pueden conectar con tu sistema de gestión o con tu sistema contable. Y si hoy no tienes ningún sistema, el panel de cada producto ya te sirve por sí solo.",
              },
              {
                q: "¿Funciona donde el internet es malo?",
                a: "Sí, y es una de las razones por las que construimos desde acá. Insylo trae su propia conectividad. Los equipos siguen midiendo aunque se caiga la señal y guardan la información localmente; cuando vuelve la conexión, se sincroniza. No pierdes el histórico.",
              },
              {
                q: "¿De quién son los datos de mi granja?",
                a: "Tuyos. Nosotros los procesamos para entregarte el análisis y los cuidamos como información sensible, porque lo son. Puedes consultarlos y exportarlos cuando quieras.",
              },
              {
                q: "¿Desde dónde veo los datos?",
                a: "Desde el celular o el computador, en cualquier momento y sin estar en la granja. Cada persona del equipo tiene su usuario y sus permisos, así que el galponero, el técnico y el dueño ven lo mismo desde su propio ángulo.",
              },
              {
                q: "¿Y si mi equipo no sabe de tecnología?",
                a: "No tiene que saber. Nosotros instalamos y configuramos, y damos una capacitación de 30 minutos. Después se abre el celular y se miran los datos. En las granjas donde ya está funcionando, los equipos lo aprenden en un par de días.",
              },
            ],
          },
        ],
      },
      {
        id: "respaldo",
        title: "Respaldo y acompañamiento",
        productName: "",
        productHref: "",
        sections: [
          {
            title: "",
            items: [
              {
                q: "¿Quién nos acompaña después de la instalación?",
                a: "Nuestro equipo. No instalamos y desaparecemos: el cambio real no ocurre en el demo, ocurre cuando el primer dato cambia una decisión. Tienes soporte por WhatsApp, correo y videollamada.",
              },
              {
                q: "¿Hay algún estudio independiente que respalde esto?",
                a: "Sí. NC State University evaluó PigVision frente a los métodos tradicionales de pesaje en granja. El estudio completo está publicado en El poder del saber, junto con las publicaciones en BM Editores y Pig Progress.",
              },
            ],
          },
        ],
      },
    ],
    ctaTitle: "Tengo una pregunta que no está aquí.",
    ctaText: "Escríbenos. Cuéntanos qué pasa en tu granja y te respondemos en menos de 72 horas, sin spam y sin insistencia comercial.",
  },
  cotizar: {
    pageLabel: "Cotizar",
    heroTitle1: "Cuéntanos sobre",
    heroTitle2: "tu operación",
    heroTitle3: "",
    heroSubtitle: [
      "Sabemos lo que cuesta decidir sin datos.",
      "Cuéntanos qué pasa en tu granja y\nte ayudamos a encontrar la mejor solución.",
    ],
    introTitle: "Completa la información\ny te contactaremos",
    introSubtitle: "con una solución personalizada.",
    section1: "Tu información de contacto",
    fields: {
      nameLabel: "Nombre y apellido",
      namePlaceholder: "Juan Pérez",
      companyLabel: "Empresa / Granja",
      companyPlaceholder: "Granja San José",
      locationLabel: "País/ciudad",
      locationPlaceholder: "Colombia, Medellín",
      emailLabel: "Correo electrónico",
      emailPlaceholder: "juan@granja.com",
      phoneLabel: "WhatsApp/teléfono",
      phonePlaceholder: "+57 300 123 4567",
    },
    section2: "Sobre tu producción",
    prodTypeLabel: "Tipo de producción",
    prodTypes: ["Porcicultura", "Avicultura · engorde", "Ponedoras", "Ganadería", "Otra"],
    animalCountLabel: "Cantidad de animales",
    animalCounts: ["1-1000", "1000-10.000", "+10.000"],
    section3: "Solución que estás buscando",
    solutions: [
      { abbr: "PV", name: "PigVision", desc: "Estimación del peso de tus cerdos" },
      { abbr: "SW", name: "SmartWeight", desc: "Monitoreo del peso promedio de tus aves" },
      { abbr: "IS", name: "Insylo", desc: "Inventario del alimento en silo" },
      { abbr: "NA", name: "Sensores ambientales", desc: "Monitoreo de confort animal" },
      { abbr: "?", name: "No estoy seguro · asesoría", desc: "Ayúdame a elegir la mejor opción" },
    ],
    section4: "Nivel de digitalización",
    digLabel: "Nivel de digitalización",
    digLevels: ["Todo manual", "Algunos registros digitales", "Sensores o automatización", "Optimizando con datos"],
    section5: "¿Qué pasa hoy en tu operación?",
    messageLabel: "Mensaje",
    messagePlaceholder: "Cuéntanos sobre tus desafíos actuales, necesidades específicas o qué te gustaría mejorar...",
    privacy: "Al enviar este formulario, aceptas nuestra política de privacidad y el uso de tus datos para contactarte con información relevante sobre nuestras soluciones.",
    trust: "Respondemos en menos de 72 horas. Sin spam.",
    submit: "Enviar para mejorar mi operación",
    submitting: "Enviando...",
    successEyebrow: "Todo listo",
    successHeading: "¡Gracias por escribirnos!",
    successMsg: "Recibimos tu información y nuestro equipo te contactará en menos de 72 horas.",
    successHint: "Mientras tanto, sigue explorando el ecosistema Asimetrix.",
    successHome: "Volver al inicio",
    successProducts: "Ver productos",
    errorMsg: "Hubo un problema al enviar. Inténtalo de nuevo o escríbenos directamente.",
    errorMsgNetwork: "No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.",
    errorMsgServer: "El servidor tuvo un problema procesando tu solicitud. Intenta más tarde.",
    errorMsgValidation: "Revisa los campos marcados en rojo antes de enviar.",
    requiredError: "Por favor completa tu nombre y correo electrónico.",
    fieldRequired: "Este campo es obligatorio.",
    invalidEmail: "Por favor ingresa un correo válido.",
    invalidPhone: "Ingresa un número de teléfono válido.",
    phoneOnlyDigits: "Sólo se permiten números, +, espacios, guiones y paréntesis.",
    contactTitle: "¿Prefieres hablar directamente con nosotros?",
    whatsapp: "WhatsApp",
    whatsappValue: "+57 300 123 4567",
    emailContact: "Correo",
    emailValue: "contacto@asimetrix.co",
    demo: "Agendar demo",
    demoValue: "30 min · videollamada",
  },
  cookies: {
    message:
      "Al hacer clic en «Aceptar todas las cookies», aceptas el almacenamiento de cookies en tu dispositivo para mejorar la navegación, analizar el uso del sitio y apoyar nuestras iniciativas de marketing.",
    settings: "Configurar cookies",
    acceptAll: "Aceptar todas las cookies",
    rejectAll: "Rechazar",
    settingsTitle: "Preferencias de cookies",
    settingsIntro:
      "Usamos cookies para mejorar tu experiencia. Elige qué categorías permites.",
    catNecessaryTitle: "Necesarias",
    catNecessaryDesc:
      "Requeridas para el funcionamiento básico del sitio. No se pueden desactivar.",
    catAnalyticsTitle: "Analíticas",
    catAnalyticsDesc:
      "Nos ayudan a entender cómo se usa el sitio para mejorarlo.",
    catMarketingTitle: "Marketing",
    catMarketingDesc:
      "Permiten mostrar contenido y anuncios más relevantes.",
    save: "Guardar preferencias",
    cancel: "Cancelar",
  },
};

const en: typeof es = {
  nav: {
    products: "Products",
    saber: "The power of knowing",
    quote: "Get a quote",
    login: "Login",
    goHome: "Go to home",
    home: "Home",
    menu: "Menu",
    skipToContent: "Skip to content",
    productItems: [
      { name: "PigVision", desc: "Camera to weigh finishing pigs", href: "/pigvision", img: "/images/home_render_pigvision-768x536.webp" },
      { name: "Insylo", desc: "Feed and consumption control", href: "/insylo", img: "/images/home_render_insylo-1-768x1131.webp" },
      { name: "Environmental Sensors", desc: "Environment under control", href: "/nodos", img: "/images/home_render_nodos-768x536.webp" },
    ],
  },
  hero: {
    title1: "Never again decide",
    title2: "without data",
    subtitle: "Intelligent monitoring for\nswine and poultry farms",
    cta: "Assess my farm",
    pill: "Smart cameras, sensors and analytics that turn your farm's data into the certainty to decide well.",
  },
  problems: {
    title: "What happens when you decide without data",
    items: [
      {
        title: "You don't control the feed",
        text: "Without knowing the real feed level, ordering more or stopping orders costs you money.",
      },
      {
        title: "You decide on estimates",
        text: "Not knowing the real weight of the batch, you may delay or bring forward shipments and hurt profitability.",
      },
      {
        title: "You alter conversion",
        text: "If you don't detect changes in environmental conditions in time, you impact productive efficiency.",
      },
      {
        title: "You impact weight gain",
        text: "By losing sight of the real state of the feed, you end up wasting resources.",
      },
    ],
  },
  solutions: {
    title: "How Asimetrix solves it",
    precision: "accuracy",
    seeHow: "See how it works",
    see: "See",
    prev: "Previous product",
    next: "Next product",
    items: [
      { name: "PigVision", text: "Know the precise weight of your batches without stressing the pigs." },
      { name: "Insylo", text: "Know the real level of your silos and avoid feed shortages." },
      { name: "Environmental sensors", text: "Continuous monitoring of temperature, humidity, CO₂ and ammonia." },
    ],
  },
  audience: {
    title1: "Who is",
    title2: "Asimetrix for?",
    segments: [
      { title: "Producers", text: "seeking more control, profitability\nand decisions backed by real data." },
      { title: "Farm & technical teams", text: "who need reliable data\nand simplicity in their day-to-day work." },
      { title: "Leaders", text: "who make strategic decisions\nbased on data, not guesswork." },
    ],
  },
  videoSection: {
    title: "Technology that works in the field",
  },
  midCta: {
    title: "Want to see how it would work on your farm?",
    cta: "Let's talk about your farm",
  },
  ecosystem: {
    title1: "We are part of a",
    title2: "global ecosystem",
    title3: "of innovation",
    copy: [
      "Driven by the purpose of designing nutrition to improve lives.",
      "We integrate science, technology and knowledge to face the real challenges of animal production.",
      "At Asimetrix, we turn that purpose into data that helps you decide better, farm by farm.",
    ],
    stat1Value: "+1000 people",
    stat1Label: "aligned under a single purpose.",
    stat2Value: "+ 600 million",
    stat2Label: "lives impacted daily",
  },
  research: {
    pre: "We are located in",
    title: "the Research Triangle,",
    post: "North Carolina",
    p1: "One of the epicenters of innovation, research and life sciences.",
    p2: "An environment that drives our technological development and strengthens our capacity to transform knowledge into real solutions for animal production.",
    imageAlt: "Research Triangle, North Carolina",
  },
  cta: {
    title: "Start making decisions with real data",
    cta: "Let's talk about your farm",
  },
  footer: {
    colProducts: {
      title: "Products",
      links: [
        { label: "PigVision", href: "/pigvision" },
        { label: "Insylo", href: "/insylo" },
        { label: "Environmental Sensors", href: "/nodos" },
      ],
    },
    colSaber: {
      title: "The power of knowing",
      links: [
        {
          label: "Sciences of innovation",
          href: "https://39682324.fs1.hubspotusercontent-na1.net/hubfs/39682324/14+Innovacion+Agropecuaria.pdf",
          external: true,
        },
        {
          label: "Digital magazine: BM Editores",
          href: "https://bmeditores.mx/porcicultura/asimetrix-marca-la-diferencia-en-control-de-crecimiento-porcino/",
          external: true,
        },
        {
          label: "Digital magazine: Pig Progress",
          href: "https://www.pigprogress.net/market-trends-analysis-the-industrymarkets/wrapping-up-february-whats-new-in-the-world-of-pigs-7/",
          external: true,
        },
      ],
    },
    quoteTitle: "Get a quote",
    quoteText: "Write to us and we'll get in touch.",
    faq: "Frequently asked questions",
    login: "Login",
    legal: "Asimetrix · Unlocking the power of data. Designing nutrition, enhancing lives. 1307 Person St, Durham, North Carolina. +57 6041500. © 2026 Iluma Alliance",
    logoAlt: "Asimetrix · Unlocking the power of data.",
  },
  onix: {
    label: "Talk to Onix",
    title: "I'm Onix!",
    subtitle: "Let's talk",
    close: "Close Onix",
    reopen: "Reopen Onix",
  },
  common: {
    scheduleDemo: "Schedule a demo",
    talkFarm: "Let's talk about your farm",
    startDeciding: "Start making decisions with real data",
    theProblem: "The problem",
    theSolution: "The solution",
    whatMakesDifference: "What makes the difference",
    precision: "accuracy",
    connectsWith: "connects",
    connectsWithRest: "with applications from the Asimetrix ecosystem",
    relatedTitle: "Other products that complement",
    relatedSubtitle: "Explore the rest of the Asimetrix ecosystem.",
    discoverTitle: "Discover our products",
    discoverSubtitle: "Solutions that work together to turn your farm into data.",
    seeProduct: "Explore",
    productTaglinePigVision: "Know the weight of your batches,\nwithout stressing your pigs.",
    productTaglineInsylo: "Real level of your silo,\nso you don't run out of feed.",
    productTaglineNodos: "Continuous monitoring of temperature,\nhumidity and CO₂ on your farm.",
  },
  pigvision: {
    pageLabel: "PigVision",
    subtitle: "Smart camera to weigh finishing pigs",
    range: "from 30kg to 150kg",
    problemTitle: "The problem with thinking the traditional way",
    problemImgAlt: "Pigs on a farm",
    problems: [
      { bold: "Manual weighings", rest: "that stress the pigs" },
      { bold: "Infrequent data", rest: "or unstable data" },
      { bold: "Late decisions about", rest: "growth and sale" },
    ],
    solutionSubtitle: "clear data for productive solutions",
    solutionImgAltPigs: "Monitored pigs",
    solutionImgAltRender: "PigVision monitoring platform",
    highlightTitle1: "Contactless",
    highlightTitle2: "measurement",
    highlightText: "Calculate weight without touching or stressing the animals.",
    features: [
      { title: "Growth anomaly detection", text: "Identify deviations in batch performance to intervene in time." },
      { title: "Monitoring platform", text: "View the batch's productive history on a single platform." },
      { title: "Weight and growth projection", text: "Anticipate your animals' future weight and improve exit planning." },
    ],
    diffImgAlt: "Swine farm",
    diffBadge1: "Productive ROI of up to 8:1",
    diffBadge2: "Remote diagnostics",
    diffSlides: [
      {
        img: "/images/pigvision/pv_diff_01.jpg",
        title: "Productive ROI of up to 8:1",
        text: "Turn weight data into decisions that directly impact profitability.",
      },
      {
        img: "/images/pigvision/pv_diff_02.jpg",
        title: "Remote diagnostics",
        text: "Lets you spot possible injuries in the animals and pen cleanliness.",
      },
      {
        img: "/images/pigvision/pv_diff_03.jpg",
        title: "Early deviation detection",
        text: "Understand growth by phases for timely adjustments.",
      },
    ],
    comparison: {
      rows: ["Main function", "How it uses PigVision data", "Type of data used"],
      columns: [
        {
          title: "OPTIMARKET",
          cells: [
            "Optimizes the shipping schedule to maximize profitability.",
            "Takes the current weight calculated by the cameras and mathematically simulates the batch's size distribution curve to plan staggered deliveries.",
            "Batch average weight mathematically projected into the future.",
          ],
        },
        {
          title: "PIGVISION DASHBOARD",
          cells: [
            "It is the central platform that consolidates batch performance and charts the animals' growth over time.",
            "Plots growth curves crossing the animals' age with their weight, automatically comparing these results against the genetic guide target.",
            "Average weights and daily gain data.",
          ],
        },
      ],
    },
  },
  insylo: {
    pageLabel: "Insylo",
    subtitle: "3D sensor for feed monitoring in silos",
    range: "up to 12 meters.",
    problemTitle: "The problem with manual silo monitoring",
    problemImgAlt: "Metal silo in a mountainous landscape",
    problems: [
      { bold: "Imprecise measurement", rest: "of feed inside the silo" },
      { bold: "Unexpected", rest: "stockouts" },
      { bold: "Limited visibility", rest: "of the silo" },
    ],
    solutionSubtitle: "Continuous monitoring of feed in the silo",
    solutionImgAltLeft: "Insylo sensor installed",
    solutionImgAltCenter: "Grain measurement in an industrial silo",
    highlightTitle: "Configurable alerts",
    highlightText: "Receive alerts when the feed level drops below the defined threshold.",
    features: [
      { title: "Automatic measurement", text: "Measure the feed level without manual inspections." },
      { title: "Real-time data", text: "Check the silo's status in real time, from anywhere." },
      { title: "History and consumption", text: "Analyze feed consumption over time from the platform." },
    ],
    diffImgAlt: "Silo full of animal feed",
    diffBadge1: "Environmental monitoring of the silo",
    diffBlockTitle: "3D topography of the feed",
    diffBlockText: "Visualize how the feed is really distributed inside the silo.",
    diffBadge2: "Consumption projection",
    diffSlides: [
      {
        img: "/images/insylo/is_diff_01.jpg",
        title: "3D topography of the feed",
        text: "Visualize how the feed is really distributed inside the silo.",
      },
      {
        img: "/images/insylo/is_diff_02.jpg",
        title: "Environmental monitoring of the silo",
        text: "Check temperature and humidity to protect feed quality.",
      },
      {
        img: "/images/insylo/is_diff_03.jpg",
        title: "Silo consumption projection",
        text: "Anticipate when restocking will be needed based on feed behavior.",
      },
    ],
    comparison: {
      rows: ["Main function", "How it uses Insylo data", "Type of data used"],
      columns: [
        {
          title: "ECONOMETRIX",
          cells: [
            "Predictive simulator that generates financial income statements.",
            "Crosses the exact feed consumption data of the farm with operating costs to mathematically model how this impacts the profit margin.",
            "Silo fill levels.",
          ],
        },
        {
          title: "INSYLO DASHBOARD",
          cells: [
            "It is the graphical interface for the producer to view and control the feed inventory on their farm.",
            "Graphically presents feed volume measurements so the user can monitor supply and consumption in real time.",
            "Exact silo fill levels captured by the sensor.",
          ],
        },
      ],
    },
  },
  nodos: {
    pageLabel: "Environmental sensors",
    title1: "Environmental",
    title2: "nodes",
    subtitle: "Sensors that monitor\nthe farm environment",
    tagline: "Temperature, humidity, CO₂ and light under control.",
    problemTitle: "The problem with manual environmental monitoring",
    problemImgAlt: "Poultry house",
    problems: [
      { bold: "Environmental data", rest: "underestimated" },
      { bold: "Environmental changes", rest: "that go unnoticed" },
      { bold: "Late", rest: "interventions" },
    ],
    solutionSubtitle: "Continuous monitoring of environmental conditions",
    solutionImgAltLeft: "Environmental node installed",
    solutionImgAltCenter: "Environmental nodes",
    highlightTitle1: "Analytics",
    highlightTitle2: "platform",
    highlightText: "Visualize changes, identify patterns and understand the evolution of the environment through data centralized in a single platform.",
    features: [
      { title: "Continuous monitoring", text: "Monitor temperature, humidity and gases inside the house all day long." },
      { title: "Configurable alerts", text: "Receive alerts when an environmental condition falls outside the defined range." },
      { title: "A safer environment for work", text: "Monitor air quality and maintain suitable conditions for animals inside the house." },
    ],
    diffImgAlt: "Poultry house with environmental nodes",
    diffBadge1: "Readings distributed across the house",
    diffBlockTitle: "Sensors configurable to your needs",
    diffBlockText: "Adapt the measurement of environmental variables to the specific needs of each farm.",
    diffBadge2: "Consumption projection",
    diffSlides: [
      {
        img: "/images/nodos/nd_diff_01.jpg",
        title: "Sensors configurable to your needs",
        text: "Adapt the measurement of environmental variables to the specific needs of each farm.",
      },
      {
        img: "/images/nodos/nd_diff_02.jpg",
        title: "Readings distributed across the house",
        text: "Monitor conditions at different points to better understand what happens inside the productive environment.",
      },
      {
        img: "/images/nodos/nd_diff_03.jpg",
        title: "Scalable architecture per farm",
        text: "Install multiple sensors based on the size of the house and the level of monitoring you need.",
      },
    ],
    comparison: {
      rows: ["Main function", "How it uses Nodes data", "Type of data used"],
      columns: [
        {
          title: "FARM DASHBOARD",
          cells: [
            "It is a control panel designed to visualize the house's climate behavior every 15 minutes.",
            "Receives the information through a continuous cloud streaming connection to chart the variables and enable precise detection of maximum and minimum peaks.",
            "Environmental variables.",
          ],
        },
      ],
    },
  },
  saber: {
    title: "The power of knowing",
    subtitle: "Technical information, analysis and data\nthat explain how continuous monitoring\nimproves farm profitability.",
    featureTitle1: "Sciences",
    featureTitle2: "of innovation",
    featureAlt: "Sciences of innovation",
    featureText: "Study on the implementation of PigVision on swine farms and its impact on decision-making. It presents real productivity and efficiency results based on data.",
    featureDate: "December 2025",
    revistas: [
      {
        title: "Digital magazine: BM Editores",
        text: "How PigVision improves swine growth control with on-farm data.",
        date: "February 2025",
        url: "https://bmeditores.mx/porcicultura/asimetrix-marca-la-diferencia-en-control-de-crecimiento-porcino/",
      },
      {
        title: "Digital magazine: Pig progress",
        text: "Update on global trends in pig farming and market dynamics.",
        date: "March 2025",
        url: "https://www.pigprogress.net/market-trends-analysis-the-industrymarkets/wrapping-up-february-whats-new-in-the-world-of-pigs-7/",
      },
    ],
    ncsuTitle: "Study conducted by NCSU\non how PigVision works",
    ncsuRenderAlt: "PigVision",
    ncsuLogoAlt: "NC State University",
    ncsuText: "Accurate and fast weight assessment in finishing pigs, validated against traditional on-farm methods.",
  },
  // Traducción de sentido, no literal (§5 de `FAQ-PROPUESTA.md`). Mismo orden
  // y mismos `id` que el bloque `es`: los `id` son los anchors públicos
  // (`/preguntas-frecuentes#pigvision`), así que NO se traducen — si
  // cambiaran por idioma, los enlaces profundos se romperían al cambiar de
  // idioma.
  faqPage: {
    pageLabel: "Frequently asked questions",
    title: "Frequently asked questions",
    subtitle: "What producers, technicians and farm teams ask us most before getting started.",
    navLabel: "Categories",
    productEyebrow: "Product",
    groups: [
      {
        id: "generales",
        title: "General",
        productName: "",
        productHref: "",
        sections: [
          {
            title: "",
            items: [
              {
                q: "What exactly does Asimetrix do?",
                a: "We measure what happens on your farm — weight, feed, environment — and turn it into information you can decide with. We do it with smart cameras, sensors and data analytics for swine and poultry production. The starting point isn't the technology: it's the decision you have to make tomorrow.",
              },
              {
                q: "What kind of production is it for?",
                a: "Today we work with swine, broilers and layers. If your operation is a different species, write to us and we'll be straight with you about whether we can help.",
              },
              {
                q: "Does this replace my farm team's judgment?",
                a: "No, and we don't want it to. Your eyes and your years in this will catch things no camera sees. What we do is back up what you already sense with numbers, so when you say “something's off” you have something to show.",
              },
              {
                q: "I tried another technology and it didn't work. Why would this?",
                a: "It's the fairest question we get. Most of those solutions fail for the same reason: they work in the demo and not in the house. That's why we install, configure and stay afterwards, and why we start with one house before you invest across the farm.",
              },
              {
                q: "Does it work if my farm is small?",
                a: "Yes. The number of cameras and sensors scales to your operation. A producer with one house needs fewer devices, not a different product.",
              },
              {
                q: "Do I have to buy the whole ecosystem?",
                a: "No. Each product works on its own and solves a specific problem. What's true is that together they're worth more: batch weight makes more sense when you also know what happened with the feed and the environment. Most farms start with one product and add later.",
              },
              {
                q: "What countries are you in?",
                a: "We're in the Research Triangle, in Durham, North Carolina, and we operate across Latin America. We're part of Iluma Alliance. Tell us where your farm is and we'll confirm coverage.",
              },
              {
                q: "What is Internet of Animals™?",
                a: "It's the idea behind everything we build: that a farm should be able to speak in data. Every sensor, every camera and every analysis is a node in that network. The result is a farm where nobody has to guess — not the farm worker, not the director.",
              },
            ],
          },
        ],
      },
      {
        id: "inversion",
        title: "Investment and commercial model",
        productName: "",
        productHref: "",
        sections: [
          {
            title: "",
            items: [
              {
                q: "How much does it cost?",
                a: "We don't publish prices because the number depends on farm size, number of houses and what you want to measure. In the quote we give you the figure and, alongside it, the cost of what you're losing today without the data. We'd rather you compared both.",
              },
              {
                q: "How long until it pays for itself?",
                a: "It depends on the product and your operation. With PigVision we've seen productive ROI of up to 8:1. With Insylo, savings show up when you stop paying for emergency deliveries and over-ordering. What we can do is run the math with your numbers before you decide.",
              },
              {
                q: "Can I run a trial before buying everything?",
                a: "Yes. The usual path is starting with one house and one batch so you see results on your own farm before scaling. Write to us and we'll set up the pilot.",
              },
              {
                q: "Can I buy just the sensor, without the platform?",
                a: "A sensor without the platform is a number without context, and a number without context is no use for deciding. What we measure only has value when you can see it over time, compare it and get the alert. That's why they go together.",
              },
            ],
          },
        ],
      },
      {
        id: "pigvision",
        title: "PigVision",
        productName: "PigVision",
        productHref: "/pigvision",
        sections: [
          {
            title: "Technology and accuracy",
            items: [
              {
                q: "How does it weigh pigs without touching them?",
                a: "A smart camera mounted above the pen estimates weight from images of the animals. It reaches 97% accuracy on pigs from 30 to 150 kg, with no handling and no scale. The weight shows up on your monitoring panel and on your phone.",
              },
              {
                q: "Does it weigh each pig individually?",
                a: "No. It works by repeated sampling: it measures many animals many times a day and calculates the average weight of the pen and the batch. To decide when to ship a batch, that average and its distribution is exactly the data you need.",
              },
              {
                q: "How do I know the camera weighs correctly?",
                a: "Because it isn't only us saying so. NC State University evaluated PigVision against traditional on-farm weighing methods, and the full study is published in The power of knowing. You can also check it yourself: weigh a batch on the scale and compare it with what the camera reports.",
              },
              {
                q: "Does it detect anything besides weight?",
                a: "Yes. It catches deviations in weight gain before they're visible, and it lets you check animal condition and pen cleanliness remotely. It also projects the batch's future weight so you can plan the exit.",
              },
            ],
          },
          {
            title: "Installation",
            items: [
              {
                q: "What do I need in the house?",
                a: "A 120V or 220V outlet per camera and wifi in the house. That's it. The camera is mounted, plugged in, and starts reporting.",
              },
              {
                q: "How many cameras do I need?",
                a: "The suggested setup is 6 cameras across 6 different pens per house, which is what reaches 97% accuracy. Each camera covers about 3 square meters. The number adjusts to house size and the level of detail you want.",
              },
              {
                q: "How long does installing the cameras take?",
                a: "Same day. No construction, no production downtime.",
              },
            ],
          },
          {
            title: "Use and maintenance",
            items: [
              {
                q: "How much maintenance does it need?",
                a: "Cleaning the lens, and protecting it when the house is washed down. No moving parts, no consumables.",
              },
              {
                q: "What if the camera breaks?",
                a: "It has a one-year warranty. If it fails, we replace it at no cost.",
              },
            ],
          },
        ],
      },
      {
        id: "insylo",
        title: "Insylo",
        productName: "Insylo",
        productHref: "/insylo",
        sections: [
          {
            title: "Technology and accuracy",
            items: [
              {
                q: "How does it measure feed without anyone climbing the silo?",
                a: "A 3D camera sensor mounted on top of the silo captures over 15,000 measurement points. From those it calculates feed volume and weight with up to 97% accuracy, comparable to load cells. Nobody has to climb up to look.",
              },
              {
                q: "What else does it measure besides level?",
                a: "Temperature and humidity inside the silo, so the feed doesn't lose quality, plus a color photograph showing spoilage, hygiene and possible silo faults. Those are things you only see when someone opens the hatch — and by then they've already happened.",
              },
              {
                q: "How often does it measure?",
                a: "Up to 24 readings a day. In high-latitude winters it drops to 10, because the solar panel gets less light. You get an alert when the level drops below the threshold you set.",
              },
            ],
          },
          {
            title: "Installation",
            items: [
              {
                q: "How long does installing the silo sensor take?",
                a: "15 minutes. And accuracy is immediate: there's no need to wait for the silo to empty in order to calibrate. It starts reporting the same day.",
              },
              {
                q: "Does the silo need to be modified or drilled?",
                a: "No. The sensor installs without compromising the silo's structure and without interrupting your operation.",
              },
              {
                q: "Do I need power or internet at the silo?",
                a: "No. It runs on a solar panel and brings its own connectivity, so it doesn't depend on the farm's wifi or power grid. Only indoor silos require a power cable.",
              },
              {
                q: "Does it work on any silo?",
                a: "Any silo type up to 12 meters tall. The only exception is bag silos. If your silos are taller, tell us and we'll review your case.",
              },
            ],
          },
          {
            title: "Use and maintenance",
            items: [
              {
                q: "What maintenance does it need?",
                a: "It's designed for zero maintenance. It has a self-cleaning brush mechanism, the battery never needs replacing, and calibration and updates happen remotely. Fewer than 3% of silos ever need an occasional lens cleaning.",
              },
              {
                q: "I already track this in a spreadsheet. What changes?",
                a: "You don't have to remember to update it. A spreadsheet tells you what you wrote down last time; Insylo tells you what's there now and when you'll need to order. The data arrives on its own — including when you're not on the farm.",
              },
            ],
          },
        ],
      },
      {
        id: "sensores",
        title: "Environmental sensors",
        productName: "Environmental sensors",
        productHref: "/nodos",
        sections: [
          {
            title: "Technology and accuracy",
            items: [
              {
                q: "What do they measure?",
                a: "Temperature, humidity, CO₂, ammonia and light inside the house, with over 99% accuracy. These are the variables that drive feed conversion and animal health, and the ones most easily missed: you don't smell ammonia in time and you can't see humidity.",
              },
              {
                q: "How often do they report?",
                a: "Every 15 minutes to the farm panel. That lets you see the daily highs and lows, which is usually where the problem sits and where a single spot reading won't show it.",
              },
              {
                q: "I can already feel when it's hot or cold. Why a sensor?",
                a: "And you probably feel it better than anyone in your house. What happens is that some things can't be felt, and there are hours when you're not there. The sensor is in house one while you're checking house three, at night and before dawn.",
              },
            ],
          },
          {
            title: "Installation",
            items: [
              {
                q: "How many sensors do I need per house?",
                a: "Two per house, at different points, to understand what happens in each zone. The architecture is scalable: start with the basics and add sensors based on house size and the level of monitoring you want.",
              },
              {
                q: "Do they need power?",
                a: "The light, temperature and humidity sensors run independently on AA batteries for up to 6 months. The CO₂ and ammonia sensors require a power source. Transmission runs through a gateway and router.",
              },
            ],
          },
          {
            title: "Use and maintenance",
            items: [
              {
                q: "What alerts will I get?",
                a: "A notification when a condition moves outside the range you set: a CO₂ spike, high ammonia, a temperature swing. The alert arrives with context and a suggested action, not just a number.",
              },
              {
                q: "What maintenance do they need?",
                a: "Minimal. Only periodic calibration to keep accuracy.",
              },
              {
                q: "Is there a warranty?",
                a: "Yes, one year. If a device fails, we replace it at no cost.",
              },
            ],
          },
        ],
      },
      {
        id: "datos",
        title: "Data and integration",
        productName: "",
        productHref: "",
        sections: [
          {
            title: "",
            items: [
              {
                q: "Does it integrate with the system I already use?",
                a: "Yes. PigVision and Insylo have APIs, so they connect to your management or accounting system. And if you don't have any system today, each product's panel already works on its own.",
              },
              {
                q: "Does it work where internet is poor?",
                a: "Yes, and it's one of the reasons we build from here. Insylo brings its own connectivity. Devices keep measuring even if the signal drops and store data locally; when the connection returns, it syncs. You don't lose history.",
              },
              {
                q: "Who owns my farm's data?",
                a: "You do. We process it to give you the analysis and we treat it as sensitive information, because it is. You can view and export it whenever you want.",
              },
              {
                q: "Where do I see the data?",
                a: "From your phone or computer, anytime, without being on the farm. Each team member has their own login and permissions, so the farm worker, the technician and the owner all see the same thing from their own angle.",
              },
              {
                q: "What if my team isn't tech-savvy?",
                a: "They don't need to be. We install and configure everything, and run a 30-minute training session. After that it's opening your phone and looking at the data. On farms already running it, teams pick it up in a couple of days.",
              },
            ],
          },
        ],
      },
      {
        id: "respaldo",
        title: "Support and backing",
        productName: "",
        productHref: "",
        sections: [
          {
            title: "",
            items: [
              {
                q: "Who supports us after installation?",
                a: "Our team. We don't install and disappear: real change doesn't happen in the demo, it happens when the first data point changes a decision. You get support over WhatsApp, email and video call.",
              },
              {
                q: "Is there independent research backing this?",
                a: "Yes. NC State University evaluated PigVision against traditional on-farm weighing methods. The full study is published in The power of knowing, alongside coverage in BM Editores and Pig Progress.",
              },
            ],
          },
        ],
      },
    ],
    ctaTitle: "My question isn't here.",
    ctaText: "Write to us. Tell us what's happening on your farm and we'll reply within 72 hours. No spam, no sales pressure.",
  },
  cotizar: {
    pageLabel: "Get a quote",
    heroTitle1: "Tell us about",
    heroTitle2: "your operation",
    heroTitle3: "",
    heroSubtitle: [
      "We know what it costs to decide without data.",
      "Tell us what's happening on your farm and\nwe'll help you find the best solution.",
    ],
    introTitle: "Fill in the information\nand we'll contact you",
    introSubtitle: "with a personalized solution.",
    section1: "Your contact information",
    fields: {
      nameLabel: "Full name",
      namePlaceholder: "John Smith",
      companyLabel: "Company / Farm",
      companyPlaceholder: "San José Farm",
      locationLabel: "Country/city",
      locationPlaceholder: "Colombia, Medellín",
      emailLabel: "Email",
      emailPlaceholder: "john@farm.com",
      phoneLabel: "WhatsApp/phone",
      phonePlaceholder: "+57 300 123 4567",
    },
    section2: "About your production",
    prodTypeLabel: "Type of production",
    prodTypes: ["Swine", "Poultry · broilers", "Layers", "Cattle", "Other"],
    animalCountLabel: "Number of animals",
    animalCounts: ["1-1000", "1000-10,000", "+10,000"],
    section3: "The solution you're looking for",
    solutions: [
      { abbr: "PV", name: "PigVision", desc: "Weight estimation for your pigs" },
      { abbr: "SW", name: "SmartWeight", desc: "Average weight monitoring for your birds" },
      { abbr: "IS", name: "Insylo", desc: "Feed inventory in the silo" },
      { abbr: "NA", name: "Environmental sensors", desc: "Animal comfort monitoring" },
      { abbr: "?", name: "Not sure · advisory", desc: "Help me choose the best option" },
    ],
    section4: "Level of digitalization",
    digLabel: "Level of digitalization",
    digLevels: ["All manual", "Some digital records", "Sensors or automation", "Optimizing with data"],
    section5: "What's happening in your operation today?",
    messageLabel: "Message",
    messagePlaceholder: "Tell us about your current challenges, specific needs or what you'd like to improve...",
    privacy: "By submitting this form, you accept our privacy policy and the use of your data to contact you with relevant information about our solutions.",
    trust: "We reply within 72 hours. No spam.",
    submit: "Submit to improve my operation",
    submitting: "Sending...",
    successEyebrow: "All set",
    successHeading: "Thanks for reaching out!",
    successMsg: "We received your information and our team will get back to you within 72 hours.",
    successHint: "In the meantime, keep exploring the Asimetrix ecosystem.",
    successHome: "Back to home",
    successProducts: "See products",
    errorMsg: "There was a problem submitting. Please try again or contact us directly.",
    errorMsgNetwork: "We couldn't reach the server. Check your connection and try again.",
    errorMsgServer: "The server had an issue processing your request. Please try again later.",
    errorMsgValidation: "Please review the fields marked in red before submitting.",
    requiredError: "Please complete your name and email.",
    fieldRequired: "This field is required.",
    invalidEmail: "Please enter a valid email.",
    invalidPhone: "Please enter a valid phone number.",
    phoneOnlyDigits: "Only numbers, +, spaces, dashes and parentheses are allowed.",
    contactTitle: "Prefer to talk to us directly?",
    whatsapp: "WhatsApp",
    whatsappValue: "+57 300 123 4567",
    emailContact: "Email",
    emailValue: "contacto@asimetrix.co",
    demo: "Schedule a demo",
    demoValue: "30 min · video call",
  },
  cookies: {
    message:
      "By clicking “Accept all cookies,” you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and support our marketing efforts.",
    settings: "Cookie settings",
    acceptAll: "Accept all cookies",
    rejectAll: "Reject",
    settingsTitle: "Cookie preferences",
    settingsIntro:
      "We use cookies to improve your experience. Choose which categories you allow.",
    catNecessaryTitle: "Necessary",
    catNecessaryDesc:
      "Required for basic site functionality. Cannot be disabled.",
    catAnalyticsTitle: "Analytics",
    catAnalyticsDesc:
      "Help us understand how the site is used so we can improve it.",
    catMarketingTitle: "Marketing",
    catMarketingDesc:
      "Allow us to show more relevant content and ads.",
    save: "Save preferences",
    cancel: "Cancel",
  },
};

export const dictionary = { es, en };

export type Dictionary = typeof es;
