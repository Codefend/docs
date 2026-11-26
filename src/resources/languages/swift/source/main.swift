private func l_total(_ l_unitPrice: Int, _ l_count: Int, _ l_discount: Int) -> Int {
    return l_unitPrice * l_count - l_discount
}

print(l_total(20, 4, 5))
