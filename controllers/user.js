import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

import validatePassword from '../utils/validatePassword.js';
import validateEmail from '../utils/validateEmail.js';
import matchPasswords from '../utils/matchPasswords.js';
import hashPassword from '../utils/hashPassword.js';

const userControllers = {
    postRegister: (req, res) => {
        const { email, password, rePassword } = req.body;

        const emailExist = User.getByEmail(email);
        if (emailExist) {
            return res.status(409).render('404', {
                title: 'Email already exist',
                message: 'Email already exist'
            });
        }
        const isValidEmail = validateEmail(email);
        const isValidPassword = validatePassword(password);
        const doPasswordMatch = matchPasswords(password, rePassword);

        if (isValidEmail && isValidPassword && doPasswordMatch) {
                            
                const hashedPassword =  hashPassword(password);
                User.add({
                    email,
                    password: hashedPassword
                });

                // Redirect to login page after successful registration
                return res.status(302).redirect('/api/login');
          
        } else {
            return res.status(400).render('404', {
                title: 'Invalid email or password',
                message: 'Invalid email or password'
            });
        }
    },
    postLogin: (req, res) => {
        const { email, password } = req.body;
        const emailExist = User.getByEmail(email);
        if (!emailExist) {
            return res.status(400).render('404', {
                title: 'User not found',
                message: 'User not found, please register!'
            });
        }
        bcrypt.compare(password, emailExist.password, (err, isValid) => {
            if (err) {
                console.error(err);
            }
            if (isValid) {
                const token = jwt.sign(
                    { email },
                    process.env.JWT_SECRET
                );
                if (token) {
                    res.cookie('token', token, { httpOnly: true });
                    res.status(302).redirect('/api/dogs');
                }
            } else {
                res.status(409).render('404', {
                    title: 'Invalid password or email',
                    message: 'Invalid password or email'
                });
            }
        });
    },
    getLogout: (req, res) => {
        res.clearCookie('token');
        return res.status(302).redirect('/api/dogs');
    },

    getRegisterForm: (req, res) => {
        res.status(200).render('register-form');
    },
    getLoginForm: (req, res) => {
        res.status(200).render('login-form');
    }
};

export default userControllers;