const express = require('express');
const app = express();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(express.static('./client/public'));

app.get('*', function(req, res){
	res.sendFile(__dirname + '/client/public/index.html');
});

app.listen(process.env.PORT || 3000);