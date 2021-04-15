const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM CUSTOMER', (err, customers) => {
            if(err){
                res.json(err);
            }
            res.render('customers', {
                data: customers
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO customer set ?', [data], (err, customer) => {
            //console.log(customer);
            res.redirect('/');
        });
    });
};

controller.update = (req, res) => {
    const id = req.params.id; 

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer WHERE id = ?', [id], (err, customer) => {
            //res.redirect('/');
            res.render('customers_edit', {
                data: customer[0]
            });
            console.log(customer);
        });
    });
};

controller.saveUpdate = (req, res) => {
    const id = req.params.id; 
    const newCostumer = req.body;
    console.log('iddenisssss');
    console.log(id);
    console.log(newCostumer);
    req.getConnection((err, conn) => {
        conn.query('UPDATE customer set ? WHERE id = ?', [newCostumer, id], (err, customer) => {
            res.redirect('/');
        });
    });
};

controller.delete = (req, res) => {
    const id = req.params.id; 

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM customer WHERE id = ?', [id], (err, rows) => {
            res.redirect('/');
        });
    });
};

module.exports = controller;