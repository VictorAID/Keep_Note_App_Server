const util = require('util');
const connection = require('./db');

const sql = connection();
const queryAsync = util.promisify(sql.query).bind(sql);

class Note {
  static async create(newNote) {
    const insertNoteQuery = "INSERT INTO Note SET ?";
    const insertCategoryQuery = "INSERT INTO NoteCategory (note_id, category_id) VALUES (?, ?)";
    const insertReminderQuery = "INSERT INTO NoteReminder (note_id, reminder_id) VALUES (?, ?)";

    try {
      await queryAsync('START TRANSACTION');

      const noteResult = await queryAsync(insertNoteQuery, newNote);
      const noteId = noteResult.insertId;

      await queryAsync(insertCategoryQuery, [noteId, newNote.category_id]);
      await queryAsync(insertReminderQuery, [noteId, newNote.reminder_id]);

      await queryAsync('COMMIT');

      return { id: noteId, ...newNote };
    } catch (error) {
      console.error("Error creating note: ", error);
      await queryAsync('ROLLBACK');
      throw error;
    }
  }

  static async findById(noteId) {
    const query = `
      SELECT * FROM Note
      LEFT JOIN NoteCategory ON Note.note_id = NoteCategory.note_id
      LEFT JOIN NoteReminder ON Note.note_id = NoteReminder.note_id
      WHERE Note.note_id = ?
    `;

    try {
      const result = await queryAsync(query, noteId);
      return result.length ? result[0] : null;
    } catch (error) {
      console.error("Error finding note by id: ", error);
      throw error;
    }
  }

  static async getAll(title) {
    let query = `
      SELECT * FROM Note
      LEFT JOIN NoteCategory ON Note.note_id = NoteCategory.note_id
      LEFT JOIN NoteReminder ON Note.note_id = NoteReminder.note_id
    `;

    if (title) {
      query += " WHERE Note.note_title LIKE ?";
      try {
        const result = await queryAsync(query, [`%${title}%`]);
        return result;
      } catch (error) {
        console.error("Error getting notes: ", error);
        throw error;
      }
    } else {
      try {
        const result = await queryAsync(query);
        return result;
      } catch (error) {
        console.error("Error getting notes: ", error);
        throw error;
      }
    }
  }

  static async updateById(id, updatedNote) {
    const updateQuery = "UPDATE Note SET note_title = ?, note_content = ?, note_status = ? WHERE note_id = ?";

    try {
      const result = await queryAsync(updateQuery, [updatedNote.note_title, updatedNote.note_content, updatedNote.note_status, id]);
      if (result && result.affectedRows === 0) {
        throw { kind: "not_found" };
      }
      return { id, ...updatedNote };
    } catch (error) {
      console.error("Error updating note: ", error);
      throw error;
    }
  }

  static async remove(id) {
    const deleteQuery = "DELETE FROM Note WHERE note_id = ?";

    try {
      const result = await queryAsync(deleteQuery, id);
      if (result && result.affectedRows === 0) {
        throw { kind: "not_found" };
      }
      return result;
    } catch (error) {
      console.error("Error deleting note: ", error);
      throw error;
    }
  }

  static async removeAll() {
    const deleteAllQuery = "DELETE FROM Note";

    try {
      const result = await queryAsync(deleteAllQuery);
      return result;
    } catch (error) {
      console.error("Error deleting all notes: ", error);
      throw error;
    }
  }
}

module.exports = Note;
