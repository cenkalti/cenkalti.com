const puppeteer = require("puppeteer");
const path = require("path");

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  console.log("Opening page...");
  const page = await browser.newPage();

  const htmlPath = "file://" + path.resolve(__dirname, "index.html");
  console.log(`Loading ${htmlPath}...`);

  await page.goto(htmlPath, {
    waitUntil: "networkidle0",
  });

  console.log("Generating PDF...");
  await page.pdf({
    path: "cenk-alti.pdf",
    format: "A4",
    scale: 0.8,
    printBackground: true,
    margin: {
      top: "6mm",
      right: "6mm",
      bottom: "6mm",
      left: "6mm",
    },
  });

  console.log("PDF generated successfully: cenk-alti.pdf");
  await browser.close();
})();
