const connection = require('./db');
var sql = connection();

function Category(category){
    this.category_name = category.category_name;
    this.category_descr = category.category_descr;
    this.category_creation_date = category.category_creation_date;
}

// rest of the code remains unchanged


Category.create = (newCategory, result) => {
    sql.query('INSERT INTO Category SET ?', newCategory, (err, res) => {
        if (err) {
            console.error("Error creating a category", err);
            result(err, null);
            return;
        }
        console.log("Category created successfully", { id: res.insertId, ...newCategory });
        result(null, { id: res.insertId, ...newCategory });
    });
};

Category.findById = (categoryId, result) => {
    sql.query('SELECT * FROM Category WHERE category_id = ?', categoryId, (err, res) => {
        if (err) {
            console.error("Error finding a category", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Category found successfully", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: 'not_found' }, null);
    });
};

Category.getAll = (name, result) => {
    let query = `SELECT * FROM Category`;
    if (name) {
        query += ` WHERE category_name LIKE '%${name}%'`;
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.error("Error getting all the categories", err);
            result(err, null);
            return;
        }
        console.log("Fetched Categories", res);
        result(null, res);
    });
};

Category.updateById = (categoryId, updatedCategory, result) => {
    sql.query('UPDATE Category SET ? WHERE category_id = ? ', [updatedCategory, categoryId], (err, res) => {
        if (err) {
            console.error("Error updating the category", err);
            result(err, null);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        console.log("Category updated successfully", { id: categoryId, ...updatedCategory });
        result(null, { id: categoryId, ...updatedCategory });
    });
};

Category.remove = (categoryId, result) => {
    sql.query('DELETE FROM Category WHERE category_id = ?  ', categoryId, (err, res) => {
        if (err) {
            console.error("Error deleting the category", err);
            result(err, null);
            return;
        }
        if (res.affectedRows === 0) {
            result({ kind: 'not_found' }, null);
            return;
        }
        console.log("Deleted category with id: ", categoryId);
        result(null, res);
    });
};

Category.removeAll = (result) => {
    sql.query('DELETE FROM Category', (err, res) => {
        if (err) {
            console.error('Error deleting all categories', err);
            result(err, null);
            return;
        }
        console.log('Deleted categories');
        result(null, res);
    });
};

module.exports = Category;
