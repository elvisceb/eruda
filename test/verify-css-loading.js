#!/usr/bin/env node

/**
 * Simple test to verify that the loadCss and cssUrl functionality
 * is present in the built eruda.js file
 */

const fs = require('fs');
const path = require('path');

console.log('=== Testing Eruda External CSS Loading Feature ===\n');

const distPath = path.join(__dirname, '../dist/eruda.js');
const srcPath = path.join(__dirname, '../src/eruda.js');

// Test 1: Check if source file contains the new methods
console.log('Test 1: Checking source file...');
const srcContent = fs.readFileSync(srcPath, 'utf8');

const hasLoadCssMethod = srcContent.includes('loadCss(cssUrl)');
const hasLoadExternalCssMethod = srcContent.includes('_loadExternalCss(cssUrl)');
const hasCssUrlParam = srcContent.includes('cssUrl,');

if (hasLoadCssMethod && hasLoadExternalCssMethod && hasCssUrlParam) {
  console.log('✓ Source file contains all new methods and parameters');
} else {
  console.log('✗ Source file missing some features:');
  console.log(`  - loadCss method: ${hasLoadCssMethod}`);
  console.log(`  - _loadExternalCss method: ${hasLoadExternalCssMethod}`);
  console.log(`  - cssUrl parameter: ${hasCssUrlParam}`);
}

// Test 2: Check if built file contains the functionality
console.log('\nTest 2: Checking built file...');
const distContent = fs.readFileSync(distPath, 'utf8');

const hasLoadCssInDist = distContent.includes('loadCss');
const hasCssUrlInDist = distContent.includes('cssUrl');
const hasLinkElementCreation = distContent.includes('createElement("link")') || 
                                distContent.includes("createElement('link')");

if (hasLoadCssInDist && hasCssUrlInDist) {
  console.log('✓ Built file contains the new functionality');
} else {
  console.log('✗ Built file missing some features:');
  console.log(`  - loadCss reference: ${hasLoadCssInDist}`);
  console.log(`  - cssUrl reference: ${hasCssUrlInDist}`);
  console.log(`  - Link element creation: ${hasLinkElementCreation}`);
}

// Test 3: Check if README was updated
console.log('\nTest 3: Checking documentation...');
const readmePath = path.join(__dirname, '../README.md');
const readmeContent = fs.readFileSync(readmePath, 'utf8');

const hasLoadCssDoc = readmeContent.includes('eruda.loadCss');
const hasCssUrlDoc = readmeContent.includes('cssUrl:');

if (hasLoadCssDoc && hasCssUrlDoc) {
  console.log('✓ Documentation updated with new features');
} else {
  console.log('✗ Documentation incomplete:');
  console.log(`  - loadCss documentation: ${hasLoadCssDoc}`);
  console.log(`  - cssUrl documentation: ${hasCssUrlDoc}`);
}

// Summary
console.log('\n=== Test Summary ===');
const allTestsPassed = hasLoadCssMethod && hasLoadExternalCssMethod && 
                       hasCssUrlParam && hasLoadCssInDist && 
                       hasCssUrlInDist && hasLoadCssDoc && hasCssUrlDoc;

if (allTestsPassed) {
  console.log('✓ ALL TESTS PASSED');
  process.exit(0);
} else {
  console.log('✗ SOME TESTS FAILED');
  process.exit(1);
}
