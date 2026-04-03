#!/usr/bin/env node
/**
 * tools/update-doc.js
 * Quét mã nguồn và tạo ra một file tóm tắt (doc-report.md).
 * LLM (Agent) sẽ đọc file tóm tắt này để biết thư viện có những class,
 * interface, export gì... và từ đó tự viết thêm/trình bày lại README.md
 * thay vì phải tốn token đọc toàn bộ thư mục src/**/*.
 */
const fs = require('fs');
const path = require('path');

const libDir = process.cwd();
const srcDir = path.join(libDir, 'src');

if (!fs.existsSync(srcDir)) {
  console.log('⚠️ Không tìm thấy thư mục src/. Bỏ qua việc quét doc.');
  process.exit(0);
}

const indexPath = path.join(srcDir, 'index.ts');
let report = '# Báo Cáo Phân Tích Component / Tài Nguyên Thư Viện\n\n';
report += '> 🤖 **Lưu ý cho LLM Agent**: Dưới đây là danh sách các tính năng/Interface bị phơi bày ra ngoài của thư viện này. Hãy dựa vào chúng để tự viết tài liệu/Description vào file `README.md` thay vì mò mẫm đọc source.\n\n';

if (fs.existsSync(indexPath)) {
  const content = fs.readFileSync(indexPath, 'utf8');
  const exports = content.match(/export\s+.*?;?/g) || [];
  report += '## 1. Export Chính (từ `index.ts`):\n';
  if (exports.length) {
    exports.forEach(e => report += `- \`${e.replace(/\n/g, ' ')}\`\n`);
  } else {
    report += '- _Chưa gặt được export rõ ràng ở gốc._\n';
  }
}

// Thử quét thêm models hoặc types
const modelsDir = path.join(srcDir, 'lib', 'models');
if (fs.existsSync(modelsDir)) {
    report += '\n## 2. Models / Types / Interfaces:\n';
    fs.readdirSync(modelsDir).forEach(file => {
        if (file.endsWith('.ts') || file.endsWith('.tsx')) {
            const content = fs.readFileSync(path.join(modelsDir, file), 'utf8');
            const types = content.match(/export\s+(interface|type|class|enum)\s+\w+/g) || [];
            if (types.length) {
                report += `### File: \`${file}\`\n`;
                types.forEach(t => report += `- \`${t}\`\n`);
            }
        }
    });
}

// Ghi file báo cáo
fs.writeFileSync('doc-report.md', report);
console.log('✅ Đã quét xong mã nguồn. 🤖 Báo cáo đã được lưu tại `doc-report.md`.');
console.log('👉 ACTION (Cho Agent): Đọc file này, chắt lọc nội dung để tự viết vào file README.md, sau đó XÓA doc-report.md.');
