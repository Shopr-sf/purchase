const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const {
  getAll,
  insertNew,
  updateOne,
  removeOne,
} = require('./database.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('*/bundle.js', (req, res) => {
  res.sendFile(path.join(path.dirname(__dirname), 'public/bundle.js'));
});


app.get('/products/:id', (req, res) => {
  if (parseInt(req.params.id, 10)) {
    getAll(req.params.id, results => res.send(results));
  } else {
    res.end();
  }
});

app.post('/api/create', (req, res) => {
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

app.listen(3003, () => console.log('Listening on port 3003'));
