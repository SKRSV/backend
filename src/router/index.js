const Router = require('express').Router;
const router = new Router();
const { body } = require('express-validator');
const emailController = require('../controller/email-controller');

router.post('/send-contact-info',
   body('name').isLength({min: 1}),
   body('email').isEmail(),
   body('message').isLength({min: 1, max: 100}),
   emailController.sendContactInformation
);



module.exports = router