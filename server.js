// require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const {Todo} = require('./models.js');
const {PORT, DATABASE_URL, CLIENT_ORIGIN} = require('./config');
mongoose.Promise = global.Promise;
app.use(bodyParser.json());

//CORS

app.use(cors({
    origin: CLIENT_ORIGIN
}))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.get('/', (req, res) =>{
	Todo
		.find()
		.exec()
		.then(todos => {
			res.status(200).json(todos)
		})
		.catch(
			err => {
				console.error(err);
				res.status(500).json({message: 'Internal Server Error'});
		});
});

//Note to self to Send request as TodoData on client side
app.post('/', function(req, res, next) {
    Todo
    .create({
        todo :[req.body.todo],
        completed : false,
        level : 'green',
        userName : [req.body.username]
        })
    .then((todo) => {
      Todo.find((todos) => {
        if(err) {
          res.send(err)
        }
        res.json(todos)
      })
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({message: err});
    });
});

// Completed or not completed todos - endpoints
app.put('/todo/:id/completed', function (req, res){
	Todo
		.findByIdAndUpdate(req.params.id, {completed: true})
		.then(todo => {
			res.status(200).json(todo)
		})
		.catch(
			err => {
				console.error(err);
				res.status(500).json({message: 'Internal Server Error'});
		});
});

app.put('/todo/:id/incomplete', function (req, res){
	Todo
		.findByIdAndUpdate(req.params.id, {completed: false})
		.then(todo => {
			res.status(200).json(todo)
		})
		.catch(
			err => {
				console.error(err);
				res.status(500).json({message: 'Internal Server Error'});
		});
});

// Levels of critical - endpoints
app.put('/todo/:id/green', function (req, res){
	Todo
		.findByIdAndUpdate(req.params.id, {level: 'green'})
		.then(todo => {
			res.status(200).json(todo)
		})
		.catch(
			err => {
				console.error(err);
				res.status(500).json({message: 'Internal Server Error'});
		});
});

app.put('/todo/:id/yellow', function (req, res){
	Todo
		.findByIdAndUpdate(req.params.id, {level: 'yellow'})
		.then(todo => {
			res.status(200).json(todo)
		})
		.catch(
			err => {
				console.error(err);
				res.status(500).json({message: 'Internal Server Error'});
		});
});

app.put('/todo/:id/red', function (req, res){
	Todo
		.findByIdAndUpdate(req.params.id, {level: 'red'})
		.then(todo => {
			res.status(200).json(todo)
		})
		.catch(
			err => {
				console.error(err);
				res.status(500).json({message: 'Internal Server Error'});
		});
});

//Server

let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT){
	return new Promise((resolve, reject) => {
    	mongoose.connect(databaseUrl, err => {
			if (err) {
				return reject(err);
			}
			server = app.listen(port, () => {
				console.log(`Your app is listening on port ${port}`);
				resolve();
	      	})
	      	.on('error', err => {
	        	mongoose.disconnect();
	        	reject(err);
      		});
    	});
  	});
}

function stopServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, stopServer};


// END OF PAGE