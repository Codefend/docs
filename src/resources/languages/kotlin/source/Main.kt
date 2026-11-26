private fun l_total(l_unitPrice: Int, l_count: Int, l_discount: Int): Int {
    return l_unitPrice * l_count - l_discount
}

fun main() {
    println(l_total(20, 4, 5))
}
