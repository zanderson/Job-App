// Requires \\
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Create Express App Object \\
var app = express();

// Application Configuration \\
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

//Connect to DB
mongoose.connect('mongodb://localhost/zappos');

//SCHEMA
var Applicant = mongoose.model('Applicant', { 
	name: String,
	bio: String, 
	skills: String,
	years: Number,
	why: String
});

// Routes \\

app.get('/', function(req, res) {
	res.sendFile('html/index.html', {root : './public'});
});

// displays a list of applicants
app.get('/applicants', function(req, res){
	res.sendFile('html/applicants.html', {root : './public'});
});

app.get('/api/applicants', function(req, res){
	Applicant.find({}, function(err, docs){
		res.send(docs);
	});
});


// creates and applicant
app.post('/applicant', function(req, res){
	// console.log(req.body);
	var applicant = new Applicant({ 
		name: req.body.name,
		bio: req.body.bio,
		skills: req.body.skills,
		years: req.body.years,
		why: req.body.why
	});
	applicant.save();
	console.log(applicant);
	// Here is where you need to get the data
	// from the post body and store it in the database
	res.sendFile('html/success.html', {root : './public'});
});



// Creating Server and Listening for Connections \\
var port = 3000
app.listen(port, function(){
  console.log('Server running on port ' + port);

})










