function l_total(l_price: number, l_count: number, l_percent: number): number {
  const l_subtotal = l_price * l_count;
  const l_discount = Math.trunc((l_subtotal * l_percent) / 100);
  return l_subtotal - l_discount;
}

console.log(l_total(1000, 2, 10));
