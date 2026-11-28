const unsigned long m_intervalMillis = 500;
unsigned long m_previousMillis = 0;
bool m_ledState = false;

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  const unsigned long m_currentMillis = millis();
  if (m_currentMillis - m_previousMillis >= m_intervalMillis) {
    m_previousMillis = m_currentMillis;
    m_ledState = !m_ledState;
    digitalWrite(LED_BUILTIN, m_ledState ? HIGH : LOW);
  }
}
