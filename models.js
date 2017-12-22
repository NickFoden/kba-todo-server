const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({ 
         	todo : {type: String},
         	completed : {type: Boolean, default: false},
         	level : {type: String, default: 'green'},
         	userName : {type: String}
     } 
);

const Todo = mongoose.model('Todo', todoSchema);

const userSchema = mongoose.Schema({ 
         	userName : {type: String},
         	todosArray : {type:Array}
     } 
);

const User = mongoose.model('User', userSchema);


module.exports = {Todo, User};
