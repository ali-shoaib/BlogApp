const mongoose = require('mongoose');

const TodosSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  toggle:{
    type:Boolean,
    default:false
  }
}, {timestamps: true});

const Todos = mongoose.model('todos', TodosSchema);

module.exports = Todos;