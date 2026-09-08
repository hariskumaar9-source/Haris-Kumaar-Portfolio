import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const portfolioDir = path.resolve(rootDir, 'artifacts', 'haris-portfolio');
const distPortfolioDir = path.resolve(portfolioDir, 'dist');
const rootDistDir = path.resolve(rootDir, 'dist');

console.log('🚀 [Build] Preparing Haris Kumaar Portfolio for Cloudflare Pages...');

// Determine the npm executable for the current platform
const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

// 1. Ensure portfolio dependencies are installed
const nodeModulesDir = path.resolve(portfolioDir, 'node_modules');
if (!fs.existsSync(nodeModulesDir)) {
  console.log('📦 [Build] Installing portfolio dependencies...');
  execSync(`${npmCmd} install`, { cwd: portfolioDir, stdio: 'inherit' });
}

// 2. Run Vite production build inside artifacts/haris-portfolio
console.log('⚡ [Build] Building portfolio with Vite...');
execSync(`${npmCmd} run build`, { cwd: portfolioDir, stdio: 'inherit' });

// 3. Ensure build output exists
if (!fs.existsSync(distPortfolioDir)) {
  console.error(`❌ [Build Error] Expected build output at ${distPortfolioDir} was not found.`);
  process.exit(1);
}

// 4. Mirror build output to root ./dist directory for Cloudflare Pages
console.log('📁 [Build] Syncing output to root ./dist directory...');
if (fs.existsSync(rootDistDir)) {
  fs.rmSync(rootDistDir, { recursive: true, force: true });
}
fs.cpSync(distPortfolioDir, rootDistDir, { recursive: true });

// 5. Ensure SPA routing _redirects file exists in root dist
const rootRedirects = path.resolve(rootDistDir, '_redirects');
const portfolioRedirects = path.resolve(portfolioDir, 'public', '_redirects');

if (!fs.existsSync(rootRedirects)) {
  if (fs.existsSync(portfolioRedirects)) {
    fs.copyFileSync(portfolioRedirects, rootRedirects);
  } else {
    fs.writeFileSync(rootRedirects, '/*    /index.html   200\n', 'utf8');
  }
}

console.log('✨ [Build] Success! Portfolio built cleanly and ready for Cloudflare Pages:');
console.log(`   - Root publish directory:      ${rootDistDir}`);
console.log(`   - Artifacts publish directory: ${distPortfolioDir}`);
