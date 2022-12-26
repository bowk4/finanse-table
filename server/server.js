'use strict';
const express = require('express');
const http = require('http');
const io = require('socket.io');
const cors = require('cors');


let OLD_VALUES = [
  {
    "ticker": "AAPL",
    "exchange": "NASDAQ",
    "price": 0,
    "change": 0,
    "change_percent": 0,
    "dividend": 0,
    "yield": 0,
    "last_trade_time": "2021-04-30T11:53:21.000Z"
  },
  { "ticker": "GOOGL", "exchange": "NASDAQ", "price": 0, "change": 0, "change_percent": 0, "dividend": 0, "yield": 0, "last_trade_time": "2021-04-30T11:53:21.000Z" },
  { "ticker": "MSFT", "exchange": "NASDAQ", "price": 0, "change": 0, "change_percent": 0, "dividend": 0, "yield": 0, "last_trade_time": "2021-04-30T11:53:21.000Z" },
  { "ticker": "AMZN", "exchange": "NASDAQ", "price": 0, "change": 0, "change_percent": 0, "dividend": 0, "yield": 0, "last_trade_time": "2021-04-30T11:53:21.000Z" },
  { "ticker": "FB", "exchange": "NASDAQ", "price": 0, "change": 0, "change_percent": 0, "dividend": 0, "yield": 0, "last_trade_time": "2021-04-30T11:53:21.000Z" },
  { "ticker": "TSLA", "exchange": "NASDAQ", "price": 0, "change": 0, "change_percent": 0, "dividend": 0, "yield": 0, "last_trade_time": "2021-04-30T11:53:21.000Z" }
];


const PORT = process.env.PORT || 4000;
let timer;
const tickers = [
  'AAPL',
  'GOOGL',
  'MSFT',
  'AMZN',
  'FB',
  'TSLA',
];


function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}


function utcDate() {
  const now = new Date();
  return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
}


function getQuotes(socket) {
  const quotes = tickers.map((ticker, index) => {
    const price = randomValue(100, 300, 2);
    const change = (price - OLD_VALUES[index].price).toFixed(2);
    return ({
      ticker,
      exchange: 'NASDAQ',
      price,
      change,
      change_percent: (OLD_VALUES[index].price) ? ((change / OLD_VALUES[index].price) * 100).toFixed(2) : 100,
      dividend: randomValue(0, 1, 2),
      yield: randomValue(0, 2, 2),
      last_trade_time: utcDate(),
    })
  });

  OLD_VALUES = quotes;

  socket.emit('ticker', quotes);
}


function trackTickers(socket, interval) {
  timer = setInterval(() => {
    getQuotes(socket);
  }, interval * 1000);
}


const app = express();
app.use(cors());
const server = http.createServer(app);


const socketServer = io(server, {
  cors: {
    origin: "*",
  }
});


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


socketServer.on('connection', (socket) => {
  socket.on('start', (interval) => {
    // run the first time immediately
    getQuotes(socket);
    trackTickers(socket, interval);
  });
  socket.on('setNewInterval', (newInterval) => {
    clearInterval(timer);
    trackTickers(socket, newInterval);
  });

  socket.on('disconnect', function () {
    clearInterval(timer);
  });
});


server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});