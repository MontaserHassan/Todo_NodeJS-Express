const { User } = require('../models/user');
const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'test' } = process.env;

 

////////////////////// Functions //////////////////////
const create = (data) => User.create(data);
const get = (_id) => User.find({ _id });
const isAdmin = () => User.find( { Role : { $eq : "admin" } } );
const login = async (username, password) => {
  const user = await User.findOne({username}).exec();
  const valid = user.verifyPassword(password);
if (!valid) {
  throw new Error;
  }
  const token = jwt.sign({ username: user.username, id: user._id }, JWT_SECRET, { expiresIn: '1d'});
  return token;
}
const getById = (_id) => User.find({ _id });
const deleteOneById = (_id) => User.deleteOne({ _id }) 
const updateOneById = (id, { username, firstName, lastName, dob, Role }) => User.updateOne({ _id : id }, { $set: { username, firstName, lastName, dob, Role } })

module.exports = {
  create,
  get,
  getById,
  deleteOneById,
  updateOneById,
  login,
  isAdmin
};