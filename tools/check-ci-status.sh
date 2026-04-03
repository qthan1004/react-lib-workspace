#!/usr/bin/env bash
# Poll GitHub Actions status via Check Runs API
# Output is saved to ci-result.md for token optimization
# Usage: bash tools/check-ci-status.sh <owner> <repo> <sha> [max_attempts=10] [interval=30]
# Exit: 0=pass, 1=fail, 2=timeout, 3=error
set -e

OWNER="$1"; REPO="$2"; SHA="$3"
MAX="${4:-10}"; INTERVAL="${5:-30}"
TOKEN="${GITHUB_PERSONAL_ACCESS_TOKEN:-$GITHUB_TOKEN}"

[ -z "$SHA" ] || [ -z "$TOKEN" ] && echo "Usage: GITHUB_PERSONAL_ACCESS_TOKEN=... bash $0 <owner> <repo> <sha>" && exit 3

for ((i=1; i<=MAX; i++)); do
  echo "── Poll $i/$MAX ──"
  STATUS=$(curl -s -H "Authorization: Bearer $TOKEN" -H "Accept: application/vnd.github+json" \
    "https://api.github.com/repos/$OWNER/$REPO/commits/$SHA/check-runs" | node -e "
    let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{
      const fs=require('fs');
      try{
        const{check_runs:r=[],total_count:t=0}=JSON.parse(d);
        if(!t){
          fs.writeFileSync('ci-result.md', '# CI Status: PENDING\n- Chưa có GitHub Action nào chạy.\\n');
          console.log('none');
          return;
        }
        const fail=r.some(x=>['failure','cancelled','timed_out'].includes(x.conclusion));
        const done=r.every(x=>x.status==='completed');
        const resStr = !done?'pending':fail?'failure':'success';
        
        let md = '# CI Status: ' + resStr.toUpperCase() + '\n';
        r.forEach(x=> { md += '- ' + x.name + ': ' + (x.conclusion || x.status) + '\n'; });
        fs.writeFileSync('ci-result.md', md);
        
        r.forEach(x=>console.error(x.name+': '+x.conclusion));
        console.log(resStr);
      }catch(e){
        console.log('error');
      }
    })")

  case "$STATUS" in
    success) echo "✅ CI passed! (See ci-result.md)"; exit 0;;
    failure) echo "❌ CI failed! (See ci-result.md)"; exit 1;;
    *) [ "$i" -lt "$MAX" ] && echo "⏳ Waiting ${INTERVAL}s..." && sleep "$INTERVAL";;
  esac
done
echo "⏳ Timeout"; exit 2
