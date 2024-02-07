const categoryService = require("../service/category.service.js");

// Call the create method of categoryService object and return the result back
exports.create = (req, res) => {
  try {
    const newCategory = {
      category_name: req.body.category_name || '',
      category_descr: req.body.category_descr || '',
      category_creation_date: req.body.category_creation_date || ''
    };

    categoryService.create(newCategory, (err, result) => {
      if (err) {
        return res.status(400).send({ STATUS: "ERROR", error: err });
      }
      return res.status(200).send({ STATUS: "OK", data: result });
    });
  } catch (err) {
    console.log("Unexpected error in saving category..!", err);
    return res.status(400).send({ STATUS: "UNEXPECTED_ERROR", error: "Unexpected error in saving category, please try later..!" });
  }
};

// Call the getAll method of categoryService object and return the result back
exports.findAll = (req, res) => {
  try {
    const name = req.query.name;

    categoryService.getAll(name, (err, result) => {
      if (err) {
        return res.status(400).send({ STATUS: "ERROR", error: err });
      }
      return res.status(200).send({ STATUS: "OK", data: result });
    });
  } catch (err) {
    console.log("Unexpected error in fetching categories..!", err);
    return res.status(400).send({ STATUS: "UNEXPECTED_ERROR", error: "Unexpected error in fetching categories, please try later..!" });
  }
};

// Call the findById method of categoryService object and return the result back
exports.findOne = (req, res) => {
  try {
    let categoryId = req.params.id;

    categoryService.findById(categoryId, (err, result) => {
      if (err) {
        return res.status(400).send({ STATUS: "ERROR", error: err });
      }
      return res.status(200).send({ STATUS: "OK", data: result });
    });
  } catch (err) {
    console.log("Unexpected error in getting category details by id..!", err);
    return res.status(400).send({ STATUS: "UNEXPECTED_ERROR", error: "Unexpected error in getting category details by id, please try later..!" });
  }
};

// Call the updateById method of categoryService object and return the result back
exports.update = (req, res) => {
  try {
    const categoryId = req.params.id;
    const updatedCategory = {
      category_name: req.body.category_name || '',
      category_descr: req.body.category_descr || '',
      category_creation_date: req.body.category_creation_date || ''
    };

    categoryService.updateById(categoryId, updatedCategory, (err, result) => {
      if (err) {
        return res.status(400).send({ STATUS: "ERROR", error: err });
      }
      return res.status(200).send({ STATUS: "OK", data: result });
    });
  } catch (err) {
    console.log("Unexpected error in updating Category details by categoryId..!", err);
    return res.status(400).send({ STATUS: "UNEXPECTED_ERROR", error: "Unexpected error in updating category details by categoryId, please try later..!" });
  }
};

// Call the remove method of categoryService object and return the result back
exports.delete = (req, res) => {
  try {
    const categoryId = req.params.id;

    categoryService.remove(categoryId, (err, result) => {
      if (err) {
        return res.status(400).send({ STATUS: "ERROR", error: err });
      }
      return res.status(200).send({ STATUS: "OK", data: result });
    });
  } catch (err) {
    console.log("Unexpected error in deleting category..!", err);
    return res.status(400).send({ STATUS: "UNEXPECTED_ERROR", error: "Unexpected error in deleting category, please try later..!" });
  }
};

// Call the removeAll method of categoryService object and return the result back
exports.deleteAll = (req, res) => {
  categoryService.removeAll((err, result) => {
    if (err) {
      return res.status(400).send({ STATUS: "ERROR", error: err });
    }
    return res.status(200).send({ STATUS: "OK", data: result });
  });
};
