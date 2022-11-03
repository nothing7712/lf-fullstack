# lf-fullstack

A small exercise.

## Usage

To start the app (api + ui) with:

```sh
docker-compose up
```

Then go to http://127.0.0.1:3000 to use the app.

To stop the app:

Ctrl-c or

```sh
docker-compose down
```

To remove all images, containers, or networks created run:

```
docker-compose down --rmi all
```

## ui

A React application which serves the user interface.

Start it with:

```sh
npm run start
```

## api

A NodeJS Express server which provides the backend api the frontend will interface with.

Start it with:

```sh
npm run start
```
