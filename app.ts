const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')//Parse données from json to apiRest
const app = express();
const port = 3000;
import setupRoutes from './src/routes/router';
// import handle404 from './src/middlewares/handle404'

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

//Router
setupRoutes(app);

//404
// handle404(app);

app.listen(port, () => console.log(`Notre application Node est démarée sur : http://localhost:${port}`))

