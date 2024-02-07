const reminderDAO = require('../dao/reminder.dao');

// Create and Save a new Reminder
exports.create = (reminderData, callback) => {
  reminderDAO.create(reminderData, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Retrieve all reminders
exports.getAll = (name, callback) => {
  reminderDAO.getAll(name, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Find a single Reminder by Id
exports.findById = (reminderId, callback) => {
  reminderDAO.findById(reminderId, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Update a Reminder identified by the id
exports.updateById = (reminderId, updatedReminder, callback) => {
  reminderDAO.updateById(reminderId, updatedReminder, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Delete a Reminder with the specified id
exports.remove = (reminderId, callback) => {
  reminderDAO.remove(reminderId, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

// Delete all Reminders
exports.removeAll = (callback) => {
  reminderDAO.removeAll((err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
