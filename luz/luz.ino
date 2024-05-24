#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

// Defina suas credenciais de WiFi
#define WIFI_SSID "henriquewifi"
#define WIFI_PASSWORD "nbnh4715"

// Defina suas credenciais do Firebase
#define API_KEY "AIzaSyBHhiwCBjUoZvi8w0q1BGEh68hAk2E6gok"
#define DATABASE_URL "https://luz-automatica-6715c-default-rtdb.firebaseio.com/"

#define ledPin 13
#define ldrPin 35

// Inicialize o cliente Firebase
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
bool signupOK = false;

void setup(){
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
  pinMode(ldrPin, INPUT);
  
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  /* Assign the api key (required) */
  config.api_key = API_KEY;

  auth.user.email = "";
  auth.user.password = "";

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", "")){
    Serial.println("ok");
    signupOK = true;
  }
  else{
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h
  
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 5000 || sendDataPrevMillis == 0)) {
    sendDataPrevMillis = millis();
    

    
    int ldrValue = analogRead(ldrPin);
    Serial.print("Valor do sensor de luminosidade: " );
    Serial.println(ldrValue);
      // Verificação periódica do valor no Firebase
  if (Firebase.RTDB.getBool(&fbdo, "/ledStatus")) {
    bool ledStatus = fbdo.boolData();
    digitalWrite(ledPin, ledStatus ? HIGH : LOW);
    Serial.println("Estado do LED atualizado: " + String(ledStatus));
  } else {
    Serial.println("Falha ao obter o estado do LED: " + fbdo.errorReason());
  }

  delay(2000); // Atraso de 2 segundos antes da próxima verificação
  
  } 
}
