const mailService = require('../service/mail-service')
const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/api-error')

class EmailController{
   async sendContactInformation(req, res, next){
      try {
         const errors = validationResult(req)

         if(!errors.isEmpty()){
            return next(ApiError.BadRequest('Error validation', errors.array()))
         }

         const { email, message, name } = req.body;

         await mailService.sendMessage(({ email, message, name }));

         return res.status(200).json({
            message: 'The email was succesfully sended',
          });

      } catch (e) {         
         next(e)
      }
   }
}


module.exports = new EmailController()