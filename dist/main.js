const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cors = require('cors');
// const handle404 = require('./src/middlewares/handle404');
const setupRoutes = require('./routes/router').default;
const app = express();
const port = process.env.PORT || 3000;
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json())
    .use(cors());
//Production get
app.get('/', (req, res) => {
    res.json('Hello Heroku Server!');
});
//Router
setupRoutes(app);
// app.use(({res}) => )
//404
app.use(({ res }) => {
    const message = "Impossible to find this Page. Try another URL";
    res.status(404).json({ message });
});
app.listen(port, () => console.log(`Notre application Node est démarée sur : http://localhost:${port}`));
