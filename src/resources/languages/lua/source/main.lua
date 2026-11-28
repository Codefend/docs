local function m_total(m_values)
  local m_sum = 0
  for _, m_value in ipairs(m_values) do
    m_sum = m_sum + m_value
  end
  return m_sum
end

print(m_total({12, 18, 12}))
