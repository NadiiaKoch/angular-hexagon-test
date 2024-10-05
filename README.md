# Angular Hexagon Test

- [DEMOLINK](https://nadiiakoch.github.io/angular-hexagon-test/)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.0.

## Technologies

- Angular
- leaflet

## Running the project

To run the project, execute the following commands:
⚠️ Node.js version v18.17.1 .

1. Clone the repository to your local machine, open terminal and clone repo with command bellow.

```
$ git clone https://github.com/NadiiaKoch/angular-hexagon-test.git
```

2. Open project in terminal.
   Set up project and install necessary packages:

```
$ cd angular-hexagon-test
```

3. Set up project and install necessary packages:

```
$ npm install
```

4. Add command to terminal:

```
$ npm start
```

5. Open application in your browser http://localhost:4200/

## Task

Create a hexagons view for data that in data.json.

data.json contains coordinates and color in which hexagon should be colored.

Coordinates in EPSG:3857 system and should be converted to EPSG:4326 system.

- Map: openstreetmap, google map or etc. (doesn't matter which one)
- Hexagon size should change depending on zoom level, lower zoom bigger hexagon
- For hexagon color use property COLOR_HEX from data.json
- Hexagons should be shown only for screen area
- Results of development please send as git repo link with instraction how to start it
