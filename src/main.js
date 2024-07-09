const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cors = require('cors');
const seedDbPok = require('./DB/seedPokemon');
const seedDbUser = require('./DB/seedUser');
// const handle404 = require('./src/middlewares/handle404');
const setupRoutes = require('./routes/router');

const app = express();
const port = process.env.PORT || 3000;

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json())
    .use(cors())

if (process.env.NODE_ENV === 'production') {
    seedDbPok().then(() => {
        console.log('Pokemon database seeding completed.');
    }).catch((error) => {
        console.error('Error seeding Pokemon database:', error);
    });

    seedDbUser().then(() => {
        console.log('User database seeding completed.');
    }).catch((error) => {
        console.error('Error seeding User database:', error);
    });
}
//Production get

app.get('/', (req, res) => {
    res.json('Hello Heroku Server!');
})

//Router
setupRoutes(app);
// app.use(({res}) => )

//404 middleware
app.use(({res}) => {
    const message = "Impossible to find this Page. Try another URL";
    res.status(404).json({message});
});

app.listen(port, () => {
    console.log(`Notre application Node est démarée sur : http://localhost:${port}`);
});

