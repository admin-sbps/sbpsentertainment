#!/usr/bin/env bash
set -e

MODE="text"
if [[ "$1" == "--json" ]]; then
  MODE="json"
fi

if [[ "$MODE" == "text" ]]; then
  echo "📦 Project Snapshot for $(basename "$(pwd)")"
  echo "Date: $(date)"
  echo "-----------------------------------------"

  echo
  echo "=== Project Tree ==="
  tree -a -I "node_modules|.next|.git|out"

  echo
  echo "=== File Counts by Extension ==="
  find . -type f | sed 's/.*\.//' | sort | uniq -c | sort -nr

  echo
  echo "=== Largest Files (Top 10) ==="
  du -ah . | sort -rh | grep -vE "node_modules|.git|.next" | head -n 10

  echo
  echo "=== Line Counts (Top 10 .ts/.tsx/.js files) ==="
  find src -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" \) | xargs wc -l | sort -nr | head -n 10

  if [ -d ".git" ]; then
    echo
    echo "=== Git Status ==="
    git status -s

    echo
    echo "=== Last 5 Commits ==="
    git log --oneline -n 5
  fi

else
  # JSON mode
  echo "{"
  echo "  \"project\": \"$(basename "$(pwd)")\","
  echo "  \"date\": \"$(date -u +"%Y-%m-%dT%H:%M:%SZ")\","

  echo "  \"files_by_extension\": {"
  find . -type f | sed 's/.*\.//' | sort | uniq -c | awk '{printf "    \"%s\": %s,\n", $2, $1}' | sed '$ s/,$//'
  echo "  },"

  echo "  \"largest_files\": ["
  du -ah . | sort -rh | grep -vE "node_modules|.git|.next" | head -n 10 | awk '{printf "    {\"size\":\"%s\",\"file\":\"%s\"},\n",$1,$2}' | sed '$ s/,$//'
  echo "  ]"

  echo "}"
fi
