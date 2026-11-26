def ox0(ox1, ox2, ox3)
  ox4 = ox1 * ox2
  ox5 = ox4 * ox3 / 100
  ox4 - ox5
end

puts ox0(1000, 2, 10)
