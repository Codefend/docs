def l_total(l_price, l_count, l_percent)
  l_subtotal = l_price * l_count
  l_discount = l_subtotal * l_percent / 100
  l_subtotal - l_discount
end

puts l_total(1000, 2, 10)
