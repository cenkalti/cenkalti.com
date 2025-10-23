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
    format: "A3",
    printBackground: true,
    margin: {
      top: "12mm",
      right: "12mm",
      bottom: "12mm",
      left: "12mm",
    },
  });

  console.log("PDF generated successfully: cenk-alti.pdf");
  await browser.close();
})();
