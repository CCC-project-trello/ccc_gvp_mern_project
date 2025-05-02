const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, required: true }, // e.g., 'todo', 'inprogress', 'done'
});

module.exports = mongoose.model('Task', TaskSchema);
