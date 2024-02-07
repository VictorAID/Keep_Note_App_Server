const reminderService = require("../service/reminder.service.js");

// Call the create method of reminderService object and return the result back
exports.create = (req, res) => {
  try {
    const newReminder = {
      reminder_name: req.body.reminder_name || '',
      reminder_descr: req.body.reminder_descr || '',
      reminder_type: req.body.reminder_type || '',
      reminder_creation_date: req.body.reminder_creation_date || ''
    };

    reminderService.create(newReminder, (err, results) => {
      if (err) {
        return res.status(400).send({ STATUS: "ERROR", error: err });
      }
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in saving reminder..!", error);
    return res.status(400).send({ STATUS: "UNEXPECTED_ERROR", error: "Unexpected error in saving reminder, please try later..!" });
  }
};

// Call the getAll method of reminderService object and return the result back
exports.findAll = (req, res) => {
  try {
    const name = req.query.name;
    reminderService.getAll(name, (err, results) => {
      if (err) {
        return res.status(400).send({ STATUS: "ERROR", error: err });
      }
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in fetching reminders..!", error);
    return res.status(400).send({ STATUS: "UNEXPECTED_ERROR", error: "Unexpected error in fetching reminders, please try later..!" });
  }
};

// Call the findById method of reminderService object and return the result back
exports.findOne = (req, res) => {
  try {
    let id = req.params.id;

    reminderService.findById(id, (err, results) => {
      if (err) {
        return res.status(400).send({ STATUS: "ERROR", error: err });
      }
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in getting reminder details by id..!", error);
    return res.status(400).send({ STATUS: "UNEXPECTED_ERROR", error: "Unexpected error in getting reminder details by id, please try later..!" });
  }
};

// Call the updateById method of reminderService object and return the result back
exports.update = (req, res) => {
  try {
    let id = req.params.id;

    const upReminder = {
      reminder_name: req.body.reminder_name || '',
      reminder_descr: req.body.reminder_descr || '',
      reminder_type: req.body.reminder_type || '',
      reminder_creation_date: req.body.reminder_creation_date || ''
    };

    reminderService.updateById(id, upReminder, (err, results) => {
      if (err) {
        return res.status(400).send({ STATUS: "ERROR", error: err });
      }
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in updating Reminder details by reminderId..!", error);
    return res.status(400).send({ STATUS: "UNEXPECTED_ERROR", error: "Unexpected error in updating reminder details by reminderId, please try later..!" });
  }
};

// Call the remove method of reminderService object and return the result back
exports.delete = (req, res) => {
  try {
    let id = req.params.id;

    reminderService.remove(id, (err, results) => {
      if (err) {
        return res.status(400).send({ STATUS: "ERROR", error: err });
      }
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in deleting reminder details by id..!", error);
    return res.status(400).send({ STATUS: "UNEXPECTED_ERROR", error: "Unexpected error in deleting reminder details by id, please try later..!" });
  }
};

// Call the removeAll method of reminderService object and return the result back
exports.deleteAll = (req, res) => {
  try {
    reminderService.removeAll((err, results) => {
      if (err) {
        return res.status(400).send({ STATUS: "ERROR", error: err });
      }
      return res.status(200).send({ STATUS: "OK", data: results });
    });
  } catch (error) {
    console.log("Unexpected error in deleting all reminders..!", error);
    return res.status(400).send({ STATUS: "UNEXPECTED_ERROR", error: "Unexpected error in deleting all reminder details, please try later..!" });
  }
};
