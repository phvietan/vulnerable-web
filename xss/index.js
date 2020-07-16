const express = require('express');
const app = express();
const uuid = require('uuid').v4;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fs = require('fs');

app.use(cookieParser());

// app.use(function(req, res, next) {
//     res.setHeader("Content-Security-Policy", "script-src 'none'; object-src 'none';");
//     return next();
// });

// Template
app.engine('html', function (filePath, options, callback) { // define the template engine
    fs.readFile(filePath, function (err, content) {
        if (err) return callback(err)

        var rendered = content.toString()
            .replace(/{{id}}/g, options.id)
            .replace(/{{referer}}/g, options.referer)

        return callback(null, rendered)
    });
});

app.set('views', './views') // specify the views directory
app.set('view engine', 'html') // register the template engine

app.get('/', (req, res) => {
    let cookie = req.cookies.id;
    if (!req.cookies.id) {
        cookie = uuid()
        res.cookie('id', cookie);
    }

    const referer = req.header('Referer');
    const referer_dec = decodeURIComponent(referer);

    return res.render("index.html", {
        referer: referer_dec,
        id: cookie,
    });
});

app.get('/*', (req, res) => {
    let cookie = req.cookies.id;
    if (!req.cookies.id) {
        cookie = uuid()
        res.cookie('id', cookie);
    }
    
    const path = decodeURIComponent(req.path);
    return res.send(`Sorry, path ${path} not found. Please refer back to <a href="/">/</a>`);
});

const port = 3000;

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))