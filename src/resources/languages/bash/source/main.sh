m_total() {
  local m_sum=0
  local m_value
  for m_value in "$@"; do
    m_sum=$((m_sum + m_value))
  done
  printf '%s\n' "$m_sum"
}

m_total 12 18 12
