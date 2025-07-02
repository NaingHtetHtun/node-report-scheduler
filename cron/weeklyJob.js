const cron = require('node-cron');
const { generateReportsForWeekly } = require('../services/reportService');

function getLastWeekDateRange() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDate() - 7);
  const end = new Date(now.getFullYear(), now.getMonth(), 0);
  const toDateStr = d => d.toISOString().split('T')[0];
  return [toDateStr(start), toDateStr(end)];
}

// Run at 1:00 AM on every monday 0 1 * * 1
cron.schedule('0 1 * * 1', async () => {
  const [startDate, endDate] = getLastWeekDateRange();
  console.log(`Running report for ${startDate} to ${endDate}`);
  await generateReportsForWeekly(startDate, endDate); 
});