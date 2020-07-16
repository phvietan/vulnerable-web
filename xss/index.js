const express = require('express');
const app = express();
const uuid = require('uuid').v4;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fs = require('fs');

app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'none'; object-src 'none';");
    return next();
});

// Cookies 
const secretSession = uuid() + uuid() + uuid();
app.use(cookieParser());
app.use(session({
  secret: secretSession,
  resave: true,
  saveUninitialized: true,
  name: 'id',
}));


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
    const referer = req.header('Referer');
    const referer_dec = decodeURIComponent(referer);

    console.log(referer_dec);

    return res.render("index.html", {
        referer: referer_dec,
        id: req.session.id,
    });
});

app.get('/*', (req, res) => {
    const path = decodeURIComponent(req.path);
    return res.send(`Sorry, path ${path} not found. Please refer back to <a href="/">/</a>`);
});

const port = 3000;

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))