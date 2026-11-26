def l_total(l_price, l_count, l_percent):
    l_subtotal = l_price * l_count
    l_discount = l_subtotal * l_percent // 100
    return l_subtotal - l_discount


if __name__ == "__main__":
    print(l_total(1000, 2, 10))
