const noteService = require('../app/service/note.service');

exports.create = (req, res) => {
  const newNote = {
    note_title: req.body.note_title,
    note_content: req.body.note_content || '',
    note_status: req.body.note_status || '',
    note_creation_date: req.body.note_creation_date || '',
    category_id: req.body.category_id || '',
    reminder_id: req.body.reminder_id || ''
  };

  noteService.create(newNote)
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.findAll = (req, res) => {
  noteService.getAll()
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  noteService.findById(id)
    .then((result) => {
      if (result) {
        res.status(200).json({ data: result });
      } else {
        res.status(404).json({ error: "Not found." });
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const updatedNote = {
    note_title: req.body.note_title,
    note_content: req.body.note_content || '',
    note_status: req.body.note_status || '',
    note_creation_date: req.body.note_creation_date || '',
    category_id: req.body.category_id || '',
    reminder_id: req.body.reminder_id || ''
  };

  noteService.updateById(id, updatedNote)
    .then((result) => {
      if (result) {
        res.status(200).json({ data: result });
      } else {
        res.status(404).json({ error: "Not found." });
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  noteService.remove(id)
    .then((result) => {
      if (result) {
        res.status(200).json({ data: result });
      } else {
        res.status(404).json({ error: "Not found." });
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.deleteAll = (req, res) => {
  noteService.removeAll()
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};
