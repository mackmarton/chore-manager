const express = require('express');
const app = express();

app.use(express.static('static'));

// Load routing
require('./routes/index')(app);

app.listen(3000, function () {
    console.log('Listening on :3000');
});