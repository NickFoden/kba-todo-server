const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({ 
         	todo : {type: string},
         	completed : {type: Boolean, default: false},
         	level : {type: String, default: 'green'},
         	userName : {type: String}
     } 
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = {Todo};
