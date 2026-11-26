function Ox0(Ox1: number, Ox2: number, Ox3: number): number {
  const Ox4 = Ox1 * Ox2;
  const Ox5 = Math.trunc((Ox4 * Ox3) / 100);
  return Ox4 - Ox5;
}

console.log(Ox0(1000, 2, 10));
