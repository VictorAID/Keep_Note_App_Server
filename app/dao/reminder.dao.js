const connection = require('./db');
const sql = connection();

/* constructor to initialize reminder with reminder_name, reminder_description, and
reminder_creation_date as its properties*/

function Reminder(reminder) {
  this.reminder_name = reminder.reminder_name;
  this.reminder_descr = reminder.reminder_descr; // corrected property name
  this.reminder_creation_date = reminder.reminder_creation_date;
};

/* 
  create should be a function that calls the query function on sql object
  to persist reminder data in MySQL notesdb schema using insert query
*/

Reminder.create = (newReminder, result) => {
  sql.query('INSERT INTO Reminder SET ?', newReminder, (err, res) => {
    if (err) {
      console.error('Error creating reminder', err);
      result(err, null);
      return;
    }
    console.log('Created Reminder', { id: res.insertId, ...newReminder });
    result(null, { id: res.insertId, ...newReminder });
  });
};

/* 
  findById should be a function that calls the query function on sql object 
  to fetch the reminder by the provided Id from the notesdb schema using select query
*/

Reminder.findById = (reminderId, result) => {
  const query = 'SELECT * FROM Reminder WHERE reminder_id = ?';
  sql.query(query, [reminderId], (err, res) => {
    if (err) {
      console.error('Error finding reminder by id', err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log('Found Reminder', res[0]);
      result(null, res[0]);
    } else {
      result({ kind: 'not_found' }, null);
    }
  });
};

/* 
  getAll should be a function that calls the query function on sql object 
  to fetch all the reminders or reminders with specific title from the notesdb 
  schema using select query
*/

Reminder.getAll = (name, result) => {
  let query = 'SELECT * FROM Reminder';
  if (name) {
    query += ` WHERE reminder_name LIKE '%${name}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.error('Error getting reminders', err);
      result(err, null);
      return;
    }
    console.log('Fetched Reminders', res);
    result(null, res);
  });
};

/* 
  updateById should be a function that calls query function on sql object 
  to update the reminder for the given id from the notesdb schema using update query
*/

Reminder.updateById = (reminderId, updatedReminder, result) => {
  const query = 'UPDATE Reminder SET ? WHERE reminder_id = ?';
  sql.query(query, [updatedReminder, reminderId], (err, res) => {
    if (err) {
      console.error('Error updating reminder', err);
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      // No reminder found with the given id
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('Updated Reminder', { id: reminderId, ...updatedReminder });
    result(null, { id: reminderId, ...updatedReminder });
  });
};

/* 
  remove should be a function that calls query function on sql object 
  to delete the reminder for the given id from the notesdb schema using delete query
*/

Reminder.remove = (reminderId, result) => {
  const query = 'DELETE FROM Reminder WHERE reminder_id = ?';
  sql.query(query, reminderId, (err, res) => {
    if (err) {
      console.error('Error deleting reminder', err);
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      // No reminder found with the given id
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('Deleted Reminder with id:', reminderId);
    result(null, res);
  });
};

/* 
  removeAll should be a function that calls query function on sql object 
  to delete all the reminders from the notesdb schema using delete query
*/

Reminder.removeAll = (result) => {
  const query = 'DELETE FROM Reminder';
  sql.query(query, (err, res) => {
    if (err) {
      console.error('Error deleting all reminders', err);
      result(err, null);
      return;
    }
    console.log('Deleted all reminders');
    result(null, res);
  });
};

module.exports = Reminder;
