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
    res.status(200).json(results.rows);
  });
});

router.post('/Inventory', function(req, res, next) {
  const { Name, ItemType, Calories, Quantity, WholesaleCost, Minimum } = req.body;

  client.query('INSERT INTO Inventory (name, itemtype, calories, quantity, wholesalecost, minimum) VALUES ($1, $2, $3, $4, $5, $6)', [Name, ItemType, Calories, Quantity, WholesaleCost, Minimum], (error, results) => {
    if (error) { throw error; }
    res.sendStatus(201);
  })
});

router.put('/Inventory', function(req, res, next) {
  const { ID, Name, ItemType, Calories, Quantity, WholesaleCost, Minimum } = req.body;
  const { query_string, new_values } = getUpdateQueryString('Inventory', ID , {"Name": Name, "ItemType": ItemType, "Calories": Calories, "Quantity": Quantity, "WholesaleCost": WholesaleCost, "Minimum": Minimum});
  client.query(query_string, new_values, (error, results) => {
    if (error) { throw error; }
    res.status(200).send('Row Updated');
  })
});

router.get('/Inventory/:id', function(req, res, next) {
  client.query('SELECT * FROM Inventory WHERE id=$1', [req.params.id], (error, results) => {
    if (error) { throw error; }
    res.status(200).json(results.rows);
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
    res.status(200).json(results.rows);
  });
});

router.post('/Sizes', function(req, res, next) {
  const { Name, NumSides, NumEntrees, Price } = req.body;

  client.query('INSERT INTO Sizes (Name, NumSides, NumEntrees, Price) VALUES ($1, $2, $3, $4)', [Name, NumSides, NumEntrees, Price], (error, results) => {
    if (error) { throw error; }
    res.sendStatus(201);
  })
});

router.put('/Sizes', function(req, res, next) {
  const { ID, Name, NumSides, NumEntrees, Price } = req.body;
  const { query_string, new_values } = getUpdateQueryString('Sizes', ID , {"Name": Name, "NumSides": NumSides, "NumEntrees": NumEntrees, "Price": Price});
  client.query(query_string, new_values, (error, results) => {
    if (error) { throw error; }
    res.status(200).send('Row Updated');
  })
});

router.get('/Sizes/:id', function(req, res, next) {
  client.query('SELECT * FROM Sizes WHERE id=$1', [req.params.id], (error, results) => {
    if (error) { throw error; }
    res.status(200).json(results.rows);
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
    res.status(200).json(results.rows);
  });
});

router.get('/OrderHistoryLast', function(req, res, next) {
  client.query('SELECT * FROM OrderHistory WHERE id IN(SELECT id FROM OrderHistory ORDER BY id DESC LIMIT 10)', (error, results) => {
    if (error) { throw error; }
    res.status(200).json(results.rows);
  });
});

router.post('/OrderHistory', function(req, res, next) {
  const { Date, ServerName, CustomerName, TotalPrice, OrderDetails } = req.body;

  client.query('INSERT INTO OrderHistory (Date, ServerName, CustomerName, TotalPrice, OrderDetails) VALUES ($1, $2, $3, $4, $5)', [Date, ServerName, CustomerName, TotalPrice, OrderDetails], (error, results) => {
    if (error) { throw error; }
    res.sendStatus(201);
  })
});

router.put('/OrderHistory', function(req, res, next) {
  const { ID, Date, ServerName, CustomerName, TotalPrice, OrderDetails } = req.body;
  const { query_string, new_values } = getUpdateQueryString('OrderHistory', ID , {"Date": Date, "ServerName": ServerName, "CustomerName": CustomerName, "TotalPrice": TotalPrice, "OrderDetails": OrderDetails});
  client.query(query_string, new_values, (error, results) => {
    if (error) { throw error; }
    res.status(200).send('Row Updated');
  })
});

router.get('/OrderHistory/:id', function(req, res, next) {
  client.query('SELECT * FROM OrderHistory WHERE id=$1', [req.params.id], (error, results) => {
    if (error) { throw error; }
    res.status(200).json(results.rows);
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
    res.status(200).json(results.rows);
  });
});

router.post('/Employees', function(req, res, next) {
  const { Name, Role, Username, Password } = req.body;

  client.query('INSERT INTO Employees (Name, Role, Username, Password) VALUES ($1, $2, $3, $4)', [Name, Role, Username, Password], (error, results) => {
    if (error) { throw error; }
    res.sendStatus(201);
  })
});

router.put('/Employees', function(req, res, next) {
  const { ID, Name, Role, Username, Password } = req.body;
  const { query_string, new_values } = getUpdateQueryString('Employees', ID , {"Name": Name, "Role": Role, "Username": Username, "Password": Password});
  client.query(query_string, new_values, (error, results) => {
    if (error) { throw error; }
    res.status(200).send('Row Updated');
  })
});

router.get('/Employees/:id', function(req, res, next) {
  client.query('SELECT * FROM Employees WHERE id=$1', [req.params.id], (error, results) => {
    if (error) { throw error; }
    res.status(200).json(results.rows);
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
    res.status(200).json(results.rows);
  });

});

router.post('/InventoryHistory', function(req, res, next) {
  const { Date, CurrentInventory } = req.body;

  client.query('INSERT INTO InventoryHistory (Date, CurrentInventory) VALUES ($1, $2)', [Date, CurrentInventory], (error, results) => {
    if (error) { throw error; }
    res.sendStatus(201);
  })
});

router.put('/InventoryHistory', function(req, res, next) {
  const { ID, Date, CurrentInventory } = req.body;
  const { query_string, new_values } = getUpdateQueryString('InventoryHistory', ID , {"Date": Date, "CurrentInventory": CurrentInventory});
  client.query(query_string, new_values, (error, results) => {
    if (error) { throw error; }
    res.status(200).send('Row Updated');
  })
});

router.post('/InventoryHistoryStartDate', function(req, res, next) {
  //func for getting inventory by dates in attempt to speed it up
  
  //TODO -> FOR SPEEDUP, TRY SELECT ID FROM INVENTORYHISTORY, THEN FEED FIRST VAL INTO ANOTHER CALL FOR INVENTORYHISTORY ID
  const startDate = req.body.first;
  const endDate = req.body.second;

  console.log(startDate,endDate)
  if(endDate == "noinput" && startDate != "noinput"){
    console.log("No end date");
    client.query("SELECT * FROM InventoryHistory WHERE id=(SELECT MIN(id) FROM InventoryHistory WHERE date >= $1)", [startDate], (error, results) => {
      if (error) { throw error; }
      res.status(200).json(results.rows);
    });
  }else if(endDate != "noinput" && startDate == "noinput"){
    console.log("No start date");
    client.query("SELECT * FROM InventoryHistory WHERE id=(SELECT MAX(id) FROM InventoryHistory WHERE date < $1)", [endDate], (error, results) => {
      if (error) { throw error; }
      res.status(200).json(results.rows);
    });
  }else if(startDate != "noinput" && endDate != "noinput"){
    console.log("Both start and end dates exist");
    client.query("SELECT * FROM InventoryHistory WHERE id=(SELECT MIN(id) FROM InventoryHistory WHERE date < $1 AND date > $2)", [startDate,endDate], (error, results) => {
      if (error) { throw error; }
      res.status(200).json(results.rows);
    });
  }else{
    console.log("Cant run on no input")
    res.status(888);
  }
});

router.get('/InventoryHistory/:id', function(req, res, next) {
  client.query('SELECT * FROM InventoryHistory WHERE id=$1', [req.params.id], (error, results) => {
    if (error) { throw error; }
    res.status(200).json(results.rows);
  });
});

router.delete('/InventoryHistory/:id', function(req, res, next) {
  client.query('DELETE FROM InventoryHistory WHERE id=$1', [req.params.id], (error, results) => {
    if (error) { throw error; }
  });
  res.sendStatus(200);
});




/* Special Routes */

/*Input: JSON object with keys for each non-ID/non-Date column in OrderHistory. Example below
{
  "ServerName": "Steve",
  "CustomerName": "James",
  "TotalPrice": 1.9,
  "OrderDetails": [
    {
      "Size": "bowl",
      "Items": ["Orange Chicken", "Chow Mein"]
    }, 
    {
      "Size": "plate",
      "Items": ["Orange Chicken", "Orange Chicken", "Fried Rice"]
    } 
  ]
}

*/
router.post('/FinalizeOrder', async function(req, res, next) {
  //OrderHistory Update
  const { ServerName, CustomerName, TotalPrice, OrderDetails } = req.body;

  await client.query('BEGIN');

  await client.query('INSERT INTO OrderHistory (Date, ServerName, CustomerName, TotalPrice, OrderDetails) VALUES (CURRENT_DATE, $1, $2, $3, $4)', [ServerName, CustomerName, TotalPrice, OrderDetails], async (error, results) => {
    if (error) { 
      await client.query('ROLLBACK');
      throw error; 
    }
  });

  //get current inventory for use later
  let curInventory;
  let lastid = -1;
  let jsonInventory = {};
  await client.query("SELECT * FROM InventoryHistory WHERE id=(SELECT MAX(id) FROM InventoryHistory)",async (err, result)=>{
    if(err){
      console.log("ERROR IN GETTING LAST INVENTORYHISTORY");
      await client.query("ROLLBACK");
      throw err;
    }
    
    console.log("this is res: ",result);
    curInventory=result.rows[0].currentinventory;
    lastid=result.rows[0].id;
    console.log("this is res inventory",curInventory);
    console.log("this is res lastid: ",lastid);
    let cinventory = "";
    for(let i = 0; i < curInventory.length; i++){
      if(curInventory[i] == "'"){

          cinventory+="\"";
      }else{
          cinventory+=curInventory[i];
      }
    }
    console.log("cinventory:",cinventory)
    jsonInventory = JSON.parse(cinventory);

  });


  //Inventory Update
  ordered_items = [];
  for (let i = 0; i < OrderDetails.length; i++) {
    ordered_items = ordered_items.concat(OrderDetails[i].Items);
  }
  console.log("this is ordered items: ",ordered_items);
  console.log("this is orderdetails",OrderDetails);

  ordered_item_count = {};
  for (let index in ordered_items) {
    ordered_item_count[ordered_items[index]] = ordered_item_count[ordered_items[index]] + 1 || 1;
  }

  console.log("this is ordererd item count: ",ordered_item_count);


  for (const [item_name, count] of Object.entries(ordered_item_count)) {
    //Get current quantity of each item
    await client.query('SELECT * FROM Inventory WHERE Name=$1', [item_name], async (select_error, select_results) => {
      if (select_error) {
        console.log("SELECT ERROR")
        await client.query('ROLLBACK');
        throw select_error; 
      }
      
      //Update each item with new quantity
      await client.query("UPDATE Inventory SET Quantity=$1 WHERE Name=$2", [parseInt(select_results.rows[0].quantity) - count, item_name], async (update_error, update_results) => {
        if (update_error) {
          console.log("UPDATE ERROR")
          await client.query('ROLLBACK');
          throw update_error; 
        }
      })

      jsonInventory[item_name]-=count;
      console.log("updating...", jsonInventory)
      for(let item in jsonInventory){
        if(!jsonInventory[item]){
          
          delete jsonInventory[item]
        }
      }
    });
  }
  //Update inventoryHistory with this new inventory segment
 
  
  await client.query('COMMIT');
  await client.query('INSERT INTO InventoryHistory (Date, CurrentInventory) VALUES (CURRENT_DATE, $1)', [JSON.stringify(jsonInventory)], (error, results) => {
    if (error) { throw error; }
  })
  await client.query('COMMIT');
  console.log("D O N E",jsonInventory)
  res.sendStatus(201);
});

router.post('/EmployeeLogin', function(req, res, next) {
  const { Username, Password } = req.body;
  client.query('SELECT * FROM Employees WHERE username=$1 AND password=$2', [Username, Password], (error, results) => {
    if (error) { throw error; }

    if (results.rows.length == 1) {
      res.status(200).json(results.rows[0]);
    } 
    else {
      res.sendStatus(401);
    }
  });
});

router.put('/AddUserPoints', function (req, res, next) {

  const {Username,NumPoints} = req.body;
  console.log("BODY",req.body)
  let curpoints = -1;
  let bad = false;
  //first see how many points they currently have
  client.query("SELECT customerpoints FROM customeraccounts WHERE username=$1", [Username], (error, results)=>{
    if(error){console.log("ERROR GETTING INITIAL ACCOUNT INTO TO ADD POINTS"); throw error;}
    console.log(results);
    if(results.rows[0] == undefined){ //fail gracefully
      return;
    }
    curpoints = results.rows[0].customerpoints;
    console.log(results);
  });

  
  //then update with number of points
  let newpointsnumber = curpoints + NumPoints;
  console.log(curpoints,NumPoints);
  console.log(newpointsnumber,Username);
  client.query("UPDATE customeraccounts SET customerpoints=$1 WHERE username=$2",[newpointsnumber,Username],(error, results)=>{
    if(error){console.log("ERROR UPDATING CUSTOMER POINTS"); throw error;}
    res.sendStatus(200).json(results.rows[0]);
  });
});

router.post('/CustomerLogin', function(req, res, next) {
  const { Username, Password } = req.body;
  client.query('SELECT * FROM CustomerAccounts WHERE username=$1 AND password=$2', [Username, Password], (error, results) => {
    if (error) { throw error; }

    if (results.rows.length == 1) {
      res.status(200).json(results.rows[0]);
    } 
    else {
      res.sendStatus(401);
    }
  });
});

router.post('/RegisterCustomerAccount', function(req, res, next) {
  const { FirstName, LastName, Username, Password } = req.body;

  //Check if username is unique
  client.query('SELECT * FROM CustomerAccounts WHERE username=$1', [Username], (error, results) => {
    if (error) { throw error; }

    if (results.rows.length > 0) {
      res.sendStatus(409);
    } 
    else { //Create new account
      client.query('INSERT INTO CustomerAccounts (FirstName, LastName, Username, Password, CustomerPoints) VALUES ($1, $2, $3, $4, 0)', [FirstName, LastName, Username, Password], (error, results) => {
        if (error) { throw error; }
        res.sendStatus(201);
      })
    }
  });
});




module.exports = router;
