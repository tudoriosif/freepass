#include "WiFi.h"
#include "esp_camera.h"
#include <Wire.h>
#include "soc/soc.h"
#include "soc/rtc_cntl_reg.h"
#include <WebSocketsServer.h>

// Pin definition for CAMERA_MODEL_AI_THINKER
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27

#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22



// Replace with your network credentials
const char* hostname = "ESP32CAM";
const char* ssid = "";
const char* password = "";

IPAddress local_ip(192, 168, 100, 20);
IPAddress gateway(192, 168, 100, 1);
IPAddress subnet(255, 255, 255, 0);
IPAddress primaryDNS(192, 168, 100, 1);


WebSocketsServer webSocket = WebSocketsServer(80);
WebSocketsServer webSocketPIR = WebSocketsServer(81);

bool client_connected = false;
uint8_t client_num;

bool client_connectedPIR = false;
uint8_t client_numPIR;

bool motionDetected = false;

void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {

  switch(type) {
    case WStype_DISCONNECTED:
      Serial.printf("[WSc] Disconnected!\n");
      if(num == client_num) {
        client_connected = false;
      }
      break;
    case WStype_CONNECTED:
      Serial.printf("[WSc] Connected to url: %s\n", payload);
      Serial.print("Num");
      Serial.println(num);
      client_num = num;
      client_connected = true;
      Serial.print("Client connected");
      Serial.println(client_connected);
      break;
    case WStype_TEXT:
      Serial.printf("[WSc] get text: %s\n", payload);
      break;
    case WStype_BIN:
      Serial.printf("[WSc] get binary length: %u\n", length);
      break;
    case WStype_PING:
        // pong will be send automatically
        Serial.printf("[WSc] get ping\n");
        break;
    case WStype_PONG:
        // answer to a ping we send
        Serial.printf("[WSc] get pong\n");
        break;
    }

}

void webSocketEvent2(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {

  switch(type) {
    case WStype_DISCONNECTED:
      Serial.printf("[WSc2] Disconnected!\n");
      if(client_numPIR == client_connectedPIR) {
        client_connectedPIR = false;
      }
      break;
    case WStype_CONNECTED:
      Serial.printf("[WSc2] Connected to url: %s\n", payload);
      Serial.print("Num2");
      Serial.println(num);
      client_numPIR = num;
      client_connectedPIR = true;
      Serial.print("Client connected2");
      Serial.println(client_connectedPIR);
      break;
    case WStype_TEXT:
      Serial.printf("[WSc2] get text: %s\n", payload);
      break;
    case WStype_BIN:
      Serial.printf("[WSc2] get binary length: %u\n", length);
      break;
    case WStype_PING:
        // pong will be send automatically
        Serial.printf("[WSc2] get ping\n");
        break;
    case WStype_PONG:
        // answer to a ping we send
        Serial.printf("[WSc2] get pong\n");
        break;
    }

}

static void IRAM_ATTR detectsMovement(void * arg){
  Serial.println("MOTION DETECTED!!!");
  motionDetected = true;
}

void setupCamera()
{

    camera_config_t config;
    config.ledc_channel = LEDC_CHANNEL_0;
    config.ledc_timer = LEDC_TIMER_0;
    config.pin_d0 = Y2_GPIO_NUM;
    config.pin_d1 = Y3_GPIO_NUM;
    config.pin_d2 = Y4_GPIO_NUM;
    config.pin_d3 = Y5_GPIO_NUM;
    config.pin_d4 = Y6_GPIO_NUM;
    config.pin_d5 = Y7_GPIO_NUM;
    config.pin_d6 = Y8_GPIO_NUM;
    config.pin_d7 = Y9_GPIO_NUM;
    config.pin_xclk = XCLK_GPIO_NUM;
    config.pin_pclk = PCLK_GPIO_NUM;
    config.pin_vsync = VSYNC_GPIO_NUM;
    config.pin_href = HREF_GPIO_NUM;
    config.pin_sscb_sda = SIOD_GPIO_NUM;
    config.pin_sscb_scl = SIOC_GPIO_NUM;
    config.pin_pwdn = PWDN_GPIO_NUM;
    config.pin_reset = RESET_GPIO_NUM;
    config.xclk_freq_hz = 10000000;
    config.pixel_format = PIXFORMAT_JPEG;
    
    config.frame_size = FRAMESIZE_SVGA; // FRAMESIZE_ + QVGA|CIF|VGA|SVGA|XGA|SXGA|UXGA
    config.jpeg_quality = 10;
    config.fb_count = 2;
  
    // Init Camera
    esp_err_t err = esp_camera_init(&config);
    if (err != ESP_OK) {
      Serial.printf("Camera init failed with error 0x%x", err);
      return;
    }

    err = gpio_isr_handler_add(GPIO_NUM_13, &detectsMovement, (void *) 13);
    if (err != ESP_OK){
      Serial.printf("handler add failed with error 0x%x \r\n", err); 
    }
    err = gpio_set_intr_type(GPIO_NUM_13, GPIO_INTR_POSEDGE);
    if (err != ESP_OK){
      Serial.printf("set intr type failed with error 0x%x \r\n", err);
    }
  
  
}

void setup(){
  Serial.begin(115200);


  // Connect to Wi-Fi
  WiFi.config(local_ip, gateway, subnet, primaryDNS);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }

  // Print ESP32 Local IP Address
  Serial.println(WiFi.localIP());

  setupCamera();
   
  webSocket.begin();
  webSocket.onEvent(webSocketEvent);

  webSocketPIR.begin();
  webSocketPIR.onEvent(webSocketEvent2);
 
}


unsigned long messageTimestamp = 0;
unsigned long pirTimestamp = 0;
void loop() {
    webSocket.loop();
    webSocketPIR.loop();
    uint64_t now = millis();
    
    if(now - pirTimestamp > 1000) {
      pirTimestamp = now;
      if(motionDetected){
        String trueString = "1";
        if(client_connectedPIR) {
          Serial.print("True string");
          Serial.println(trueString);
          webSocketPIR.sendTXT(client_numPIR, trueString.c_str(), trueString.length());
        }
        motionDetected = false;
      } else {
        String falseString = "0";
        if(client_connectedPIR) {
          Serial.print("False string");
          Serial.println(falseString);
          webSocketPIR.sendTXT(client_numPIR, falseString.c_str(), falseString.length());
        }
      }
    }


    if(now - messageTimestamp > 10) {
        messageTimestamp = now;

        camera_fb_t * fb = NULL;

        // Take Picture with Camera
        fb = esp_camera_fb_get();  
        if(!fb) {
          Serial.println("Camera capture failed");
          return;
        }

        if(client_connected) {
          webSocket.sendBIN(client_num, fb->buf,fb->len);
        }
        esp_camera_fb_return(fb); 
    }
}
