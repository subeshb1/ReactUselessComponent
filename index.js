const express = require('express');
const app = express();

const PORT = process.env.PORT || 4001;

app.use(express.static('dist'));


app.listen(PORT, () => {
    console.log("Listening to ",PORT);
    
});