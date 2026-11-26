void main() {
  int l_total(int l_price, int l_count, int l_percent) {
    final l_subtotal = l_price * l_count;
    final l_discount = l_subtotal * l_percent ~/ 100;
    return l_subtotal - l_discount;
  }

  print(l_total(1000, 2, 10));
}
