const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({ 
         	todo : {type: string},
         	approved : {type: Boolean, default: false},
         	userName : {type: String}
     } 
);

const todo = mongoose.model('todo', todoSchema);


module.exports = {todo};
