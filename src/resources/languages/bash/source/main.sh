l_total() {
  local l_sum=0
  local l_value
  for l_value in "$@"; do
    l_sum=$((l_sum + l_value))
  done
  printf '%s\n' "$l_sum"
}

l_total 12 18 12
