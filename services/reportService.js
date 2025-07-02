const { connectToServer } = require('../config/db');
const servers = require('../servers.json');
const { generateExcel } = require('./excelReportService');
const { sendReportEmail } = require('./mailService');

async function generateReports(startDate, endDate, servers) {
  for (const server of servers) {
      const result = await connectToServer(server);
      const { name, connection, ssh, sqlQuery, mails } = result;
        try {
          const [rows] = await connection.execute(sqlQuery, [startDate, endDate]);
          const filePath = await generateExcel(rows, name, startDate, endDate);
          await sendReportEmail(filePath,mails, name, startDate, endDate);
          await connection.end();
          ssh.end();
        } catch (err) {
          console.error(`Error processing ${name}:`, err.message);
        }
    }
}

async function generateReportsForMonthly(startDate, endDate) {
   return generateReports(startDate, endDate, servers.monthly_report);  
  }

async function generateReportsForWeekly(startDate, endDate) {
   return generateReports(startDate, endDate, servers.weekly_report);  
  }

module.exports = { generateReportsForMonthly, generateReportsForWeekly };