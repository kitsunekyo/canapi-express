import Adafruit_DHT
import RPi.GPIO as GPIO
import getopt, sys
import requests
import json

GPIO.setwarnings(False)

dht_pin = 4

def get_DHT():
    dht_sensor = Adafruit_DHT.DHT11
    obj = dict()
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(17, GPIO.IN)
    soil_raw_data = GPIO.input(17)
    soil_status = '?'
    if soil_raw_data == 1:
        soil_status = 'dry'
    else:
        soil_status = 'wet'
    humidity, temperature = Adafruit_DHT.read_retry(dht_sensor, dht_pin)
    if humidity is not None and temperature is not None:
        obj['air_humidity'] = humidity
        obj['air_temperature'] = temperature
        obj['soil_raw_data'] = soil_raw_data
        obj['soil_status'] = soil_status
        return(obj)
    else:
        return([])


if __name__ == '__main__':
    res = get_DHT()
    response = requests.post('http://localhost:8080/api/probes', data=res)
