local function ox0(ox1)
  local ox2 = 0
  for _, ox3 in ipairs(ox1) do
    ox2 = ox2 + ox3
  end
  return ox2
end

print(ox0({12, 18, 12}))
