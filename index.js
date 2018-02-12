const express = require('express');
const app = express();
var fallback = require('express-history-api-fallback');
const PORT = process.env.PORT || 4003;

var root = __dirname + '/dist'
app.use('/dist',express.static('dist'))

app.use(fallback('index.html', { root: root }))

app.listen(PORT, () => {
    console.log("Listening to ",PORT);
    
});

