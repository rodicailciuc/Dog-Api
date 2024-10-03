import express from 'express';

import userControllers from '../controllers/user.js';

const router = express.Router();

const { getLoginForm, postLogin, getRegisterForm, postRegister, getLogout } =
    userControllers;

// routes
router.get('/register', getRegisterForm);
router.post('/register', postRegister);
router.get('/login', getLoginForm);
router.post('/login', postLogin);
router.get('/logout', getLogout);


export default router;
