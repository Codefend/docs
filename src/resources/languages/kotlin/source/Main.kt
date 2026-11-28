private fun m_total(m_unitPrice: Int, m_count: Int, m_discount: Int): Int {
    return m_unitPrice * m_count - m_discount
}

fun main() {
    println(m_total(20, 4, 5))
}
