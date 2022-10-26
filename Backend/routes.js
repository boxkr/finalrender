const express = require('express');
const { Pool, Client } = require('pg');
const fs = require('fs');
var router = express.Router();

const credentials = fs.readFileSync('./credentials.txt', 'utf8').split(/\r?\n/);

const client = new Client({
  user: credentials[0],
  host: 'csce-315-db.engr.tamu.edu',
  database: 'csce315_902_10',
  password: credentials[1],
  ssl: {
    rejectUnauthorized: false
  }
})
client.connect()



/* Inventory */
router.get('/Inventory', function(req, res, next) {
  res.send('respond with a resource');

  client.query('SELECT * FROM inventory', (error, results) => {
    if (error) { throw error; }
    console.log(results)
  });
});

router.post('/Inventory', function(req, res, next) {
  res.send('respond with a resource');
});

router.put('/Inventory', function(req, res, next) {
  res.send('respond with a resource');
});

router.delete('/Inventory/:id', function(req, res, next) {
  res.send(req.params.id);
});

/* OrderSizes */


/* OrderHistory */


/* Employees */


/* InventoryHistory */



module.exports = router;
