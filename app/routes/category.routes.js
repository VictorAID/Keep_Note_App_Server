module.exports = (app) => {
    const category = require("../controllers/category.controller.js");
    const router = require("express").Router();
  
    // Create a new Category
    router.post("/", category.create);
  
    // Retrieve all Categories
    router.get("/", category.findAll);
  
    // Retrieve a single Category with id
    router.get("/:id", category.findOne);
  
    // Update a Category with id
    router.put("/:id", category.update);
  
    // Delete a Category with id
    router.delete("/:id", category.delete);
  
    // Delete all Categories
    router.delete("/", category.deleteAll);
  
    app.use("/api/category", router);
  };
  