
const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../src/components'); // Root directory for components
const readmeFile = path.resolve(__dirname, '../README.md');

// Function to extract and clean markdown-like comments from the file
function extractMarkdownComments(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const commentRegex = /\/\*\*([\s\S]*?)\*\//g;

  const comments = [];
  let match;
  while ((match = commentRegex.exec(fileContent)) !== null) {
    // Clean up the comment by removing asterisks at the beginning of lines
    // and trimming whitespace
    let cleanedComment = match[1]
      .split('\n')
      .map(line => line.replace(/^\s*\*\s?/, ''))
      .join('\n')
      .trim();
    
    comments.push(cleanedComment);
  }

  return comments.join('\n\n');
}

// Function to check if documentation already exists for a component
function isDocumentationAlreadyPresent(componentName) {
  if (!fs.existsSync(readmeFile)) return false;
  const readmeContent = fs.readFileSync(readmeFile, 'utf-8');
  
  // Check for component name with different case variations
  const regex = new RegExp(`# ${componentName}(?:\\s|Component|$)`, 'i');
  return regex.test(readmeContent);
}

// Function to check if the Auto-generated Documentation section exists
function isAutoGenSectionPresent() {
  if (!fs.existsSync(readmeFile)) return false;
  const readmeContent = fs.readFileSync(readmeFile, 'utf-8');
  return readmeContent.includes('# Auto-generated Documentation');
}

// Function to recursively find all `.tsx` component files
function getComponentFiles(dir) {
  let files = [];
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      files = files.concat(getComponentFiles(fullPath)); // Recursive call for subdirectories
    } else if (file.endsWith('.tsx')) {
      files.push(fullPath);
    }
  });
  return files;
}

// Function to extract documentation from component files
function extractFromFiles() {
  if (!fs.existsSync(srcDir)) {
    console.error(`Error: Components directory not found at ${srcDir}`);
    return;
  }

  const componentFiles = getComponentFiles(srcDir);
  let markdownContent = '';
  const autoGenSectionExists = isAutoGenSectionPresent();

  componentFiles.forEach((filePath) => {
    const componentName = path.basename(filePath, '.tsx');

    if (!isDocumentationAlreadyPresent(componentName)) {
      const extractedComments = extractMarkdownComments(filePath);
      if (extractedComments) {
        // Remove any existing component heading to prevent duplication
        let cleanedComments = extractedComments;
        
        // Check for and remove any "# ComponentName" or "# ComponentName Component" heading
        const headingRegex = new RegExp(`^# ${componentName}(?:\\s|Component|$).*$`, 'im');
        cleanedComments = cleanedComments.replace(headingRegex, '').trim();
        
        // Add the component name as a heading
        markdownContent += `\n\n# ${componentName}\n${cleanedComments}`;
      }
    }
  });

  if (markdownContent) {
    // Only add the Auto-generated Documentation heading if it doesn't exist
    if (!autoGenSectionExists) {
      markdownContent = '\n\n# Auto-generated Documentation' + markdownContent;
    }
    
    fs.appendFileSync(readmeFile, markdownContent);
    console.log('✅ Documentation appended to README.md!');
  } else {
    console.log('⚠️ No new documentation to add.');
  }
}

// Run the script
extractFromFiles();
