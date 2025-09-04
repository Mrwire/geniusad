/**
 * Fix Specific Image Paths
 * 
 * This script fixes image paths in the ModernHeader and ModernFooter components
 * by removing the '/public' prefix from image sources.
 */

const fs = require('fs');
const path = require('path');

// Specific files to fix
const SPECIFIC_FILES = [
  'src/components/organisms/ModernHeader.tsx',
  'src/components/organisms/ModernFooter.tsx',
  'src/app/[locale]/page.tsx'
];

// RegEx pattern to match image paths with /public prefix
const PUBLIC_PATH_REGEX = /(['"])\/public\/([^'"]+)(['"])/g;

// Function to fix a specific file
function fixFile(filePath) {
  const fullPath = path.resolve(process.cwd(), filePath);
  
  try {
    if (!fs.existsSync(fullPath)) {
      console.log(`File does not exist: ${filePath}`);
      return;
    }
    
    let content = fs.readFileSync(fullPath, 'utf8');
    const originalContent = content;

    // Replace paths with /public prefix
    content = content.replace(PUBLIC_PATH_REGEX, '$1/$2$3');
    
    // Write file only if changes were made
    if (content !== originalContent) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Fixed paths in: ${filePath}`);
    } else {
      console.log(`No changes needed in: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
  }
}

// Process each file
console.log('Fixing image paths in specific components...');
SPECIFIC_FILES.forEach(fixFile);
console.log('Done!'); 