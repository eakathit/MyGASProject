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

// ฟังก์ชันตรวจสอบ login
function checkLogin(username, password) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("employees");
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) { // ข้าม header
    const row = data[i];
    if (row[0].toString().trim() === username.trim() && row[1].toString().trim() === password.trim()) {
      return { success: true, username: row[0], role: row[2] };
    }
  }
  return { success: false };
}

// ฟังก์ชันบันทึกเช็คอิน / เช็คเอาท์
function recordCheckIn(nickname, status) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CheckInLog");
  sheet.appendRow([new Date(), nickname, status]);
  return true;
}

