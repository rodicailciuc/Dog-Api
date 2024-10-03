import express from 'express';

import verifyToken from '../middleware/verifyToken.js';
import dogControllers from '../controllers/dog.js';

const router = express.Router();

const { getAllDogs, getDogById, addDogForm, addDog, updateDog, deleteDog } =
    dogControllers;

router.get('/dogs', getAllDogs);
router.get('/dogs/:id', getDogById);
router.get('/add-dog', verifyToken, addDogForm);
router.post('/add-dog', verifyToken, addDog);
router.put('/dogs/:id', verifyToken, updateDog);
router.delete('/dogs/:id', verifyToken, deleteDog);

export default router;
