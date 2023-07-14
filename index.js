require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const admin = require('./Routes/adminRoute');
const leadUser = require('./Routes/leadUserRoute');
const student = require('./Routes/studentRoute');
const appUser = require('./Routes/appUserRoute');
const website = require('./Routes/bookSloteWebsiteRoute');
const db = require('./Models');

db.sequelize.sync()
    .then(() => {
        // console.log('Database is synced');
    })
    .catch((err) => {
        // console.log(err);
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/user', leadUser);
app.use('/api/admin', admin);
app.use('/api/student', student);
app.use('/api/appUser', appUser);
app.use('/api/website', website);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send('Hello Cors World!');
});

PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});