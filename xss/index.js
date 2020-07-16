const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    return res.send('Hello World Home!');
});

app.get('/*', (req, res) => {
    const path = decodeURIComponent(req.path);
    return res.send(`Sorry, path ${path} not found. Please refer back to "/"`);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))