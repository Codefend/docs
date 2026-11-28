private func m_total(_ m_unitPrice: Int, _ m_count: Int, _ m_discount: Int) -> Int {
    return m_unitPrice * m_count - m_discount
}

print(m_total(20, 4, 5))
