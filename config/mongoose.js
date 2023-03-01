const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authenticationDemo');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error Connecting to MongoDb :'));
db.once('open', function () { console.log('Connected to MongoDb Successfully') });

