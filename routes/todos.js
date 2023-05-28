const express = require('express');
const jwt = require('jsonwebtoken');
const { todoController } = require('../controllers');
const asycnWrapper = require('../lib');
const { User } = require('../models/user');
const error = require('../error_success/error_success');
const { auth } = require('../middleware/auth');
const { isAdmin } = require('../middleware/admin');


// const { JWT_SECRET = 'test' } = process.env;

const router = express.Router();


/////////////////////////////routes///////////////////////////////


router.use(auth);

router.use(isAdmin);

// router.get('/', async (req, res, next) => {
//   const { skip, limit, ...filters } = req.query;
//   const [err, data] = await asycnWrapper(todoController.getSpecialData(filters, limit, skip));
//     if (err) return res.status(404).json(err);
//     return res.json(data);
// });

router.get('/', async (req, res, next) => {
  if(req.query){
    const { skip, limit, ...filters } = req.query;
    const [err, data] = await asycnWrapper(todoController.getSpecialData(filters, limit, skip));
    if (err) return res.status(404).json(err);
    return res.json(data);
  }
  const [err, data] = await asycnWrapper(todoController.get(req.user._id));
    if (err) return res.status(401).json(err);
    return res.status(200).json(data);
});

router.get('/:id', async (req, res, next) => {
  const { params : { id } } = req;
  const [err, data] = await asycnWrapper(todoController.getById(req.params.id));
  if (data.userId !== req.user._id) return res.status(404).json(error.NoTodo);
  if (err) return res.status(404).json(error.idNotFound);
  return res.status(200).json(data);
});

router.post('/', async (req, res, next) => {
    const { body: { title, status, tags } } = req;
    if (!title) return res.json(error.noTitle);
    const todo = { userId : req.user._id, title, status, tags};
    const [err, data] = await asycnWrapper(todoController.create(todo));
    // console.log(data)
    if (err) return res.status(404).json(error.notCreating);
    return res.json(data);
});

router.delete('/:id', async (req, res, next)=>{
  const { params: { id } } = req;
  const [errorcheck, checkingUser] = await asycnWrapper(todoController.getById(req.params.id));
  if ((checkingUser[0].userId).toString() !== (req.user._id).toString()) return res.status(404).json(error.NoTodo);
  const [err, data] = await asycnWrapper(todoController.deleteOneById(checkingUser[0]));
  if (err) return res.status(404).json(error.idNotFound);
  return res.status(200).json(error.deleteDone);
});

router.patch('/:id', async (req, res, next)=>{
  const { params: { id }, body: { title, status, tags } } = req;
  const [errorcheck, checkingUser] = await asycnWrapper(todoController.getById(req.params.id));
  if ((checkingUser[0].userId).toString() !== (req.user._id).toString()) return res.status(404).json(error.NoTodo);
  if (!title) return res.json(error.noTitle);
  const [err, data] = await asycnWrapper(todoController.updateOneById( checkingUser[0]._id, req.body ));
  if (err) return res.status(404).json(error.updateError);
  return res.status(200).json(error.updateDone);
});


module.exports = router;