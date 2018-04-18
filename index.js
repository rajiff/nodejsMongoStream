const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const logger = require('./logger');
const mongoConnection = require('./mongoConnection');
const productDAO = require('./products.DAO');

let app = express();

// Configure morgan to log your requests, with a standard date & time format
morgan.token('time', (req, res) => new Date().toISOString());
app.use(morgan('[:time] :remote-addr :method :url :status :res[content-length] :response-time ms'));

// Setup bodyParsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoConnection();

app.get('/records', (req, res) => {
	productDAO.fetchProducts((err, result) => {
		if(err) {
			logger.debug('Error ', err);
			return res.send({error: 'Something is wrong, please try later..!'})
		} else {
			return res.send(result);
		}
	})
});

app.get('/stream/records', (req, res) => {
	productDAO.fetchProductsAsStream(res);
});

const _port = (process.env.PORT || 3000);

app.listen(_port, () => {
  console.log('App is listening to request on port:', _port);
});
