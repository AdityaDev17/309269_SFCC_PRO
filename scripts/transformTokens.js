const fs = require("fs")
const path = require("path")
 
// These prefixes will be stripped from token paths
const IGNORE_PREFIXES = [
  "core",
  "theme",
  "primitives",
  "tokens",
  "type",
  "properties",
  "type-properties",
  "type-family",
  "mode",
  "mode1",
  "mode-1",
  "luxury",
  "cosmetics",
  "family",
]
 
// Keywords in token paths that indicate the value should have px units
const PX_UNIT_KEYWORDS = [
  "size",
  "space",
  "spacing",
  "dimension",
  "radius",
  "width",
  "height",
  "padding",
  "margin",
  "gap",
  "shadow",
  "paragraph",
  "line-height",
  "font-size"
]
 
// Types that should have px units
const PX_UNIT_TYPES = [
  "fontSizes",
  "spacing",
  "dimension",
  "borderRadius",
  "paragraphSpacing",
  "size",
  "space",
  "border-radius",
  "borderWidth",
  "lineHeights"
]
 
// Types that should NEVER have px units
const NON_PX_TYPES = [
  "fontFamilies",
  "fontWeights",
  "color",
  "opacity",
  "letterSpacing",
  "fontFamily",
  "fontWeight",
  "type",
]
 
// Keywords in token paths that indicate the value should NOT have px units
const NON_PX_KEYWORDS = [
  "family",
  "weight",
  "color",
  "opacity",
  "type",
  "shadow-type",
  "font-family"
]
 
// Attempt to resolve token references
function resolveReference(allTokens, ref) {
  const path = ref.replace(/[{}]/g, "").split(".")
  return path.reduce((obj, key) => (obj && obj[key] ? obj[key] : null), allTokens)?.value || null
}
 
// Format token name by aggressively removing meaningless prefixes
function formatTokenName(pathArray) {
  const filtered = pathArray.filter((part) => !IGNORE_PREFIXES.includes(part.toLowerCase()))
  const short = filtered.slice(-2)
 
  return short
    .join("-")
    .replace(/[^a-zA-Z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/--+/g, "-")
    .toLowerCase()
}
 
// Check if a value should have px units added
function shouldAddPxUnits(path, type, value) {
  // Already has units or not numeric
  if (
    typeof value !== "number" &&
    (typeof value !== "string" ||
      value.includes("%") ||
      value.includes("px") ||
      value.includes("em") ||
      value.includes("rem") ||
      value.includes("vh") ||
      value.includes("vw"))
  ) {
    return false
  }
 
  // Color values
  if (
    typeof value === "string" &&
    (value.startsWith("#") || value.startsWith("rgb") || value.startsWith("rgba") || value.startsWith("hsl"))
  ) {
    return false
  }
 
  // Named values
  if (
    typeof value === "string" &&
    ["Regular", "Bold", "Light", "Medium", "SemiBold", "dropShadow", "innerShadow"].includes(value)
  ) {
    return false
  }
 
  const pathString = path.join("-").toLowerCase()
 
  // Check for specific patterns in the path that should always have px
  if (pathString.includes("font-size") || pathString.includes("line-height")) {
    return true
  }
 
  if ((type && NON_PX_TYPES.includes(type)) || NON_PX_KEYWORDS.some(keyword => pathString.includes(keyword))) {
    return false
  }
 
  // Infer from path or type
  if (
    (type && PX_UNIT_TYPES.includes(type)) ||
    PX_UNIT_KEYWORDS.some(keyword => pathString.includes(keyword))
  ) {
    return true
  }
 
  return false
}
 
// Transform the token JSON into clean CSS variables
function transformTokensToCSS(tokens, allTokens = tokens) {
  const cssVars = []
 
  function walk(obj, path = []) {
    for (const key in obj) {
      const val = obj[key]
      const newPath = [...path, key]
 
      if (typeof val === "object" && !val.value) {
        walk(val, newPath)
      } else if (val && val.value !== undefined) {
        let value = val.value
        const tokenType = val.type
 
        // Skip math expressions
        if (typeof value === "string" && (value.includes("*") || value.includes("/") || value.includes("+"))) continue
 
        // Resolve references
        if (typeof value === "string" && value.includes("{")) {
          const resolved = resolveReference(allTokens, value)
          if (resolved) value = resolved
          else continue
        }
 
        // Add px if necessary
        if (shouldAddPxUnits(newPath, tokenType, value)) {
          value = `${value}px`
        }
 
        const varName = formatTokenName(newPath)
        cssVars.push(`  --${varName}: ${value};`)
      }
    }
  }
 
  walk(tokens)
  return `:root {\n${cssVars.join("\n")}\n}\n`
}
 
// Run the script
async function main() {
  try {
    const tokensPath = path.resolve("tokens/tokens.json")
    const tokensData = fs.readFileSync(tokensPath, "utf8")
    const tokens = JSON.parse(tokensData)
 
    const css = transformTokensToCSS(tokens)
 
    const cssDir = path.resolve("styles/tokens")
    if (!fs.existsSync(cssDir)) {
      fs.mkdirSync(cssDir, { recursive: true })
    }
 
    const cssPath = path.resolve(cssDir, "variables.css")
    fs.writeFileSync(cssPath, css)
 
    console.log("✅ CSS variables written to styles/tokens/variables.css")
  } catch (err) {
    console.error("❌ Error:", err.message)
  }
}
 
main()