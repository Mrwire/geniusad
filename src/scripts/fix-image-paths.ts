/**
 * Fix Image Paths Script
 * 
 * This script scans component files and fixes image paths by removing 
 * the '/public' prefix from image sources, which is unnecessary and causes 
 * image loading issues in Next.js.
 * 
 * Usage:
 * ```
 * npx ts-node src/scripts/fix-image-paths.ts
 * ```
 */

import fs from 'fs';
import path from 'path';

// Directories to scan for components
const DIRECTORIES_TO_SCAN = [
  'src/components/organisms', 
  'src/components/molecules', 
  'src/components/templates', 
  'src/app'
];

// File extensions to process
const FILE_EXTENSIONS = ['.tsx', '.jsx', '.ts', '.js'];

// Root directory (project root)
const ROOT_DIR = path.resolve(process.cwd());

// RegEx pattern to match image paths with /public prefix
const PUBLIC_PATH_REGEX = /(['"])\/public\/([^'"]+)(['"])/g;

/**
 * Scans a directory recursively for component files
 */
function scanDirectory(directory: string): string[] {
  const resolvedDir = path.resolve(ROOT_DIR, directory);
  const result: string[] = [];

  if (!fs.existsSync(resolvedDir)) {
    console.warn(`Directory does not exist: ${resolvedDir}`);
    return result;
  }

  const items = fs.readdirSync(resolvedDir, { withFileTypes: true });
  
  for (const item of items) {
    const itemPath = path.join(resolvedDir, item.name);
    
    if (item.isDirectory()) {
      result.push(...scanDirectory(path.relative(ROOT_DIR, itemPath)));
    } else if (
      item.isFile() && 
      FILE_EXTENSIONS.includes(path.extname(item.name))
    ) {
      result.push(path.relative(ROOT_DIR, itemPath));
    }
  }
  
  return result;
}

/**
 * Fixes image paths in a file
 */
function fixImagePathsInFile(filePath: string): void {
  const fullPath = path.resolve(ROOT_DIR, filePath);
  
  try {
    let content = fs.readFileSync(fullPath, 'utf8');
    const originalContent = content;

    // Replace paths with /public prefix
    content = content.replace(PUBLIC_PATH_REGEX, '$1/$2$3');
    
    // Write file only if changes were made
    if (content !== originalContent) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Fixed paths in: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
  }
}

/**
 * Main function to run the script
 */
function main() {
  console.log('🔍 Scanning for component files with incorrect image paths...');
  
  let filesToFix: string[] = [];
  
  // Collect all files to process
  for (const dir of DIRECTORIES_TO_SCAN) {
    const files = scanDirectory(dir);
    filesToFix = [...filesToFix, ...files];
  }
  
  console.log(`Found ${filesToFix.length} component files to check.`);
  
  // Process each file
  let fixedCount = 0;
  for (const file of filesToFix) {
    const originalContent = fs.readFileSync(path.resolve(ROOT_DIR, file), 'utf8');
    
    if (PUBLIC_PATH_REGEX.test(originalContent)) {
      fixedCount++;
      fixImagePathsInFile(file);
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`- Total files checked: ${filesToFix.length}`);
  console.log(`- Files with fixed paths: ${fixedCount}`);
  console.log(`- Unchanged files: ${filesToFix.length - fixedCount}`);
  
  if (fixedCount > 0) {
    console.log(`\n✨ Done! Fixed image paths in ${fixedCount} files.`);
  } else {
    console.log('\n✨ Done! No files needed fixes.');
  }
}

// Run the script
main(); 