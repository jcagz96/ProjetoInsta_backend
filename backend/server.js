const express = require('express');
const routes = require('./routes');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(3333, () => {
    console.log(`Server is running...`);
});