const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "../tokens/tokens.json");
const outputPath = path.join(__dirname, "../styles/tokens/variables.css");

function flattenTokens(obj, prefix = "", meta = {}) {
  let result = {};
  for (const key in obj) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && value.value !== undefined) {
      result[newKey] = value.value;
      meta[newKey] = value.type || "unknown";
    } else if (value && typeof value === "object") {
      Object.assign(result, flattenTokens(value, newKey, meta));
    }
  }
  return result;
}

function resolveReference(value, allTokens, seen = new Set()) {
  const match = typeof value === "string" && value.match(/^{(.+)}$/);
  if (!match) return value;

  const refKey = match[1];
  if (seen.has(refKey)) return value;

  const actual = allTokens[refKey];
  if (!actual) return value;

  seen.add(refKey);
  return resolveReference(actual, allTokens, seen);
}

// Format final CSS variable value (e.g., add px unless it's font weight)
function formatValue(key, value, typeMap) {
  const raw = resolveReference(value, typeMap.allTokens);
  const type = typeMap.types[key];

  if (type === "number" && !key.includes("font.weight")) {
    return `${raw}px`;
  }
  return raw;
}

function createCssVariables(resolved, typeMap) {
  const lines = [":root {"];
  for (const [key, value] of Object.entries(resolved)) {
    const cssKey = `--${key.replace(/\./g, "-")}`;
    const cssValue = formatValue(key, value, typeMap);
    lines.push(`  ${cssKey}: ${cssValue};`);
  }
  lines.push("}");
  return lines.join("\n");
}

function main() {
  const data = JSON.parse(fs.readFileSync(inputPath, "utf-8"));

  const typeMap = { types: {}, allTokens: {} };

  const primitives = flattenTokens(data["Primitives/Mode 1"], "", typeMap.types);
  const tokensSfccPro = flattenTokens(data["Tokens/SfccPro"], "", typeMap.types);
  const fontsFamily = flattenTokens(data["Type: Family/SfccPro"], "", typeMap.types);
  const fontsProps = flattenTokens(data["Type: Properties/SfccPro"], "", typeMap.types);

  const allTokens = {
    ...primitives,
    ...tokensSfccPro,
    ...fontsFamily,
    ...fontsProps,
  };
  typeMap.allTokens = allTokens;

  const resolvedTokens = {};
  const combined = { ...tokensSfccPro, ...fontsFamily, ...fontsProps };
  for (const [key, value] of Object.entries(combined)) {
    resolvedTokens[key] = value;
  }

  const css = createCssVariables(resolvedTokens, typeMap);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, css);
  console.log("✅ CSS variables generated at:", outputPath);
}

main();
