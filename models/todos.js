const mongoose = require('mongoose');

const{ Schema } = mongoose;

const todoSchema = new Schema(
    {
        id: {
            type: Number,
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        title: {
            type: String,
            required: true,
            minLength: 5,
            maxLength: 20,
        },
        status: {
            type: String,
            enum: ['to-do', 'in progress', 'done'],
            default: 'to-do',
        },
        tags: [{
            type: String,
            maxLength: 10,
        }],
    },
    {
        timestamps: true,
    }
);

const Todo = mongoose.model('Todo', todoSchema);

const counterTodo = new Schema (
    {
        id: {
            type : String,
        },
        seq: {
            type : Number,
        },
    }
);

const CountTodo = mongoose.model('CountTodo', counterTodo);

module.exports = {
    Todo,
    CountTodo,
}