#!/usr/bin/env node
/**
 * tools/check-and-fix-deps.js
 * Automatically reads all source code, extracts @thanh-libs imports,
 * and fixes package.json peerDependencies/devDependencies if missing.
 */
const fs = require('fs');
const path = require('path');

const libDir = process.cwd();
const pkgPath = path.join(libDir, 'package.json');
const srcDir = path.join(libDir, 'src');

if (!fs.existsSync(pkgPath) || !fs.existsSync(srcDir)) {
  console.error('❌ Lỗi: Bạn cần chạy lệnh này từ bên trong thư mục libs/<lib-name>');
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const currentLibName = pkg.name;

function getAllTsFiles(dirPath, arrayOfFiles) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles || [];
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllTsFiles(path.join(dirPath, file), arrayOfFiles);
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        arrayOfFiles.push(path.join(dirPath, file));
      }
    }
  });
  return arrayOfFiles;
}

const files = getAllTsFiles(srcDir);
const importedLibs = new Set();

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const regex = /from\s+['"](@thanh-libs\/[a-z0-9-]+)['"]|import\s+['"](@thanh-libs\/[a-z0-9-]+)['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const libName = match[1] || match[2];
    if (libName !== currentLibName) {
      importedLibs.add(libName);
    }
  }
});

let modified = false;
pkg.peerDependencies = Object.assign({}, pkg.peerDependencies || {});
pkg.devDependencies = Object.assign({}, pkg.devDependencies || {});

importedLibs.forEach(lib => {
  if (pkg.peerDependencies[lib] !== '*') {
    pkg.peerDependencies[lib] = '*';
    modified = true;
  }
  if (pkg.devDependencies[lib] !== '*') {
    pkg.devDependencies[lib] = '*';
    modified = true;
  }
});

if (modified) {
  // Sort
  pkg.peerDependencies = Object.keys(pkg.peerDependencies).sort().reduce((acc, key) => ({...acc, [key]: pkg.peerDependencies[key]}), {});
  pkg.devDependencies = Object.keys(pkg.devDependencies).sort().reduce((acc, key) => ({...acc, [key]: pkg.devDependencies[key]}), {});
  
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  console.log('⚠️ FAILED: Phát hiện Dependency bị thiếu và ĐÃ TỰ ĐỘNG FIX package.json.');
  console.log('👉 ACTION: Hãy chạy lại script này lần nữa để kiểm nghiệm (LOOP).');
  process.exit(1);
} else {
  console.log('✅ PASS: Tất cả dependency đều chính xác.');
  process.exit(0);
}
