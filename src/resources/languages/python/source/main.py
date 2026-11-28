def m_total(m_price, m_count, m_percent):
    m_subtotal = m_price * m_count
    m_discount = m_subtotal * m_percent // 100
    return m_subtotal - m_discount


if __name__ == "__main__":
    print(m_total(1000, 2, 10))
