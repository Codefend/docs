void main() {
  int m_total(int m_price, int m_count, int m_percent) {
    final m_subtotal = m_price * m_count;
    final m_discount = m_subtotal * m_percent ~/ 100;
    return m_subtotal - m_discount;
  }

  print(m_total(1000, 2, 10));
}
