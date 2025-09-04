/**
 * Install Modern UI Dependencies Script
 * 
 * This script installs all the dependencies required for the modern UI components.
 * It runs each npm install command individually to avoid issues with PowerShell
 * command line limitations.
 * 
 * Usage:
 * ```
 * node install-modern-ui-deps.mjs
 * ```
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { createSpinner } from 'nanospinner';

const execPromise = promisify(exec);

// List of dependencies to install
const dependencies = [
  '@radix-ui/react-dialog',
  '@radix-ui/react-navigation-menu',
  '@radix-ui/react-separator',
  '@radix-ui/react-icons',
  'class-variance-authority',
  'clsx',
  'tailwind-merge',
  'framer-motion',
  'lucide-react',
  'nanospinner'
];

/**
 * Installs a single dependency
 */
async function installDependency(dependency) {
  const spinner = createSpinner(`Installing ${dependency}...`).start();
  
  try {
    await execPromise(`npm install ${dependency} --save`);
    spinner.success({ text: `Installed ${dependency}` });
    return true;
  } catch (error) {
    spinner.error({ text: `Failed to install ${dependency}: ${error.message}` });
    return false;
  }
}

/**
 * Main function to run the script
 */
async function main() {
  console.log('\n🚀 Installing Modern UI Dependencies\n');
  
  let successCount = 0;
  let failCount = 0;
  
  // Install each dependency individually
  for (const dependency of dependencies) {
    const success = await installDependency(dependency);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }
  
  // Summary
  console.log('\n📊 Installation Summary:');
  console.log(`- Successfully installed: ${successCount}/${dependencies.length}`);
  
  if (failCount > 0) {
    console.log(`- Failed: ${failCount}`);
    console.log('\n⚠️ Some dependencies failed to install. Please check the errors above and try installing them manually.');
  } else {
    console.log('\n✅ All dependencies installed successfully!');
  }
  
  console.log('\n📋 Next steps:');
  console.log('1. Run the fix-image-paths script to ensure all image paths are correct:');
  console.log('   npx ts-node src/scripts/fix-image-paths.ts');
  console.log('2. Visit the Modern UI Preview page at /[locale]/modern-ui-preview');
  console.log('3. Check the documentation at src/docs/modern-ui-guide.md\n');
}

// Run the script
main().catch(error => {
  console.error('Script execution failed:', error);
  process.exit(1);
}); 