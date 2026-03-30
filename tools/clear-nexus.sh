#!/bin/bash

echo "Searching for nexus references in the project..."

# Tìm tất cả các file có chứa "nexus" (ngoại trừ node_modules, .git, các file md và sh)
FILES=$(grep -rlI --include="*" --include=".*" --exclude-dir="node_modules" --exclude-dir=".git" --exclude="*.md" --exclude="*.sh" -i "nexus" .)

if [ -z "$FILES" ]; then
  echo "No nexus references found outside of scripts/workflows."
  exit 0
fi

for file in $FILES; do
  echo "Cleaning nexus url in: $file"
  
  # Nếu là file .npmrc, .yarnrc thay thế luôn cấu hình registry
  if [[ "$file" == *".npmrc" || "$file" == *".yarnrc" ]]; then
    sed -i 's|registry=https://nexus.digi-texx.vn/.*|registry=https://registry.npmjs.org/|g' "$file"
    continue
  fi
  
  # Replace nexus npm registry repo with public npmjs registry trong các lockfile và code
  sed -i 's|https://nexus.digi-texx.vn/repository/npm/|https://registry.npmjs.org/|g' "$file"
  sed -i 's|http://nexus.digi-texx.vn/repository/npm/|http://registry.npmjs.org/|g' "$file"
  
  # Replace generic nexus registry URL (như npm-group, npm-public, npm-all...)
  sed -i 's|https://nexus.digi-texx.vn/repository/[^/]\+/|https://registry.npmjs.org/|g' "$file"
  sed -i 's|http://nexus.digi-texx.vn/repository/[^/]\+/|http://registry.npmjs.org/|g' "$file"
done

echo "✅ Successfully cleared nexus URLs!"
