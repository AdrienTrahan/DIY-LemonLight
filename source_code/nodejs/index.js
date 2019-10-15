const path = require('path');
const https = require('https');
const express = require('express');
const app = express();
app.use(express.static('public'));
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const server = app.listen(3000);
const io = require('socket.io')(server);
console.log("listening on port 3000");
var maxhue = 179;
var minhue = 0;
var maxsat = 255;
var minsat = 0;
var maxval = 255;
var minval = 0;
var width2 = 0;
var height2 = 0;
var x = 0;
var y = 0;

io.on('connection', function(client) {
    client.on('changePipeline', function(data) {
        const Http = new XMLHttpRequest();
        const url= 'http://localhost:8000/changePipeline?pipeline=' + data;
        Http.open("GET", url);
        Http.send();
    });
});

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'index.html'));
})
app.get('/getRectangle', (req, res) =>{
    res.send(`{x: ${x},y: ${x},w: ${width2},h: ${height2}}`);
});
app.get('/sendHue', (req, res) =>{
    const Http = new XMLHttpRequest();
    const url= 'http://localhost:8000/sendHue?max=' + req.query.max + '&min=' + req.query.min;
    Http.open("GET", url);
    Http.send();
    res.send("good");
});
app.get('/addPipeline', (req, res) =>{
    const Http = new XMLHttpRequest();
    const url= 'http://localhost:8000/addPipeline?';
    Http.open("GET", url);
    Http.send();
    res.send("good");
});
app.get('/removePipeline', (req, res) =>{
    const Http = new XMLHttpRequest();
    const url= 'http://localhost:8000/removePipeline?';
    Http.open("GET", url);
    Http.send();
    res.send("good");
});
app.get('/retrievePipelines', (req, res) =>{
    const Http = new XMLHttpRequest();
    const url= 'http://localhost:8000/retrievePipelines?';
    Http.onreadystatechange = function() {
        if (Http.readyState == 4 && Http.status == 200){
          res.send(Http.responseText);
        }
    }
    Http.open("GET", url);
    Http.send();
});
app.get('/sendSaturation', (req, res) =>{
    const Http = new XMLHttpRequest();
    const url= 'http://localhost:8000/sendSaturation?max=' + req.query.max + '&min=' + req.query.min;
    Http.open("GET", url);
    Http.send();
    res.send("good");
});
app.get('/sendValue', (req, res) =>{
    const Http = new XMLHttpRequest();
    const url= 'http://localhost:8000/sendValue?max=' + req.query.max + '&min=' + req.query.min;
    Http.open("GET", url);
    Http.send();
    res.send("good");
});
app.get('/changeType', (req, res) =>{
    const Http = new XMLHttpRequest();
    const url= 'http://localhost:8000/changeType?type=' + req.query.type;
    Http.open("GET", url);
    Http.send();
    res.send("good");
});
app.get('/changePipeline', (req, res) =>{
    const Http = new XMLHttpRequest();
    const url= 'http://localhost:8000/changePipeline?pipeline=' + req.query.pipeline;
    console.log(req.query.pipeline);
    Http.open("GET", url);
    Http.send();
    res.send("good");
});
setInterval(() => {
    const Http = new XMLHttpRequest();
    const url= 'http://localhost:8000/image';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange = function(){
        if (this.readyState === 4) {
            if (/^[\],:{}\s]*$/.test(this.responseText.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                if (!this.responseText.includes('<!DOCTYPE html>')){
                    io.emit('image', JSON.parse(this.responseText)['image']);
                    width2 = JSON.parse(this.responseText)['width'];
                    height2 = JSON.parse(this.responseText)['height'];
                    x = JSON.parse(this.responseText)['x'];
                    y = JSON.parse(this.responseText)['y'];
                    io.emit('height', JSON.parse(this.responseText)['height']);
                    io.emit('width', JSON.parse(this.responseText)['width']);
                    io.emit('x', JSON.parse(this.responseText)['x']);
                    io.emit('y', JSON.parse(this.responseText)['y']);
                }
            }
        }
    }

}, 100);
