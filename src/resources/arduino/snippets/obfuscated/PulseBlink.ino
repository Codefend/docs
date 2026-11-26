const unsigned long Ox0 = 500;
unsigned long Ox1 = 0;
bool Ox2 = false;

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  const unsigned long Ox3 = millis();
  if (Ox3 - Ox1 >= Ox0) {
    Ox1 = Ox3;
    Ox2 = !Ox2;
    digitalWrite(LED_BUILTIN, Ox2 ? HIGH : LOW);
  }
}
