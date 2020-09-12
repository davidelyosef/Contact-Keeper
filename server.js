const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('config');
const expressValidator = require('express-validator');

const app = express();

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));