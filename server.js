// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require('express');
const app = express();

//load the quotes JSON
const quotes = require('./quotes.json');

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get('/', function (request, response) {
  response.send(
    "Neill's Quote Server!  Ask me for go /quotes/random, or /quotes"
  );
});

//START OF YOUR CODE...
app.get('/quotes', function (request, response) {
  response.status(200).json(quotes);
});
app.get('/quotes/random', function (request, response) {
  response.status(200).json(pickFromArray(quotes));
});

app.get('/quotes/search', function (request, response) {
  let searchWord = request.query.term;
  if (searchWord) {
    response
      .status(200)
      .json(
        quotes.filter(
          (quote) =>
            quote.quote.toUpperCase().includes(searchWord.toUpperCase()) ||
            quote.author.toUpperCase().includes(searchWord.toUpperCase())
        )
      );
  }
});

app.put('/quotes/:quoteId', function (request, response) {
  const { quoteId } = request.params;
  const index = quotes.findIndex((quote) => quote.id == quoteId);
  if (index >= 0) {
    quotes[index] = {
      id: quotes[index].id,
      quote: 'Quote replaced',
      author: "Somebody's son",
    };
    response.status(200).json(quotes);
  } else {
    response.status(400).json(`No quote with id of ${quoteId}`);
  }
});
//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
