module.exports = (app) => {
  const note = require("../controllers/note.controller.js");
  const router = require("express").Router();

  // Create a new Note
  router.post("/", note.create);

  // Retrieve all Notes
  router.get("/", note.findAll);

  // Retrieve a single Note with id
  router.get("/:id", note.findOne);

  // Update a Note with id
  router.put("/:id", note.update);

  // Delete a Note with id
  router.delete("/:id", note.delete);

  // Delete all Notes
  router.delete("/", note.deleteAll);

  app.use("/api/note", router);
};
