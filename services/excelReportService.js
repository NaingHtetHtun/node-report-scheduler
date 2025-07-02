const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

function formatHeader(key) {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

async function generateExcel(rows, serverName, startDate, endDate) {
  const workbook = new ExcelJS.Workbook();
  console.log(`Generating Excel report for ${serverName} from ${startDate} to ${endDate}`);
  const worksheet = workbook.addWorksheet('Report');
  if (Array.isArray(rows) && rows.length > 0) {
    worksheet.columns = Object.keys(rows[0]).map(key => ({
      header: formatHeader(key),
      key
    }));
    worksheet.addRows(rows);
  } else {
    worksheet.addRow([`No data available for ${serverName} from ${startDate} to ${endDate}`]);
  }

  const reportsDir = path.join(__dirname, '../reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const fileName = `report-${serverName}-${startDate}-to-${endDate}.xlsx`;
  const filePath = path.join(reportsDir, fileName);
  await workbook.xlsx.writeFile(filePath);
  return filePath;
}

module.exports = { generateExcel };
