const categoryDAO = require('../dao/category.dao');

// Create and Save a new Category
exports.create = (categoryData, callback) => {
  categoryDAO.create(categoryData, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Retrieve all categories


// Find a single Category by Id
exports.findById = (categoryId, callback) => {
  categoryDAO.findById(categoryId, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

exports.getAll = (name, callback) => {
  categoryDAO.getAll(name, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Update a Category identified by the id
exports.updateById = (categoryId, updatedCategory, callback) => {
  categoryDAO.updateById(categoryId, updatedCategory, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Delete a Category with the specified id
exports.remove = (categoryId, callback) => {
  categoryDAO.remove(categoryId, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Delete all Categories
exports.removeAll = (callback) => {
  categoryDAO.removeAll((err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
