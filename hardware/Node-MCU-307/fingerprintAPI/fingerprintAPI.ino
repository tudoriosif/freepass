#include <Adafruit_Fingerprint.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <ArduinoJson.h>

// Node ID
#define NODE_ID "ZDYm3"

#ifndef STASSID
#define STASSID "DIGI-Z6hf"
#define STAPSK  "0744592933"
#endif

const int capacity = JSON_OBJECT_SIZE(4);
StaticJsonDocument<9000> responseJSON;
StaticJsonDocument<capacity> payload;
String response = "";
String fingerprintTemplate = "";

const char* ssid     = STASSID;
const char* password = STAPSK;

ESP8266WebServer server(8001);

const int led = LED_BUILTIN;

// Node MCU D7, D8
SoftwareSerial mySerial(13, 15);
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&mySerial);

void respondError(int code, String message) {
  responseJSON["error"] = message;
  serializeJson(responseJSON, response);
  serializeJsonPretty(responseJSON, Serial);
  server.send(code, "application/json", response);
  Serial.println("\n");
  response = "";
}

void stringPrint(String value, String message) {
  Serial.println(message);
  Serial.println(value);
  Serial.println("\n");
}

void intPrint(int value, String message) {
  Serial.println(message);
  Serial.println(value);
  Serial.println("\n");
}

boolean checkP(int p) {
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image taken");
      return true;
    case FINGERPRINT_NOFINGER:
      Serial.println(".");
      return false;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return false;
    case FINGERPRINT_IMAGEFAIL:
      Serial.println("Imaging error");
      return false;
    default:
      Serial.println("Unknown error");
      return false;
  }
}

boolean checkTz(int p) {
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image converted");
      return true;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Image too messy");
      return false;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return false;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Could not find fingerprint features");
      return false;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Could not find fingerprint features");
      return false;
    default:
      Serial.println("Unknown error");
      return false;
  }
}

boolean checkModel(int p) {
  if (p == FINGERPRINT_OK) {
    Serial.println("Prints matched!");
    return true;
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    return false;
  } else if (p == FINGERPRINT_ENROLLMISMATCH) {
    Serial.println("Fingerprints did not match");
    return false;
  } else {
    Serial.println("Unknown error");
    return false;
  }
}

boolean checkSaving(int p) {
  if (p == FINGERPRINT_OK) {
    Serial.println("Stored!");
    return true;
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    return false;
  } else if (p == FINGERPRINT_BADLOCATION) {
    Serial.println("Could not store in that location");
    return false;
  } else if (p == FINGERPRINT_FLASHERR) {
    Serial.println("Error writing to flash");
    return false;
  } else {
    Serial.println("Unknown error");
    return false;
  }
}

boolean checkSearching(int p) {
  if (p == FINGERPRINT_OK) {
    Serial.println("Found a print match!");
    return true;
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    return false;
  } else if (p == FINGERPRINT_NOTFOUND) {
    Serial.println("Did not find a match");
    return false;
  } else {
    Serial.println("Unknown error");
    return false;
  }
}

void printHex(int num, int precision) {
  char tmp[16];
  char format[128];

  sprintf(format, "%%.%dX", precision);

  sprintf(tmp, format, num);
  fingerprintTemplate += String(tmp);
  Serial.print(tmp);
}

uint8_t downloadFingerprintTemplate(uint16_t id)
{
  Serial.println("------------------------------------");
  Serial.print("Attempting to load #"); Serial.println(id);
  uint8_t p = finger.loadModel(id);
  switch (p) {
    case FINGERPRINT_OK:
      Serial.print("Template "); Serial.print(id); Serial.println(" loaded");
      break;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return p;
    default:
      Serial.print("Unknown error "); Serial.println(p);
      return p;
  }

  // OK success!

  Serial.print("Attempting to get #"); Serial.println(id);
  p = finger.getModel();
  switch (p) {
    case FINGERPRINT_OK:
      Serial.print("Template "); Serial.print(id); Serial.println(" transferring:");
      break;
    default:
      Serial.print("Unknown error "); Serial.println(p);
      return p;
  }

  // one data packet is 267 bytes. in one data packet, 11 bytes are 'usesless' :D
  uint8_t bytesReceived[534]; // 2 data packets
  memset(bytesReceived, 0xff, 534);

  uint32_t starttime = millis();
  int i = 0;
  while (i < 534 && (millis() - starttime) < 20000) {
    if (mySerial.available()) {
      bytesReceived[i++] = mySerial.read();
    }
  }
  Serial.print(i); Serial.println(" bytes read.");
  Serial.println("Decoding packet...");

  uint8_t fingerTemplate[512]; // the real template
  memset(fingerTemplate, 0xff, 512);

  // filtering only the data packets
  int uindx = 9, index = 0;
  memcpy(fingerTemplate + index, bytesReceived + uindx, 256);   // first 256 bytes
  uindx += 256;       // skip data
  uindx += 2;         // skip checksum
  uindx += 9;         // skip next header
  index += 256;       // advance pointer
  memcpy(fingerTemplate + index, bytesReceived + uindx, 256);   // second 256 bytes

  for (int i = 0; i < 512; ++i) {
    //Serial.print("0x");
    printHex(fingerTemplate[i], 2);
    //Serial.print(", ");
  }
  responseJSON["template"] = fingerprintTemplate;
  Serial.println("\ndone.");

  return p;
}


boolean getFingerTemplate(int id) {
  finger.deleteModel(id);
  boolean isCorrect = true;

  int p = -1;
  Serial.println("Put your finger on sensor");
  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    checkP(p);
  }

  p = finger.image2Tz(1); // First Fingerprint
  isCorrect = checkTz(p);
  if (!isCorrect) return false;

  p = -1;
  Serial.println("Keep your finger on sensor");
  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    checkP(p);
  }

  p = finger.image2Tz(2);
  isCorrect = checkTz(p);
  if (!isCorrect) return false;

  Serial.println("Creating model..");
  p = finger.createModel();
  isCorrect = checkModel(p);
  if (!isCorrect) return false;

  Serial.println("Storing model..");
  p = finger.storeModel(id);
  isCorrect = checkSaving(p);
  if (!isCorrect) return false;

  Serial.println("Getting template..");
  p = downloadFingerprintTemplate(id);
  if (p != FINGERPRINT_OK) return false;

  return true;
}

int checkFingerTemplate(int id) {
  boolean isCorrect = true;

  int p = -1;
  Serial.println("Put your finger on sensor");
  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    checkP(p);
  }

  p = finger.image2Tz(); // Template Fingerprint
  isCorrect = checkTz(p);
  if (!isCorrect) return -100;

  p = finger.fingerSearch();
  isCorrect = checkSearching(p);
  if (!isCorrect) return -100;

  Serial.print("Found ID #"); Serial.print(finger.fingerID);
  Serial.print(" with confidence of "); Serial.println(finger.confidence);

  if (finger.fingerID != id) return -1;

  responseJSON["fingerID"] = finger.fingerID;
  responseJSON["confidence"] = finger.confidence;

  return 1;
}

void getFingerPrint() {
  responseJSON.clear();
  payload.clear();

  if (server.method() != HTTP_POST) {
    respondError(405, "Method not allowed!");
    return;
  }

  if (!server.hasHeader("Authorization")) {
    respondError(400, "No token provided!");
    return;
  }

  deserializeJson(payload, server.arg("plain"));
  int userNumber = payload["user"];
  if (!userNumber) {
    respondError(400, "User number not provided");
    return;
  }

  fingerprintTemplate = "";

  const String requestNodeID = server.hasHeader("Node") ? server.header("Node") : "not correct";
  if (requestNodeID != NODE_ID) {
    stringPrint(requestNodeID, "Node_ID: ");
    respondError(400, "The node_id provided is incorrect!");
    return;
  }

  boolean fingerprintReceived = getFingerTemplate(userNumber);

  if (!fingerprintReceived) {
    finger.deleteModel(userNumber);
    respondError(400, "Fingerprint saving failed!");
  }

  serializeJsonPretty(responseJSON, Serial);
  serializeJson(responseJSON, response);
  server.send(200, "application/json", response);
  response = "";
}

void checkFingerPrint() {
  responseJSON.clear();
  payload.clear();

  finger.getTemplateCount();
  Serial.println(finger.templateCount);
//  if (finger.templateCount == 0) {
//    respondError(400, "No fingerprint stored on this node!");
//    return;
//  }

  if (server.method() != HTTP_POST) {
    respondError(405, "Method not allowed!");
    return;
  }

  if (!server.hasHeader("Authorization")) {
    respondError(400, "No token provided!");
    return;
  }

  deserializeJson(payload, server.arg("plain"));
  int userNumber = payload["user"];
  if (!userNumber) {
    respondError(400, "User number not provided");
    return;
  }

  const String requestNodeID = server.hasHeader("Node") ? server.header("Node") : "not correct";
  if (requestNodeID != NODE_ID) {
    stringPrint(requestNodeID, "Node_ID: ");
    respondError(400, "The node_id provided is incorrect!");
    return;
  }

  int fingerprintReceived = checkFingerTemplate(userNumber);

  if (fingerprintReceived == -100) {
    respondError(400, "Checking fingerprint failed!");
  }

  if (fingerprintReceived == -1) {
    respondError(401, "Fingerprint did not matched with your account, try again!");
  }

  serializeJsonPretty(responseJSON, Serial);
  serializeJson(responseJSON, response);
  server.send(200, "application/json", response);
  response = "";
}


void handleNotFound() {
  respondError(404, "Endpoint not found!");
  digitalWrite(led, HIGH);
  delay(1000);
  digitalWrite(led, LOW);
  delay(1000);
}

void setup(void) {
  pinMode(led, OUTPUT);
  digitalWrite(led, 0);
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.println("");

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  // finger begin
  finger.begin(57600);

  if (finger.verifyPassword()) {
    Serial.println("Found fingerprint sensor!");
  } else {
    Serial.println("Fingerprint sensor not found!");
  }

  if (MDNS.begin("esp8266")) {
    Serial.println("MDNS responder started");
  }
  server.on("/fingerprint/check", checkFingerPrint);
  server.on("/fingerprint/save", getFingerPrint);

  server.onNotFound(handleNotFound);

  const char * headerkeys[] = {"Node", "Authorization"};
  size_t headerkeyssize = sizeof(headerkeys) / sizeof(char*);
  server.collectHeaders(headerkeys, headerkeyssize);

  server.begin();
  Serial.println("HTTP server started");
}

void loop(void) {
  server.handleClient();
}
