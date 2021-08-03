const path = require('path');
const express = require('express');
const app = express();


//here we are configuring dist to serve app files
app.use(express.static(__dirname +  '/dist'))

// this * route is to serve project on different page routes except root `/`
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/planeamiento-web/index.html'));
  });

const port = process.env.PORT || 8080
app.listen(port)
console.log(`app is listening on port: ${port}`)