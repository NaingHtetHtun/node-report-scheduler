const cron = require('node-cron');
const { generateReportsForMonthly } = require('../services/reportService');
const logger = require('../utils/logger');

function getLastMonthDateRange() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const end = new Date(now.getFullYear(), now.getMonth(), 0);
  const toDateStr = d => d.toISOString().split('T')[0];
  return [toDateStr(start), toDateStr(end)];
}

// Run at 1:00 AM on the 1st of each month 0 1 1 * *
cron.schedule('0 1 1 * *', async () => {
  const [startDate, endDate] = getLastMonthDateRange();
  logger.info(`Running report for ${startDate} to ${endDate}`);
  await generateReportsForMonthly(startDate, endDate);
});