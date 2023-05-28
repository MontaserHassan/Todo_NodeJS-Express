const Todo = require('../models/todos');

//const create = (data) => Todo.create(data);
const create = async (data) => {
  const counter = await Todo.CountTodo.findOneAndUpdate({ id: 'id' }, { $inc: { seq: 1 } }, { new: true });
  let id;
  if (counter) {
    id = counter.seq;
  } else {
    id = 1;
    const firstdoc = new Todo.CountTodo({
      id: 'id',
      seq: 1,
    });
    firstdoc.save();
  }
  data.id = id;
  return Todo.Todo.create(data);
};
const get = (userId) => Todo.Todo.find({ userId });
const getSpecialData = (filter, limit, skip) => Todo.Todo.find(filter).limit(limit).skip(skip).exec();
const getById = (_id) => Todo.Todo.find({ _id });
const deleteOneById = (_id) => Todo.Todo.deleteOne({ _id });
const updateOneById = (id, { title, status, tags }) => Todo.Todo.updateOne({ _id : id }, { $set: { title, status, tags } })

module.exports = {
  create,
  get,
  getSpecialData,
  getById,
  deleteOneById,
  updateOneById,
};