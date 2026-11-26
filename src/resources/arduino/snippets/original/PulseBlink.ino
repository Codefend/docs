const unsigned long l_intervalMillis = 500;
unsigned long l_previousMillis = 0;
bool l_ledState = false;

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  const unsigned long l_currentMillis = millis();
  if (l_currentMillis - l_previousMillis >= l_intervalMillis) {
    l_previousMillis = l_currentMillis;
    l_ledState = !l_ledState;
    digitalWrite(LED_BUILTIN, l_ledState ? HIGH : LOW);
  }
}
