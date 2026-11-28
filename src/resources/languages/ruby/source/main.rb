def m_total(m_price, m_count, m_percent)
  m_subtotal = m_price * m_count
  m_discount = m_subtotal * m_percent / 100
  m_subtotal - m_discount
end

puts m_total(1000, 2, 10)
