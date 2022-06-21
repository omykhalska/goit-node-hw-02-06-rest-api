const mailgun = require('mailgun-js');

const { MAILGUN_APIKEY } = process.env;
const DOMAIN = 'sandbox927aca45a8224f33bfade40981ba1c3f.mailgun.org';
const mg = mailgun({ apiKey: MAILGUN_APIKEY, domain: DOMAIN });

const sendEmail = async (data) => {
  const email = { ...data, from: 'noreply@oksana.mailgun.org' };
  await mg.messages().send(email, function (error, body) {
    if (error) {
      console.log(error);
      throw error;
    }
  });
};

module.exports = sendEmail;
