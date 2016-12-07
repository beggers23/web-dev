const express = require('express');
const morgan = require('morgan');
// const path = require('path');
const port = 3000;

const app = express();

// app.set('views', path.join(__dirname, 'client/views'));
app.use(express.static('client/'));

app.get('/', function(req, res){
  res.sendFile('/Users/deveggers/wdi/wdiroundtwo/web-dev/u2/hw-moviehaus/client/views/index.html');
});

app.listen(port, function(){
  console.log('loaded on port... '+port)
});
