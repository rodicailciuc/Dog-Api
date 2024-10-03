import { v4 as Id } from 'uuid';

let dogs = [
    {
        id: Id(),
        name: 'Sonny',
        breed: 'Bichon',
        age: 4,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCgkybGOhGy7ySTyCxfnf2_Ow0GVylJf8qxQ&s'
    },
    {
        id: Id(),
        name: 'Gold',
        breed: 'Husky',
        age: 2,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgqjHZ5Ku0A9qSeQxiYL0RX8c4tJUqkhB05g&s'
    },
    {
        id: Id(),
        name: 'Pom-pom',
        from: 'Pomeranian',
        price: 5,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_8IRp1YEdyUB-OrriiTLAK89oyrez8Oh4NQ&s'
    }
];

class Dog {
    static getAll() {
        return dogs;
    }
    static getById(id) {
        return dogs.find((dog) => dog.id === id);
    }
    static add(dog) {
        const newDog = {
            id: Id(),
            ...dog
        };
        dogs.unshift(newDog);
        return newDog;
    }
    static update(id, dog) {
        const updateDog = dogs.find((dog) => dog.id === id);
        if (updateDog) {
            updateDog.name = dog.name;
            updateDog.breed = dog.breed;
            updateDog.age = dog.age;
            updateDog.img = dog.img;
            return updateDog;
        } else {
            return null;
        }
    }
    static delete(id) {
        const dogExist = dogs.find((dog) => dog.id === id);
        if (dogExist) {
            dogs = dogs.filter((dog) => dog.id !== id);
            return true;
        } else {
            return false;
        }
    }
}

export default Dog;
