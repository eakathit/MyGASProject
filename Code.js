function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('ระบบลงเวลา')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// โหลดหน้า child page
function getPage(pageName) {
  return HtmlService.createHtmlOutputFromFile(pageName).getContent();
}

// helper สำหรับ include
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// ตรวจสอบ login
function checkLogin(username, password) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('employees');
  const data = sheet.getDataRange().getValues();

  for (let i = 0; i < data.length; i++) { // เริ่ม i=0 ถ้าไม่มี header
    const row = data[i];
    Logger.log('Row:', row[0], row[1], 'Input:', username, password);
    if (row[0].toString().trim() === username.trim() && row[1].toString().trim() === password.trim()) {
      Logger.log('Login success:', row[0]);
      return { success: true, role: row[2], username: row[0] };
    }
  }
  Logger.log('Login failed:', username);
  return { success: false };
}


