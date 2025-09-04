/**
 * Puppeteer test script for testing image loading
 * 
 * Usage:
 * 1. Run your Next.js development server: npm run dev
 * 2. Run this script: node puppeteer-test.js
 */

const puppeteer = require('puppeteer');

(async () => {
  console.log('Starting Puppeteer image test...');
  
  // Launch browser
  const browser = await puppeteer.launch({
    headless: false, // Set to true for headless mode
    defaultViewport: { width: 1280, height: 800 }
  });
  
  try {
    const page = await browser.newPage();
    
    // Navigate to our image checker page
    console.log('Navigating to image checker page...');
    await page.goto('http://localhost:3000/en/tools/image-checker', {
      waitUntil: 'networkidle2'
    });
    
    // Wait for image tests to complete
    console.log('Waiting for image tests to complete...');
    await page.waitForFunction(
      () => {
        const statuses = document.querySelectorAll('table tbody tr td:nth-child(3) span');
        return Array.from(statuses).every(el => !el.textContent.includes('Checking'));
      },
      { timeout: 10000 }
    );
    
    // Take a screenshot
    console.log('Taking screenshot...');
    await page.screenshot({ path: './image-test-screenshot.png', fullPage: true });
    
    // Get image load results
    const results = await page.evaluate(() => {
      const rows = document.querySelectorAll('table tbody tr');
      return Array.from(rows).map(row => {
        const cells = row.querySelectorAll('td');
        return {
          name: cells[0].textContent.trim(),
          path: cells[1].textContent.trim(),
          status: cells[2].querySelector('span').textContent.trim()
        };
      });
    });
    
    // Print results
    console.log('\nImage Test Results:');
    console.log('==================');
    
    let failedCount = 0;
    
    results.forEach(result => {
      const statusEmoji = result.status === 'Success' ? '✅' : '❌';
      console.log(`${statusEmoji} ${result.name} (${result.path}): ${result.status}`);
      
      if (result.status !== 'Success') {
        failedCount++;
      }
    });
    
    console.log('\nSummary:');
    console.log(`Total images tested: ${results.length}`);
    console.log(`Successfully loaded: ${results.length - failedCount}`);
    console.log(`Failed to load: ${failedCount}`);
    
    // Test ResponsiveImage component
    console.log('\nTesting ResponsiveImage component...');
    const responsiveImageVisible = await page.evaluate(() => {
      const container = document.querySelector('section:nth-child(3) .space-y-8 > div:first-child .h-60');
      if (!container) return false;
      
      const computedStyle = window.getComputedStyle(container);
      return computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden';
    });
    
    console.log(`ResponsiveImage component visible: ${responsiveImageVisible ? '✅' : '❌'}`);
    
    // Test FixedPositionImage component
    console.log('\nTesting FixedPositionImage component...');
    const fixedPositionImageVisible = await page.evaluate(() => {
      const container = document.querySelector('section:nth-child(3) .space-y-8 > div:last-child .h-40');
      if (!container) return false;
      
      const computedStyle = window.getComputedStyle(container);
      return computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden';
    });
    
    console.log(`FixedPositionImage component visible: ${fixedPositionImageVisible ? '✅' : '❌'}`);
    
    if (failedCount === 0 && responsiveImageVisible && fixedPositionImageVisible) {
      console.log('\n✅ All tests passed successfully!');
    } else {
      console.log('\n❌ Some tests failed. Please check the results above.');
    }
    
  } catch (error) {
    console.error('An error occurred during testing:', error);
  } finally {
    // Close the browser
    await browser.close();
    console.log('\nPuppeteer test completed.');
  }
})(); 