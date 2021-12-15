int maxDist = 10;

void setup() {
  pinMode(3, OUTPUT);
  pinMode(4, INPUT);
  Serial.begin(9600);
}

void loop() {
  int distance = getDistance();

  // Only log distance if it is consistently less than n
  // Prevent false triggers by checking twice
  if (distance < maxDist && distance > 0) {
    delay(10);
    if (getDistance() < maxDist) {
    Serial.print(1);
    delay(10);
    }
  }
}

int getDistance() {
  digitalWrite(3, HIGH);
  delayMicroseconds(10);
  digitalWrite(3, LOW);
  int duration = pulseIn(4, HIGH);
  int distance = duration * 0.034 / 2;
  return distance;
}