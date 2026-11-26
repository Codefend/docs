local function l_total(l_values)
  local l_sum = 0
  for _, l_value in ipairs(l_values) do
    l_sum = l_sum + l_value
  end
  return l_sum
end

print(l_total({12, 18, 12}))
