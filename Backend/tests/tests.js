const request = require('request')

describe('API integration testing', function() {
    it('/api/Inventory', function(done) {
        request.get('http://localhost:3000/api/Inventory', (err, res, body) => {
            if (err) { done(new Error(err)); }
            else {
                done();
            }
        });
    });

    it('/api/OrderSizes', function(done) {
        request.get('http://localhost:3000/api/OrderSizes', (err, res, body) => {
            if (err) { done(new Error(err)); }
            else {
                done();
            }
        });
    });

    it('/api/OrderHistory', function(done) {
        request.get('http://localhost:3000/api/OrderHistory', (err, res, body) => {
            if (err) { done(new Error(err)); }
            else {
                done();
            }
        });
    });

    it('/api/Employees', function(done) {
        request.get('http://localhost:3000/api/Employees', (err, res, body) => {
            if (err) { done(new Error(err)); }
            else {
                done();
            }
        });
    });

    it('/api/InventoryHistory', function(done) {
        request.get('http://localhost:3000/api/InventoryHistory', (err, res, body) => {
            if (err) { done(new Error(err)); }
            else {
                done();
            }
        });
    });
});