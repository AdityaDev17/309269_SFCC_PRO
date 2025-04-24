import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

// Get the directory name using ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Root directory of the project
const rootDir = path.resolve(__dirname, "..")
const componentsDir = path.join(rootDir, "src", "components")
const readmePath = path.join(rootDir, "README.md")

// Categories for components
const categories = {
  atomic: "## Atoms",
  molecules: "## Molecules",
  organisms: "## Organisms",
  components: "## Components", // For direct components
}

// Function to extract documentation comments from a file
function extractDocumentation(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8")

    // Match comments between /** and */
    const docRegex = /\/\*\*([\s\S]*?)\*\//g
    const matches = content.match(docRegex)

    if (!matches) return null

    // Get the component name from the file path
    const componentName = path.basename(path.dirname(filePath))

    // Process each documentation block
    for (const match of matches) {
      // Clean up the comment by removing * at the beginning of lines
      const cleanDoc = match
        .replace(/\/\*\*|\*\//g, "")
        .replace(/^\s*\*\s?/gm, "")
        .trim()

      // Only return if it contains markdown-style documentation
      if (cleanDoc.includes("##")) {
        return cleanDoc
      }
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error)
  }

  return null
}

// Function to get all component files recursively
function getComponentFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      getComponentFiles(filePath, fileList)
    } else if (file.endsWith(".tsx") || file.endsWith(".jsx")) {
      fileList.push(filePath)
    }
  })

  return fileList
}

// Function to determine the category of a component based on its path
function getComponentCategory(filePath) {
  const relativePath = path.relative(componentsDir, filePath)
  const parts = relativePath.split(path.sep)

  if (parts[0] === "atomic") return "atomic"
  if (parts[0] === "molecules") return "molecules"
  if (parts[0] === "organisms") return "organisms"
  return "components" // Default for direct components
}

// Main function to generate documentation
async function generateDocs() {
  console.log("Generating component documentation...")

  // Get all component files
  const componentFiles = getComponentFiles(componentsDir)

  // Organize documentation by category
  const docsByCategory = {
    atomic: [],
    molecules: [],
    organisms: [],
    components: [],
  }

  // Extract documentation from each file
  componentFiles.forEach((filePath) => {
    const doc = extractDocumentation(filePath)
    if (doc) {
      const category = getComponentCategory(filePath)
      docsByCategory[category].push(doc)
    }
  })

  // Read existing README content
  let readmeContent = ""
  try {
    readmeContent = fs.readFileSync(readmePath, "utf8")
  } catch (error) {
    console.log("README.md not found. Creating a new one.")
  }

  // Find the components documentation section or create it
  const componentsSection = "# Auto-generated Documentation"
  let newContent = ""

  if (readmeContent.includes(componentsSection)) {
    // Split the README at the components section
    const parts = readmeContent.split(componentsSection)
    newContent = parts[0] + componentsSection + "\n\n"
  } else {
    // If no components section exists, append it to the end
    newContent = readmeContent ? readmeContent + "\n\n" + componentsSection + "\n\n" : componentsSection + "\n\n"
  }

  // Add documentation for each category
  Object.keys(categories).forEach((category) => {
    if (docsByCategory[category].length > 0) {
      newContent += categories[category] + "\n\n"
      docsByCategory[category].forEach((doc) => {
        newContent += doc + "\n\n"
      })
    }
  })

  // Write the updated content back to README.md
  fs.writeFileSync(readmePath, newContent)

  console.log("Documentation generated successfully!")
}

// Run the documentation generator
generateDocs().catch((error) => {
  console.error("Error generating documentation:", error)
  process.exit(1)
})
