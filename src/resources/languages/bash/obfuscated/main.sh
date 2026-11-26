ox0() {
  local ox1=0
  local ox2
  for ox2 in "$@"; do
    ox1=$((ox1 + ox2))
  done
  printf '%s\n' "$ox1"
}

ox0 12 18 12
