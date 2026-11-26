def Ox0(Ox1, Ox2, Ox3):
    Ox4 = Ox1 * Ox2
    Ox5 = Ox4 * Ox3 // 100
    return Ox4 - Ox5


if __name__ == "__main__":
    print(Ox0(1000, 2, 10))
