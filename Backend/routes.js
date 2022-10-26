const express = require('express');
const { Pool, Client } = require('pg');
const fs = require('fs');
const { response } = require('./app');
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


function getUpdateQueryString (table_name, row_id, columns) {
  let query_string = 'UPDATE ' + table_name + ' SET ';
  let new_values = [];
  
  for (const [column_name, column_value] of Object.entries(columns)) {
    if (column_value) {
      new_values.push(column_value);
      query_string += column_name + '=$' + new_values.length + ', ';
    }
  }
  query_string = query_string.slice(0, -2) + ' WHERE ID=' + row_id

  console.log(query_string)
  return { query_string, new_values }
}


/* Inventory */
router.get('/Inventory', function(req, res, next) {
  client.query('SELECT * FROM Inventory', (error, results) => {
    if (error) { throw error; }
    response.sendStatus(200).json(results.rows);
  });
});

router.post('/Inventory', function(req, res, next) {
  const { Name, ItemType, Calories, Quantity, WholesaleCost, Minimum } = req.body;

  pool.query('INSERT INTO Inventory (Name, ItemType, Calories, Quantity, WholesaleCost, Minimum) VALUES ($1, $2, $3, $4, $5, $6)', [Name, ItemType, Calories, Quantity, WholesaleCost, Minimum], (error, results) => {
    if (error) { throw error; }
    response.status(201).send(`Row added with ID: ${results.rows[0].id}`)
  })
});

router.put('/Inventory', function(req, res, next) {
  const { ID, Name, ItemType, Calories, Quantity, WholesaleCost, Minimum } = req.body;
  const { query_string, new_values } = getUpdateQueryString('Inventory', ID , {"Name": Name, "ItemType": ItemType, "Calories": Calories, "Quantity": Quantity, "WholesaleCost": WholesaleCost, "Minimum": Minimum});
  pool.query(query_string, new_values, (error, results) => {
    if (error) { throw error; }
    response.status(200).send('Row Updated')
  })
});

router.get('/Inventory/:id', function(req, res, next) {
  client.query('SELECT * FROM Inventory WHERE id=$1', [req.params.id], (error, results) => {
    if (error) { throw error; }
    response.sendStatus(200).json(results.rows);
  });
});

router.delete('/Inventory/:id', function(req, res, next) {
  client.query('DELETE FROM Inventory WHERE id=$1', [req.params.id], (error, results) => {
    if (error) { throw error; }
  });
  res.sendStatus(200);
});



/* Sizes */
router.get('/Sizes', function(req, res, next) {
  client.query('SELECT * FROM Sizes', (error, results) => {
    if (error) { throw error; }
    response.sendStatus(200).json(results.rows);
  });
});

router.post('/Sizes', function(req, res, next) {
  const { Name, NumSides, NumEntrees, Price } = req.body;

  pool.query('INSERT INTO Sizes (Name, NumSides, NumEntrees, Price) VALUES ($1, $2, $3, $4)', [Name, NumSides, NumEntrees, Price], (error, results) => {
    if (error) { throw error; }
    response.status(201).send(`Row added with ID: ${results.rows[0].id}`)
  })
});

router.put('/Sizes', function(req, res, next) {
  const { ID, Name, NumSides, NumEntrees, Price } = req.body;
  const { query_string, new_values } = getUpdateQueryString('Sizes', ID , {"Name": Name, "NumSides": NumSides, "NumEntrees": NumEntrees, "Price": Price});
  pool.query(query_string, new_values, (error, results) => {
    if (error) { throw error; }
    response.status(200).send('Row Updated')
  })
});

router.get('/Sizes/:id', function(req, res, next) {
  client.query('SELECT * FROM Sizes WHERE id=$1', [req.params.id], (error, results) => {
    if (error) { throw error; }
    response.sendStatus(200).json(results.rows);
  });
});

router.delete('/Sizes/:id', function(req, res, next) {
  client.query('DELETE FROM Sizes WHERE id=$1', [req.params.id], (error, results) => {
    if (error) { throw error; }
  });
  res.sendStatus(200);
});




/* OrderHistory */
router.get('/OrderHistory', function(req, res, next) {
  client.query('SELECT * FROM OrderHistory', (error, results) => {
    if (error) { throw error; }
    response.sendStatus(200).json(results.rows);
  });
});

router.post('/OrderHistory', function(req, res, next) {
  const { Date, ServerName, CustomerName, TotalPrice, OrderDetails } = req.body;

  pool.query('INSERT INTO OrderHistory (Date, ServerName, CustomerName, TotalPrice, OrderDetails) VALUES ($1, $2, $3, $4, $5)', [Date, ServerName, CustomerName, TotalPrice, OrderDetails], (error, results) => {
    if (error) { throw error; }
    response.status(201).send(`Row added with ID: ${results.rows[0].id}`)
  })
});

router.put('/OrderHistory', function(req, res, next) {
  const { ID, Date, ServerName, CustomerName, TotalPrice, OrderDetails } = req.body;
  const { query_string, new_values } = getUpdateQueryString('OrderHistory', ID , {"Date": Date, "ServerName": ServerName, "CustomerName": CustomerName, "TotalPrice": TotalPrice, "OrderDetails": OrderDetails});
  pool.query(query_string, new_values, (error, results) => {
    if (error) { throw error; }
    response.status(200).send('Row Updated')
  })
});

router.get('/OrderHistory/:id', function(req, res, next) {
  client.query('SELECT * FROM OrderHistory WHERE id=$1', [req.params.id], (error, results) => {
    if (error) { throw error; }
    response.sendStatus(200).json(results.rows);
  });
});

router.delete('/OrderHistory/:id', function(req, res, next) {
  client.query('DELETE FROM OrderHistory WHERE id=$1', [req.params.id], (error, results) => {
    if (error) { throw error; }
  });
  res.sendStatus(200);
});




/* Employees */
router.get('/Employees', function(req, res, next) {
  client.query('SELECT * FROM Employees', (error, results) => {
    if (error) { throw error; }
    response.sendStatus(200).json(results.rows);
  });
});

router.post('/Employees', function(req, res, next) {
  const { Name, Role, Username, Password } = req.body;

  pool.query('INSERT INTO Employees (Name, Role, Username, Password) VALUES ($1, $2, $3, $4)', [Name, Role, Username, Password], (error, results) => {
    if (error) { throw error; }
    response.status(201).send(`Row added with ID: ${results.rows[0].id}`)
  })
});

router.put('/Employees', function(req, res, next) {
  const { ID, Name, Role, Username, Password } = req.body;
  const { query_string, new_values } = getUpdateQueryString('Employees', ID , {"Name": Name, "Role": Role, "Username": Username, "Password": Password});
  pool.query(query_string, new_values, (error, results) => {
    if (error) { throw error; }
    response.status(200).send('Row Updated')
  })
});

router.get('/Employees/:id', function(req, res, next) {
  client.query('SELECT * FROM Employees WHERE id=$1', [req.params.id], (error, results) => {
    if (error) { throw error; }
    response.sendStatus(200).json(results.rows);
  });
});

router.delete('/Employees/:id', function(req, res, next) {
  client.query('DELETE FROM Employees WHERE id=$1', [req.params.id], (error, results) => {
    if (error) { throw error; }
  });
  res.sendStatus(200);
});




/* InventoryHistory */
router.get('/InventoryHistory', function(req, res, next) {
  client.query('SELECT * FROM InventoryHistory', (error, results) => {
    if (error) { throw error; }
    response.sendStatus(200).json(results.rows);
  });

});

router.post('/InventoryHistory', function(req, res, next) {
  const { Date, CurrentInventory } = req.body;

  pool.query('INSERT INTO InventoryHistory (Date, CurrentInventory) VALUES ($1, $2)', [Date, CurrentInventory], (error, results) => {
    if (error) { throw error; }
    response.status(201).send(`Row added with ID: ${results.rows[0].id}`)
  })
});

router.put('/InventoryHistory', function(req, res, next) {
  const { ID, Date, CurrentInventory } = req.body;
  const { query_string, new_values } = getUpdateQueryString('InventoryHistory', ID , {"Date": Date, "CurrentInventory": CurrentInventory});
  pool.query(query_string, new_values, (error, results) => {
    if (error) { throw error; }
    response.status(200).send('Row Updated')
  })
});

router.get('/InventoryHistory/:id', function(req, res, next) {
  client.query('SELECT * FROM InventoryHistory WHERE id=$1', [req.params.id], (error, results) => {
    if (error) { throw error; }
    response.sendStatus(200).json(results.rows);
  });
});

router.delete('/InventoryHistory/:id', function(req, res, next) {
  client.query('DELETE FROM InventoryHistory WHERE id=$1', [req.params.id], (error, results) => {
    if (error) { throw error; }
  });
  res.sendStatus(200);
});




/* Special Routes */

/*Input: JSON array. Example below
[
  {
    Size: "bowl",
    Items: ["Orange Chicken", "Chow Mein"]
  }, 
  {
    Size: "plate",
    Items: ["Orange Chicken", "Orange Chicken", "Fried Rice"]
  } 
]
*/
router.post('/FinalizeOrder', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/Login', function(req, res, next) {
  res.send('respond with a resource');
});






module.exports = router;
