// Capturas full-page de las 6 rutas en desktop y mobile, para comparar
// baseline vs cambios y comprobar que el diseño no se movió.
//
// Emula prefers-reduced-motion:reduce → `useCanPlayVideo` devuelve false y se
// renderiza el poster en vez del video. Sin eso, el video autoplay daría un
// frame distinto en cada corrida y la comparación sería inútil.
//
// Uso:  node .seo-verify/shots.js BASE   (con el server en :3000)
const puppeteer = require("puppeteer-core");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const tag = process.argv[2];
const OUT = process.env.SHOT_DIR || "/tmp/axshots";
require("fs").mkdirSync(OUT, { recursive: true });

const PAGES = ["", "pigvision", "insylo", "nodos", "poder-del-saber", "cotizar"];
const VIEWPORTS = [
  ["desktop", 1440, 900],
  ["mobile", 390, 844],
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "shell",
    args: ["--no-sandbox", "--force-color-profile=srgb", "--hide-scrollbars"],
  });
  for (const [vpName, width, height] of VIEWPORTS) {
    for (const p of PAGES) {
      const page = await browser.newPage();
      await page.emulateMediaFeatures([
        { name: "prefers-reduced-motion", value: "reduce" },
      ]);
      await page.setViewport({ width, height, deviceScaleFactor: 1 });
      await page.goto(`http://localhost:3000/${p}`, {
        waitUntil: "networkidle2",
        timeout: 60000,
      });
      // Scroll completo para disparar el lazy-load, y vuelta arriba.
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await new Promise((r) => setTimeout(r, 1200));
      await page.evaluate(() => window.scrollTo(0, 0));
      await new Promise((r) => setTimeout(r, 1200));
      await page.screenshot({
        path: `${OUT}/${tag}_${vpName}_${p || "home"}.png`,
        fullPage: true,
      });
      await page.close();
    }
  }
  await browser.close();
  console.log(`capturas ${tag} listas en ${OUT}`);
})();
