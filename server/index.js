const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const { getAll, insertNew } = require('./database.js');

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

/* TODO: add CREATE route */
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
/* TODO: add PUT route */
/* TODO: add DELETE route */

app.use('/*', express.static(path.join(path.dirname(__dirname), 'public')));

app.listen(3003, () => console.log('Listening on port 3003'));
