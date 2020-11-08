# Product Service

### To run Eslint:

#### `npm run lint`

### To run tests:

#### `npm test`

### To generate swagger.json file:

#### `npm run swagger`

### API:

##### [`https://uk14k9502c.execute-api.eu-west-1.amazonaws.com/dev/api/products`](https://uk14k9502c.execute-api.eu-west-1.amazonaws.com/dev/api/products)

##### `https://uk14k9502c.execute-api.eu-west-1.amazonaws.com/dev/api/products/{productId}`

##### (example: [`https://uk14k9502c.execute-api.eu-west-1.amazonaws.com/dev/api/products/7567ec4b-b10c-48c5-9345-fc73c48a80aa`](https://uk14k9502c.execute-api.eu-west-1.amazonaws.com/dev/api/products/7567ec4b-b10c-48c5-9345-fc73c48a80aa))

Note: To emulate an error you may want to pass non-existing productId into URL path parameter

##### (example: [`https://uk14k9502c.execute-api.eu-west-1.amazonaws.com/dev/api/products/123`](https://uk14k9502c.execute-api.eu-west-1.amazonaws.com/dev/api/products/123))

### Front-End:

[https://d19rakpwnlzw45.cloudfront.net/](https://d19rakpwnlzw45.cloudfront.net/)

open the `Chrome DevTools -> Network` and check the outgoing requests

### CORS:

Cross Origin Policy was set up, so there is only `d19rakpwnlzw45.cloudfront.net` who has permissions to communicate with the BE.

### Swagger:

As Lambda can't serve the Swagger UI (yet) there is an extra endpoint to get the `swagger.json` file:
[https://uk14k9502c.execute-api.eu-west-1.amazonaws.com/dev/documentation](https://uk14k9502c.execute-api.eu-west-1.amazonaws.com/dev/documentation)

You can either check the raw content or use the `https://editor.swagger.io/` UI.

### Package.json:

Please note that the scripts with concurrent mode (which use `&&`) were not aligned with the Windows OS, so it may fail or work incorrectly on your local machine. There are bunch of `npm` packages to resolve the platform/os issues but seems like I'm too lazy to spend time on it :) If you want to execute those commands on your local Windows machine, you should run the `npm run swagger` command, it should fix an issue.
