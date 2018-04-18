const ProductModel = require('./products.entity');
const JSONStream = require('JSONStream');

const fetchProducts = function(done) {
  let query = {};
  let fieldOptions = null;
  let page = 1;
  let limit = 10000;

  ProductModel
    .find(query)
    .sort({ "addedOn": -1 })
    .select(fieldOptions)
    .skip((page > 0) ? limit * (page - 1) : 0)
    .limit(limit)
    .exec((err, colln) => {
      if (err) {
        console.error('Error in finding products, ERROR::', err, ' queries for ', query);
        done(err);
        return;
      }
      done(null, colln);
    });
}

const fetchProductsAsStream = function(outStream) {
  let query = {};
  let fieldOptions = null;
  let page = 1;
  let limit = 10000;

  ProductModel
    .find(query)
    .sort({ "addedOn": -1 })
    .select(fieldOptions)
    .skip((page > 0) ? limit * (page - 1) : 0)
    .limit(limit)
    .lean()
    .cursor()
    .pipe(JSONStream.stringify())
    .pipe(outStream.type('json'))
}

module.exports = {
  fetchProducts,
  fetchProductsAsStream
}