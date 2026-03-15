const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function extractMeta(source) {
  const titleMatch = source.match(/title:\s*"([\s\S]*?)",\n/);
  const descriptionMatch = source.match(/description:\s*"([\s\S]*?)",\n/);

  if (!titleMatch || !descriptionMatch) {
    throw new Error("Could not extract pageMeta title/description");
  }

  return {
    title: titleMatch[1],
    description: descriptionMatch[1],
  };
}

function extractJsxBody(source) {
  const marker = "return (";
  const start = source.indexOf(marker);
  if (start === -1) {
    throw new Error("Could not find return block");
  }

  const fragmentStart = source.indexOf("<>", start);
  const fragmentEnd = source.lastIndexOf("</>");

  if (fragmentStart === -1 || fragmentEnd === -1 || fragmentEnd <= fragmentStart) {
    throw new Error("Could not find fragment wrapper");
  }

  return source.slice(fragmentStart + 2, fragmentEnd).trim();
}

function jsxToHtml(jsx) {
  let html = jsx;

  html = html.replace(/className=/g, "class=");
  html = html.replace(/htmlFor=/g, "for=");

  html = html.replace(/strokeLinecap=/g, "stroke-linecap=");
  html = html.replace(/strokeLinejoin=/g, "stroke-linejoin=");
  html = html.replace(/strokeWidth=/g, "stroke-width=");
  html = html.replace(/viewBox=/g, "viewbox=");

  html = html.replace(/\s([a-zA-Z_:][\w:.-]*)=\{(-?\d+(?:\.\d+)?)\}/g, ' $1="$2"');

  html = html.replace(/style=\{\{\s*paddingTop:\s*'([^']+)'\s*\}\}/g, 'style="padding-top: $1;"');
  html = html.replace(/style=\{\{\s*([^}]+)\s*\}\}/g, "");

  html = html.replace(/\{\s*"\s*"\s*\}/g, " ");
  html = html.replace(/\{\s*'\s*'\s*\}/g, " ");

  html = html.replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, "");
  html = html.replace(/\{[^{}]*\}/g, "");

  html = html.replace(/\n\s*\n\s*\n/g, "\n\n");

  return html.trim();
}

function buildGroup(inputDir, outFile) {
  const files = fs
    .readdirSync(inputDir)
    .filter((name) => /^\d+\.tsx$/.test(name))
    .sort((a, b) => Number(a.replace(".tsx", "")) - Number(b.replace(".tsx", "")));

  const result = {};

  for (const file of files) {
    const id = file.replace(".tsx", "");
    const source = read(path.join(inputDir, file));
    const meta = extractMeta(source);
    const jsxBody = extractJsxBody(source);

    result[id] = {
      ...meta,
      html: jsxToHtml(jsxBody),
    };
  }

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(result, null, 2), "utf8");
}

function main() {
  buildGroup(
    path.join(root, "components", "page-content", "service-details"),
    path.join(root, "data", "service-details.json")
  );

  buildGroup(
    path.join(root, "components", "page-content", "brand-details"),
    path.join(root, "data", "brand-details.json")
  );

  console.log("Detail JSON files generated.");
}

main();
