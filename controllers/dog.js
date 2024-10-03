import Dog from '../models/dog.js';

const dogControllers = {
    getAllDogs: (req, res) => {
        const dogs = Dog.getAll();
        const { token } = req.cookies;
        const { email } = req.cookies;
        res.status(200).render('dogs', { dogs, token });
    },
    getDogById: (req, res) => {
        const { id } = req.params;
        const dog = Dog.getById(id);
        if (dog) {
            res.status(200).render('dog', {
                dog
            });
        } else {
            res.status(404).render('404', {
                title: 'Dog not found!',
                message: 'Dog not found!'
            });
        }
    },
    addDogForm: (req, res) => {
        res.status(200).render('add-dog');
    },
    addDog: (req, res) => {
        const { name, breed, age, img } = req.body;
        if (name && breed && age && img) {
            Dog.add({ name, breed, age, img });
            res.status(302).redirect('/api/dogs');
        } else {
            res.status(400).render('404', {
                title: 'Invalid input',
                message: 'All fields are required'
            });
        }
    },
    updateDog: (req, res) => {
        const { id } = req.params;
        const { name, breed, age, img } = req.body;

        if (name && breed && age && img) {
            const updateDog = Dog.update(id, { name, breed, age, img });
            if (updateDog) {
                res.status(302).redirect('/api/dogs');
            } else {
                res.status(404).render('404', {
                    title: 'Dog not found',
                    message: 'Dog not found'
                });
            }
        } else {
            res.status(400).render('404', {
                title: 'Invalid Input',
                message: 'All fields are required!'
            });
        }
    },
    deleteDog: (req, res) => {
        const { id } = req.params;
        const dogDeleted = Dog.remove(id);
        if (dogDeleted) {
            res.status(302).redirect('/api/dogs');
        } else {
            res.status(404).json({
                title: 'Dog not found',
                message: 'Dog not found'
            });
        }
    }
};

export default dogControllers;
