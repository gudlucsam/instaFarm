

  //Including all the required libraries.
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h> //http library to enable http connection
#include <WiFiClient.h>

#include "DHT.h"

// Uncomment one of the lines below for whatever DHT sensor type you're using!
#define DHTTYPE DHT11   // DHT 11
//#define DHTTYPE DHT21   // DHT 21 (AM2301)
//#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321

const int analogInPin = A0;  // Analog input pin that the potentiometer is attached to
const int analogOutPin = 4; // Analog output pin that the LED is attached to

int sensorValue = 0;        // value read from the pot
int outputValue = 0;   

// WiFi network
const char* ssid     = "mustapha"; //Hotspot name
const char* password = "mymomisthebest"; //Hotspot password

// Set web servers at port number to 80
ESP8266WebServer server ( 80 );//This server name is for enabling using the html client app
WiFiServer server1(80); //This server name is for enabling using the http protocol

// DHT Sensor
const int DHTPin = 5;
// Initialize DHT sensor.
DHT dht(DHTPin, DHTTYPE);
#define watersensor D2

// Temporary variables
static char celsiusTemp[7];
static char fahrenheitTemp[7];
static char humidityTemp[7];
HTTPClient http;
   
void setup() {

  // Connecting to a WiFi network
  Serial.begin(115200);
  delay(10);

  dht.begin();
  
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password); // Requesting for internect connectivity

  while (WiFi.status() != WL_CONNECTED) { //Checking connecctivity
    delay(500); //waits for half a second before next request
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  
  server1.begin();
  }

float take_averaged_reading (double n)
{
  float sum = 0.0 ;
  for (byte i = 0 ; i < 10; i++)
    sum += n ;
  return sum / 10 ;
}

int counter = 0;
float sumT = 0;
float sumH = 0;
float sumW = 0;
float average= 0;
void loop() {
  delay(2000);
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  sensorValue = analogRead(analogInPin);
    // map it to the range of the analog out:
  outputValue = map(sensorValue, 0, 1023, 0, 255);
  analogWrite(analogOutPin, outputValue);
   if (isnan(h) || isnan(t)) {
      Serial.println(F("Failed to read from DHT sensor!"));
      return;
    }

  float AverageTemp = take_averaged_reading(t);
  float AvergeHum = take_averaged_reading(h);
  float AverageWater = take_averaged_reading(outputValue);

  counter = counter + 1;
  sumT =  sumT +  t;
  sumH =  sumH +  h;
  sumW =  sumW +  outputValue;
  
  if(counter%10 == 0){
      //link to be used to send the measured average temperature to the remote data base.
  String url = "http://instafarm.herokuapp.com/update?name=instafarm&humidity="+String(sumH/counter)+"&temperature="+\
  String(sumT/counter)+"&water_level="+String(sumW/counter);

  String payload = ""; //variable to store the response from the http request.
  Serial.println(url);
  http.begin(url); //sending the http request.


  //GET method
  int httpCode = http.GET(); //getting the response code
  if (httpCode > 0)
  {
    Serial.printf("[HTTP] GET...code: %d\n", httpCode);
    if (httpCode == HTTP_CODE_OK)
    {
      payload = http.getString(); // obtaing the string of the response from the database
      payload.trim(); // removing unwanted spaces from the string
    }
  }
  else
  {
    Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
  }
  http.end();//closing the client
  Serial.println("Results");
  Serial.println(payload);
    
  }
  

}
