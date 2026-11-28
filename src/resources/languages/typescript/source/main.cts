function m_total(m_price: number, m_count: number, m_percent: number): number {
  const m_subtotal = m_price * m_count;
  const m_discount = Math.trunc((m_subtotal * m_percent) / 100);
  return m_subtotal - m_discount;
}

console.log(m_total(1000, 2, 10));
