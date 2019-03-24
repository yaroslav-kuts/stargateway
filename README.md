# stargateway
Dev Challenge 2019 Online Round

To run server:
1) Execute: ```docker-compose up```
2) Load spaceships: ```docker exec -d stargateway npm run seeds```

Server will be available on 80 port.

To run tests:
1) Execute: ```npm install```
2) Execute: ```npm test```

API description:

1) Show all spaceships:

**GET /spaceships**

2) Show individual spaceship and it's routes:

**GET /spaceships/\<spaceship-id\>**

3) Find routes for spaceship:

**POST /spaceships/\<spaceship-id\>/routes/\<sector\>**
