const express = require('express');
const { userController, todoController } = require('../controllers');
const error = require('../error_success/error_success');
const { User } = require('../models/user');
const asycnWrapper = require('../lib');


const router = express.Router();

/////////////////////////////////routes///////////////////////////////////


// router.use(auth);

// router.get('/isAdmin', async (req, res, next) => {
//     const [err, user] = await asycnWrapper(userController.isAdmin());
//     if (err) return res.status(406).json(err);
//     return res.json(user);
// });

router.get('/:userId/todos', async (req, res, next) => {
    const { params: { userId } } = req;
    const [err, data] = await asycnWrapper(todoController.getById(req.params.userId));
    if (err) return res.status(404).json(error.idNotFound);
    return res.json(data);
});

router.get('/:id', async (req, res, next) => {
    const { params: { id } } = req;
    const [err, user] = await asycnWrapper(userController.getById(req.params.id));
    if (err) return res.status(404).json(error.idNotFound);
    return res.json(user);
});

router.post('/', async (req, res, next)=>{
    const { body: { userName, firstName, LastName, password, dob, Role } } = req;
    const [err, user] = await asycnWrapper(userController.create(req.body));
    if (err) return res.status(404).json(error.duplicatedUserName);
    return res.json(user);
}); 

router.post('/login', async (req, res, next)=>{
    try {
        const { body: { username, password } } = req;
        const token = await userController.login(username, password);
        return res.status(200).json(token);
    } catch (err) {
        return res.status(401).json(error.errorUserNameOrPassword);
    }
}); 

router.delete('/:id', async (req, res, next)=>{
    const { params: { id } } = req;
    const [err, user] = await asycnWrapper(userController.deleteOneById(req.params.id));
    if (err) return res.status(404).json(error.idNotFound);
    return res.status(200).json(error.deleteDone);
});

router.patch('/:id', async (req, res, next)=>{
    const { params: { id }, body: { username, firstName, lastName, dob, Role } } = req;
    const [err, user] = await asycnWrapper(userController.updateOneById(req.params.id, req.body ));
    if (err) return res.status(404).json(error.updateError);
    return res.status(200).json(error.updateDone);
    // return res.json(user);
});


module.exports=router;