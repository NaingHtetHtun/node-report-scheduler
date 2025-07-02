const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendReportEmail(filePath,mails, name, startDate, endDate) {
await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: mails.join(','),
  subject: `Report for ${name} from ${startDate} to ${endDate}`,
  text: 'Here is the report attached.',
  attachments: [{ filename: filePath, path: filePath }],
});
logger.info(`Report emailed successfully to ${mails.join(', ')}`);
}

module.exports = { sendReportEmail };
