module.exports = (app) => {
  const reminder = require("../controllers/reminder.controller.js");
  const router = require("express").Router();

  // Create a new Reminder
  router.post("/", reminder.create);

  // Retrieve all Reminders
  router.get("/", reminder.findAll);

  // Retrieve a single Reminder with id
  router.get("/:id", reminder.findOne);

  // Update a Reminder with id
  router.put("/:id", reminder.update);

  // Delete a Reminder with id
  router.delete("/:id", reminder.delete);

  // Delete all Reminders
  router.delete("/", reminder.deleteAll);

  app.use("/api/reminder", router);
};
