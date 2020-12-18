# Promotions System

## Installation

This project requires Node. I developed it in v12.16.3 and npm v16.4.4.

* Clone the repository

### Client

1. Goto the server folder: `AmazingCo\src\client`
2. Run `npm install`
3. Run `npm run build` (only necessary for production build)
4. Run `npm run start` for production, or `npm run dev` for development.

### Server

1. Goto the server folder: `AmazingCo\src\server`
2. Run `npm install`
3. Run the following from the terminal `npm run dev`

_note_ the "production" build is not at all optimized for production in it's current form. I just believe it's important to have the foundation there when building something that is supposed to mimic a real-world solution. In practice the production assets should be minified, the server shouldn't expose X-Powered-By, stack traces for errors, and so on. 

CORS has been disabled on the api to allow for localhost access accross ports.

## Architecture

The App has been implemented using a client server architecture. React and Redux to contain the Front-end, node and express to act as the backend service the API endpoints.

The API can be found at the following address:
`http://localhost:8080/`

Hosting Promotions and Events on the following endpoints:
`/data/promotions`
`/data/events`

## Components

### React/es6 frontend

### Build toolchain

#### Dependencies

- `@babel/core`
- `@babel/preset-env`
- `@babel/preset-react`
- `autoprefixer`
- `babel-loader`
- `core-js`
- `css-loader`
- `html-webpack-plugin`
- `postcss-loader`
- `style-loader`
- `webpack`
- `webpack-cli`
- `webpack-dev-middleware`

## Data and API notes

_These are some notes I made to myself as I explored the problem space_

This API exposes 2 data sets to the client for consumption:
* Promotions - modeled as a set of JSON objects.
* Events - modeled as a set of JSON objects.

The configuration for the 2 datasets are kept in `config/development.js` or `config/production.js` depeneding on the environment being used.
-  `eventsFile: 'src/server/store/events.json'`,
- `promotionsFile: 'src/server/store/promotions.json'`

The Promotions and Events could be stored in a SQL or NoSQL store or accessed via an API. For the purposes of the code challenge they are stored in files.

The promotions have the following types:
1. amount - the marketing department can discount by a dollar value
2. percentage - the marketing department can discount by a percentage value 
3. event - the marketing department can discount by an event value 

The values for the check box items will represent the items in the items in the shopping cart.

### Shopping Cart implementation.
`{wineTour:4,picnic:1}`- the key for the object will represent the purchased event and the value the number of events purchased.

### Other Notes
* Given enough time I would ahve written units to validate the code written.
* Given enough time A form would have been created to update the promotions.
### Promotions 
```
localhost:8080/data/promotions
{
    "any": {
        "description": "Buy 5, Get 20% off the 5th experience",
        "type": "percentage",
        "value": "0.2"
    },
    "teamBuildings": {
        "description": "Buy 2 for $1500",
        "type": "amount",
        "value": "100"
    },
    "wineToursAndPicnics": {
        "description": "Buy 4, ONLY Pay for 3",
        "type": "event",
        "value": "1",
        "threshold": "cheapest"
    },
    "picnics": {
        "description": "Buy 2, get 1 free",
        "type": "amount",
        "value": "110"
    }
}
```
### Events
```
localhost:8080/data/events
{
    "kidsParty": {
        "cost": "220",
        "currency": "AUD",
        "symbol": "$"
    },
    "wineTour": {
        "cost": "440",
        "currency": "AUD",
        "symbol": "$"
    },
    "teamBuilding": {
        "cost": "800",
        "currency": "AUD",
        "symbol": "$"
    },
    "picnic": {
        "cost": "110",
        "currency": "AUD",
        "symbol": "$"
    }
}
```