require('newrelic');
// const cluster = require('cluster');
// const osx = require('os');
const redis = require('redis');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const {
  getAll,
  insertNew,
  updateOne,
  removeOne,
} = require('./database/database.js');

const app = express();
const client = redis.createClient(6379, 'localhost');
client.on('connect', () => console.log('redis connected'));
client.on('error', () => console.log('redis error'));

app.use(cors());
app.use(bodyParser.json());

app.get('*/bundle.js', (req, res) => {
  res.sendFile(path.join(path.dirname(__dirname), 'public/bundle.js'));
});

app.get('/loaderio-aef3bfeeaa5d25c1ec7496722a301f68', (req, res) => res.send('loaderio-aef3bfeeaa5d25c1ec7496722a301f68'));

app.get('/api/:id', (req, res) => {
  const { params: { id } } = req;
  if (Number(id)) {
    client.get(id, (err, reply) => {
      if (err) console.log(`Redis get ${err}`);
      if (reply) {
        const body = JSON.parse(reply);
        res.send(body);
      } else {
        // const then = new Date();
        getAll(req.params.id, (result) => {
          // console.log(`Query time: ${new Date() - then}`);
          client.setex(id, 300, JSON.stringify(result));
          res.send(result);
        });
      }
    });
  } else {
    res.end();
  }
});

app.post('/api/:id', (req, res) => {
  console.log(req.body);
  insertNew(req.body, (err, results) => {
    if (err) {
      console.error(`Insertion error: ${err}`);
    } else {
      res.send(results);
    }
  });
});

app.put('/api/update', (req, res) => {
  updateOne(req.body, (err, results) => {
    if (err) {
      console.error(`Update error at server line 43: ${err}`);
    } else {
      res.send(results);
    }
  });
});

app.delete('/api/remove/:productId', (req, res) => {
  const { params: { productId } } = req;
  removeOne(productId, (err, results) => {
    if (err) {
      console.error(`Delete error at server line 55: ${err}`);
    } else {
      res.send(results);
    }
  });
});

app.use('/*', express.static(path.join(path.dirname(__dirname), 'public')));

const port = process.env.PORT || 3003;
app.listen(3003, () => console.log(`Listening on port ${port}`));
console.log(`Worker ${process.pid} created.`);
