
const nodemailer = require('nodemailer');
const ApiError = require('../exceptions/api-error');

class MailService {

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendMessage(data) {
    if (!this.transporter) return;

    const { message, name, email } = data;

    try {
      await this.transporter.sendMail({
      from: email,
      to: process.env.SMTP_USER,
      subject: `Повідомлення від:  Name: ${name};`,
      html: `
             <div>
                <h1>Heeey! 🦄 There's a new message for you!</h1>
                </br>
                <h2>Email: ${email} </h2>
                </br>
                <h2>Message:</h2>
                "${message}"
             </div>
          `,
    });
    } catch (error) {
      console.error(error);

     throw ApiError.BadRequest('Error with sending email')
    }
    
  }
}

const mailService = new MailService();


module.exports = mailService