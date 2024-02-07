const noteDAO = require('../app/dao/note.dao');

// Create and Save a new Note
exports.create = (noteReq) => {
  return new Promise((resolve, reject) => {
    noteDAO.create(noteReq, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Retrieve all notes
exports.getAll = () => {
  return new Promise((resolve, reject) => {
    noteDAO.getAll((err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Other service methods...

// For example, Update a Note identified by the id
exports.updateById = (id, updatedNote) => {
  return new Promise((resolve, reject) => {
    noteDAO.updateById(id, updatedNote, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// For example, Delete a Note with the specified id
exports.remove = (id) => {
  return new Promise((resolve, reject) => {
    noteDAO.remove(id, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// For example, Delete all Notes
exports.removeAll = () => {
  return new Promise((resolve, reject) => {
    noteDAO.removeAll((err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
