const express = require('express');
const LoginController = require('./src/controllers/LoginController');
const ProfileController = require('./src/controllers/ProfileController');
const NonFollowersController = require('./src/controllers/NonFollowersController');
const FansController = require('./src/controllers/FansController');

const routes = express.Router();

routes.post('/login', LoginController.store);
routes.get('/profile', ProfileController.store);
routes.get('/nonFollowers', NonFollowersController.store);
routes.get('/fans', FansController.store);

module.exports = routes;