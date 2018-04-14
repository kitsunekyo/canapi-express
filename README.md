# cannapi-express
Hardware:
- Raspberry Pi 3
- SD Card
- 5V 3A Plug
- DHT11 Sensor
- Soil Moisture Sensor
- HDMI Cable
- Keyboard and Mouse

In order to speed up the development, we set our project up on both the Raspberry Pi and our development machine. They are mostly the same but we have to mock the functionality to acces GPIO ports on our dev machine, since this is Raspberry only.

Software:
- nginx
- MongoDB 4.x
- NodeJS LTS
- Python 2.4

Stack:
- Backend: NodeJS running ExpressJS, Mongoose
- Frontend: VueJS, Vuex and axios

Clone the project and run yarn install.

Start the express server with yarn start and watch changes on the frontend source with yarn watch-fe
