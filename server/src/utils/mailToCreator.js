const nodemailer = require('nodemailer');

module.exports.sendMailFromModerator = async (data) => {
  const {command, email, title} = data;
  const moderatorEmail = 'marchspringa@gmail.com';

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: moderatorEmail,
        pass: 'siaogkxnmflythle'
      }
    });
    
    const mailOptions = {
      from: moderatorEmail,
      to: email,
      subject: command === 'pending' ? 'Offer accepted by the moderator' : 'Offer bloked by the moderator',
      text: `Your offer of the Project ${title} has been ${command === 'pending' ? 'accepted' : 'blocked'} by the moderator`,
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  
  };