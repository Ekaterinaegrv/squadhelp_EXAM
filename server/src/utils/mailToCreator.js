const nodemailer = require('nodemailer');
const { MODERATOR_EMAIL, MODERATOR_EMAIL_PASS, MODERATOR_EMAIL_SERVICE } = require('../constants');
const CONSTANTS = require('../constants');

module.exports.sendMailFromModerator = async (data) => {
  const {command, email, title} = data;

    const transporter = nodemailer.createTransport({
      service: MODERATOR_EMAIL_SERVICE,
      auth: {
        user: MODERATOR_EMAIL,
        pass: MODERATOR_EMAIL_PASS
      }
    });
    
    const mailOptions = {
      from: MODERATOR_EMAIL,
      to: email,
      subject: command === CONSTANTS.OFFER_STATUS_PENDING ? 'Offer accepted by the moderator' : 'Offer bloked by the moderator',
      text: `Your offer of the Project ${title} has been ${command === CONSTANTS.OFFER_STATUS_PENDING ? 'accepted' : 'blocked'} by the moderator`,
    };
     
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.log(error);
    }
  };
