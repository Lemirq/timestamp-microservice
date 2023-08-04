const express = require('express')
const app = express()
const port = 3000
const path = require('path');
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200})); 

// Render Html File
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'templates/index.html'));
});

app.listen(port);

app.get('/api/:id', (req, res) => {
	// the id can be either in 2015-12-25 format or 1451001600000 format
	// i need to return an object with the date in Fri, 25 Dec 2015 00:00:00 GMT and unix format

	// get the id from the url
	let id = req.params.id;

	// check if the id is in 2015-12-25 format
	if (id.match(/\d{4}-\d{2}-\d{2}/)) {
		// if it is, convert it to 1451001600000 format
		id = new Date(id).getTime();
	}

	// convert the id to a date
	let date = new Date(parseInt(id));

	// check if the date is valid
	if (date == 'Invalid Date') {
		// if it is not, return an error
		res.json({ error: 'Invalid Date' });
	}

	// return the date in the required format
	res.json({
		unix: date.getTime(),
		utc: date.toUTCString(),
	});
});
