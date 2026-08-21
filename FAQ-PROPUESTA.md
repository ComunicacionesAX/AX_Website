# Propuesta de FAQs — Sitio web Asimetrix

Corresponde a la tarea **2.4** del plan de trabajo en `SEO-AUDIT.md`.

Dos insumos rigen esta propuesta:

1. **La voz de Asimetrix**, documentada en el Sistema Narrativo, el brandbook y
   `Así nos comunicamos en Asimetrix`. Ver el chequeo de tono en la sección 2.
2. **La FAQ de BinSentry** (`binsentry.com/resources/faq/`), señalada en
   `SEO-AUDIT.md` §3.1 como el modelo del sector. Se adopta su arquitectura; **no
   su registro**. Ver la comparación en la sección 3.

---

## 1. Arquitectura propuesta

### Lo que hace BinSentry

Una sola página `/resources/faq/`, segmentada **por producto** y, dentro de cada
producto, **por categoría**:

| Producto | Categorías |
|---|---|
| ProSense Feed | Feed Ordering Hub · Sensor Technology · Sensor Installation · Subscription Service |
| ProSense HD | Un bloque único con 20+ preguntas de especificación |

Lo que hay que copiar de ese modelo:

- **Segmentar por producto dentro de una sola URL.** Concentra la autoridad en una
  página en lugar de dispersarla.
- **Las cuatro categorías son las correctas** y son las mismas cuatro dudas que
  aparecen en las 66 flip cards de ventas de Asimetrix: qué tan preciso es, cómo se
  instala, cómo se compra, y qué pasa después.
- **Responder el modelo comercial de frente.** BinSentry contesta "¿cómo se compra?",
  "¿qué pasa cuando termina el contrato?", "¿por qué no se puede comprar solo el
  sensor?". Asimetrix hoy no responde nada de eso en ningún canal público, y es la
  duda que más frena al comprador.

Lo que **no** hay que copiar: el registro. BinSentry cierra con
*"Please contact BinSentry…"*. Asimetrix dice *"Escríbenos"*.

### Estructura para Asimetrix

**Capa A — Hub `/preguntas-frecuentes`** (en inglés: `/faq`)

Es la página principal. Slug en español para ser consistente con `/poder-del-saber`
y `/cotizar`.

```
Generales · 8 preguntas          → qué es Asimetrix, especies, criterio del equipo
Inversión y modelo · 6           → precio, retorno, piloto, cómo se compra
PigVision · 9                    → tecnología · instalación · uso
Insylo · 9                       → tecnología · instalación · uso
Sensores ambientales · 8         → tecnología · instalación · uso
Datos e integración · 5          → API, propiedad de los datos, offline
Respaldo · 4                     → validación NCSU, garantía, soporte
```

**Capa B — Bloque corto al cierre de cada página de producto**

4 preguntas por producto, las de mayor intención de compra, **distintas** de las del
hub para no duplicar texto entre URLs. Cierra con enlace a la sección completa del
hub. Va después de `comparison` y antes de `RelatedProducts`.

Esto es lo que BinSentry no tiene y sí conviene: la duda se resuelve donde nace, sin
sacar al visitante de la página de producto.

### Nota honesta sobre el schema

`SEO-AUDIT.md` (línea 284) justifica la página porque "habilita rich results".
Conviene corregir esa expectativa: **desde agosto de 2023 Google dejó de mostrar
rich results de FAQ** salvo en sitios de salud y gobierno. El `FAQPage` schema sigue
valiendo la pena, pero por otras tres razones:

1. Captura long-tail real — el contenido, no el marcado.
2. Es la fuente que citan AI Overviews, ChatGPT y Perplexity cuando alguien pregunta
   en español por monitoreo de silos o pesaje de cerdos sin báscula. Ahí la
   competencia es casi nula.
3. Clarifica la entidad Asimetrix y sus productos para el grafo de conocimiento.

No esperar mejora de CTR por estrellas ni acordeones en el SERP.

---

## 2. Chequeo de tono

Cada respuesta de este documento pasó por estas nueve reglas, tomadas de
`Así nos comunicamos en Asimetrix` y del brandbook.

| Regla | Aplicación |
|---|---|
| **Tuteo** | Todo el sitio ya usa tú. La FAQ también. El *usted* de las flip cards es el registro de venta cara a cara, no el del sitio. |
| **Sin emojis** | Ninguno, en ninguna respuesta. |
| **Impacto antes que mecanismo** | La primera oración dice qué cambia para ti; el cómo funciona viene después. |
| **Validar antes de corregir** | Nunca se le quita razón al lector. El límite se le pone al método, no a la persona. |
| **Nunca "reemplazar"** | Los datos *respaldan* y *complementan*. Jamás sustituyen el criterio de quien trabaja la granja. |
| **Monitoreo, no control** | También: "panel", no "dashboard". "Cámara inteligente", no "visión artificial". |
| **Lista negra de palabras** | Sin revolucionario, disruptivo, vanguardia, mágico, garantizado, potencia, no te pierdas. |
| **Una idea por respuesta** | 40 a 70 palabras. Si necesita más, es una página, no una FAQ. |
| **El precio no se esquiva** | Se responde con valor y con franqueza sobre por qué no hay cifra pública. |

### Las preguntas también tienen tono

Se escriben **como las formula el cliente**, no como las formularía el equipo de
producto. Eso es además lo que se busca en Google.

| Así no | Así sí |
|---|---|
| ¿Cuál es la precisión de la estimación de peso? | ¿Cómo sé que la cámara pesa bien? |
| ¿Cuáles son los requisitos de infraestructura? | ¿Qué necesito tener en el galpón? |
| ¿El sistema requiere conectividad permanente? | ¿Y si se me cae el internet? |
| ¿Cuál es el modelo de licenciamiento? | ¿Esto se compra o se paga mensual? |

### Contraste de registro con el referente

| BinSentry | Asimetrix |
|---|---|
| "Please contact BinSentry for installation pricing in your region." | "Escríbenos y te damos el número para tu región." |
| "The sensor utilizes proprietary laser technology to achieve industry-leading accuracy." | "Es una cámara 3D que toma más de 15.000 puntos de medición. Por eso llega al 97%." |
| "BinSentry is available exclusively as a subscription service." | *(ver §7 — Asimetrix aún no tiene esta respuesta definida)* |

---

## 3. Capa A · Hub `/preguntas-frecuentes`

**H1:** Preguntas frecuentes
**Subtítulo:** Lo que más nos preguntan productores, técnicos y equipos de granja
antes de empezar.

---

### 3.1 Generales

**¿Qué hace Asimetrix exactamente?**
Medimos lo que pasa en tu granja —peso, alimento, ambiente— y lo convertimos en
información que sirve para decidir. Lo hacemos con cámaras inteligentes, sensores y
análisis de datos para producción porcina y avícola. El punto de partida no es la
tecnología: es la decisión que tienes que tomar mañana.

**¿Para qué tipo de producción sirve?**
Hoy trabajamos con porcicultura, avicultura de engorde y ponedoras. Si tu operación
es de otra especie, escríbenos y te decimos con franqueza si podemos ayudarte o no.

**¿Esto reemplaza el criterio de mi galponero o mi técnico?**
No, y no queremos que lo haga. Tus ojos y los años que llevas en esto van a saber
cosas que ninguna cámara ve. Lo que hacemos es respaldar con números lo que ya
percibes, para que cuando digas "algo no anda bien" tengas con qué demostrarlo.

**Ya intenté con otra tecnología y no funcionó. ¿Por qué esta sí?**
Es la duda más justa que nos hacen. La mayoría de esas soluciones falla por lo mismo:
funcionan en el demo y no en el galpón. Por eso instalamos, configuramos y
acompañamos después, y por eso empezamos con un galpón antes de que inviertas en
toda la granja.

**¿Funciona si mi granja es pequeña?**
Sí. La cantidad de cámaras y sensores se ajusta al tamaño de la operación. Un
productor con un galpón necesita menos equipos, no un producto distinto.

**¿Tengo que comprar todo el ecosistema?**
No. Cada producto funciona solo y resuelve un problema concreto. Lo que sí pasa es
que juntos valen más: el peso del lote se explica mejor cuando también sabes qué pasó
con el alimento y con el ambiente. La mayoría empieza por un producto y suma después.

**¿En qué países están?**
Estamos en el Research Triangle, en Durham, Carolina del Norte, y operamos en
América Latina. Somos parte de Iluma Alliance. Cuéntanos dónde está tu granja y te
confirmamos la cobertura.

**¿Qué es Internet of Animals™?**
Es la idea que ordena todo lo que construimos: que la granja pueda hablar con datos.
Cada sensor, cada cámara y cada análisis es un punto de esa red. El resultado es un
campo donde nadie tiene que adivinar, ni el galponero ni el director.

---

### 3.2 Inversión y modelo comercial

*Categoría inspirada en "Subscription Service" de BinSentry. Es el bloque que hoy no
existe en ningún canal público de Asimetrix y el que más frena la decisión.*

**¿Cuánto cuesta?**
No publicamos precios porque el número depende del tamaño de la granja, la cantidad
de galpones y qué quieras medir. En la cotización te damos la cifra y, junto con
ella, el cálculo de cuánto estás perdiendo hoy por no tener el dato. Preferimos que
compares las dos cosas.

**¿En cuánto tiempo se paga?**
Depende del producto y de tu operación. En PigVision hemos visto un retorno
productivo de hasta 8 a 1. En Insylo, el ahorro aparece cuando dejas de pagar
entregas de urgencia y de sobrepedir. Lo que sí podemos hacer es calcularlo con tus
números antes de que decidas.

**¿Esto se compra una vez o se paga mensual?**
`[PENDIENTE — ver §7.1. No inventar el modelo. Redacción sugerida una vez definido:
respuesta directa en la primera oración, qué incluye la cuota, y qué pasa si dejas
de pagar.]`

**¿Qué pasa cuando termina el contrato?**
`[PENDIENTE — ver §7.1. BinSentry responde esto explícitamente y es una de las dudas
que más retiene al comprador grande.]`

**¿Puedo hacer una prueba antes de comprar todo?**
Sí. Lo normal es empezar con un galpón y un lote para que veas los resultados en tu
propia granja antes de escalar. Escríbenos y armamos el piloto.

**¿Puedo comprar solo el sensor, sin la plataforma?**
El sensor sin la plataforma es un número sin contexto, y un número sin contexto no
sirve para decidir. Lo que medimos solo tiene valor cuando puedes verlo en el
tiempo, compararlo y recibir la alerta. Por eso van juntos.

---

### 3.3 PigVision

**Tecnología y precisión**

**¿Cómo pesa los cerdos sin tocarlos?**
Una cámara inteligente instalada sobre el corral estima el peso a partir de las
imágenes de los animales. Llega al 97% de precisión en cerdos de 30 a 150 kilos, sin
manipulación y sin báscula. El peso aparece en el panel de monitoreo y en tu celular.

**¿Pesa cada cerdo individualmente?**
No. Trabaja por muestreo repetido: mide muchos animales muchas veces al día y calcula
el peso promedio del corral y del lote. Para decidir cuándo sacar un lote, ese
promedio y su distribución es justamente el dato que necesitas.

**¿Cómo sé que la cámara pesa bien?**
Porque no lo decimos solo nosotros. NC State University evaluó PigVision frente a los
métodos tradicionales de pesaje en granja, y el estudio completo está publicado en El
poder del saber. También puedes comprobarlo tú: pesa un lote en la báscula y compáralo
con lo que reporta la cámara.

**¿Detecta algo más además del peso?**
Sí. Detecta desviaciones en la ganancia de peso antes de que se vean a simple vista,
y permite revisar de forma remota el estado de los animales y el aseo del corral.
También proyecta el peso futuro del lote para planear la salida.

**Instalación**

**¿Qué necesito tener en el galpón?**
Una toma eléctrica de 120 o 220 voltios por cámara y wifi en el galpón. Nada más. La
cámara se cuelga, se conecta y empieza a reportar.

**¿Cuántas cámaras necesito?**
La configuración sugerida es 6 cámaras en 6 corrales distintos por galpón, que es la
que alcanza el 97% de precisión. Cada cámara cubre alrededor de 3 metros cuadrados.
Según el tamaño del galpón y el detalle que busques, la cantidad se ajusta.

**¿Cuánto se demora la instalación?**
Se instala el mismo día. No hay obra y no hay que parar la producción.

**Uso y mantenimiento**

**¿Cuánto mantenimiento pide?**
Limpieza del lente, y protegerla cuando se lava el galpón. No tiene partes móviles ni
consumibles.

**¿Y si se daña la cámara?**
Tiene un año de garantía. Si falla, la reemplazamos sin costo.

---

### 3.4 Insylo

**Tecnología y precisión**

**¿Cómo mide el alimento sin que nadie suba al silo?**
Un sensor de cámara 3D instalado en la parte superior del silo captura más de 15.000
puntos de medición. De ahí calcula volumen y peso del alimento con hasta 97% de
precisión, comparable a la de las celdas de carga. Nadie tiene que subirse a mirar.

**¿Qué más mide además del nivel?**
Temperatura y humedad dentro del silo, para que el alimento no pierda calidad, y una
fotografía a color que muestra deterioro, higiene y posibles fallas del silo. Son
cosas que solo se ven cuando alguien abre la tapa, y para entonces ya pasaron.

**¿Cada cuánto mide?**
Hasta 24 lecturas al día. En inviernos de latitudes altas baja a 10, porque el panel
solar recibe menos luz. Recibes una alerta cuando el nivel pasa por debajo del umbral
que definas.

**Instalación**

**¿Cuánto se demora la instalación?**
15 minutos. Y la precisión es inmediata: no hay que esperar a que el silo se vacíe
para calibrar. Empieza a reportar el mismo día.

**¿Hay que modificar o perforar el silo?**
No. El sensor se instala sin comprometer la estructura del silo y sin interrumpir la
operación.

**¿Necesito electricidad o internet en el silo?**
No. Funciona con panel solar y trae su propia conectividad, así que no depende del
wifi de la granja ni de la red eléctrica. Solo los silos interiores requieren cable
de electricidad.

**¿Sirve para cualquier silo?**
Sirve para todo tipo de silo hasta 12 metros de altura. La única excepción son los
silos bolsa. Si tus silos son más altos, cuéntanos y revisamos el caso.

**Uso y mantenimiento**

**¿Qué mantenimiento necesita?**
Está diseñado para cero mantenimiento. Tiene un mecanismo de autolimpieza con
cepillo, la batería no se reemplaza, y la calibración y las actualizaciones se hacen
de forma remota. Menos del 3% de los silos llega a necesitar una limpieza ocasional
del lente.

**Ya llevo el control en un Excel. ¿Qué me cambia?**
Que no tienes que acordarte de actualizarlo. El Excel te dice lo que anotaste la
última vez; Insylo te dice lo que hay ahora y cuándo vas a necesitar pedir. El dato
llega solo, y llega también cuando no estás en la granja.

---

### 3.5 Sensores ambientales

**Tecnología y precisión**

**¿Qué miden?**
Temperatura, humedad, CO₂, amoníaco y luz dentro del galpón, con más del 99% de
precisión. Son las variables que mueven la conversión de alimento y la salud animal,
y las que más fácil pasan desapercibidas: el amoníaco no se huele a tiempo y la
humedad no se ve.

**¿Cada cuánto reportan?**
Cada 15 minutos al panel de la granja. Eso permite ver los picos máximos y mínimos
del día, que es donde normalmente está el problema y donde una lectura puntual no
alcanza a mostrarlo.

**Yo ya siento cuándo hace calor o frío. ¿Para qué un sensor?**
Y seguramente lo sientes mejor que nadie en tu galpón. Lo que pasa es que hay cosas
que no se sienten, y hay horas en las que no estás ahí. El sensor está en el galpón
uno mientras tú revisas el tres, de noche y de madrugada.

**Instalación**

**¿Cuántos sensores necesito por galpón?**
Se recomiendan 2 por galpón, en puntos distintos, para entender qué pasa en cada
zona. La arquitectura es escalable: puedes empezar con lo básico y sumar sensores
según el tamaño del galpón y el nivel de monitoreo que busques.

**¿Necesitan electricidad?**
Los sensores de luz, temperatura y humedad son autónomos con pilas AA de hasta 6
meses. Los de CO₂ y amoníaco requieren fuente de alimentación. La transmisión se hace
por gateway y router.

**Uso y mantenimiento**

**¿Qué alertas voy a recibir?**
Una notificación cuando una condición sale del rango que definiste: un pico de CO₂,
amoníaco alto, una variación de temperatura. La alerta llega con contexto y con la
acción sugerida, no solo con el número.

**¿Qué mantenimiento necesitan?**
Mínimo. Solo calibraciones periódicas para mantener la precisión.

**¿Tienen garantía?**
Sí, un año. Si un equipo falla, lo reemplazamos sin costo.

---

### 3.6 Datos e integración

**¿Se integra con el sistema que ya uso?**
Sí. PigVision e Insylo tienen API, así que se pueden conectar con tu sistema de
gestión o con tu sistema contable. Y si hoy no tienes ningún sistema, el panel de
cada producto ya te sirve por sí solo.

**¿Funciona donde el internet es malo?**
Sí, y es una de las razones por las que construimos desde acá. Insylo trae su propia
conectividad. Los equipos siguen midiendo aunque se caiga la señal y guardan la
información localmente; cuando vuelve la conexión, se sincroniza. No pierdes el
histórico.

**¿De quién son los datos de mi granja?**
Tuyos. Nosotros los procesamos para entregarte el análisis y los cuidamos como
información sensible, porque lo son. Puedes consultarlos y exportarlos cuando quieras.

**¿Desde dónde veo los datos?**
Desde el celular o el computador, en cualquier momento y sin estar en la granja. Cada
persona del equipo tiene su usuario y sus permisos, así que el galponero, el técnico
y el dueño ven lo mismo desde su propio ángulo.

**¿Y si mi equipo no sabe de tecnología?**
No tiene que saber. Nosotros instalamos y configuramos, y damos una capacitación de
30 minutos. Después se abre el celular y se miran los datos. En las granjas donde ya
está funcionando, los equipos lo aprenden en un par de días.

---

### 3.7 Respaldo y acompañamiento

**¿Quién nos acompaña después de la instalación?**
Nuestro equipo. No instalamos y desaparecemos: el cambio real no ocurre en el demo,
ocurre cuando el primer dato cambia una decisión. Tienes soporte por WhatsApp, correo
y videollamada.

**¿Qué tan rápido responden si algo falla?**
`[PENDIENTE — ver §7.6. No usar las 72 horas: ese plazo es el de respuesta a
cotizaciones, no un compromiso de soporte técnico.]`

**¿Hay algún estudio independiente que respalde esto?**
Sí. NC State University evaluó PigVision frente a los métodos tradicionales de pesaje
en granja. El estudio completo está publicado en El poder del saber, junto con las
publicaciones en BM Editores y Pig Progress.

**Tengo una pregunta que no está aquí.**
Escríbenos. Cuéntanos qué pasa en tu granja y te respondemos en menos de 72 horas,
sin spam y sin insistencia comercial.
*(CTA → `/cotizar`)*

---

## 4. Capa B · Bloques en páginas de producto

4 preguntas por producto, con texto propio para no duplicar el hub. Cierra con:
*"Ver todas las preguntas sobre PigVision →"*

### `/pigvision`

**¿Cuánto se demora en darme el primer dato?**
Se instala el mismo día y empieza a reportar de inmediato. En el primer lote ya
puedes ver si te sirve, sin esperar meses.

**¿Estresa a los cerdos?**
No los toca. La cámara mide desde arriba del corral, así que no hay manipulación, no
hay báscula y no hay animales movilizados para pesarse.

**¿Con cuánta anticipación proyecta el peso?**
Hasta 8 semanas. Eso es lo que te permite planear la salida del lote en lugar de
reaccionar cuando el camión ya está en la puerta.

**Mi jefe va a decir que siempre hemos pesado a ojo.**
Y no le falta razón: el ojo funciona, hasta cierto punto. Con 50 cerdos los conoces a
todos; con 500 ya no. Lo que cambia es que puedes mostrarle un número en lugar de una
impresión.

### `/insylo`

**¿Alguien tiene que seguir subiendo al silo?**
No. Eso es exactamente lo que evita. El nivel se consulta desde el celular, y con eso
desaparece el riesgo de subir a mirar.

**¿Me avisa antes de que se acabe el alimento?**
Sí. Recibes la alerta cuando el nivel baja del umbral que definas, con tiempo para
pedir sin urgencias. Además proyecta el consumo, así que sabes la fecha, no la
corazonada.

**¿Funciona con cualquier tipo de alimento?**
Sí, la precisión se mantiene para todo tipo de alimento. La medición es por volumen
en 3D, no por peso del silo.

**¿Y si tengo varios silos?**
Cada silo lleva su sensor y los ves todos en el mismo panel. Ahí es donde se nota:
puedes comparar consumo entre silos y entre granjas.

### `/nodos`

**¿Sirve para porcicultura y para avicultura?**
Para las dos. Hay sensores pensados para cerdos y otros para pollo de engorde y
ponedoras, según la variable que más pese en cada caso.

**¿Me avisa antes de que los animales se enfermen?**
Te avisa antes de que se vea. Los animales son buenos indicadores, pero muestran el
problema cuando ya avanzó; el sensor detecta la condición que lo provoca.

**¿Puedo empezar con un solo galpón?**
Sí, y es lo que recomendamos. Se instalan dos sensores en un galpón, ves qué pasa
durante un ciclo, y decides si lo llevas al resto.

**¿Cuánto tiempo duran las pilas?**
Hasta 6 meses en los sensores autónomos de luz, temperatura y humedad. Los de CO₂ y
amoníaco van conectados a la corriente.

---

## 5. Versión EN

Traducción de sentido, no literal: el inglés de Asimetrix es directo, no formal.
Mismo orden y mismas claves que el bloque `es`.

### Generales

**What exactly does Asimetrix do?**
We measure what happens on your farm — weight, feed, environment — and turn it into
information you can decide with. We do it with smart cameras, sensors and data
analytics for swine and poultry production. The starting point isn't the technology:
it's the decision you have to make tomorrow.

**What kind of production is it for?**
Today we work with swine, broilers and layers. If your operation is a different
species, write to us and we'll be straight with you about whether we can help.

**Does this replace my farm team's judgment?**
No, and we don't want it to. Your eyes and your years in this will catch things no
camera sees. What we do is back up what you already sense with numbers, so when you
say "something's off" you have something to show.

**I tried another technology and it didn't work. Why would this?**
It's the fairest question we get. Most of those solutions fail for the same reason:
they work in the demo and not in the house. That's why we install, configure and stay
afterwards, and why we start with one house before you invest across the farm.

**Does it work if my farm is small?**
Yes. The number of cameras and sensors scales to your operation. A producer with one
house needs fewer devices, not a different product.

**Do I have to buy the whole ecosystem?**
No. Each product works on its own and solves a specific problem. What's true is that
together they're worth more: batch weight makes more sense when you also know what
happened with the feed and the environment. Most farms start with one product and add
later.

**What countries are you in?**
We're in the Research Triangle, in Durham, North Carolina, and we operate across
Latin America. We're part of Iluma Alliance. Tell us where your farm is and we'll
confirm coverage.

**What is Internet of Animals™?**
It's the idea behind everything we build: that a farm should be able to speak in
data. Every sensor, every camera and every analysis is a node in that network. The
result is a farm where nobody has to guess — not the farm worker, not the director.

### Investment and commercial model

**How much does it cost?**
We don't publish prices because the number depends on farm size, number of houses and
what you want to measure. In the quote we give you the figure and, alongside it, the
cost of what you're losing today without the data. We'd rather you compared both.

**How long until it pays for itself?**
It depends on the product and your operation. With PigVision we've seen productive
ROI of up to 8:1. With Insylo, savings show up when you stop paying for emergency
deliveries and over-ordering. What we can do is run the math with your numbers before
you decide.

**Is this a one-time purchase or a subscription?**
`[PENDING — see §7.1]`

**What happens when the contract ends?**
`[PENDING — see §7.1]`

**Can I run a trial before buying everything?**
Yes. The usual path is starting with one house and one batch so you see results on
your own farm before scaling. Write to us and we'll set up the pilot.

**Can I buy just the sensor, without the platform?**
A sensor without the platform is a number without context, and a number without
context is no use for deciding. What we measure only has value when you can see it
over time, compare it and get the alert. That's why they go together.

### PigVision

**How does it weigh pigs without touching them?**
A smart camera mounted above the pen estimates weight from images of the animals. It
reaches 97% accuracy on pigs from 30 to 150 kg, with no handling and no scale. The
weight shows up on your monitoring panel and on your phone.

**Does it weigh each pig individually?**
No. It works by repeated sampling: it measures many animals many times a day and
calculates the average weight of the pen and the batch. To decide when to ship a
batch, that average and its distribution is exactly the data you need.

**How do I know the camera weighs correctly?**
Because it isn't only us saying so. NC State University evaluated PigVision against
traditional on-farm weighing methods, and the full study is published in The power of
knowing. You can also check it yourself: weigh a batch on the scale and compare it
with what the camera reports.

**Does it detect anything besides weight?**
Yes. It catches deviations in weight gain before they're visible, and it lets you
check animal condition and pen cleanliness remotely. It also projects the batch's
future weight so you can plan the exit.

**What do I need in the house?**
A 120V or 220V outlet per camera and wifi in the house. That's it. The camera is
mounted, plugged in, and starts reporting.

**How many cameras do I need?**
The suggested setup is 6 cameras across 6 different pens per house, which is what
reaches 97% accuracy. Each camera covers about 3 square meters. The number adjusts to
house size and the level of detail you want.

**How long does installation take?**
Same day. No construction, no production downtime.

**How much maintenance does it need?**
Cleaning the lens, and protecting it when the house is washed down. No moving parts,
no consumables.

**What if the camera breaks?**
It has a one-year warranty. If it fails, we replace it at no cost.

### Insylo

**How does it measure feed without anyone climbing the silo?**
A 3D camera sensor mounted on top of the silo captures over 15,000 measurement
points. From those it calculates feed volume and weight with up to 97% accuracy,
comparable to load cells. Nobody has to climb up to look.

**What else does it measure besides level?**
Temperature and humidity inside the silo, so the feed doesn't lose quality, plus a
color photograph showing spoilage, hygiene and possible silo faults. Those are things
you only see when someone opens the hatch — and by then they've already happened.

**How often does it measure?**
Up to 24 readings a day. In high-latitude winters it drops to 10, because the solar
panel gets less light. You get an alert when the level drops below the threshold you
set.

**How long does installation take?**
15 minutes. And accuracy is immediate: there's no need to wait for the silo to empty
in order to calibrate. It starts reporting the same day.

**Does the silo need to be modified or drilled?**
No. The sensor installs without compromising the silo's structure and without
interrupting your operation.

**Do I need power or internet at the silo?**
No. It runs on a solar panel and brings its own connectivity, so it doesn't depend on
the farm's wifi or power grid. Only indoor silos require a power cable.

**Does it work on any silo?**
Any silo type up to 12 meters tall. The only exception is bag silos. If your silos are
taller, tell us and we'll review your case.

**What maintenance does it need?**
It's designed for zero maintenance. It has a self-cleaning brush mechanism, the
battery never needs replacing, and calibration and updates happen remotely. Fewer
than 3% of silos ever need an occasional lens cleaning.

**I already track this in a spreadsheet. What changes?**
You don't have to remember to update it. A spreadsheet tells you what you wrote down
last time; Insylo tells you what's there now and when you'll need to order. The data
arrives on its own — including when you're not on the farm.

### Environmental sensors

**What do they measure?**
Temperature, humidity, CO₂, ammonia and light inside the house, with over 99%
accuracy. These are the variables that drive feed conversion and animal health, and
the ones most easily missed: you don't smell ammonia in time and you can't see
humidity.

**How often do they report?**
Every 15 minutes to the farm panel. That lets you see the daily highs and lows, which
is usually where the problem sits and where a single spot reading won't show it.

**I can already feel when it's hot or cold. Why a sensor?**
And you probably feel it better than anyone in your house. What happens is that some
things can't be felt, and there are hours when you're not there. The sensor is in
house one while you're checking house three, at night and before dawn.

**How many sensors do I need per house?**
Two per house, at different points, to understand what happens in each zone. The
architecture is scalable: start with the basics and add sensors based on house size
and the level of monitoring you want.

**Do they need power?**
The light, temperature and humidity sensors run independently on AA batteries for up
to 6 months. The CO₂ and ammonia sensors require a power source. Transmission runs
through a gateway and router.

**What alerts will I get?**
A notification when a condition moves outside the range you set: a CO₂ spike, high
ammonia, a temperature swing. The alert arrives with context and a suggested action,
not just a number.

**What maintenance do they need?**
Minimal. Only periodic calibration to keep accuracy.

**Is there a warranty?**
Yes, one year. If a device fails, we replace it at no cost.

### Data and integration

**Does it integrate with the system I already use?**
Yes. PigVision and Insylo have APIs, so they connect to your management or accounting
system. And if you don't have any system today, each product's panel already works on
its own.

**Does it work where internet is poor?**
Yes, and it's one of the reasons we build from here. Insylo brings its own
connectivity. Devices keep measuring even if the signal drops and store data locally;
when the connection returns, it syncs. You don't lose history.

**Who owns my farm's data?**
You do. We process it to give you the analysis and we treat it as sensitive
information, because it is. You can view and export it whenever you want.

**Where do I see the data?**
From your phone or computer, anytime, without being on the farm. Each team member has
their own login and permissions, so the farm worker, the technician and the owner all
see the same thing from their own angle.

**What if my team isn't tech-savvy?**
They don't need to be. We install and configure everything, and run a 30-minute
training session. After that it's opening your phone and looking at the data. On farms
already running it, teams pick it up in a couple of days.

### Support

**Who supports us after installation?**
Our team. We don't install and disappear: real change doesn't happen in the demo, it
happens when the first data point changes a decision. You get support over WhatsApp,
email and video call.

**How fast do you respond if something fails?**
`[PENDING — see §7.6]`

**Is there independent research backing this?**
Yes. NC State University evaluated PigVision against traditional on-farm weighing
methods. The full study is published in The power of knowing, alongside coverage in
BM Editores and Pig Progress.

**My question isn't here.**
Write to us. Tell us what's happening on your farm and we'll reply within 72 hours.
No spam, no sales pressure.

---

## 6. Notas de implementación

### Diccionario

Añadir a `src/i18n/dictionary.ts`:

```ts
// nueva sección de primer nivel — el hub
faqPage: {
  pageLabel: "Preguntas frecuentes",
  title: "Preguntas frecuentes",
  subtitle: "Lo que más nos preguntan productores, técnicos y equipos de granja antes de empezar.",
  groups: [
    {
      title: "Generales",
      items: [{ q: "...", a: "..." }],
    },
    {
      title: "PigVision",
      // subcategorías, siguiendo el patrón de BinSentry
      sections: [
        { title: "Tecnología y precisión", items: [{ q: "...", a: "..." }] },
        { title: "Instalación", items: [{ q: "...", a: "..." }] },
        { title: "Uso y mantenimiento", items: [{ q: "...", a: "..." }] },
      ],
    },
  ],
  ctaTitle: "Tengo una pregunta que no está aquí.",
  cta: "Hablemos sobre tu granja",
},

// dentro de pigvision / insylo / nodos — el bloque corto
faq: {
  title: "Preguntas frecuentes",
  seeAll: "Ver todas las preguntas sobre PigVision",
  items: [{ q: "...", a: "..." }],
},
```

Conviene que `groups` sea una unión de `{items}` o `{sections}`, o unificar todo con
`sections` para no ramificar el render. El bloque `en` es `typeof es`, así que ambos
idiomas deben quedar con la misma forma exacta o el build falla en TypeScript.

### Schema

Falta un constructor en `src/lib/schema.ts`. Respeta el criterio ya declarado en ese
archivo — solo información verificable en el sitio:

```ts
type FaqInput = { path: string; items: { q: string; a: string }[] };

export function faqSchema({ path, items }: FaqInput) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}${path}/#faq`,
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
```

Dos cuidados:

- **Una sola entidad `FAQPage` por URL.** El hub emite la suya con todas las
  preguntas aplanadas; cada página de producto emite la suya con sus 4. Son URLs
  distintas, así que no hay conflicto — lo que no se puede es duplicar `FAQPage`
  dentro de la misma página.
- **No marcar en schema una pregunta cuya respuesta esté pendiente.** Los
  `[PENDIENTE]` no se publican ni se marcan.

### Rutas y navegación

- `src/lib/site.ts` → añadir `{ path: "/preguntas-frecuentes", priority: 0.7 }` a
  `ROUTES`. El sitemap y robots lo recogen solos.
- `src/app/preguntas-frecuentes/page.tsx` con `pageMetadata()` y `breadcrumbSchema()`.
- Enlazar desde el footer, desde `/poder-del-saber` (que según §3.1 del audit debe
  convertirse en hub de recursos, igual que `/resources/` en BinSentry) y desde
  `/cotizar` justo antes del formulario: baja fricción en el punto exacto de la duda.
- Enlazado interno cruzado: cada bloque de producto al hub, y el hub a los tres
  productos. Es la mitad del valor SEO de esta página.
- **Título SEO sugerido:** "Preguntas frecuentes | Asimetrix" no aporta. Mejor:
  "Preguntas frecuentes sobre monitoreo de peso, alimento y ambiente en granja".

### Accesibilidad

Acordeón con `<button aria-expanded>` y `<h3>` por pregunta, no `<div onClick>`. El
texto de la respuesta debe estar en el DOM aunque el acordeón esté cerrado —`hidden`
o altura 0, nunca renderizado condicional— o Google no lo indexa y los lectores de
pantalla no lo anuncian.

---

## 7. Datos que hay que confirmar antes de publicar

Puntos donde la copy asume algo que no pude verificar en el material del repositorio.
No publicar sin visto bueno.

### 7.1 Modelo comercial — el vacío más grande

**Cuatro preguntas quedaron sin respuesta redactada** porque inventar un modelo de
compra sería un error con consecuencias contractuales:

- ¿Se compra una vez o se paga mensual?
- ¿Qué incluye la cuota y qué queda por fuera?
- ¿Qué pasa cuando termina el contrato? ¿El equipo se queda en la granja?
- ¿Hay costo de instalación aparte?

BinSentry responde las cuatro de forma explícita, y es probablemente la razón por la
que su FAQ convierte. **Esto necesita una decisión de negocio antes que redacción.**

### 7.2 Resto de puntos abiertos

| # | Dato | Dónde | Por qué revisarlo |
|---|---|---|---|
| 1 | Precisión de Insylo: **97%** | Insylo, hub | `AX_Insylo_datos_tecnicos.pdf` dice "hasta el 97%" y el sitio usa 97 en `insylo/page.tsx`. Las flip cards de ventas dicen "más del 99%". El equipo comercial está diciendo un número distinto al del sitio; hay que unificar. |
| 2 | Alimentación de Insylo: **solar** | "¿Necesito electricidad?" | Los datos técnicos dicen panel solar con batería que no se reemplaza; las flip cards dicen "funciona con pilas". Usé solar por ser la fuente técnica. Corregir el discurso de ventas. |
| 3 | Propiedad de los datos | "¿De quién son los datos?" | Redacté la respuesta que corresponde a los valores de la marca, pero **no hay política de datos documentada**. Necesita visto bueno legal: es una afirmación contractual. |
| 4 | Piloto de un galpón / un lote | "¿Puedo hacer una prueba?" y bloques de producto | Aparece repetidamente en las flip cards como oferta comercial, pero no está formalizado. Confirmar que es oferta estándar y no una concesión caso por caso. |
| 5 | Garantía de 1 año con reemplazo sin costo | Los tres productos | Viene de las flip cards y de las fichas de Nodos. Confirmar que aplica igual a los tres. |
| 6 | Tiempo de respuesta de soporte | "¿Qué tan rápido responden?" | **Dejado en blanco a propósito.** Las 72 horas del sitio son para cotizaciones, no para soporte técnico. Usar ese número aquí sería prometer algo que no está definido. |
| 7 | Capacitación de 30 minutos | "¿Y si mi equipo no sabe?" | Viene de las flip cards. Confirmar que es el estándar de onboarding. |
| 8 | Offline y sincronización | "¿Funciona donde el internet es malo?" | Documentado en las flip cards para la plataforma. Confirmar con producto que aplica a los tres sensores. |
| 9 | Cobertura por país e instaladores | "¿En qué países están?" | BinSentry responde "¿hay instaladores en mi región?". El Sistema Narrativo menciona 10+ países y 1.500+ sensores, pero eso **no está publicado en el sitio** y no pude verificarlo. Redacté una respuesta que invita a preguntar; si hay cifras firmes, mejoran mucho la página. |
| 10 | Especies cubiertas | "¿Para qué tipo de producción sirve?" | El formulario de `/cotizar` lista Ganadería, pero no hay producto para bovinos en el sitio. Decidir si se menciona. |
| 11 | Precisión "para todo tipo de alimento" | Bloque de `/insylo` | Está en `AX_Insylo_datos_tecnicos.pdf`. Confirmar que aplica también a alimentos muy livianos o pelletizados. |
| 12 | SmartWeight | Ausente de toda la FAQ | Aparece en `/cotizar` pero no tiene página. Es la decisión 0.5 pendiente del audit. Si se lanza, necesita su propia sección. |

---

*Propuesta de contenido. No se modificó código del sitio.*
